export type TabKey =
  | "home"
  | "recruit"
  | "professor"
  | "people"
  | "alumni"
  | "publications"
  | "patents"
  | "projects"
  | "contact";

export const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "HOME" },
  { key: "recruit", label: "모집" },
  { key: "professor", label: "PROFESSOR" },
  { key: "people", label: "PEOPLE" },
  { key: "alumni", label: "ALUMNI" },
  { key: "publications", label: "PUBLICATIONS" },
  { key: "patents", label: "PATENTS" },
  { key: "projects", label: "PROJECTS" },
  { key: "contact", label: "CONTACT" },
];
