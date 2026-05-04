import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ThreatSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration1 = 2000;
    const duration2 = 1500;
    const duration3 = 1000;
    const target1 = 1247000;
    const target2 = 73;
    const target3 = 40;

    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < duration1) {
        setCounter1(Math.floor((elapsed / duration1) * target1));
      } else {
        setCounter1(target1);
      }

      if (elapsed < duration2) {
        setCounter2(Math.floor((elapsed / duration2) * target2));
      } else {
        setCounter2(target2);
      }

      if (elapsed < duration3) {
        setCounter3(Math.floor((elapsed / duration3) * target3));
      } else {
        setCounter3(target3);
      }

      if (elapsed < Math.max(duration1, duration2, duration3)) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 snap-start snap-always relative"
    >
      <div className="text-center space-y-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-2xl text-gray-700"
        >
          지금 이 순간에도
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold"
        >
          <span className="text-[#0a0a0a]">AI가 </span>
          <span className="text-[#1A5FB4]">공격받고</span>
          <span className="text-[#0a0a0a]"> 있다.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-black text-[#1A5FB4]">
              {counter1.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600">일일 jailbreak 시도 건수</div>
          </div>

          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-black text-[#1A5FB4]">
              {counter2}%
            </div>
            <div className="text-sm text-gray-600">탐지 우회 성공률 (방어 전)</div>
          </div>

          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-black text-[#1A5FB4]">
              {counter3}+
            </div>
            <div className="text-sm text-gray-600">저희 연구실 발표 논문 수</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <div className="text-xs text-gray-500 tracking-wide">SCROLL DOWN</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 h-0.5 bg-[#1A5FB4]"
      />
    </section>
  );
}
