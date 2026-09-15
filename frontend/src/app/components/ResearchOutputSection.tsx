import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type NewsItem = {
  id: string;
  year: string;
  source: string;
  title: string;
  sub: string | null;
  linkUrl: string | null;
};

export function ResearchOutputSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadNews = async () => {
      try {
        const response = await fetch("/api/latest-news", { signal: controller.signal });
        if (!response.ok) throw new Error("소식 목록을 불러오지 못했습니다.");
        setNews(await response.json());
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError("소식 목록을 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadNews();
    return () => controller.abort();
  }, []);

  const rowContent = (item: NewsItem) => (
    <>
      <div className="text-sm md:text-base font-semibold text-[#1b1f24]">{item.year}</div>
      <div className="text-xs md:text-sm font-semibold text-[#2f58ff] self-start">{item.source}</div>
      <div>
        <div className="text-sm md:text-base leading-snug font-medium text-[#1b1f24]">
          {item.title}
          {item.linkUrl ? <span className="ml-1.5 text-[#1A5FB4]" aria-hidden="true">↗</span> : null}
        </div>
        {item.sub ? <div className="mt-1 text-xs md:text-sm text-gray-500">{item.sub}</div> : null}
      </div>
    </>
  );

  const rowClassName =
    "grid grid-cols-[62px_84px_1fr] md:grid-cols-[76px_104px_1fr] gap-3 md:gap-5 px-3 md:px-5 py-3.5 md:py-4.5 border-b border-gray-100 last:border-b-0";

  return (
    <section
      id="publications"
      ref={ref}
      className="relative min-h-screen flex items-center bg-[#fafbff] px-6 py-24 pb-24 overflow-x-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-7"
        >
          <div className="text-[11px] tracking-[0.18em] text-[#1A5FB4] uppercase mb-1">Latest News</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a]">Latest News</h2>
        </motion.div>

        {loading ? <p className="text-[#6a7e9f]">Loading...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}
        {!loading && !error && news.length === 0 ? (
          <p className="text-[#6a7e9f]">등록된 소식이 없습니다.</p>
        ) : null}

        {!loading && !error && news.length > 0 ? (
          <div className="border-t border-b border-gray-200 bg-white">
            {news.map((item, index) =>
              item.linkUrl ? (
                <motion.a
                  key={item.id}
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.05 + index * 0.06 }}
                  className={`${rowClassName} transition-colors hover:bg-[#f6f9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1A5FB4]`}
                >
                  {rowContent(item)}
                </motion.a>
              ) : (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.05 + index * 0.06 }}
                  className={rowClassName}
                >
                  {rowContent(item)}
                </motion.article>
              ),
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
