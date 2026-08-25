import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildPatentData,
  PATENT_CATEGORY_ORDER,
  PATENT_RAW,
  patentCategoryLabel,
  type PatentCategory,
} from "../patentsData";
import { TabPage } from "./TabPrimitives";

export function PatentsSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PatentCategory | "ALL">("ALL");

  const allItems = useMemo(() => buildPatentData(PATENT_RAW), []);
  const filterTabs: Array<{ key: PatentCategory | "ALL"; label: string }> = [
    { key: "ALL", label: "ALL" },
    { key: "INTERNATIONAL_REGISTERED", label: "국제 특허 등록" },
    { key: "INTERNATIONAL_FILED", label: "국제 특허 출원" },
    { key: "DOMESTIC_REGISTERED", label: "국내 특허 등록" },
    { key: "DOMESTIC_FILED", label: "국내 특허 출원" },
    { key: "SW_OUTPUT", label: "SW 성과물" },
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const byCategory = category === "ALL" || item.category === category;
      const byQuery =
        normalizedQuery === "" ||
        item.code.toLowerCase().includes(normalizedQuery) ||
        item.title.toLowerCase().includes(normalizedQuery);
      return byCategory && byQuery;
    });
  }, [allItems, category, normalizedQuery]);

  const counts = useMemo(() => {
    const base: Record<PatentCategory | "ALL", number> = {
      ALL: allItems.length,
      INTERNATIONAL_REGISTERED: 0,
      INTERNATIONAL_FILED: 0,
      DOMESTIC_REGISTERED: 0,
      DOMESTIC_FILED: 0,
      SW_OUTPUT: 0,
    };

    for (const item of allItems) base[item.category] += 1;
    return base;
  }, [allItems]);

  const sections = useMemo(() => {
    const grouped: Array<{ category: PatentCategory; label: string; items: typeof filtered }> = [];
    for (const cat of PATENT_CATEGORY_ORDER) {
      if (category !== "ALL" && category !== cat) continue;
      const items = filtered.filter((item) => item.category === cat);
      if (items.length === 0) continue;
      grouped.push({ category: cat, label: patentCategoryLabel(cat), items });
    }
    return grouped;
  }, [category, filtered]);

  const activeLabel = category === "ALL" ? "ALL" : patentCategoryLabel(category);

  const shortCategoryLabel = (value: PatentCategory) => {
    if (value === "INTERNATIONAL_REGISTERED") return "INTL REG";
    if (value === "INTERNATIONAL_FILED") return "INTL FILED";
    if (value === "DOMESTIC_REGISTERED") return "KR REG";
    if (value === "DOMESTIC_FILED") return "KR FILED";
    return "SW";
  };

  return (
    <TabPage pageKey="patents" title="PATENTS" subtitle="Patents and software research outputs." revealHeader={false}>
      <div className="sticky top-[86px] z-20 bg-white/95 pb-3 backdrop-blur">
        <div className="relative border-b border-[#d7e3f5] focus-within:border-[#1A5FB4] transition-colors">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a7e9f]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patent/SW code or title..."
            className="h-11 w-full border-0 bg-transparent pl-7 pr-6 text-sm text-[#0f2448] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6a7e9f] transition hover:text-[#1A5FB4]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max gap-5">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCategory(tab.key)}
                className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${category === tab.key
                  ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3 text-xs text-[#6a7e9f]">
          <span>{filtered.length} results</span>
          <span className="whitespace-nowrap">Filter: {activeLabel} ({counts[category]})</span>
        </div>
      </div>

      <div className="space-y-9 pt-2">
        {sections.map((section) => (
          <section key={section.category} className="space-y-2.5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-[#0f2448]">{section.label}</h2>
              <div className="h-px flex-1 bg-[#d7e3f5]" />
            </div>
            <div className="divide-y divide-[#e7edf5]">
              {section.items.map((item, index) => (
                <article key={item.id} className="grid gap-2 py-3.5 md:grid-cols-[48px_200px_1fr_auto] hover:bg-[#fbfdff] transition-colors">
                  <div className="text-xs font-semibold text-[#1A5FB4]">{String(index + 1).padStart(2, "0")}</div>
                  <code className="text-[12px] text-[#465b7c] leading-relaxed break-all">{item.code}</code>
                  <p className="text-[14px] leading-relaxed text-[#152b4c]">{item.title}</p>
                  <span className="self-start text-[10px] text-[#62779a]">{shortCategoryLabel(item.category)}</span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </TabPage>
  );
}
