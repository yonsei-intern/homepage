import { motion, useScroll, useTransform } from "motion/react";

export function Navigation() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#ebebeb]">
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-[#1A5FB4]"
        style={{ width: progressWidth }}
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-lg font-bold">
          <span className="text-[#1A5FB4]">AI</span>
          <span className="text-[#0a0a0a]"> Security Lab</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <button onClick={() => scrollToSection("professor")} className="hover:text-[#1A5FB4] transition-colors">
            Professor
          </button>
          <button onClick={() => scrollToSection("people")} className="hover:text-[#1A5FB4] transition-colors">
            People
          </button>
          <button onClick={() => scrollToSection("publications")} className="hover:text-[#1A5FB4] transition-colors">
            Publications
          </button>
          <button onClick={() => scrollToSection("patents")} className="hover:text-[#1A5FB4] transition-colors">
            Patents
          </button>
          <button onClick={() => scrollToSection("projects")} className="hover:text-[#1A5FB4] transition-colors">
            Projects
          </button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-[#1A5FB4] transition-colors">
            Contact
          </button>
        </div>

        <button className="bg-[#1A5FB4] text-white px-5 py-2 rounded-full text-sm hover:bg-[#164b94] transition-colors">
          Join Us
        </button>
      </div>
    </nav>
  );
}
