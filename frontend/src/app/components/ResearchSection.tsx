import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Eye, Search } from "lucide-react";

interface ResearchSectionProps {
  number: string;
  category: string;
  title: string;
  description: string[];
  tags: string[];
  papers: { title: string; venue: string }[];
  icon: "shield" | "eye" | "search";
}

export function ResearchSection({
  number,
  category,
  title,
  description,
  tags,
  papers,
  icon,
}: ResearchSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const IconComponent = icon === "shield" ? Shield : icon === "eye" ? Eye : Search;

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center bg-white px-6 snap-start snap-always relative"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[120px] font-black text-gray-100 leading-none"
          >
            {number}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs tracking-widest text-[#1A5FB4] uppercase"
          >
            {category}
          </motion.div>

          <div className="text-5xl font-black space-y-2">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.03 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="space-y-3">
            {description.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.12 }}
                className="text-gray-700 leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.06 }}
                className="px-4 py-2 bg-[#1A5FB4]/5 border border-[#1A5FB4]/20 rounded-full text-sm text-[#1A5FB4]"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4"
          >
            <IconComponent className="w-16 h-16 text-[#1A5FB4]/20" strokeWidth={1.5} />
          </motion.div>
        </div>

        <div className="space-y-4">
          {papers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#1A5FB4] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-sm font-semibold text-[#1A5FB4] mb-2">
                {paper.venue}
              </div>
              <div className="text-gray-900 leading-relaxed">{paper.title}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-8 right-8 text-sm text-gray-300">
        {number} / 05
      </div>
    </section>
  );
}
