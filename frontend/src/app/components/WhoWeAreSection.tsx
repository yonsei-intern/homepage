import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function WhoWeAreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = ["저희가", "연구합니다."];
  const subtitles = ["권태경 교수님 지도 하에", "AI 보안의 새로운 기준을 만듭니다."];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center bg-white px-6 snap-start snap-always"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="space-y-2">
            {words.map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="text-5xl md:text-7xl font-bold text-[#0a0a0a]"
              >
                {word}
              </motion.div>
            ))}
          </div>

          <div className="space-y-1 pt-4">
            {subtitles.map((subtitle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="text-xl text-gray-600"
              >
                {subtitle}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-2"
          >
            <div className="text-sm text-[#1A5FB4] font-semibold">위치</div>
            <div className="text-gray-900">연세대학교 새천년관</div>
            <div className="text-sm text-gray-600">서울특별시 서대문구 연세로 50</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-2"
          >
            <div className="text-sm text-[#1A5FB4] font-semibold">3대 연구 분야</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">
                AI 보안
              </span>
              <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">
                딥페이크 탐지
              </span>
              <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">
                취약성 탐지
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-2"
          >
            <div className="text-sm text-[#1A5FB4] font-semibold">세계 최우수 학술대회</div>
            <div className="text-gray-900 font-mono text-sm">
              IEEE · USENIX · ICCV · ISSTA
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.08 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[80px] font-black text-gray-900 whitespace-nowrap"
        >
          AI Security · Deepfake · Vulnerability
        </motion.div>
      </div>
    </section>
  );
}
