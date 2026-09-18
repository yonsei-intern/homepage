import { useEffect, useState } from "react";
import type { NewsItem } from "../news";

type UseLatestNewsOptions = {
  limit?: number;
  fallback?: NewsItem[];
  errorMessage?: string;
};

const EMPTY_NEWS: NewsItem[] = [];

function applyLimit(news: NewsItem[], limit?: number) {
  return typeof limit === "number" ? news.slice(0, limit) : news;
}

export function useLatestNews({
  limit,
  fallback = EMPTY_NEWS,
  errorMessage = "뉴스 목록을 불러오지 못했습니다.",
}: UseLatestNewsOptions = {}) {
  const [news, setNews] = useState<NewsItem[]>(() => applyLimit(fallback, limit));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadNews = async () => {
      try {
        const response = await fetch("/api/latest-news", { signal: controller.signal });
        if (!response.ok) throw new Error(errorMessage);
        const rows = await response.json() as NewsItem[];
        const nextNews = applyLimit(rows, limit);
        if (!controller.signal.aborted && (nextNews.length > 0 || fallback.length === 0)) {
          setNews(nextNews);
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        if (!controller.signal.aborted) {
          setError(errorMessage);
          setNews(applyLimit(fallback, limit));
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadNews();
    return () => controller.abort();
  }, [errorMessage, fallback, limit]);

  return { news, loading, error };
}
