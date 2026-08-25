import { motion } from "motion/react";
import { useState } from "react";
import { TabPage } from "./TabPrimitives";

const RESEARCH_TRACKS = [
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

const RECRUIT_TARGETS = [
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

const CONTACTS = [
  { key: "address", label: "주소", value: "연세대학교 새천년관 110호" },
  { key: "phone", label: "전화", value: "02)2123-4197" },
  { key: "email", label: "이메일", value: "aiseclab.meet@gmail.com" },
  { key: "web", label: "웹사이트", value: "http://seclab.yonsei.ac.kr/" },
] as const;

export function RecruitSection() {
  const [copied, setCopied] = useState<string | null>(null);

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
            <div className="rounded-xl bg-[#fcfdff] px-1 md:px-2">
              {RESEARCH_TRACKS.map((track) => (
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
                {RECRUIT_TARGETS.map((target, idx) => (
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
              {CONTACTS.map((item) => (
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
