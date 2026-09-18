import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { TabKey } from "../tabs";
import { ResearchSection } from "./ResearchSection";
import { PeopleSection } from "./PeopleSection";
import { ContactSection } from "./ContactSection";
import { useSiteImages } from "../hooks/useSiteImages";
import { useHomeResearchPapers } from "../hooks/useHomeResearchPapers";

type ResearchTeamKey = "ai_security" | "deepfake" | "vulnerability";

type ResearchTeam = {
  key: ResearchTeamKey;
  label: string;
  english: string;
  color: string;
  softColor: string;
  description: string;
  keywords: string[];
};

type NewsItem = {
  id: string;
  year: string;
  source: string;
  title: string;
  sub: string | null;
  linkUrl: string | null;
};

const RESEARCH_TEAMS: ResearchTeam[] = [
  {
    key: "ai_security",
    label: "AI 보안",
    english: "AI SECURITY",
    color: "#1A5FB4",
    softColor: "#f3f7ff",
    description:
      "시스템 자체의 안전성 확보를 위해 생성형 AI 기반 시스템에서의 정보 노출, 프롬프트 주입, 모델 탈옥 등 AI 고유의 취약점을 분석하고 방지하는 기술을 개발합니다.",
    keywords: ["ai", "llm", "model", "모델", "인공지능", "생성형", "프롬프트", "jailbreak", "탈옥", "fine-tuning", "membership"],
  },
  {
    key: "deepfake",
    label: "딥페이크",
    english: "DEEPFAKE",
    color: "#A16207",
    softColor: "#fff8f1",
    description:
      "AI가 만들어낸 위협에 대응하기 위해 다양한 플랫폼에서 유통되는 in-the-wild 딥페이크 콘텐츠에 대한 일반화된 탐지 모델을 연구합니다.",
    keywords: ["deepfake", "딥페이크", "fake", "synthetic", "media", "콘텐츠"],
  },
  {
    key: "vulnerability",
    label: "취약성 탐지",
    english: "VULNERABILITY",
    color: "#047857",
    softColor: "#f1fbf7",
    description:
      "퍼징, 심볼릭 실행, 정적·동적 분석 등 자동화된 보안 분석 방법에 AI 기술을 접목하여 코드, 시스템 로그, 네트워크 트래픽 상의 미확인 취약점을 탐지합니다.",
    keywords: ["취약", "vulnerab", "fuzz", "퍼징", "symbolic", "정적", "동적", "로그", "traffic", "트래픽", "사이버", "수사", "telegram", "텔레그램"],
  },
];

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: "fallback-ai-report",
    year: "2025",
    source: "보안뉴스",
    title: "[2025 AI 보안 솔루션 리포트] AI 보안 솔루션, 능동형 AI와 XAI로 진짜 AI가 되다",
    sub: null,
    linkUrl: "https://www.boannews.com/news/articleView.html?idxno=140730",
  },
  {
    id: "fallback-cyber-investigation",
    year: "2025",
    source: "베테랑경찰",
    title: "\"텔레그램 협력, 금단 영역 넘은 거죠\"…사이버 수사는 진화 중",
    sub: null,
    linkUrl: "https://n.news.naver.com/mnews/article/421/0008619418?sid=102",
  },
  {
    id: "fallback-kis-column",
    year: "2025",
    source: "KIS 칼럼",
    title: "[한국정보보호학회 칼럼] AI 모델 보안과 안전 그리고 신뢰",
    sub: null,
    linkUrl: "https://www.boannews.com/news/articleView.html?idxno=140284",
  },
  {
    id: "fallback-raid",
    year: "2025",
    source: "RAID",
    title: "Red-Teaming LLMs with Token Control Score: Efficient, Universal, and Transferable Jailbreaks",
    sub: "Research in Attacks, Intrusions, and Defenses · BK, 정보과학회 우수학술대회",
    linkUrl: null,
  },
];

const FALLBACK_HERO_IMAGES = ["/images/home/nebula.png"];
const HERO_IMAGE_KEYS = ["home_hero", "home_hero_2", "home_hero_3", "home_hero_4", "home_hero_5"];

function resolveNewsTeam(item: NewsItem) {
  const haystack = `${item.source} ${item.title} ${item.sub ?? ""}`.toLowerCase();
  return RESEARCH_TEAMS.find((team) =>
    team.keywords.some((keyword) => haystack.includes(keyword.toLowerCase())),
  ) ?? RESEARCH_TEAMS[0];
}

function HeroLatestNews({ onNavigate }: { onNavigate: (tab: TabKey) => void }) {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS.slice(0, 3));

  useEffect(() => {
    const controller = new AbortController();

    const loadNews = async () => {
      try {
        const response = await fetch("/api/latest-news", { signal: controller.signal });
        if (!response.ok) return;
        const rows: NewsItem[] = await response.json();
        if (!controller.signal.aborted && rows.length > 0) setNews(rows.slice(0, 3));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setNews(FALLBACK_NEWS.slice(0, 3));
        }
      }
    };

    loadNews();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-0 bg-white px-6 pb-5 pt-5 md:px-[52px] md:pt-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-extrabold tracking-[0.06em] text-[#0d1b4b] uppercase">
          Latest News
        </h3>
        <button
          type="button"
          onClick={() => onNavigate("publications")}
          className="cursor-pointer rounded-full bg-[#1c3a93] px-4 py-2.5 text-[10px] font-bold text-white shadow-[0_3px_8px_rgba(28,58,147,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c3a93]"
        >
          VIEW MORE →
        </button>
      </div>

      <div className="mt-5 h-px w-full rounded-full bg-[#dce4f0]" />

      <div className="mt-5 space-y-2.5">
        {news.map((item) => {
          const team = resolveNewsTeam(item);
          const content = (
            <>
              <div className="flex flex-wrap items-center gap-2 text-[11px] leading-none">
                <span className="rounded-full px-2.5 py-1.5 text-[9px] font-bold text-white" style={{ backgroundColor: team.color }}>
                  {team.label}
                </span>
                <span className="font-semibold text-[#8090ad]">{item.year}</span>
                <span className="font-semibold text-[#8090ad]">{item.source}</span>
              </div>
              <div className="mt-2.5 text-[13px] leading-[1.55] font-bold text-[#0d1b4b] line-clamp-1">
                  <span className="decoration-[#1c3a93]/35 underline-offset-4 group-hover:underline">
                    {item.title}
                  </span>
              </div>
              {item.linkUrl ? (
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[18px] font-semibold leading-none text-[#1c3a93]/45 transition-all duration-200 group-hover:right-3.5 group-hover:text-[#1c3a93]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              ) : null}
            </>
          );

          const className =
            "group relative block cursor-pointer rounded-xl py-3.5 pl-4 pr-12 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(13,27,75,0.07)]";
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
  const siteImages = useSiteImages();
  const heroImages = HERO_IMAGE_KEYS.map((key) => siteImages[key]).filter(
    (image): image is string => Boolean(image),
  );
  const carouselImages = heroImages.length > 0 ? heroImages : FALLBACK_HERO_IMAGES;
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const researchPapers = useHomeResearchPapers();

  useEffect(() => {
    if (carouselImages.length <= 1) {
      setActiveHeroImage(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % carouselImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [carouselImages.length]);

  const currentHeroImage = carouselImages[activeHeroImage] ?? carouselImages[0];

  return (
    <motion.div
      key="home-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
    >
      {currentHeroImage ? (
        <div
          className="pointer-events-none fixed right-0 top-12 z-30 hidden h-4 overflow-hidden lg:left-[540px] xl:left-[650px] lg:block"
          aria-hidden="true"
        >
          <img src={currentHeroImage} alt="" className="h-[220px] w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(5,12,40,0.14)_0%,rgba(5,12,40,0.58)_48%,rgba(5,12,40,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[#0f1b4b]/10" />
        </div>
      ) : null}
      <section className="snap-start relative h-full min-h-[640px] bg-white overflow-hidden">
        <div className="relative z-10 grid min-h-[calc(100%-48px)] grid-cols-1 lg:h-[calc(100%-48px)] lg:grid-cols-[minmax(540px,650px)_1fr]">
          <div className="flex flex-col justify-center overflow-hidden bg-white px-6 py-10 md:px-12 lg:translate-y-5 lg:px-[76px] lg:py-8">
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

          <div className="flex min-h-0 flex-col overflow-hidden bg-white">
            <div className="relative h-[clamp(198px,30vh,220px)] shrink-0 overflow-hidden rounded-bl-xl bg-[#0f1b4b]">
              {currentHeroImage ? (
                <>
                  <motion.img
                    key={currentHeroImage}
                    src={currentHeroImage}
                    alt="AI Security Lab"
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(5,12,40,0.14)_0%,rgba(5,12,40,0.58)_48%,rgba(5,12,40,0.96)_100%)]" />
                  <div className="absolute inset-0 bg-[#0f1b4b]/10" />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-3xl md:text-5xl font-semibold tracking-[0.14em] text-white/45">TBD</span>
                </div>
              )}
              {carouselImages.length > 1 ? (
                <div className="absolute inset-x-0 bottom-7 flex justify-center gap-2.5">
                  {carouselImages.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setActiveHeroImage(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === activeHeroImage ? "bg-white" : "bg-white/35"
                      }`}
                      aria-label={`Show hero image ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

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
