import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ResearchSectionProps {
  number: string;
  category: string;
  title: string;
  description: string[];
  tags: string[];
  papers: { title: string; venue: string }[];
  showTryButton?: boolean;
  onLearnMore?: () => void;
  onTry?: () => void;
}

export function ResearchSection({
  number,
  category,
  title,
  description,
  tags,
  papers,
  showTryButton = false,
  onLearnMore,
  onTry,
}: ResearchSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center bg-white px-6 snap-start snap-always relative"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 lg:items-center">
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

          <div className="text-5xl font-black">
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
                className="px-3 py-1.5 rounded-full text-sm text-[#1A5FB4] bg-[#1A5FB4]/7"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.95 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#1A5FB4] border border-[#1A5FB4]/30 hover:border-[#1A5FB4] hover:bg-[#1A5FB4]/5 transition-colors"
            >
              더 알아보기
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {showTryButton && (
              <button
                type="button"
                onClick={onTry}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#1A5FB4] hover:bg-[#174f98] transition-colors"
              >
                체험해보기
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </motion.div>
        </div>

        <div className="w-full max-w-[760px] rounded-2xl bg-[#f8fbff] px-4 py-3.5 md:px-6 md:py-5 space-y-0.5 lg:self-center lg:ml-auto">
          {papers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[132px_1fr] gap-2.5 md:gap-5 py-3.5 border-b border-[#1A5FB4]/10 last:border-b-0"
            >
              <div className="text-xs md:text-sm font-semibold text-[#1A5FB4] tracking-wide">
                {paper.venue}
              </div>
              <div className="text-gray-900 text-[15px] md:text-base leading-snug font-medium">
                {paper.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-8 right-8 text-sm text-gray-300">
        {number} / 03
      </div>
    </section>
  );
}
