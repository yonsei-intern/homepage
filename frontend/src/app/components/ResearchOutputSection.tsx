import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FileText, Star, Book, ArrowRight } from "lucide-react";

export function ResearchOutputSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const eyebrow = "RESEARCH OUTPUT";

  return (
    <section
      id="publications"
      ref={ref}
      className="min-h-screen flex items-center bg-[#fafbff] px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-xs tracking-widest text-[#1A5FB4] uppercase"
          >
            {eyebrow.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            프로젝트 · 특허 · 논문
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
            id="projects"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#1A5FB4]" />
              <div>
                <div className="font-bold text-xl">Projects</div>
                <div className="text-sm text-gray-500">진행 중인 연구</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "AI 모델 취약점 자동 평가 플랫폼", period: "2024–진행 중" },
                { title: "딥페이크 탐지 일반화 모델 개발", period: "2023–2024" },
                { title: "LLM 기반 퍼징 자동화", period: "2024" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.08 }}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.period}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="flex items-center gap-2 text-sm text-[#1A5FB4] hover:gap-3 transition-all"
            >
              See more <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
            id="patents"
          >
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-[#1A5FB4]" />
              <div>
                <div className="font-bold text-xl">Patents</div>
                <div className="text-sm text-gray-500">등록 및 출원</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "딥페이크 탐지 방법 및 시스템", status: "국내 등록" },
                { title: "AI 모델 취약점 분석 장치", status: "국내 출원" },
                { title: "메타버스 연속 인증 방법", status: "국제 출원" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.08 }}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.status}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="flex items-center gap-2 text-sm text-[#1A5FB4] hover:gap-3 transition-all"
            >
              See more <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-[#1A5FB4]" />
              <div>
                <div className="font-bold text-xl">Publications</div>
                <div className="text-sm text-gray-500">논문 발표</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "Red-Teaming LLMs with Token Control Score", venue: "RAID 2025" },
                { title: "BoKASAN: Binary-only Kernel Address Sanitizer", venue: "USENIX Sec 2023" },
                { title: "Fuzzing JS Interpreters with RL Mutation", venue: "ISSTA 2024" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.08 }}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.venue}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="flex items-center gap-2 text-sm text-[#1A5FB4] hover:gap-3 transition-all"
            >
              See more <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
