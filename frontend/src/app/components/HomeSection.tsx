import { motion } from "motion/react";
import type { TabKey } from "../tabs";
import { FALLBACK_NEWS, HOME_NEWS_LIMIT, RESEARCH_TEAMS, resolveNewsTeam } from "../news";
import { useLatestNews } from "../hooks/useLatestNews";
import { ResearchSection } from "./ResearchSection";
import { PeopleSection } from "./PeopleSection";
import { ContactSection } from "./ContactSection";
import { useHomeResearchPapers } from "../hooks/useHomeResearchPapers";

function HeroLatestNews({ onNavigate }: { onNavigate: (tab: TabKey) => void }) {
  const { news } = useLatestNews({ limit: HOME_NEWS_LIMIT, fallback: FALLBACK_NEWS });

  return (
    <div className="flex h-full min-h-0 flex-col bg-white px-6 pb-6 pt-12 md:px-[52px] md:pt-16 lg:pt-[4.5rem]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-extrabold tracking-[0.06em] text-[#0d1b4b] uppercase">
          Latest News
        </h3>
        <button
          type="button"
          onClick={() => onNavigate("news")}
          className="cursor-pointer rounded-full bg-[#1c3a93] px-4 py-2.5 text-[10px] font-bold text-white shadow-[0_3px_8px_rgba(28,58,147,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c3a93]"
        >
          VIEW MORE →
        </button>
      </div>

      <div className="mt-3 h-px w-full rounded-full bg-[#dce4f0]" />

      <div className="mt-3 min-h-0 space-y-2.5 overflow-hidden">
        {news.map((item) => {
          const team = resolveNewsTeam(item);
          const content = (
            <>
              <div className="flex flex-wrap items-center gap-2 text-[10px] leading-none">
                <span className="rounded-full px-2.5 py-1 text-[8.5px] font-bold text-white" style={{ backgroundColor: team.color }}>
                  {team.label}
                </span>
                <span className="font-semibold text-[#8090ad]">{item.year}</span>
                <span className="font-semibold text-[#8090ad]">{item.source}</span>
              </div>
              <div className="mt-1.5 text-[12.5px] leading-[1.35] font-bold text-[#0d1b4b] line-clamp-1">
                  <span className="decoration-[#1c3a93]/35 underline-offset-4 group-hover:underline">
                    {item.title}
                  </span>
              </div>
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[17px] font-semibold leading-none text-[#1c3a93]/45 transition-all duration-200 group-hover:right-3.5 group-hover:text-[#1c3a93]"
                aria-hidden="true"
              >
                ↗
              </span>
            </>
          );

          const className =
            "group relative block cursor-pointer rounded-lg py-2 pl-4 pr-12 transition-transform duration-200 hover:-translate-y-0.5";
          const style = { backgroundColor: team.softColor };

          return item.linkUrl ? (
            <a key={item.id} href={item.linkUrl} target="_blank" rel="noopener noreferrer" className={className} style={style}>
              {content}
            </a>
          ) : (
            <article key={item.id} className={className} style={style}>
              {content}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function HomeSection({
  onNavigate,
}: {
  onNavigate: (tab: TabKey) => void;
}) {
  const researchPapers = useHomeResearchPapers();

  return (
    <motion.div
      key="home-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
    >
      <section className="snap-start relative h-full min-h-[640px] bg-white overflow-hidden">
        <div className="relative z-10 grid min-h-[calc(100%-48px)] grid-cols-1 lg:h-[calc(100%-48px)] lg:grid-cols-[minmax(540px,650px)_1fr]">
          <div className="flex flex-col justify-center overflow-hidden bg-white px-6 py-10 md:px-12 lg:translate-y-5 lg:py-8 lg:pl-[92px] lg:pr-[60px]">
            <div className="max-w-[508px]">
              <h1 className="text-[3.05rem] font-extrabold leading-[0.98] tracking-tight text-[#0d1b4b] md:text-[3.78rem] md:whitespace-nowrap">
              AI Security LAB
              </h1>
              <h2 className="mt-4 text-[1.3rem] font-extrabold leading-snug tracking-[-0.01em] text-[#1c3a93] md:text-[1.4rem]">
                연세대학교 정보대학원
                <br />
                정보보호&AI보안연구실
              </h2>
              <p className="mt-5 text-[14px] leading-[1.78] text-[#6b7a9a] break-keep">
                권태경 교수님 지도하에 저희 정보보호/AI보안 연구실은 인공지능 기술의 급속한 발전이 가져온 새로운 보안 과제에 대응하기 위해
                AI 기반 보안 위협 분석 및 대응 기술을 중심으로 다양한 주제를 연구하고 있습니다.
              </p>

              <div className="mt-6 h-px w-full rounded-full bg-[#e5ebf2]" />

              <div className="mt-5">
                <h3 className="text-[16px] font-extrabold tracking-[0.08em] text-[#0d1b4b] uppercase">
                  Research Areas
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {RESEARCH_TEAMS.map((team) => (
                    <article key={team.key} className="min-h-[182px] rounded-lg px-4 py-4" style={{ backgroundColor: team.softColor }}>
                      <h4 className="text-[14px] font-extrabold tracking-[-0.01em]" style={{ color: team.color }}>
                        {team.label}
                      </h4>
                      <p className="mt-2.5 text-[10.5px] leading-[1.8] text-[#4a5a80] break-keep">
                        {team.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 overflow-hidden bg-white">
            <HeroLatestNews onNavigate={onNavigate} />
          </div>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-4 hidden items-center justify-center text-[#9aa7bd] md:flex"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="text-base leading-none">↓</span>
        </motion.div>
      </section>

      <ResearchSection
        number="01"
        category="AI SECURITY"
        title="AI 보안"
        description={[
          "생성형 AI 기반 시스템의 정보 유출, 프롬프트 주입, 모델 오염 등 AI 고유 취약점을 분석합니다.",
          "실전 공격 시나리오 기반으로 방어 기법을 설계하고 검증합니다.",
        ]}
        papers={researchPapers.ai_security}
        onLearnMore={() => onNavigate("publications")}
      />

      <ResearchSection
        number="02"
        category="DEEPFAKE DETECTION"
        title="딥페이크 탐지"
        description={[
          "in-the-wild 딥페이크 콘텐츠를 기반으로 범용 성능을 갖춘 탐지 모델을 연구합니다.",
          "압축, 노이즈, 다양한 환경 변화에서도 안정적으로 동작하도록 고도화합니다.",
        ]}
        papers={researchPapers.deepfake_detection}
        onLearnMore={() => onNavigate("publications")}
      />

      <ResearchSection
        number="03"
        category="VULNERABILITY DETECTION"
        title="취약점 탐지"
        description={[
          "퍼징, 심볼릭 실행, 정적/동적 분석 기법에 AI를 접목해 취약점 탐지를 자동화합니다.",
          "코드, 테스트 로그, 트레이스 분석을 통해 보안 탐지 정확성을 높입니다.",
        ]}
        papers={researchPapers.vulnerability_detection}
        onLearnMore={() => onNavigate("publications")}
      />

      <div className="snap-start">
        <PeopleSection />
      </div>
      <div className="snap-start">
        <ContactSection />
      </div>
    </motion.div>
  );
}
