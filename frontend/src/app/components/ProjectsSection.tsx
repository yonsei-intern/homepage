import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { buildProjectData, PROJECT_RAW } from "../projectsData";
import { TabPage } from "./TabPrimitives";

export function ProjectsSection() {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("ALL");

  const allItems = useMemo(() => buildProjectData(PROJECT_RAW), []);
  const years = useMemo(
    () => [...new Set(allItems.map((item) => item.year))].sort((a, b) => Number(b) - Number(a)),
    [allItems],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const byYear = yearFilter === "ALL" || item.year === yearFilter;
      const byQuery =
        normalizedQuery === "" ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.organization.toLowerCase().includes(normalizedQuery);
      return byYear && byQuery;
    });
  }, [allItems, yearFilter, normalizedQuery]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { ALL: allItems.length };
    for (const year of years) base[year] = 0;
    for (const item of allItems) base[item.year] += 1;
    return base;
  }, [allItems, years]);

  const sections = useMemo(() => {
    if (yearFilter !== "ALL") {
      return [{ year: yearFilter, items: filtered.filter((item) => item.year === yearFilter) }];
    }
    return years
      .map((year) => ({ year, items: filtered.filter((item) => item.year === year) }))
      .filter((section) => section.items.length > 0);
  }, [filtered, yearFilter, years]);

  const activeLabel = yearFilter === "ALL" ? "ALL" : yearFilter;

  return (
    <TabPage pageKey="projects" title="PROJECTS" subtitle="Yearly research projects and sponsors." revealHeader={false}>
      <div className="sticky top-[86px] z-20 bg-white/95 pb-3 backdrop-blur">
        <div className="relative border-b border-[#d7e3f5] focus-within:border-[#1A5FB4] transition-colors">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a7e9f]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search project or sponsor..."
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
            <button
              onClick={() => setYearFilter("ALL")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${yearFilter === "ALL"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              ALL
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setYearFilter(year)}
                className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${yearFilter === year
                  ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3 text-xs text-[#6a7e9f]">
          <span>{filtered.length} results</span>
          <span className="whitespace-nowrap">Filter: {activeLabel} ({counts[yearFilter] ?? 0})</span>
        </div>
      </div>

      <div className="space-y-9 pt-2">
        {sections.map((section) => (
          <section key={section.year} className="space-y-2.5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-[#0f2448]">{section.year}</h2>
              <div className="h-px flex-1 bg-[#d7e3f5]" />
            </div>
            <div className="divide-y divide-[#e7edf5]">
              {section.items.map((item, index) => (
                <article key={item.id} className="grid gap-2 py-3.5 md:grid-cols-[48px_1fr_220px] hover:bg-[#fbfdff] transition-colors">
                  <div className="text-xs font-semibold text-[#1A5FB4]">{String(index + 1).padStart(2, "0")}</div>
                  <p className="text-[14px] leading-relaxed text-[#152b4c]">{item.title}</p>
                  <p className="text-[12px] leading-relaxed text-[#62779a]">{item.organization}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </TabPage>
  );
}
