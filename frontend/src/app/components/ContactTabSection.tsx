import { motion } from "motion/react";
import { TabPage } from "./TabPrimitives";

const OFFICES = [
  {
    name: "교수님 연구실",
    location: "연세대학교 제4공학관 407호",
    phone: "02-2123-4523",
    email: "taekyoung@yonsei.ac.kr",
  },
  {
    name: "연구실",
    location: "연세대학교 제1공학관 109동 110호",
    phone: "02-2123-4197",
    email: "yonsei.seclab@gmail.com",
  },
] as const;

export function ContactTabSection() {
  return (
    <TabPage pageKey="contact">
      <section className="min-h-[calc(100dvh-82px)] bg-white px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold mb-3 text-[#0a0a0a]"
            >
              찾아오시는 <span className="text-[#1A5FB4]">길</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-[#70829f] text-base"
            >
              Location
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-10">
            <div className="space-y-8 text-center lg:text-left">
              {OFFICES.map((office) => (
                <motion.div
                  key={office.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <h3 className="font-bold text-[#0f2448] text-2xl">{office.name}</h3>
                  <p className="text-[#30496e] text-xl">{office.location}</p>
                  <p className="text-[#1A5FB4] text-lg">{office.phone}</p>
                  <p className="text-[#4c6283] text-base">{office.email}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.3 }}
                className="pt-2"
              >
                <p className="text-[#30496e] text-xl">서울특별시 서대문구 연세로 50</p>
              </motion.div>
            </div>

            <div className="overflow-hidden rounded-2xl h-[420px] bg-[#f8fbff]">
              <iframe
                src="https://maps.google.com/maps?q=Yonsei%20University%20Seoul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yonsei University Map"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 text-[#1A5FB4] hover:text-[#164c91] transition-colors text-base">
              상세 위치 및 교통 안내
            </button>
          </div>
        </div>
      </section>
    </TabPage>
  );
}
