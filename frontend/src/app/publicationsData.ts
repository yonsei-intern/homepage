import rawText from "./publications.raw.txt?raw";

export type PublicationCategory =
  | "INTERNATIONAL JOURNALS (SCI/SCIE)"
  | "INTERNATIONAL CONFERENCES"
  | "DOMESTIC JOURNALS"
  | "DOMESTIC CONFERENCES";

export type PublicationItem = {
  id: string;
  year: string;
  text: string;
  category: PublicationCategory;
};

export const PUBLICATION_CATEGORIES: PublicationCategory[] = [
  "INTERNATIONAL JOURNALS (SCI/SCIE)",
  "INTERNATIONAL CONFERENCES",
  "DOMESTIC JOURNALS",
  "DOMESTIC CONFERENCES",
];

export const PUBLICATION_RAW = rawText;

const DOMESTIC_CONFERENCE_KEYWORDS = [
  "한국정보보호학회",
  "동계학술대회",
  "하계학술대회",
  "춘계학술대회",
  "추계학술대회",
  "추계공동학술대회",
  "학술발표대회",
  "종합학술대회",
  "CISC",
  "한국컴퓨터종합학술대회",
  "한국군사과학기술학회",
  "한국해군과학기술학회",
];

const DOMESTIC_JOURNAL_KEYWORDS = [
  "정보보호학회논문지",
  "정보보호학회지",
  "정보과학회논문지",
  "정보과학회지",
  "한국해군학회지",
  "한국인터넷정보학회논문지",
  "한국인터넷정보학회",
  "전자공학회지",
  "국군방첩사령부 국방과 보안 학술지",
];

const INTERNATIONAL_JOURNAL_KEYWORDS = [
  "IEEE",
  "Elsevier",
  "Springer",
  "Transactions",
  "Journal",
  "Access",
  "Neurocomputing",
  "Information Sciences",
  "Sensors",
  "Computers & Security",
  "International Journal",
  "EURASIP",
  "INPRA",
];

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

export function classifyPublication(text: string): PublicationCategory {
  if (includesAny(text, DOMESTIC_CONFERENCE_KEYWORDS)) return "DOMESTIC CONFERENCES";
  if (includesAny(text, DOMESTIC_JOURNAL_KEYWORDS)) return "DOMESTIC JOURNALS";
  if (includesAny(text, INTERNATIONAL_JOURNAL_KEYWORDS)) return "INTERNATIONAL JOURNALS (SCI/SCIE)";
  return "INTERNATIONAL CONFERENCES";
}

export function buildPublicationData(raw: string): PublicationItem[] {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let year = "";
  const items: PublicationItem[] = [];

  for (const line of lines) {
    if (/^\d{4}$/.test(line)) {
      year = line;
      continue;
    }

    const text = line.replace(/^\d+\.\s*/, "").trim();
    if (!text || !year) continue;

    items.push({
      id: `pub-${year}-${items.length + 1}`,
      year,
      text,
      category: classifyPublication(text),
    });
  }

  return items;
}

