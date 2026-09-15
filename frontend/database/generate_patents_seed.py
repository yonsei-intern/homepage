from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/app/patents.raw.txt"
OUTPUT = ROOT / "database/patents-seed.sql"

CATEGORY_MAP = {
    "INTERNATIONAL_REGISTERED": "international_registered",
    "INTERNATIONAL_FILED": "international_filed",
    "DOMESTIC_REGISTERED": "domestic_registered",
    "DOMESTIC_FILED": "domestic_filed",
    "SW_OUTPUT": "software_output",
}


def number_sort_key(patent_number: str) -> int:
    us_number = re.match(r"^US(\d+)", patent_number, re.IGNORECASE)
    if us_number:
        return int(us_number.group(1))

    groups = re.findall(r"\d+", patent_number)
    if not groups:
        return 0
    return int("".join(groups))


def sql_string(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def parse_patents() -> list[tuple[str, str, int, str, int]]:
    rows: list[tuple[str, str, int, str, int]] = []
    seen: set[tuple[str, str, str]] = set()
    category: str | None = None

    for line in SOURCE.read_text(encoding="utf-8-sig").splitlines():
        line = line.strip()
        if not line:
            continue

        section = re.fullmatch(r"\[(.+)]", line)
        if section:
            category = CATEGORY_MAP.get(section.group(1))
            continue

        if category is None or "|" not in line:
            continue

        patent_number, title = (part.strip() for part in line.split("|", 1))
        identity = (category, patent_number, title)
        if identity in seen:
            continue
        seen.add(identity)
        rows.append(
            (category, patent_number, number_sort_key(patent_number), title, len(rows) + 1)
        )

    return rows


def main() -> None:
    patents = parse_patents()
    values = [
        "  ("
        + ", ".join(
            (
                sql_string(category),
                sql_string(patent_number),
                str(sort_key),
                sql_string(title),
                str(source_order),
            )
        )
        + ")"
        for category, patent_number, sort_key, title, source_order in patents
    ]

    sql = (
        "INSERT INTO patents "
        "(category, patent_number, number_sort_key, title, source_order) VALUES\n"
        + ",\n".join(values)
        + "\nON CONFLICT (category, patent_number, title) DO UPDATE SET\n"
        + "  number_sort_key = EXCLUDED.number_sort_key,\n"
        + "  source_order = EXCLUDED.source_order,\n"
        + "  updated_at = NOW();\n"
    )
    OUTPUT.write_text(sql, encoding="utf-8")
    print(f"Generated {len(patents)} patent/SW rows in {OUTPUT}")


if __name__ == "__main__":
    main()
