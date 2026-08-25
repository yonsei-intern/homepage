import { motion } from "motion/react";
import { TabPage } from "./TabPrimitives";

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

export function PeopleTabSection() {
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
          <div className="w-full aspect-[3/4] rounded-xl bg-[#e6e9ee] flex items-center justify-center">
            <span className="text-xl md:text-2xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
          </div>
          <div className="pt-1 text-[0.9rem] text-[#172033] leading-[1.4]">
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
          <div className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
              <div className="w-[170px] sm:w-[200px] aspect-[3/4] rounded-xl bg-[#e6e9ee] flex items-center justify-center">
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
            <div className="pt-4">{renderMembers(PHD_STUDENTS)}</div>
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
            <div className="pt-4">{renderMembers(MASTER_STUDENTS)}</div>
          </section>
        </section>
      </div>
    </TabPage>
  );
}
