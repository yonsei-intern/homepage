import { useLatestNews } from "../hooks/useLatestNews";
import { resolveNewsTeam } from "../news";

export function LatestNewsSection({ onBack }: { onBack: () => void }) {
  const { news, loading, error } = useLatestNews();

  return (
    <section key="latest-news" className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-semibold text-[#1A5FB4] transition-colors hover:text-[#0d1b4b]"
      >
        ← 뒤로가기
      </button>

      <div className="space-y-1.5">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">LATEST NEWS</h1>
        <p className="text-gray-500 text-base">AI 보안, 딥페이크, 취약성 탐지 분야의 최신 동향과 주요 이슈를 확인할 수 있습니다.</p>
      </div>

      {loading ? <p className="text-[#6a7e9f]">Loading...</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {!loading && !error && news.length === 0 ? (
        <p className="text-[#6a7e9f]">등록된 소식이 없습니다.</p>
      ) : null}

      {!loading && !error && news.length > 0 ? (
        <div className="border-y border-[#d7e3f5] bg-white">
          {news.map((item) => {
            const team = resolveNewsTeam(item);
            const content = (
              <>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold leading-none text-white" style={{ backgroundColor: team.color }}>
                    {team.label}
                  </span>
                </div>
                <div className="text-xs font-semibold leading-6 text-[#8090ad]">{item.year}</div>
                <div className="truncate text-xs font-semibold leading-6 text-[#8090ad]">{item.source}</div>
                <div className="min-w-0 pr-5">
                  <div className="truncate text-[14px] font-bold leading-relaxed text-[#0d1b4b]">
                    <span>{item.title}</span>
                    {item.sub ? <span className="font-medium text-[#687894]"> · {item.sub}</span> : null}
                  </div>
                </div>
                <span
                  className="self-center justify-self-end text-lg font-semibold leading-none text-[#1c3a93]/45"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </>
            );
            const className =
              "grid gap-3 border-b border-[#e7edf5] px-4 py-4 transition-colors last:border-b-0 hover:bg-[#f7faff] md:grid-cols-[96px_52px_112px_minmax(0,1fr)_24px] md:items-center";

            return item.linkUrl ? (
              <a key={item.id} href={item.linkUrl} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <article key={item.id} className={className}>
                {content}
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
