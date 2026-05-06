import { motion, useInView } from "motion/react";
import { useRef } from "react";

type NewsItem = {
  year: string;
  source: string;
  title: string;
  sub?: string;
};

const LATEST_NEWS: NewsItem[] = [
  {
    year: "2025",
    source: "보안뉴스",
    title: "🔗 [2025 AI 보안 솔루션 리포트] AI 보안 솔루션, 능동형 AI와 XAI로 진짜 AI가 되다",
  },
  {
    year: "2025",
    source: "베테랑경찰",
    title: "🔗 \"텔레그램 협력, 금단 영역 넘은 거죠\"…사이버 수사는 진화 중",
  },
  {
    year: "2025",
    source: "KIS 칼럼",
    title: "🔗 [한국정보보호학회 칼럼] AI 모델 보안과 안전 그리고 신뢰",
  },
  {
    year: "2025",
    source: "IEEE TIFS",
    title: "Amplifying Training Data Exposure through Fine-Tuning with Pseudo-Labeled Memberships",
    sub: "IEEE Transactions on Information Forensics and Security · Impact Factor: 8",
  },
  {
    year: "2025",
    source: "RAID",
    title: "Red-Teaming LLMs with Token Control Score: Efficient, Universal, and Transferable Jailbreaks",
    sub: "Research in Attacks, Intrusions, and Defenses · BK, 정보과학회 우수학술대회",
  },
];

export function ResearchOutputSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

        <div className="border-t border-b border-gray-200 bg-white">
          {LATEST_NEWS.map((item, index) => (
            <motion.article
              key={`${item.source}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.05 + index * 0.06 }}
              className="grid grid-cols-[62px_84px_1fr] md:grid-cols-[76px_104px_1fr] gap-3 md:gap-5 px-3 md:px-5 py-3.5 md:py-4.5 border-b border-gray-100 last:border-b-0"
            >
              <div className="text-sm md:text-base font-semibold text-[#1b1f24]">{item.year}</div>
              <div className="text-xs md:text-sm font-semibold text-[#2f58ff] self-start">{item.source}</div>
              <div>
                <div className="text-sm md:text-base leading-snug font-medium text-[#1b1f24]">{item.title}</div>
                {item.sub ? <div className="mt-1 text-xs md:text-sm text-gray-500">{item.sub}</div> : null}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-5"
        >
          <button type="button" className="inline-flex items-center gap-2 text-[#1A5FB4] hover:text-[#164a94] text-sm font-medium">
            더 보러가기 →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
