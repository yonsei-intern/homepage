import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TabPage } from "./TabPrimitives";

type AlumniEntry = {
  id: string;
  degree: string;
  name: string;
  school: string;
  company: string;
};

type AlumniGroup = {
  school: string;
  entries: AlumniEntry[];
};

export function AlumniSection() {
  const [alumni, setAlumni] = useState<AlumniEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadAlumni = async () => {
      try {
        const response = await fetch("/api/alumni", { signal: controller.signal });
        if (!response.ok) throw new Error("졸업생 목록을 불러오지 못했습니다.");
        setAlumni(await response.json());
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError("졸업생 목록을 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadAlumni();
    return () => controller.abort();
  }, []);

  const groups = alumni.reduce<AlumniGroup[]>((result, entry) => {
    const lastGroup = result[result.length - 1];
    if (lastGroup?.school === entry.school) {
      lastGroup.entries.push(entry);
    } else {
      result.push({ school: entry.school, entries: [entry] });
    }
    return result;
  }, []);

  return (
    <TabPage pageKey="alumni" title="ALUMNI">
      <div className="w-full space-y-8">
        {loading ? <p className="text-[#5a667a]">Loading...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}

        {!loading && !error
          ? groups.map((group) => (
              <section key={group.school} className="grid grid-cols-1 md:grid-cols-[106px_1fr] gap-2 md:gap-8">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="pt-3 text-[0.92rem] font-semibold text-[#123f86]"
                >
                  {group.school}
                </motion.h3>
                <div>
                  {group.entries.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.25 }}
                      className={`grid grid-cols-1 md:grid-cols-[64px_120px_1fr] gap-1 md:gap-4 py-3.5 ${idx < group.entries.length - 1 ? "border-b border-[#e1e6ef]" : ""}`}
                    >
                      <div className="text-[0.84rem] font-semibold text-[#123f86]">{entry.degree}</div>
                      <div className="text-[0.95rem] font-medium text-[#0a0a0a]">{entry.name}</div>
                      <div className="text-[0.94rem] text-[#4f5e76] leading-relaxed break-words">{entry.company}</div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))
          : null}
      </div>
    </TabPage>
  );
}
