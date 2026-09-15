import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { TabPage } from "./TabPrimitives";
import { useSiteImages } from "../hooks/useSiteImages";

type ProfessorTimelineEntry = {
  id: string;
  period: string;
  detail: string;
};

type ProfessorPaperEntry = {
  id: string;
  year: string;
  text: string;
  linkUrl: string | null;
};

type ProfessorContent = {
  activities: ProfessorTimelineEntry[];
  career: ProfessorTimelineEntry[];
  papers: ProfessorPaperEntry[];
};

const PROFESSOR_BIO_PARAGRAPHS = [
  "Prof. Kwon was born in Seoul, Korea, and received his academic degrees (B.S., M.S., and Ph.D.) in computer science from Yonsei University, Seoul, Korea. From 1999 to 2000, he did his post-doc study at U.C. Berkeley and developed a password authenticated key exchange protocol called AMP, which was presented at ISOC NDSS 2001 and standardized in IEEE P1363.2 and ISO/IEC 11770-4, respectively.",
  "From 2001 to 2013 Spring, he was a professor of computer engineering at Sejong University, Seoul, Korea. In 2013, he came back to Shinchon Campus to join the faculty of Yonsei University where he is currently a professor of information. He is on the director board of the Korea Institute of Information Security and Cryptology (KIISC) and the editorial committee of the Korean Institute of Information Scientists and Engineers (KIISE). He also serves as committee members or chairs for many international and domestic conferences.",
  "His research interests are mainly in the field of Information Security and Privacy, and include authentication, cryptographic protocols, network security, usable security, software and system security, and adversarial machine learning.",
];

export function ProfessorSection() {
  const siteImages = useSiteImages();
  const [activeTab, setActiveTab] = useState<"activities" | "career" | "papers">("activities");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [content, setContent] = useState<ProfessorContent>({ activities: [], career: [], papers: [] });
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadContent = async () => {
      try {
        const response = await fetch("/api/professor", { signal: controller.signal });
        if (!response.ok) throw new Error("교수 정보를 불러오지 못했습니다.");
        setContent(await response.json());
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setContentError("교수 정보를 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) setContentLoading(false);
      }
    };

    loadContent();
    return () => controller.abort();
  }, []);

  const contacts: Array<{ key: string; label: string; value: string; href?: string }> = [
    { key: "phone", label: "Phone", value: "02-2123-4523", href: "tel:02-2123-4523" },
    { key: "fax", label: "Fax", value: "82-2123-8654" },
    { key: "email", label: "Email", value: "taekyoung@yonsei.ac.kr", href: "mailto:taekyoung@yonsei.ac.kr" },
    { key: "office", label: "Office", value: "407 New Millennium Hall (새천년관 407호)" },
  ];

  const copyContact = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(key);
      window.setTimeout(() => setCopiedContact((prev) => (prev === key ? null : prev)), 1200);
    } catch {
      setCopiedContact(null);
    }
  };

  const paperEntries = content.papers.map((paper) => ({
    ...paper,
    href: paper.linkUrl ?? `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.text)}`,
  }));

  return (
    <TabPage pageKey="professor" title="PROFESSOR">
      <div className="w-full space-y-12">
        <section className="pt-1">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-8 lg:gap-14 items-stretch">
            <div className="w-full max-w-[340px]">
              <img
                src={siteImages.professor_profile ?? "/images/professor/taekyoung-kwon.png"}
                alt="Prof. Taekyoung Kwon"
                className="w-full h-full min-h-[430px] rounded-2xl object-cover bg-[#e5e8ed]"
              />
            </div>
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.3 }}
                className="text-[0.95rem] md:text-[0.98rem] text-[#45556f] leading-[1.75]"
              >
                Professor,
                <br />
                Graduate School of Information, Yonsei University, Seoul, 03722, Korea
              </motion.p>
              <div className="space-y-4">
                <div className="max-w-[82ch] space-y-5">
                  {PROFESSOR_BIO_PARAGRAPHS.map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.3 }}
                      className="text-[0.97rem] md:text-[1rem] text-[#1f2a3d] leading-[1.92]"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-0 mb-[3.75rem]">
          <div>
            {contacts.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-[108px_1fr_auto] items-start md:items-center gap-2 md:gap-4 py-3.5 border-b border-[#e1e6ef]"
              >
                <div className="text-[0.9rem] font-semibold text-[#123f86]">{item.label}</div>
                <div className="text-[0.95rem] text-[#172033] leading-relaxed break-words">
                  {item.href ? (
                    <a href={item.href} className="hover:text-[#123f86] transition-colors underline-offset-2 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => copyContact(item.key, item.value)}
                  className={`justify-self-start md:justify-self-end px-2.5 py-1 text-[0.78rem] rounded transition-colors ${copiedContact === item.key
                    ? "bg-[#123f86] text-white"
                    : "bg-[#f1f4f9] text-[#123f86] hover:bg-[#e6ebf3]"
                    }`}
                >
                  {copiedContact === item.key ? "복사됨" : "복사"}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap gap-5">
            <button
              type="button"
              onClick={() => setActiveTab("activities")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === "activities"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              주요 활동
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("career")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === "career"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              주요 경력
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("papers")}
              className={`pb-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === "papers"
                ? "border-[#1A5FB4] text-[#1A5FB4] font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              주요 논문
            </button>
          </div>

          {contentLoading ? <p className="text-[#6a7e9f]">Loading...</p> : null}
          {contentError ? <p className="text-red-600">{contentError}</p> : null}

          {!contentLoading && !contentError && activeTab === "activities" && (
            <div className="space-y-2.5">
              {content.activities.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[92px_1fr] gap-2"
                  >
                    <div className="text-[0.95rem] font-medium text-[#123f86] whitespace-nowrap">{item.period}</div>
                    <div className="text-[0.95rem] text-gray-700 leading-relaxed">{item.detail}</div>
                  </motion.div>
              ))}
            </div>
          )}

          {!contentLoading && !contentError && activeTab === "career" && (
            <div className="space-y-2.5">
              {content.career.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[92px_1fr] gap-2"
                  >
                    <div className="text-[0.95rem] font-medium text-[#123f86] whitespace-nowrap">{item.period}</div>
                    <div className="text-[0.95rem] text-gray-700 leading-relaxed">{item.detail}</div>
                  </motion.div>
              ))}
            </div>
          )}

          {!contentLoading && !contentError && activeTab === "papers" && (
            <div className="space-y-3">
              {paperEntries.map((paper, index) => (
                <motion.a
                  key={paper.id}
                  href={paper.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-[34px_1fr] gap-3 text-[0.95rem] text-gray-700 leading-relaxed hover:text-[#1A5FB4] transition-colors"
                >
                  <span className="text-[#1A5FB4] font-semibold">{index + 1}.</span>
                  <span>{paper.text}</span>
                </motion.a>
              ))}
            </div>
          )}
        </section>
      </div>
    </TabPage>
  );
}
