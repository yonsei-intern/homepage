import { useEffect, useState } from "react";

export type HomeResearchSectionKey =
  | "ai_security"
  | "deepfake_detection"
  | "vulnerability_detection";

export type HomeResearchPaper = {
  id: number;
  title: string;
  venue: string;
};

type ApiHomeResearchPaper = HomeResearchPaper & {
  sectionKey: HomeResearchSectionKey;
};

const emptyPapers: Record<HomeResearchSectionKey, HomeResearchPaper[]> = {
  ai_security: [],
  deepfake_detection: [],
  vulnerability_detection: [],
};

export function useHomeResearchPapers() {
  const [papers, setPapers] = useState(emptyPapers);

  useEffect(() => {
    const controller = new AbortController();

    const loadPapers = async () => {
      try {
        const response = await fetch("/api/home-research-papers", { signal: controller.signal });
        if (!response.ok) return;
        const rows = await response.json() as ApiHomeResearchPaper[];
        const grouped: Record<HomeResearchSectionKey, HomeResearchPaper[]> = {
          ai_security: [],
          deepfake_detection: [],
          vulnerability_detection: [],
        };
        for (const { sectionKey, id, title, venue } of rows) {
          if (sectionKey in grouped) grouped[sectionKey].push({ id, title, venue });
        }
        setPapers(grouped);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setPapers(emptyPapers);
        }
      }
    };

    loadPapers();
    return () => controller.abort();
  }, []);

  return papers;
}
