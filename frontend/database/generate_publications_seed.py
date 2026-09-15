from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/app/publications.raw.txt"
OUTPUT = ROOT / "database/publications-seed.sql"

DOMESTIC_CONFERENCE_KEYWORDS = (
    "한국정보보호학회",
    "동계학술대회",
    "하계학술대회",
    "춘계학술대회",
    "추계학술대회",
    "추계공동학술대회",
    "학술발표대회",
    "종합학술대회",
    "한국컴퓨터종합학술대회",
    "한국군사과학기술학회",
    "한국해군과학기술학회",
    "한국경영정보학회",
)

DOMESTIC_JOURNAL_KEYWORDS = (
    "정보보호학회논문지",
    "정보보호학회지",
    "정보과학회논문지",
    "정보과학회지",
    "한국해군학회지",
    "한국인터넷정보학회논문지",
    "한국인터넷정보학회",
    "전자공학회지",
    "국군방첩사령부 국방과 보안 학술지",
)

INTERNATIONAL_CONFERENCE_KEYWORDS = (
    "in Proc.",
    "In Proc.",
    "Proceedings",
    " Conference",
    " Symposium",
    " Workshop",
    "AsiaARES",
    "WISA",
    "ICISC",
    "ACSAC",
    "ICCV",
    "RAID",
    "IEEE ICCE",
)

INTERNATIONAL_JOURNAL_KEYWORDS = (
    "Transactions",
    "Journal",
    "IEEE Access",
    "Neurocomputing",
    "Information Sciences",
    "Sensors",
    "Computers & Security",
    "EURASIP",
    "INPRA",
    "Intelligent Automation & Soft Computing",
)

MONTH_PATTERN = re.compile(
    r"\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
    r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|"
    r"Dec(?:ember)?)\.?(?![A-Za-z])",
    re.IGNORECASE,
)

MONTH_NUMBERS = {
    "jan": 1,
    "feb": 2,
    "mar": 3,
    "apr": 4,
    "may": 5,
    "jun": 6,
    "jul": 7,
    "aug": 8,
    "sep": 9,
    "oct": 10,
    "nov": 11,
    "dec": 12,
}


def contains_any(text: str, keywords: tuple[str, ...]) -> bool:
    lowered = text.casefold()
    return any(keyword.casefold() in lowered for keyword in keywords)


def classify(text: str) -> str:
    if contains_any(text, DOMESTIC_CONFERENCE_KEYWORDS) or re.search(
        r"\bCISC\s*[WS]\d{2}\b", text, re.IGNORECASE
    ):
        return "domestic_conference"
    if contains_any(text, DOMESTIC_JOURNAL_KEYWORDS):
        return "domestic_journal"
    if contains_any(text, INTERNATIONAL_CONFERENCE_KEYWORDS):
        return "international_conference"
    if contains_any(text, INTERNATIONAL_JOURNAL_KEYWORDS):
        return "international_journal"
    return "international_conference"


def extract_month(text: str) -> int | None:
    matches = list(MONTH_PATTERN.finditer(text))
    if matches:
        return MONTH_NUMBERS[matches[-1].group(1)[:3].lower()]

    if "동계학술대회" in text or re.search(r"\bCISC\s*W\d{2}\b", text):
        return 12
    if "추계" in text:
        return 11
    if "하계학술대회" in text or re.search(r"\bCISC\s*S\d{2}\b", text):
        return 6
    if "춘계" in text:
        return 5
    return None


def sql_string(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def parse_publications() -> list[tuple[int, int | None, str, str, int]]:
    publications: list[tuple[int, int | None, str, str, int]] = []
    year: int | None = None

    for line in SOURCE.read_text(encoding="utf-8-sig").splitlines():
        line = line.strip()
        if not line:
            continue
        if re.fullmatch(r"\d{4}", line):
            year = int(line)
            continue
        if year is None:
            continue

        citation = re.sub(r"^\d+\.\s*", "", line).strip()
        publications.append(
            (year, extract_month(citation), classify(citation), citation, len(publications) + 1)
        )

    return publications


def main() -> None:
    publications = parse_publications()
    rows = []
    for year, month, category, citation, source_order in publications:
        month_sql = "NULL" if month is None else str(month)
        rows.append(
            f"  ({year}, {month_sql}, '{category}', {sql_string(citation)}, {source_order})"
        )

    sql = (
        "INSERT INTO publications "
        "(publication_year, publication_month, category, citation, source_order) VALUES\n"
        + ",\n".join(rows)
        + "\nON CONFLICT (publication_year, citation) DO UPDATE SET\n"
        + "  publication_month = EXCLUDED.publication_month,\n"
        + "  category = EXCLUDED.category,\n"
        + "  source_order = EXCLUDED.source_order,\n"
        + "  updated_at = NOW();\n"
    )
    OUTPUT.write_text(sql, encoding="utf-8")
    print(f"Generated {len(publications)} publications in {OUTPUT}")


if __name__ == "__main__":
    main()
