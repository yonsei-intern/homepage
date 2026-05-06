import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const TOPIC_CHIPS = [
  { label: "LLM Jailbreak 연구", icon: "🔒" },
  { label: "딥페이크 탐지", icon: "👁" },
  { label: "소프트웨어 취약성", icon: "🔧" },
  { label: "연구실 구성원", icon: "👥" },
  { label: "연구 성과 / 논문", icon: "📄" },
  { label: "연구실 지원하기", icon: "🎓" },
];

const STATS = [
  { value: "180+", label: "Publications" },
  { value: "60+", label: "Patents" },
  { value: "45+", label: "Projects" },
  { value: "120+", label: "Members" },
];

export function JailbreakChatPage({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: content.trim() }]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            "안녕하세요! 연세대학교 AI Security Lab입니다. 현재 AI 응답 기능을 준비 중입니다. LLM Jailbreak, 딥페이크 탐지, 취약성 분석 등 다양한 연구 주제에 대해 곧 질문하실 수 있습니다.",
        },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        돌아가기
      </button>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Hero – shown only before first message */}
        <AnimatePresence>
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-500 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A5FB4]" />
                Yonsei University · Prof. 권태경
              </div>

              <h1 className="text-3xl md:text-[2.6rem] font-bold leading-tight text-[#0a0a0a] mb-3">
                연세대학교 <span className="text-[#1A5FB4]">AI Security Lab</span>
                <br />
                무엇이든 물어보세요.
              </h1>

              <p className="text-sm text-gray-400 mb-10">
                LLM Jailbreak · Deepfake Detection · Vulnerability Analysis
              </p>

              {/* Topic chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-lg">
                {TOPIC_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => sendMessage(chip.label + "에 대해 설명해 주세요")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 hover:border-[#1A5FB4] hover:text-[#1A5FB4] transition-colors"
                  >
                    <span>{chip.icon}</span>
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-xl border border-gray-100 py-3 text-center">
                    <div className="text-lg font-bold text-[#1A5FB4]">{s.value}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message list */}
        {hasMessages && (
          <div className="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1A5FB4] text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className={`px-4 pb-6 ${hasMessages ? "" : "pb-8"}`}>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-4 pt-3 pb-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => { setInput(e.target.value); autoResize(); }}
              onKeyDown={handleKeyDown}
              placeholder="자유롭게 질문하거나, 아래 주제를 선택해 보세요"
              className="w-full resize-none text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent leading-relaxed"
            />
            <div className="flex items-center justify-between mt-1.5">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="w-7 h-7 rounded-full bg-[#1A5FB4] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#174f98] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 pb-4 text-[11px] text-gray-300">
        <span>© 2026 Yonsei AI Security Lab</span>
        <span>aiseclab.meet@gmail.com</span>
      </div>
    </div>
  );
}
