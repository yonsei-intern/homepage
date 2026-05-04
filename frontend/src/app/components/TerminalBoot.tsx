import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface TerminalBootProps {
  onComplete: () => void;
}

export function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [skipClicked, setSkipClicked] = useState(false);

  const terminalLines = [
    "> Initializing AI Security Lab...",
    "> Connected to Yonsei University network",
    "> Loading research modules...",
    ">",
    "> [AI Security]............[OK]",
    "> [Deepfake Detection].....[OK]",
    "> [Vulnerability Analysis].[OK]",
    ">",
    "> 40+ publications indexed",
    "> IEEE · USENIX · ICCV · ISSTA loaded",
    ">",
    "> Welcome to AI Security Lab.",
    "> System ready. _",
  ];

  useEffect(() => {
    if (skipClicked) return;

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeout: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLineIndex >= terminalLines.length) {
        setTimeout(() => {
          onComplete();
        }, 1200);
        return;
      }

      const currentLine = terminalLines[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const newLines = [...lines];
        newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        setLines(newLines);
        currentCharIndex++;
        timeout = setTimeout(typeNextChar, 28);
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
        timeout = setTimeout(typeNextChar, 300);
      }
    };

    timeout = setTimeout(typeNextChar, 100);

    return () => clearTimeout(timeout);
  }, [skipClicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setSkipClicked(true);
    onComplete();
  };

  if (skipClicked) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center text-sm"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-300 transition-colors text-xs"
      >
        SKIP →
      </button>

      <div className="w-full max-w-3xl px-8">
        {lines.map((line, index) => (
          <div key={index} className="leading-6">
            {line.includes("[OK]") ? (
              <span>
                {line.split("[OK]")[0]}
                <span className="text-[#22c55e]">[OK]</span>
              </span>
            ) : (
              <span className="text-gray-300">{line}</span>
            )}
          </div>
        ))}
        {showCursor && lines.length > 0 && (
          <span className="inline-block w-2 h-4 bg-gray-300 ml-1 align-middle" />
        )}
      </div>
    </motion.div>
  );
}
