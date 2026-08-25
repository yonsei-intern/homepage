import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen bg-[#0a0a0a] px-6 py-24 snap-start snap-always"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-3 text-white">
            찾아오시는 <span className="text-[#4A9EFF]">길</span>
          </h2>
          <p className="text-gray-400 text-base">Location</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid lg:grid-cols-2 gap-12 mb-12"
        >
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h3 className="font-bold text-white text-2xl mb-2">교수님 연구실</h3>
              <p className="text-gray-300 text-xl">연세대학교 새천년관 407호</p>
              <p className="text-[#8bb8ff] text-lg">02-2123-4523</p>
            </div>

            <div>
              <h3 className="font-bold text-white text-2xl mb-2">연구실</h3>
              <p className="text-gray-300 text-xl">연세대학교 새천년관 109호, 110호</p>
              <p className="text-[#8bb8ff] text-lg">02-2123-4197</p>
            </div>

            <div className="pt-2">
              <p className="text-gray-300 text-xl">서울특별시 서대문구 연세로 50</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl h-[420px] bg-[#111318]">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 text-[#4A9EFF] hover:text-[#79b6ff] transition-colors text-base">
            상세 위치 및 교통편 안내 <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
