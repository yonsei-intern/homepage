import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center bg-[#0a0a0a] px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            <span className="text-white">찾아오시는 길 & </span>
            <span className="text-[#4A9EFF]">연락처</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-8 space-y-6"
          >
            <div className="text-xl font-bold text-white mb-6">
              교수님 연구실
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#4A9EFF] flex-shrink-0 mt-1" />
                <div className="text-gray-300 leading-relaxed">
                  <div>서울특별시 서대문구 연세로 50</div>
                  <div>연세대학교 새천년관 407호</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-[#4A9EFF] flex-shrink-0 mt-1" />
                <div className="text-gray-300">02-2123-4523</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-8 space-y-6"
          >
            <div className="text-xl font-bold text-white mb-6">
              정보보호 / AI 보안 연구실
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#4A9EFF] flex-shrink-0 mt-1" />
                <div className="text-gray-300 leading-relaxed">
                  <div>서울특별시 서대문구 연세로 50</div>
                  <div>연세대학교 새천년관 109호, 110호</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-[#4A9EFF] flex-shrink-0 mt-1" />
                <div className="text-gray-300">aiseclab.meet@gmail.com</div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-[#4A9EFF] flex-shrink-0 mt-1" />
                <div className="text-gray-300">02-2123-4197</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center pt-12 border-t border-[#1e1e1e]"
        >
          <div className="text-gray-500 text-sm">
            © 2026 AI Security Lab, Yonsei University. All rights reserved.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
