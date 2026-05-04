import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { TerminalBoot } from "./components/TerminalBoot";
import { Navigation } from "./components/Navigation";
import { ThreatSection } from "./components/ThreatSection";
import { WhoWeAreSection } from "./components/WhoWeAreSection";
import { ResearchSection } from "./components/ResearchSection";
import { PeopleSection } from "./components/PeopleSection";
import { ResearchOutputSection } from "./components/ResearchOutputSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="size-full bg-white">
      <AnimatePresence>
        {!bootComplete && <TerminalBoot onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      {bootComplete && (
        <>
          <Navigation />

          <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
            <ThreatSection />
            <WhoWeAreSection />

            <ResearchSection
              number="01"
              category="AI SECURITY"
              title="AI 보안"
              description={[
                "생성형 AI 기반 시스템에서의 정보 노출, 프롬프트 주입, 모델 탈옥 등",
                "AI 고유의 취약점을 분석하고 방지하는 기술을 개발합니다.",
              ]}
              tags={["Jailbreak", "Prompt Injection", "Red-Teaming", "LLM Security"]}
              papers={[
                { title: "Red-Teaming LLMs with Token Control Score", venue: "RAID 2025" },
                { title: "Amplifying Training Data Exposure through Fine-Tuning", venue: "IEEE TIFS 2025" },
                { title: "LeakGuard: Detecting Attribute Leakage in Diffusion Models", venue: "WISA 2025" },
              ]}
              icon="shield"
            />

            <ResearchSection
              number="02"
              category="DEEPFAKE DETECTION"
              title="딥페이크 탐지"
              description={[
                "다양한 플랫폼에서 유통되는 in-the-wild 딥페이크 콘텐츠에 대한",
                "일반화된 탐지 모델을 연구하고 개발합니다.",
              ]}
              tags={["Face Anti-Spoofing", "GAN Detection", "Multi-View", "Robustness"]}
              papers={[
                { title: "Multi-View Slot Attention Using Paraphrased Texts", venue: "ICCV 2025" },
                { title: "On the Correlation Between Detection and Image Quality", venue: "WDC 2024" },
                { title: "Coexistence of Deepfake Defenses", venue: "IEEE Access 2024" },
              ]}
              icon="eye"
            />

            <ResearchSection
              number="03"
              category="VULNERABILITY DETECTION"
              title="취약성 탐지"
              description={[
                "퍼징, 심볼릭 실행, 정적·동적 분석 기법 등에 AI 기술을 접목하여",
                "코드, 시스템 로그, 네트워크 트래픽 상의 취약점을 탐지합니다.",
              ]}
              tags={["Fuzzing", "RL Mutation", "Symbolic Execution", "NIDS"]}
              papers={[
                { title: "Fuzzing JavaScript Interpreters with Coverage-Guided RL", venue: "ISSTA 2024" },
                { title: "BoKASAN: Binary-only Kernel Address Sanitizer", venue: "USENIX Sec 2023" },
                { title: "Enhancing Differential Fuzzing with Hybrid Fuzzing", venue: "ICISC 2024 (Best Paper)" },
              ]}
              icon="search"
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
          </div>
        </>
      )}
    </div>
  );
}