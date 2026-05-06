import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface TerminalBootProps {
  onComplete: () => void;
}

const LINES: { text: string; delay: number; type?: "ok" | "dim" | "highlight" }[] = [
  { text: "> Yonsei University AI Security Lab", delay: 0, type: "highlight" },
  { text: "> Booting system...", delay: 400 },
  { text: ">", delay: 750, type: "dim" },
  { text: "> Supervisor ............. Prof. Taekyoung Kwon", delay: 950 },
  { text: "> Research Area .......... AI Security / Deepfake / Vulnerability", delay: 1250 },
  { text: "> Location ............... Saechunyun Hall, Yonsei University", delay: 1550 },
  { text: ">", delay: 1850, type: "dim" },
  { text: "> [AI Security]         [OK]", delay: 2050, type: "ok" },
  { text: "> [Deepfake Detection]  [OK]", delay: 2300, type: "ok" },
  { text: "> [Vulnerability]       [OK]", delay: 2550, type: "ok" },
  { text: ">", delay: 2800, type: "dim" },
  { text: "> 40+ publications  ·  IEEE · USENIX · ICCV · ISSTA", delay: 3000 },
  { text: ">", delay: 3300, type: "dim" },
  { text: "> System ready.", delay: 3500, type: "highlight" },
];

const COMPLETE_DELAY = 4600;

export function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finish = () => {
    setExiting(true);
    setTimeout(onComplete, 700);
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleCount((n) => Math.max(n, i + 1)), line.delay));
    });
    timers.push(setTimeout(finish, COMPLETE_DELAY));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#060810] flex items-center justify-center"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <button
            onClick={finish}
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-400 transition-colors text-xs tracking-widest"
          >
            SKIP →
          </button>

          <div className="w-full max-w-xl px-8 space-y-1.5">
            {LINES.slice(0, visibleCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="leading-7 text-sm"
              >
                {line.type === "ok" ? (
                  <span className="text-gray-400">
                    {line.text.replace("[OK]", "")}
                    <span className="text-[#22c55e] font-semibold">[OK]</span>
                  </span>
                ) : line.type === "dim" ? (
                  <span className="text-gray-700">{line.text}</span>
                ) : line.type === "highlight" ? (
                  <span className="text-white font-semibold">{line.text}</span>
                ) : (
                  <span className="text-gray-400">{line.text}</span>
                )}
              </motion.div>
            ))}

            {visibleCount > 0 && visibleCount < LINES.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-2 h-4 bg-gray-500 align-middle ml-0.5"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
