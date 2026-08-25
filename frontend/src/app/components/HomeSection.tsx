import { motion } from "motion/react";
import type { TabKey } from "../tabs";
import { ResearchSection } from "./ResearchSection";
import { PeopleSection } from "./PeopleSection";
import { ResearchOutputSection } from "./ResearchOutputSection";
import { ContactSection } from "./ContactSection";

export function HomeSection({
  onNavigate,
  onTry,
}: {
  onNavigate: (tab: TabKey) => void;
  onTry: () => void;
}) {
  return (
    <motion.div
      key="home-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
    >
      <section className="snap-start min-h-[calc(100dvh-82px)] relative bg-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100dvh-82px)] px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-12 items-center">
          <div className="text-left max-w-2xl">
            <p className="text-base md:text-lg font-semibold text-[#2563eb]">YONSEI UNIVERSITY</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0f172a]">
              AI Security LAB
            </h1>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug text-[#334155]">
              연세대학교 정보대학원
              <br />
              정보보호&AI보안연구실
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#475569]">
              권태경 교수님 지도하에 저희 정보보호/AI보안 연구실은 인공지능 기술의 급속한 발전이 가져온 새로운 보안 과제에 대응하기 위해
              AI 기반 보안 위협 분석 및 대응 기술을 중심으로 다양한 주제를 연구하고 있습니다.
            </p>
          </div>
          <div className="h-[48vh] min-h-[300px] md:h-[62vh] md:min-h-[380px] max-h-[540px] rounded-3xl bg-gray-200 md:translate-x-3 flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#64748b]"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-xs tracking-[0.16em]">SCROLL DOWN</span>
          <span className="text-base leading-none">↓</span>
        </motion.div>
      </section>

      <ResearchSection
        number="01"
        category="AI SECURITY"
        showTryButton
        title="AI 보안"
        description={[
          "생성형 AI 기반 시스템의 정보 유출, 프롬프트 주입, 모델 오염 등 AI 고유 취약점을 분석합니다.",
          "실전 공격 시나리오 기반으로 방어 기법을 설계하고 검증합니다.",
        ]}
        papers={[
          { title: "Red-Teaming LLMs with Token Control Score", venue: "RAID 2025" },
          { title: "Amplifying Training Data Exposure through Fine-Tuning", venue: "IEEE TIFS 2025" },
          { title: "LeakGuard: Detecting Attribute Leakage in Diffusion Models", venue: "WISA 2025" },
        ]}
        onLearnMore={() => onNavigate("publications")}
        onTry={onTry}
      />

      <ResearchSection
        number="02"
        category="DEEPFAKE DETECTION"
        title="딥페이크 탐지"
        description={[
          "in-the-wild 딥페이크 콘텐츠를 기반으로 범용 성능을 갖춘 탐지 모델을 연구합니다.",
          "압축, 노이즈, 다양한 환경 변화에서도 안정적으로 동작하도록 고도화합니다.",
        ]}
        papers={[
          { title: "Multi-View Slot Attention Using Paraphrased Texts", venue: "ICCV 2025" },
          { title: "On the Correlation Between Detection and Image Quality", venue: "WDC 2024" },
          { title: "Coexistence of Deepfake Defenses", venue: "IEEE Access 2024" },
        ]}
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
        papers={[
          { title: "Fuzzing JavaScript Interpreters with Coverage-Guided RL", venue: "ISSTA 2024" },
          { title: "BoKASAN: Binary-only Kernel Address Sanitizer", venue: "USENIX Sec 2023" },
          { title: "Enhancing Differential Fuzzing with Hybrid Fuzzing", venue: "ICISC 2024 (Best Paper)" },
        ]}
        onLearnMore={() => onNavigate("publications")}
      />

      <div className="snap-start">
        <PeopleSection />
      </div>
      <div className="snap-start">
        <ResearchOutputSection />
      </div>
      <div className="snap-start">
        <ContactSection />
      </div>
    </motion.div>
  );
}
