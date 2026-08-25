import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildPublicationData,
  PUBLICATION_RAW,
  type PublicationCategory,
} from "../publicationsData";
import { TabPage } from "./TabPrimitives";

export function PublicationsSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PublicationCategory | "ALL">("ALL");

  const allItems = useMemo(() => buildPublicationData(PUBLICATION_RAW), []);
  const filterTabs: Array<{ key: PublicationCategory | "ALL"; label: string }> = [
    { key: "ALL", label: "ALL" },
    { key: "INTERNATIONAL JOURNALS (SCI/SCIE)", label: "INTL JOURNALS" },
    { key: "INTERNATIONAL CONFERENCES", label: "INTL CONFERENCES" },
    { key: "DOMESTIC JOURNALS", label: "DOMESTIC JOURNALS" },
    { key: "DOMESTIC CONFERENCES", label: "DOMESTIC CONFERENCES" },
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const byCategory = category === "ALL" || item.category === category;
      const byQuery = normalizedQuery === "" || item.text.toLowerCase().includes(normalizedQuery);
      return byCategory && byQuery;
    });
  }, [allItems, category, normalizedQuery]);

  const counts = useMemo(() => {
    const base: Record<PublicationCategory | "ALL", number> = {
      ALL: allItems.length,
      "INTERNATIONAL JOURNALS (SCI/SCIE)": 0,
      "INTERNATIONAL CONFERENCES": 0,
      "DOMESTIC JOURNALS": 0,
      "DOMESTIC CONFERENCES": 0,
    };

    for (const item of allItems) {
      base[item.category] += 1;
    }

    return base;
  }, [allItems]);

  const years = useMemo(
    () => [...new Set(filtered.map((item) => item.year))].sort((a, b) => Number(b) - Number(a)),
    [filtered],
  );
  const activeLabel = filterTabs.find((tab) => tab.key === category)?.label ?? "ALL";
  const categoryBadgeText = (value: PublicationCategory) => {
    if (value === "INTERNATIONAL JOURNALS (SCI/SCIE)") return "INTL JOURNAL";
    if (value === "INTERNATIONAL CONFERENCES") return "INTL CONF";
    if (value === "DOMESTIC JOURNALS") return "DOMESTIC JOURNAL";
    return "DOMESTIC CONF";
  };

  return (
    <TabPage pageKey="publications" title="PUBLICATIONS" subtitle="Indexed by year with category filters and keyword search." revealHeader={false}>
      <div className="sticky top-[86px] z-20 bg-white/95 pb-3 backdrop-blur">
        <div className="relative border-b border-[#d7e3f5] focus-within:border-[#1A5FB4] transition-colors">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a7e9f]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications, author, venue, keyword..."
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

      <div className="space-y-7 pt-2">
        {years.map((year) => {
          const yearItems = filtered.filter((item) => item.year === year);
          return (
            <section key={year} className="space-y-2.5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#0f2448]">{year}</h2>
                <div className="h-px flex-1 bg-[#d7e3f5]" />
              </div>
              <div className="divide-y divide-[#e7edf5]">
                {yearItems.map((item, index) => (
                  <article key={item.id} id={item.id} className="grid gap-2 py-3.5 md:grid-cols-[48px_1fr_auto] hover:bg-[#fbfdff] transition-colors">
                    <div className="text-xs font-semibold text-[#1A5FB4]">{String(index + 1).padStart(2, "0")}</div>
                    <p className="text-[14px] leading-relaxed text-[#152b4c]">{item.text}</p>
                    <span className="self-start text-[10px] text-[#62779a]">
                      {categoryBadgeText(item.category)}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </TabPage>
  );
}
