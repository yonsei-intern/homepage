import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import { Search, X } from "lucide-react";
import { JailbreakChatPage } from "./components/JailbreakChatPage";
import {
  buildPublicationData,
  PUBLICATION_RAW,
  type PublicationCategory,
} from "./publicationsData";
import {
  buildPatentData,
  PATENT_CATEGORY_ORDER,
  PATENT_RAW,
  patentCategoryLabel,
  type PatentCategory,
} from "./patentsData";
import { buildProjectData, PROJECT_RAW } from "./projectsData";

type TabKey =
  | "home"
  | "recruit"
  | "professor"
  | "people"
  | "alumni"
  | "publications"
  | "patents"
  | "projects"
  | "contact";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "HOME" },
  { key: "recruit", label: "모집" },
  { key: "professor", label: "PROFESSOR" },
  { key: "people", label: "PEOPLE" },
  { key: "alumni", label: "ALUMNI" },
  { key: "publications", label: "PUBLICATIONS" },
  { key: "patents", label: "PATENTS" },
  { key: "projects", label: "PROJECTS" },
  { key: "contact", label: "CONTACT" },
];

// ??? Shared Primitives ????????????????????????????????????????????????????????

function TabPage({
  pageKey,
  title,
  subtitle,
  revealHeader = true,
  children,
}: {
  pageKey: string;
  title?: string;
  subtitle?: string;
  revealHeader?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      key={pageKey}
      className="space-y-8"
    >
      {(title || subtitle) && (
        <div className="space-y-1.5">
          {title && revealHeader ? (
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]"
            >
              {title}
            </motion.h1>
          ) : title ? (
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">{title}</h1>
          ) : null}
          {subtitle && revealHeader ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-gray-500 text-base"
            >
              {subtitle}
            </motion.p>
          ) : subtitle ? (
            <p className="text-gray-500 text-base">{subtitle}</p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7 space-y-3">
      <h2 className="text-base font-semibold text-[#1A5FB4]">{title}</h2>
      {children}
    </div>
  );
}

// ??? Home ?????????????????????????????????????????????????????????????????????

function HomeSection({
  onNavigate,
  onTry,
}: {
  onNavigate: (tab: TabKey) => void;
  onTry: () => void;
}) {
  const researchCards = [
    {
      number: "01",
      category: "AI SECURITY",
      title: "AI보안",
      lines: [
        "생성형 AI 기반 시스템의 정보 유출, 프롬프트 주입, 모델 오염 등 AI 고유 취약점을 분석합니다.",
        "실전 공격 시나리오 기반으로 방어 기법을 설계하고 검증합니다.",
      ],
      showTryButton: true,
    },
    {
      number: "02",
      category: "DEEPFAKE DETECTION",
      title: "딥페이크탐지",
      lines: [
        "in-the-wild 딥페이크 콘텐츠를 기반으로 범용 성능을 갖춘 탐지 모델을 연구합니다.",
        "압축, 노이즈, 다양한 환경 변화에서도 안정적으로 동작하도록 고도화합니다.",
      ],
      showTryButton: false,
    },
    {
      number: "03",
      category: "VULNERABILITY DETECTION",
      title: "취약점탐지",
      lines: [
        "퍼징, 심볼릭 실행, 정적/동적 분석 기법에 AI를 접목해 취약점 탐지를 자동화합니다.",
        "코드, 테스트 로그, 트레이스 분석을 통해 보안 탐지 정확성을 높입니다.",
      ],
      showTryButton: false,
    },
  ] as const;

  const people = [
    "LEOHYUN PARK",
    "YOONSIK KIM",
    "EUNBI HWANG",
    "BYUNGCHUL KIM",
    "SANGSOO HAN",
  ] as const;

  const publicationItems = [
    {
      title: "Enhancing Differential Fuzzing of Cryptographic Libraries",
      meta: "Jeewoo Jung, Taekyoung Kwon · ICISC · 2024",
    },
    {
      title: "Generating Adversarial Training Data for Model Robustness",
      meta: "Leo Hyun Park, Jaeuk Kim, Myung Gyo Oh, Jaewoo Park, Taekyoung Kwon · AISec Workshop · 2024",
    },
    {
      title: "Fuzzing JavaScript Interpreters in Practical Environments",
      meta: "Jueon Eom, Seyeon Jeong, Taekyoung Kwon · ISSTA · 2024",
    },
    {
      title: "BoKASAN: Binary-only Kernel Address Sanitizer",
      meta: "Mingi Cho, Dohyeon An, Hoyong Jin, Taekyoung Kwon · USENIX Security · 2023",
    },
    {
      title: "Grad Neurocomputing for Secure Learning Systems",
      meta: "Leo Hyun Park, Soochang Chung, Jaeuk Kim, Taekyoung Kwon · Elsevier Neurocomputing · 2023",
    },
  ] as const;

  const patentItems = [
    {
      title: "Method for Differential Fuzzing of Cryptographic Modules",
      meta: "KR Patent · 2025 · Inventors: Jeewoo Jung, Taekyoung Kwon",
    },
    {
      title: "Prompt Injection Detection and Risk Scoring Pipeline",
      meta: "KR Patent · 2025 · Inventors: Leo Hyun Park, Jaeuk Kim, Taekyoung Kwon",
    },
    {
      title: "Deepfake Trace Pattern-based Integrity Verification",
      meta: "KR Patent · 2024 · Inventors: Jueon Eom, Seyeon Jeong, Taekyoung Kwon",
    },
    {
      title: "Kernel-level Memory Corruption Detection Technique",
      meta: "KR Patent · 2024 · Inventors: Mingi Cho, Dohyeon An, Taekyoung Kwon",
    },
    {
      title: "Secure Training Workflow for Generative Models",
      meta: "KR Patent · 2023 · Inventors: Leo Hyun Park, Soochang Chung, Taekyoung Kwon",
    },
  ] as const;

  return (
    <div className="w-full overflow-x-hidden bg-[#f2f3f5] text-[#0f2448]">
      <section className="bg-[#f2f3f5]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div className="min-h-[260px] md:min-h-[520px] bg-[#cfcfd1] flex items-center justify-center">
            <span className="text-[32px] md:text-[36px] lg:text-[40px] font-semibold tracking-[0.14em] text-[#acb4c0]">TBD</span>
          </div>
          <div className="flex items-center">
            <div className="w-full max-w-[680px] px-6 md:px-8 xl:px-10 py-12 md:py-16">
              <p className="text-[13px] md:text-[13px] lg:text-[14px] font-semibold tracking-[0.01em] text-[#5b84da]">YONSEI UNIVERSITY</p>
              <h1 className="mt-4 md:mt-5 text-[36px] md:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.02em] text-[#111a34] leading-[1.05]">
                AI Security LAB
              </h1>
              <h2 className="mt-6 text-[20px] md:text-[22px] lg:text-[24px] font-bold leading-[1.3] text-[#304766]">
                연세대학교 정보대학원
                <br />
                정보보호&AI보안연구실
              </h2>
              <p className="mt-6 text-[14px] md:text-[15px] lg:text-[16px] leading-[1.75] text-[#596c89]">
                권태경 교수님 지도하에 저희 정보보호/AI보안 연구실은 인공지능 기술의 급속한 발전이 가져온 새로운 보안 과제에 대응하기 위해
                AI 기반 보안 위협 분석 및 대응 기술을 중심으로 다양한 주제를 연구하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 md:px-8 xl:px-10 pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-10">
          {researchCards.map((card) => (
            <article key={card.number} className="h-full flex flex-col gap-4">
              <div className="text-[52px] md:text-[56px] leading-none font-extrabold text-[#e5e8ed]">{card.number}</div>
              <div className="text-[11px] tracking-[0.19em] font-semibold text-[#5b84da] uppercase">{card.category}</div>
              <h3 className="text-[30px] md:text-[32px] lg:text-[36px] leading-[1.1] font-black text-[#0d1220]">{card.title}</h3>
              <div className="space-y-1.5 md:space-y-2">
                {card.lines.map((line) => (
                  <p key={line} className="text-[13px] md:text-[13px] lg:text-[14px] leading-[1.72] text-[#586a86]">
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-2.5 pt-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => onNavigate("publications")}
                  className="border border-[#ccd6e7] bg-[#f2f3f5] px-3.5 py-1.5 text-[13px] md:text-[13px] font-medium text-[#3a63b1]"
                >
                  더 알아보기 →
                </button>
                {card.showTryButton ? (
                  <button
                    type="button"
                    onClick={onTry}
                    className="border border-[#2d5cb6] bg-[#2d5cb6] px-3.5 py-1.5 text-[13px] md:text-[13px] font-semibold text-white"
                  >
                    체험해보기 →
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 md:px-8 xl:px-10 py-14 md:py-20">
        <div className="mb-6 md:mb-7">
          <div className="text-[11px] tracking-[0.2em] font-semibold text-[#5b84da] uppercase">People</div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <h2 className="text-[30px] md:text-[31px] lg:text-[34px] font-extrabold text-[#0f172a]">연구실 구성원</h2>
            <button
              type="button"
              onClick={() => onNavigate("people")}
              className="text-[13px] font-semibold text-[#2b4f93] hover:text-[#1e3f78]"
            >
              더보기 →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {people.map((name) => (
            <article key={name} className="space-y-2.5">
              <div className="h-[220px] md:h-[225px] lg:h-[250px] bg-[#d7dbe1] flex items-center justify-center">
                <span className="text-[30px] md:text-[30px] lg:text-[34px] font-semibold tracking-[0.14em] text-[#acb4c0]">TBD</span>
              </div>
              <h3 className="border-t border-[#cfd4dd] pt-2.5 text-[14px] md:text-[14px] lg:text-[15px] font-bold text-[#17284a]">{name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 md:px-8 xl:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          <article>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[31px] md:text-[32px] font-bold text-[#121b2c]">Publication</h2>
              <button
                type="button"
                onClick={() => onNavigate("publications")}
                className="text-[13px] font-semibold text-[#2b4f93] hover:text-[#1e3f78]"
              >
                더보기 →
              </button>
            </div>
            <ol className="mt-5 md:mt-6 bg-white/95 rounded-md overflow-hidden">
              {publicationItems.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[34px_1fr] md:grid-cols-[42px_1fr] gap-3 px-3 py-3 border-b border-[#e3e9f3] last:border-b-0">
                  <span className="font-semibold text-[#2a4f95]">{index + 1}.</span>
                  <div className="min-w-0">
                    <p className="text-[14px] leading-[1.5] font-semibold text-[#1a2a45]">{item.title}</p>
                    <p className="mt-0.5 text-[12px] leading-[1.5] text-[#5b6f8f]">{item.meta}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
          <article>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[31px] md:text-[32px] font-bold text-[#121b2c]">Patents</h2>
              <button
                type="button"
                onClick={() => onNavigate("patents")}
                className="text-[13px] font-semibold text-[#2b4f93] hover:text-[#1e3f78]"
              >
                더보기 →
              </button>
            </div>
            <ol className="mt-5 md:mt-6 bg-white/95 rounded-md overflow-hidden">
              {patentItems.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[34px_1fr] md:grid-cols-[42px_1fr] gap-3 px-3 py-3 border-b border-[#e3e9f3] last:border-b-0">
                  <span className="font-semibold text-[#2a4f95]">{index + 1}.</span>
                  <div className="min-w-0">
                    <p className="text-[14px] leading-[1.5] font-semibold text-[#1a2a45]">{item.title}</p>
                    <p className="mt-0.5 text-[12px] leading-[1.5] text-[#5b6f8f]">{item.meta}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="bg-[#04070f] px-6 md:px-8 xl:px-10 py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="text-center mb-9 md:mb-10">
            <h2 className="text-[32px] md:text-[34px] font-bold text-white">
              찾아오시는 <span className="text-[#2f58ff]">길</span>
            </h2>
            <p className="text-[#5b84da] text-[13px] md:text-[13px] font-semibold mt-1.5">Location</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-8 md:gap-10 items-start">
            <div className="space-y-7 md:space-y-8 text-white max-w-[420px] justify-self-center lg:justify-self-start">
              <div>
                <h3 className="text-[20px] md:text-[22px] font-bold">교수님 연구실</h3>
                <p className="mt-1 text-[#b6c0d0] text-[16px] md:text-[16px]">연세대학교 새천년관 407호</p>
                <p className="mt-1 text-[#4f83ff] text-[16px] md:text-[16px]">02-2123-4523</p>
              </div>
              <div>
                <h3 className="text-[20px] md:text-[22px] font-bold">연구실</h3>
                <p className="mt-1 text-[#b6c0d0] text-[16px] md:text-[16px]">연세대학교 새천년관 109호, 110호</p>
                <p className="mt-1 text-[#4f83ff] text-[16px] md:text-[16px]">02-2123-4197</p>
              </div>
              <p className="text-[#b6c0d0] text-[16px] md:text-[16px]">서울특별시 서대문구 연세로 50</p>
            </div>
            <div className="w-full max-w-[620px] h-[280px] md:h-[360px] justify-self-center lg:justify-self-end overflow-hidden border border-[#2b3342] shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
              <iframe
                src="https://maps.google.com/maps?q=Yonsei%20University%20Seoul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yonsei University Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function RecruitSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const researchTracks = [
    {
      title: "생성형 AI 보안",
      lines: [
        "생성형 AI 모델 취약점 분석 및 방어 기술 개발,",
        "탈옥/주입 공격 대응 LLM 기반 Fuzzing,",
        "데이터셋 구축 및 연구",
      ],
    },
    {
      title: "딥페이크 보안",
      lines: [
        "딥페이크 영상 및 이미지 탐지 기술,",
        "딥페이크 콘텐츠 탐지 평가 및 일반화,",
        "데이터셋 구축 및 연구",
      ],
    },
  ];

  const recruitTargets = [
    {
      title: "대학원생",
      lines: ["- 2026년 하반기 모집", "- 모집 인원: 0명", "- 인턴 지원 가능"],
    },
    {
      title: "인턴",
      lines: ["- 모집인원: 0명", "- 상시 모집", "- 실험 보조 업무"],
    },
    {
      title: "Post-Doc",
      lines: ["- 모집인원: 0명", "- 인공지능/정보보안 관련", "- 전공 또는 실무 경험자"],
    },
  ];

  const contacts = [
    { key: "address", label: "주소", value: "연세대학교 새천년관 110호" },
    { key: "phone", label: "전화", value: "02)2123-4197" },
    { key: "email", label: "이메일", value: "aiseclab.meet@gmail.com" },
    { key: "web", label: "웹사이트", value: "http://seclab.yonsei.ac.kr/" },
  ] as const;

  const copyValue = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((prev) => (prev === key ? null : prev)), 1300);
    } catch {
      setCopied(null);
    }
  };

  return (
    <TabPage pageKey="recruit">
      <div className="w-full space-y-10">
        <section className="pt-1 pb-3 space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.3 }}
            className="text-[1.46rem] md:text-[2.12rem] font-bold tracking-tight text-[#0a0a0a] leading-[1.2] whitespace-nowrap"
          >
            정보보호/AI보안 연구실 연구원 모집
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.3, delay: 0.04 }}
            className="text-[1.1rem] md:text-[1.26rem] font-semibold tracking-tight text-[#123f86] leading-[1.45] whitespace-nowrap"
          >
            인공지능과 보안에 관심 있는 학생을 모집합니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="text-[0.94rem] md:text-[0.98rem] text-[#51617a] font-medium"
          >
            Professor. Taekyoung Kwon
          </motion.p>
        </section>

        <section className="space-y-7">
          <section className="grid grid-cols-1 md:grid-cols-[106px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.92rem] font-semibold text-[#123f86]"
            >
              연구분야
            </motion.h3>
            <div className="border-t border-[#123f86] bg-[#fcfdff] px-1 md:px-2">
              {researchTracks.map((track) => (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.65 }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-6 py-4.5 border-b border-[#e1e6ef]"
                >
                  <div className="text-[0.95rem] leading-[1.6] font-semibold text-[#0a0a0a] break-keep">{track.title}</div>
                  <p className="text-[0.95rem] text-[#32475f] leading-[1.68] whitespace-pre-line">{track.lines.join("\n")}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[106px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.92rem] font-semibold text-[#123f86]"
            >
              모집대상
            </motion.h3>
            <div className="border-t border-[#123f86] pt-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3">
                {recruitTargets.map((target, idx) => (
                  <motion.div
                    key={target.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.65 }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className={`py-4 md:px-4 min-h-[168px] rounded-lg bg-[#f8fafe] ${idx !== 0 ? "" : ""}`}
                  >
                    <h4 className="text-[0.95rem] font-semibold text-[#0a0a0a] mb-2.5">{target.title}</h4>
                    <div className="space-y-1.5">
                      {target.lines.map((line, i) => (
                        <p key={`${target.title}-${i}`} className="text-[0.93rem] text-[#32475f] leading-[1.48] break-keep">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[106px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.92rem] font-semibold text-[#123f86]"
            >
              복리후생
            </motion.h3>
            <div className="border-t border-[#123f86] py-4.5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.4 }}
                className="text-[0.95rem] font-semibold text-[#0a0a0a] leading-relaxed"
              >
                입학 장학금 지원 가능
              </motion.p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[106px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.92rem] font-semibold text-[#123f86]"
            >
              연락처
            </motion.h3>
            <div className="border-t border-[#123f86]">
              {contacts.map((item) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] items-start md:items-center gap-2 md:gap-4 py-3.5 border-b border-[#e1e6ef]"
                >
                  <div className="text-[0.9rem] font-semibold text-[#123f86]">{item.label}</div>
                  <div className="text-[0.95rem] text-[#172033] leading-relaxed break-words">{item.value}</div>
                  <button
                    type="button"
                    onClick={() => copyValue(item.key, item.value)}
                    className={`justify-self-start md:justify-self-end px-2.5 py-1 text-[0.8rem] rounded transition-colors ${copied === item.key
                      ? "bg-[#123f86] text-white"
                      : "bg-[#f1f4f9] text-[#123f86] hover:bg-[#e6ebf3]"
                      }`}
                  >
                    {copied === item.key ? "복사됨" : "복사"}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </TabPage>
  );
}
const PROFESSOR_BIO_PARAGRAPHS = [
  "Prof. Kwon was born in Seoul, Korea, and received his academic degrees (B.S., M.S., and Ph.D.) in computer science from Yonsei University, Seoul, Korea. From 1999 to 2000, he did his post-doc study at U.C. Berkeley and developed a password authenticated key exchange protocol called AMP, which was presented at ISOC NDSS 2001 and standardized in IEEE P1363.2 and ISO/IEC 11770-4, respectively.",
  "From 2001 to 2013 Spring, he was a professor of computer engineering at Sejong University, Seoul, Korea. In 2013, he came back to Shinchon Campus to join the faculty of Yonsei University where he is currently a professor of information. He is on the director board of the Korea Institute of Information Security and Cryptology (KIISC) and the editorial committee of the Korean Institute of Information Scientists and Engineers (KIISE). He also serves as committee members or chairs for many international and domestic conferences.",
  "His research interests are mainly in the field of Information Security and Privacy, and include authentication, cryptographic protocols, network security, usable security, software and system security, and adversarial machine learning.",
];

const PROFESSOR_ACTIVITIES = [
  "2013-현재 : 연세대학교 정보대학원 정교수",
  "2020-현재 : 연세대학교 인공지능대학원 AI+X 겸직교수",
  "2024-현재 : 연세대학교 교무처 교수학습혁신센터장",
  "2024-현재 : 연세대학교 LearnUs 추진본부 교과분야 단장",
  "2024-현재 : 연세대학교 지능형혁신연구소 소장",
  "2024-현재 : 한국정보보학회 AI보안연구회 위원장",
  "2006-현재 : 한국정보보호학회 상임이사",
  "2003-현재 : 한국정보보호학회 논문지 편집위원",
  "2007-현재 : 정보과학회 논문지 편집위원",
  "2008-현재 : 한국정보보호학회 암호연구회 운영위원",
  "2006-현재 : 대검찰청 디지털수사 자문위원",
  "2021-현재 : 국민생활과학자문단 사이버안전분과 위원",
  "2022-현재 : 에스알 AI빅데이터 분과 위원",
  "2024-현재 : 경찰청 디지털포렌식 자문위원",
  "2024-현재 : 경찰청 사이버성폭력 수사 자문위원",
  "2022-현재 : 서울시 개인정보보호 심의위원",
  "2025-현재 : 금융보안원 자문위원",
  "2025-현재 : 금융감독원 자문위원",
  "2025-현재 : 국가 딥페이크 대응 자문위원회 위원장",
  "2026-현재 : 개인정보보호위원회 인공지능 프라이버시 위원",
  "2026-현재 : 한국인터넷진흥원 램섬웨어 전주기 대응 위원",
  "2026-현재 : 국가인공지능전략위원회 보안TF 위원",
];

const PROFESSOR_CAREER = [
  "1999-2000 : Univ. of California at Berkeley, 포스트닥",
  "2001-2013 : 세종대학교 컴퓨터공학과 교수",
  "2007-2008 : Univ. of Maryland at College Park, 교환교수",
  "2009-2010 : 세종대학교 컴퓨터공학과 컴퓨터소프트웨어전공 학과장",
  "2011-2012 : 세종대학교 정보보호학과 학과장",
  "2013-2018 : 연세대학교 지식서비스보안과정 주임교수",
  "2015-2018 : 연세대학교 디지털포렌식 경찰청계약학과 주임교수",
  "2016-2019 : 연세대학교 IT정책전략연구소 소장",
  "2022-2024 : 연세대학교 글로벌인재대학 응용정보공학 책임교수",
  "2022-2024 : 연세대학교 교보AI빅데이터학과 주임교수",
  "2016-2017 : 정보과학회 이사",
  "2021-2024 : 한국연구재단 기초연구본부 전문위원",
  "2022-2026 : 경찰청 자체평가위원회 위원",
];

const PROFESSOR_PAPERS = [
  "Jeewoo Jung, Taekyoung Kwon, \"Enhancing Differential Fuzzing of Cryptographic Libraries with Sustainable Hybrid Fuzzing and Crypto-Specific Mutation,\" in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2024. (Best Paper Award)",
  "Leo Hyun Park, Jaeuk Kim, Myung Gyo Oh, Jaewoo Park, and Taekyoung Kwon, \"Adversarial Feature Alignment: Balancing Robustness and Accuracy in Deep Learning via Adversarial Training,\" in Proc. the 17th ACM Workshop on Artificial Intelligence and Security (AISec), Oct. 2024.",
  "Jueon Eom, Seyeon Jeong, and Taekyoung Kwon, \"Fuzzing JavaScript Interpreters with Coverage-Guided Reinforcement Learning for LLM-based Mutation,\" in Proc. the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA), Sep. 2024.",
  "Mingi Cho, Dohyeon An, Hoyong Jin, and Taekyoung Kwon, \"BoKASAN: Binary-only Kernel Address Sanitizer for Effective Kernel Fuzzing,\" 32nd USENIX Security Symposium (USENIX Security), Aug. 2023.",
  "Leo Hyun Park, Soochang Chung, Jaeuk Kim, and Taekyoung Kwon, \"GradFuzz: Fuzzing Deep Neural Networks with Gradient Vector Coverage for Adversarial Examples,\" Neurocomputing, Elsevier, Vol.522, pp.165-180, Feb. 2023.",
  "Hoyong Jin, Dohyeon An, and Taekyoung Kwon, \"Differential Testing of Cryptographic Libraries with Hybrid Fuzzing,\" Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022. (Best Paper Award)",
  "Leo Hyun Park, Eunbi Hwang, Donggun Lee, and Taekyoung Kwon, \"Towards Constructing Consistent Pattern Strength Meters with User’s Visual Perception,\" Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022.",
  "Leo Hyun Park, Jaeuk Kim, Jaewoo Park, and Taekyoung Kwon, \"Mixed and Constrained Input Mutation for Effective Fuzzing of Deep Learning Systems,\" Information Sciences, Elsevier, Vol.614, pp.497-517, Oct. 2022.",
  "Leo Hyun Park, Jungbeen Yu, Hong-Koo Kang, Taejin Lee, and Taekyoung Kwon, \"Birds of a Feature: Intrafamily Clustering for Version Identification of Packed Malware,\" IEEE Systems Journal, Vol.14, pp.4545-4556, Sep. 2020.",
  "Mingi Cho, Jaedong Jang, Yezee Seo, Seyeon Jeong, Soochang Chung, and Taekyoung Kwon, \"Towards Bidirectional LUT-level Detection of Hardware Trojans,\" Computers & Security, Elsevier, Vol.104, May 2021.",
  "Mingi Cho, Seoyoung Kim, and Taekyoung Kwon, \"Intriguer: Field-Level Constraint Solving for Hybrid Fuzzing,\" Proc. the ACM Conference on Computer and Communications Security (ACM CCS), pp.515-530, Nov. 2019.",
  "Hoyong Lee, Seungyeon Kim, and Taekyoung Kwon, \"Here Is Your Fingerprint! Actual Risk versus User Perception of Latent Fingerprints and Smudges Remaining on Smartphones,\" Proc. the 33rd Annual Computer Security Applications Conference (ACSAC), Orlando, Florida, pp.512-527, Dec. 2017.",
  "Taekyoung Kwon and Sarang Na, \"SteganoPIN: Two-Faced Human-Machine Interface for Practical Enforcement of PIN Entry Security,\" IEEE Trans. on Human-Machine Systems, Vol.46, No.1, pp.143-150, February 2016.",
  "Jonghyup Lee, Leehyung Kim, and Taekyoung Kwon, \"FlexiCast: Energy-Efficient Software Integrity Checks to Build Secure Industrial Wireless Active Sensor Networks,\" IEEE Trans. on Industrial Informatics, Vol.12, No.4, pp.6-14, 2016.",
  "Taekyoung Kwon and Jin Hong, \"Analysis and Improvement of a PIN-Entry Method Resilient to Shoulder-Surfing and Recording Attacks,\" IEEE Trans. on Information Forensics and Security, Vol.10, No.2, pp.278-292, February 2015.",
  "Taekyoung Kwon, Sooyeon Shin, and Sarang Na, \"Covert Attentional Shoulder Surfing: Human Adversaries Are More Powerful Than Expected,\" IEEE Trans. on Systems, Man, and Cybernetics Systems (Formerly Part A), Vol.44, No.6, pp.716-727, June 2014.",
  "Taekyoung Kwon and Sarang Na, \"TinyLock: Affordable Defense Against Smudge Attacks on Smartphone Pattern Lock Systems,\" Computers & Security, Elsevier, Vol.42, pp.137-150, May 2014.",
  "Taekyoung Kwon, \"Privacy Preservation with X.509 Standard Certificates,\" Information Sciences, Elsevier, Vol.181, No.13, pp.2906-2921, July 2011.",
  "Junghae Cheon, Stanislav Jarecki, Taekyoung Kwon, and Mun-Kyu Lee, \"Fast Exponentiation Using Split Exponents,\" IEEE Trans. on Information Theory, Vol.57, No.3, pp.1816-1826, March 2011.",
  "Sooyeon Shin, Taekyoung Kwon, Gil-yong Jo, Youngman Park, and Haekyu Rhy, \"An Experimental Study of Hierarchical Intrusion Detection for Wireless Industrial Sensor Networks,\" IEEE Trans. on Industrial Informatics, Vol.6, No.4, pp.744-757, November 2010.",
  "Taekyoung Kwon and Jin Hong, \"Secure and Efficient Broadcast Authentication in Wireless Sensor Networks,\" IEEE Trans. on Computers, Vol.59, No.8, pp.1120-1133, August 2010.",
  "JongHyup Lee, Taekyoung Kwon, and JooSeok Song, \"Group Connectivity Model for Industrial Wireless Sensor Networks,\" IEEE Trans. on Industrial Electronics, Vol.57, No.5, pp.1835-1844, July 2010.",
  "Taekyoung Kwon, JongHyup Lee, and JooSeok Song, \"Location-based Pairwise Key Predistribution for Wireless Sensor Networks,\" IEEE Trans. on Wireless Communications, Vol.8, No.11, pp.5436-5442, November 2009.",
  "Taekyoung Kwon and Hyeonjoon Moon, \"Biometric Authentication for Border Control Applications,\" IEEE Trans. on Knowledge and Data Engineering, Vol.20, No.8, pp.1091-1096, August 2008.",
  "Taekyoung Kwon, Hyungwoo Lee, and Jae-il Lee, \"A Practical Method for Generating Digital Signatures Using Biometrics,\" IEICE Trans. on Communications, Vol.E90-B, No.6, pp.1381-1389, 2007.",
  "Jiyong Jang, Taekyoung Kwon, and Jooseok Song, \"A Time-based Key Management Protocol for Wireless Sensor Networks,\" Information Security Practice and Experience, Lecture Notes in Computer Science, Vol.4464, Springer-Verlag, pp.314-328, 2007.",
  "Chaehoon Lim and Taekyoung Kwon, \"Strong and Robust RFID Authentication Enabling Perfect Ownership Transfer,\" Information and Communications Security, Lecture Notes in Computer Science, Vol.4307, Springer-Verlag, pp.1-20, 2006.",
  "Taekyoung Kwon, \"Practical Authenticated Key Agreement Using Passwords,\" Information Security, Lecture Notes in Computer Science, Vol.3225, Springer-Verlag, pp.1-12, September 2004.",
  "Taekyoung Kwon, \"Refinement and Improvement of Virtual Software Token Protocols,\" IEEE Communications Letters, Vol.8, No.1, pp.75-77, January 2004.",
  "Taekyoung Kwon, \"Authentication and Key Agreement via Memorable Password,\" Proc. of NDSS (Network and Distributed Systems Security), February 2001. (IEEE P1363.2 and ISO/IEC 11770-4 Proposal)",
  "Taekyoung Kwon and Jooseok Song, \"Secure Agreement Scheme for gxy via Password Authentication,\" IEE Electronics Letters, Vol.35, No.11, pp.892-893, May 1999.",
  "Taekyoung Kwon, Myeongho Kang, and Jooseok Song, \"An Adaptable and Reliable Authentication Protocol for Communication Networks,\" Proc. of IEEE INFOCOM 97, pp.738-745, April 1997.",
];

function ProfessorSection() {
  const [activeTab, setActiveTab] = useState<"activities" | "career" | "papers">("activities");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const contacts = [
    { key: "phone", label: "Phone", value: "02-2123-4523", href: "tel:02-2123-4523" },
    { key: "fax", label: "Fax", value: "82-2123-8654" },
    { key: "email", label: "Email", value: "taekyoung@yonsei.ac.kr", href: "mailto:taekyoung@yonsei.ac.kr" },
    { key: "office", label: "Office", value: "407 New Millennium Hall (새천년관 407호)" },
  ] as const;

  const copyContact = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(key);
      window.setTimeout(() => setCopiedContact((prev) => (prev === key ? null : prev)), 1200);
    } catch {
      setCopiedContact(null);
    }
  };

  const paperEntries = PROFESSOR_PAPERS.map((text, index) => {
    const years = text.match(/\b(?:19|20)\d{2}\b/g);
    const year = years && years.length > 0 ? years[years.length - 1] : "N/A";
    return {
      index,
      year,
      text,
      href: `https://scholar.google.com/scholar?q=${encodeURIComponent(text)}`,
    };
  }).sort((a, b) => {
    const ay = a.year === "N/A" ? -1 : Number(a.year);
    const by = b.year === "N/A" ? -1 : Number(b.year);
    if (by !== ay) return by - ay;
    return a.index - b.index;
  });

  const splitTimeline = (item: string) => {
    const separator = " : ";
    const idx = item.indexOf(separator);
    if (idx === -1) return { period: "", detail: item };
    return {
      period: item.slice(0, idx),
      detail: item.slice(idx + separator.length),
    };
  };

  return (
    <TabPage pageKey="professor" title="PROFESSOR">
      <div className="w-full space-y-12">
        <section className="pt-1">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-8 lg:gap-14 items-stretch">
            <div className="w-full max-w-[340px]">
              <div className="w-full h-full min-h-[430px] bg-[#e5e8ed] flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
              </div>
            </div>
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.3 }}
                className="text-[0.95rem] md:text-[0.98rem] text-[#45556f] leading-[1.75]"
              >
                Professor,
                <br />
                Graduate School of Information, Yonsei University, Seoul, 03722, Korea
              </motion.p>
              <div className="space-y-4">
                <div className="max-w-[82ch] space-y-5">
                  {PROFESSOR_BIO_PARAGRAPHS.map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.3 }}
                      className="text-[0.97rem] md:text-[1rem] text-[#1f2a3d] leading-[1.92]"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-0 mb-[3.75rem]">
          <div className="border-t border-[#123f86]">
            {contacts.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-[108px_1fr_auto] items-start md:items-center gap-2 md:gap-4 py-3.5 border-b border-[#e1e6ef]"
              >
                <div className="text-[0.9rem] font-semibold text-[#123f86]">{item.label}</div>
                <div className="text-[0.95rem] text-[#172033] leading-relaxed break-words">
                  {item.href ? (
                    <a href={item.href} className="hover:text-[#123f86] transition-colors underline-offset-2 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => copyContact(item.key, item.value)}
                  className={`justify-self-start md:justify-self-end px-2.5 py-1 text-[0.78rem] rounded transition-colors ${copiedContact === item.key
                    ? "bg-[#123f86] text-white"
                    : "bg-[#f1f4f9] text-[#123f86] hover:bg-[#e6ebf3]"
                    }`}
                >
                  {copiedContact === item.key ? "복사됨" : "복사"}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap gap-5 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab("activities")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === "activities"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              주요 활동
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("career")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === "career"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              주요 경력
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("papers")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === "papers"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              주요 논문
            </button>
          </div>

          {activeTab === "activities" && (
            <div className="space-y-2.5">
              {PROFESSOR_ACTIVITIES.map((item) => {
                const { period, detail } = splitTimeline(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[92px_1fr] gap-2"
                  >
                    <div className="text-[0.95rem] font-medium text-[#123f86] whitespace-nowrap">{period}</div>
                    <div className="text-[0.95rem] text-gray-700 leading-relaxed">{detail}</div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "career" && (
            <div className="space-y-2.5">
              {PROFESSOR_CAREER.map((item) => {
                const { period, detail } = splitTimeline(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[92px_1fr] gap-2"
                  >
                    <div className="text-[0.95rem] font-medium text-[#123f86] whitespace-nowrap">{period}</div>
                    <div className="text-[0.95rem] text-gray-700 leading-relaxed">{detail}</div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "papers" && (
            <div className="space-y-3">
              {paperEntries.map((paper, index) => (
                <motion.a
                  key={`${paper.index}-${paper.text.slice(0, 40)}`}
                  href={paper.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-[34px_1fr] gap-3 text-[0.95rem] text-gray-700 leading-relaxed hover:text-[#1A5FB4] transition-colors"
                >
                  <span className="text-[#1A5FB4] font-semibold">{index + 1}.</span>
                  <span>{paper.text}</span>
                </motion.a>
              ))}
            </div>
          )}
        </section>
      </div>
    </TabPage>
  );
}

// ??? People ???????????????????????????????????????????????????????????????????

type PeopleMember = { name: string; note?: string };

const PHD_STUDENTS: PeopleMember[] = [
  { name: "LEOHYUN PARK" },
  { name: "YOONSIK KIM" },
  { name: "EUNBI HWANG" },
  { name: "BYUNGCHUL KIM" },
  { name: "SANGSOO HAN" },
  { name: "NARAE KANG", note: "(Part)" },
];

const MASTER_STUDENTS: PeopleMember[] = [
  { name: "WONYOUNG CHO" },
  { name: "JUWON CHO" },
  { name: "HYEOKJOO KWON" },
  { name: "SHINYOUNG WON" },
  { name: "MINJUN SUN" },
  { name: "TAEHO KIM" },
  { name: "AYEON KIM" },
  { name: "JIHYEOK CHOI" },
  { name: "HYUNSEOK LEE" },
  { name: "GIWON KANG" },
  { name: "SUN SIN KWON" },
  { name: "GYUHWAN KIM" },
  { name: "YOONDONG YEO" },
  { name: "YEONKYO JUNG", note: "(Part)" },
  { name: "YUNSEO LEE" },
];

function PeopleTabSection() {
  const renderMembers = (members: PeopleMember[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
      {members.map((member) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <div className="w-full aspect-[3/4] bg-[#e6e9ee] flex items-center justify-center">
            <span className="text-xl md:text-2xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
          </div>
          <div className="border-t border-[#e1e6ef] pt-2.5 text-[0.9rem] text-[#172033] leading-[1.4]">
            <span className="font-semibold tracking-[0.01em]">{member.name}</span>
            {member.note ? <span className="text-[#5a667a]"> {member.note}</span> : null}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <TabPage pageKey="people" title="PEOPLE">
      <div className="w-full space-y-9">
        <section className="grid grid-cols-1 md:grid-cols-[190px_1fr] gap-2 md:gap-8 items-start">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.25 }}
            className="pt-3 text-[0.96rem] font-semibold text-[#123f86]"
          >
            Professor
          </motion.h3>
          <div className="border-t border-[#123f86] pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
              <div className="w-[170px] sm:w-[200px] aspect-[3/4] bg-[#e6e9ee] flex items-center justify-center">
                <span className="text-xl md:text-2xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
              </div>
              <div className="space-y-2.5">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.3 }}
                  className="text-[1.2rem] md:text-[1.34rem] font-bold tracking-tight text-[#0a0a0a]"
                >
                  Prof. Taekyoung Kwon
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.3, delay: 0.04 }}
                  className="text-[0.96rem] text-[#51617a] leading-relaxed"
                >
                  Professor,
                  <br />
                  Graduate School of Information, Yonsei University, Seoul, 03722, Korea
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-[190px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.96rem] font-semibold text-[#123f86]"
            >
              Ph.D.Students (Full-Time)
            </motion.h3>
            <div className="border-t border-[#123f86] pt-4">{renderMembers(PHD_STUDENTS)}</div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[190px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.96rem] font-semibold text-[#123f86]"
            >
              Master Students
            </motion.h3>
            <div className="border-t border-[#123f86] pt-4">{renderMembers(MASTER_STUDENTS)}</div>
          </section>
        </section>
      </div>
    </TabPage>
  );
}

// ??? Alumni ???????????????????????????????????????????????????????????????????

type AlumniEntry = {
  degree: string;
  name: string;
  company: string;
};

type AlumniGroup = {
  school: string;
  entries: AlumniEntry[];
};

const ALUMNI_GROUPS: AlumniGroup[] = [
  {
    school: "연세대학교",
    entries: [
      { degree: "Ph.D.", name: "조민기", company: "티오리(병역특례)" },
      { degree: "M.S.", name: "정지우", company: "국가보안기술연구소" },
      { degree: "M.S.", name: "오명교", company: "KT" },
      { degree: "M.S.", name: "박재우", company: "씨이랩(병역특례)" },
      { degree: "M.S.", name: "임은지", company: "엔아이티서비스" },
      { degree: "M.S.", name: "엄주언", company: "안랩" },
      { degree: "M.S.", name: "진호용", company: "아우토크립트(병역특례)" },
      { degree: "M.S.", name: "안도현", company: "코인원(병역특례)" },
      { degree: "M.S.", name: "윤혜민", company: "삼정KPMG" },
      { degree: "M.S.", name: "정세연", company: "슈어소프트테크" },
      { degree: "M.S.", name: "정수창", company: "베이글코드(인턴)" },
      { degree: "M.S.", name: "김해니", company: "김앤장 법률사무소" },
      { degree: "M.S.", name: "김서영", company: "삼성전자" },
      { degree: "M.S.", name: "김종신", company: "딥테크인컴퍼니" },
      { degree: "M.S.", name: "오상진", company: "현대엔지니어링" },
      { degree: "M.S.", name: "구예은", company: "우리은행" },
      { degree: "M.S.", name: "김슬기", company: "한국정보통신기술협회(TTA)" },
      { degree: "M.S.", name: "장재동", company: "한국인터넷진흥원(KISA)" },
      { degree: "M.S.", name: "윤정환", company: "네이버" },
      { degree: "M.S.", name: "서예지", company: "안랩" },
      { degree: "M.S.", name: "유정빈", company: "피플펀드" },
      { degree: "M.S.", name: "신민식", company: "삼성전자" },
      { degree: "M.S.", name: "이영주", company: "로드맵" },
      { degree: "M.S.", name: "이호연", company: "네이버" },
      { degree: "M.S.", name: "김민우", company: "SK주식회사 C&C" },
      { degree: "M.S.", name: "김경훈", company: "NICE 평가정보" },
      { degree: "M.S.", name: "양원석", company: "Univ. of Oklahoma" },
      { degree: "M.S.", name: "정성미", company: "포스코(POSCO)" },
      { degree: "M.S.", name: "조현웅", company: "우정사업본부" },
      { degree: "M.S.", name: "윤영진", company: "한화 S&C" },
      { degree: "M.S.", name: "유홍렬", company: "지니언스" },
      { degree: "M.S.", name: "방지현", company: "코나아이(Konai)" },
      { degree: "M.S.", name: "노승훈", company: "카카오" },
      { degree: "M.S.", name: "최재우", company: "한국인터넷진흥원(KISA)" },
      { degree: "M.S.", name: "홍모세", company: "펜타시큐리티" },
      { degree: "M.S.", name: "현석우", company: "국가보안기술연구소" },
      { degree: "M.S.", name: "이동건", company: "국방부" },
      { degree: "M.S.", name: "이준원", company: "삼성전자" },
      { degree: "M.S.", name: "김승연", company: "넷엔드(병역특례)" },
    ],
  },
  {
    school: "세종대학교",
    entries: [
      { degree: "Ph.D.", name: "박상호", company: "한국정보통신기술협회(TTA)" },
      { degree: "Ph.D.", name: "신수연", company: "연세대학교 (포스트닥)" },
      { degree: "M.S.", name: "나사랑", company: "한국인터넷진흥원(KISA), 연세대학교 박사과정(파트)" },
      { degree: "M.S.", name: "최원석", company: "유비벨록스 모바일 | 선임연구원" },
      { degree: "M.S.", name: "송성현", company: "금융보안연구원 | 주임연구원" },
      { degree: "M.S.", name: "조길용", company: "유비벨록스 모바일 | 선임연구원" },
      { degree: "M.S.", name: "정연호", company: "유비벨록스 | 과장" },
      { degree: "M.S.", name: "김수희", company: "한영회계법인 | Senior" },
      { degree: "M.S.", name: "김문권", company: "(주)에고소프트 | 과장" },
      { degree: "M.S.", name: "송현수", company: "유비벨록스" },
      { degree: "M.S.", name: "이영권", company: "한국정보통신기술협회(TTA) | 센터장" },
      { degree: "M.S.", name: "정재웅", company: "GMT소프트 | 팀장" },
    ],
  },
];

function AlumniSection() {
  return (
    <TabPage pageKey="alumni" title="ALUMNI">
      <div className="w-full space-y-8">
        {ALUMNI_GROUPS.map((group) => (
          <section key={group.school} className="grid grid-cols-1 md:grid-cols-[106px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3 }}
              className="pt-3 text-[0.92rem] font-semibold text-[#123f86]"
            >
              {group.school}
            </motion.h3>
            <div className="border-t border-[#123f86]">
              {group.entries.map((entry, idx) => (
                <motion.div
                  key={`${group.school}-${entry.degree}-${entry.name}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.25 }}
                  className={`grid grid-cols-1 md:grid-cols-[64px_120px_1fr] gap-1 md:gap-4 py-3.5 ${idx < group.entries.length - 1 ? "border-b border-[#e1e6ef]" : ""}`}
                >
                  <div className="text-[0.84rem] font-semibold text-[#123f86]">{entry.degree}</div>
                  <div className="text-[0.95rem] font-medium text-[#0a0a0a]">{entry.name}</div>
                  <div className="text-[0.94rem] text-[#4f5e76] leading-relaxed break-words">{entry.company}</div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </TabPage>
  );
}

// ??? Publications ?????????????????????????????????????????????????????????????

function PublicationsSection() {
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

function PatentsSection() {
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

// ??? Projects ?????????????????????????????????????????????????????????????????

function ProjectsSection() {
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

// ??? Contact ??????????????????????????????????????????????????????????????????

function ContactTabSection() {
  const offices = [
    {
      name: "교수님 연구실",
      location: "연세대학교 제4공학관 407호",
      phone: "02-2123-4523",
      email: "taekyoung@yonsei.ac.kr",
    },
    {
      name: "연구실",
      location: "연세대학교 제1공학관 109동 110호",
      phone: "02-2123-4197",
      email: "yonsei.seclab@gmail.com",
    },
  ] as const;

  return (
    <TabPage pageKey="contact">
      <section className="min-h-[calc(100dvh-82px)] bg-white px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold mb-3 text-[#0a0a0a]"
            >
              찾아오시는 <span className="text-[#1A5FB4]">길</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-[#70829f] text-base"
            >
              Location
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-10">
            <div className="space-y-8 text-center lg:text-left">
              {offices.map((office) => (
                <motion.div
                  key={office.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <h3 className="font-bold text-[#0f2448] text-2xl">{office.name}</h3>
                  <p className="text-[#30496e] text-xl">{office.location}</p>
                  <p className="text-[#1A5FB4] text-lg">{office.phone}</p>
                  <p className="text-[#4c6283] text-base">{office.email}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.3 }}
                className="pt-2"
              >
                <p className="text-[#30496e] text-xl">서울특별시 서대문구 연세로 50</p>
              </motion.div>
            </div>

            <div className="overflow-hidden shadow-[0_16px_40px_rgba(26,95,180,0.18)] border border-[#d7e3f5] h-[420px] bg-[#f8fbff]">
              <iframe
                src="https://maps.google.com/maps?q=Yonsei%20University%20Seoul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yonsei University Map"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 text-[#1A5FB4] hover:text-[#164c91] transition-colors text-base">
              상세 위치 및 교통 안내
            </button>
          </div>
        </div>
      </section>
    </TabPage>
  );
}

// ??? Tab Router ???????????????????????????????????????????????????????????????

function renderTab(
  tab: TabKey,
  setActiveTab: (t: TabKey) => void,
  setShowJailbreak: (v: boolean) => void,
) {
  if (tab === "home")
    return <HomeSection onNavigate={setActiveTab} onTry={() => setShowJailbreak(true)} />;
  if (tab === "recruit") return <RecruitSection />;
  if (tab === "professor") return <ProfessorSection />;
  if (tab === "people") return <PeopleTabSection />;
  if (tab === "alumni") return <AlumniSection />;
  if (tab === "publications") return <PublicationsSection />;
  if (tab === "patents") return <PatentsSection />;
  if (tab === "projects") return <ProjectsSection />;
  return <ContactTabSection />;
}

// ??? Root App ?????????????????????????????????????????????????????????????????

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [showJailbreak, setShowJailbreak] = useState(false);
  const isHome = activeTab === "home";
  const isContact = activeTab === "contact";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ?聙?聙 Top Bar ?聙?聙 */}
      <header className="fixed inset-x-0 -top-px z-50 bg-[#1e3a8a] rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center gap-4">
          <div className="shrink-0 whitespace-nowrap font-bold text-sm md:text-base text-white tracking-tight">
            AI Security <span className="font-normal text-white/50">LAB</span>
          </div>
          <nav className="overflow-x-auto scrollbar-hide ml-auto">
            <div className="inline-flex items-center whitespace-nowrap">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setShowJailbreak(false); }}
                  className={`px-2.5 md:px-3 py-1.5 text-xs md:text-sm transition-colors ${activeTab === tab.key && !showJailbreak
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white/85"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* ?聙?聙 Main ?聙?聙 */}
      <main
        className={
          !showJailbreak && isContact
            ? "w-full pt-[72px] md:pt-[78px] no-text-reveal"
            : !showJailbreak && isHome
              ? "w-full pt-[72px] md:pt-[78px] no-text-reveal"
              : "max-w-7xl mx-auto px-4 md:px-6 pt-[82px] md:pt-[92px] pb-10 md:pb-14 no-text-reveal"
        }
      >
        <AnimatePresence mode="wait">
          {renderTab(activeTab, setActiveTab, setShowJailbreak)}
        </AnimatePresence>
      </main>

      {/* ?聙?聙 Jailbreak Chat Overlay ?聙?聙 */}
      {showJailbreak && (
        <JailbreakChatPage onBack={() => setShowJailbreak(false)} />
      )}
    </div>
  );
}























