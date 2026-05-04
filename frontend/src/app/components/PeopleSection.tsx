import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Member {
  name: string;
  role: string;
  initials: string;
}

export function PeopleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const members: Member[] = [
    { name: "권태경", role: "지도교수", initials: "TK" },
    { name: "박사 연구원", role: "PhD Candidate", initials: "Ph" },
    { name: "석사 연구원 1", role: "Master's Student", initials: "M1" },
    { name: "석사 연구원 2", role: "Master's Student", initials: "M2" },
    { name: "석사 연구원 3", role: "Master's Student", initials: "M3" },
    { name: "인턴 1", role: "Intern", initials: "I1" },
    { name: "인턴 2", role: "Intern", initials: "I2" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const eyebrow = "PEOPLE";

  return (
    <section
      id="people"
      ref={ref}
      className="min-h-screen flex items-center bg-white px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-xs tracking-widest text-[#1A5FB4] uppercase"
          >
            {eyebrow.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold"
          >
            연구실 구성원
          </motion.h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * 280 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.07 }}
                  className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-xl p-6 hover:-translate-y-1 hover:border-[#1A5FB4] transition-all duration-200 cursor-pointer"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#1A5FB4] to-[#4A9EFF] flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {member.initials}
                  </div>
                  <div className="text-center space-y-2">
                    <div className="font-semibold text-lg">{member.name}</div>
                    <div className="inline-block px-3 py-1 bg-[#1A5FB4]/10 text-[#1A5FB4] text-xs rounded-full">
                      {member.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-300 hover:border-[#1A5FB4] hover:bg-[#1A5FB4]/5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-300 hover:border-[#1A5FB4] hover:bg-[#1A5FB4]/5 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
