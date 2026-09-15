import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TabPage } from "./TabPrimitives";
import { useSiteImages } from "../hooks/useSiteImages";

type PeopleMember = {
  id: string;
  course: "phd" | "master" | "intern";
  name: string;
  note: string | null;
  photoUrl: string | null;
  publicEmail: string | null;
};

function MemberPhoto({ member }: { member: PeopleMember }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [member.photoUrl]);

  if (!member.photoUrl || failed) {
    return (
      <div className="w-full aspect-[3/4] rounded-xl bg-[#e6e9ee] flex items-center justify-center">
        <span className="text-xl md:text-2xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
      </div>
    );
  }

  return (
    <img
      src={member.photoUrl}
      alt={`${member.name} profile`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full aspect-[3/4] rounded-xl object-cover bg-[#e6e9ee]"
    />
  );
}

export function PeopleTabSection() {
  const siteImages = useSiteImages();
  const [students, setStudents] = useState<PeopleMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadStudents = async () => {
      try {
        const response = await fetch("/api/students", { signal: controller.signal });
        if (!response.ok) throw new Error("학생 목록을 불러오지 못했습니다.");
        setStudents(await response.json());
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError("학생 목록을 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadStudents();
    return () => controller.abort();
  }, []);

  const phdStudents = students.filter((student) => student.course === "phd");
  const masterStudents = students.filter((student) => student.course === "master");
  const interns = students.filter((student) => student.course === "intern");

  const renderMembers = (members: PeopleMember[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
      {members.map((member) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <MemberPhoto member={member} />
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
              <img
                src={siteImages.professor_profile ?? "/images/professor/taekyoung-kwon.png"}
                alt="Prof. Taekyoung Kwon"
                className="w-[170px] sm:w-[200px] aspect-[3/4] rounded-xl object-cover bg-[#e6e9ee]"
              />
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
              Ph.D.Students
            </motion.h3>
            <div className="pt-4">
              {loading ? <p className="text-[#5a667a]">Loading...</p> : null}
              {error ? <p className="text-red-600">{error}</p> : null}
              {!loading && !error ? renderMembers(phdStudents) : null}
            </div>
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
            <div className="pt-4">
              {loading ? <p className="text-[#5a667a]">Loading...</p> : null}
              {error ? <p className="text-red-600">{error}</p> : null}
              {!loading && !error ? renderMembers(masterStudents) : null}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[190px_1fr] gap-2 md:gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.25 }}
              className="pt-3 text-[0.96rem] font-semibold text-[#123f86]"
            >
              Interns
            </motion.h3>
            <div className="pt-4">
              {loading ? <p className="text-[#5a667a]">Loading...</p> : null}
              {error ? <p className="text-red-600">{error}</p> : null}
              {!loading && !error && interns.length > 0 ? renderMembers(interns) : null}
              {!loading && !error && interns.length === 0 ? (
                <p className="text-[0.9rem] text-[#7a8496]">등록된 인턴이 없습니다.</p>
              ) : null}
            </div>
          </section>
        </section>
      </div>
    </TabPage>
  );
}
