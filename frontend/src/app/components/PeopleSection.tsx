import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Member {
  id: string;
  course: "phd" | "master" | "intern";
  name: string;
  note: string | null;
  photoUrl: string | null;
}

function imageExists(photoUrl: string | null) {
  if (!photoUrl) return Promise.resolve(false);

  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = photoUrl;
  });
}

export function PeopleSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadMembers = async () => {
      try {
        const response = await fetch("/api/students", { signal: controller.signal });
        if (!response.ok) throw new Error("구성원 목록을 불러오지 못했습니다.");
        const students: Member[] = await response.json();
        const checkedStudents = await Promise.all(
          students.map(async (student) => ((await imageExists(student.photoUrl)) ? student : null)),
        );

        if (!controller.signal.aborted) {
          setMembers(checkedStudents.filter((student): student is Member => student !== null));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError("구성원 목록을 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadMembers();
    return () => controller.abort();
  }, []);

  return (
    <section
      id="people"
      ref={ref}
      className="relative min-h-screen flex items-center bg-white px-6 py-24 pb-24 overflow-x-hidden"
    >
      <div className="relative z-10 max-w-[1600px] mx-auto w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-2 px-1"
        >
          <div className="text-xs tracking-[0.2em] text-[#1A5FB4] uppercase">People</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">연구실 구성원</h2>
        </motion.div>

        {loading ? <p className="text-[#5a667a]">Loading...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}
        {!loading && !error && members.length === 0 ? (
          <p className="text-[#5a667a]">등록된 구성원이 없습니다.</p>
        ) : null}

        {!loading && !error && members.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto pb-4">
            {members.map((member) => (
              <ProfileCard key={member.id} member={member} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProfileCard({ member }: { member: Member }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => setImageFailed(false), [member.photoUrl]);

  const role =
    member.course === "phd"
      ? "Ph.D. Student"
      : member.course === "master"
        ? "Master Student"
        : "Intern";

  if (!member.photoUrl || imageFailed) return null;

  return (
    <article className="w-[170px] sm:w-[190px] lg:w-[200px] shrink-0 space-y-3">
      <div className="w-full">
        <img
          src={member.photoUrl}
          alt={`${member.name} profile`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="w-full aspect-[3/4] rounded-xl object-cover bg-[#e6e9ee]"
        />

        <div className="pt-3 text-[0.9rem] text-[#172033] leading-[1.4]">
          <div className="font-semibold tracking-[0.01em]">{member.name}</div>
          <div className="mt-0.5 text-xs text-[#6b7280]">
            {role}{member.note ? ` ${member.note}` : ""}
          </div>
        </div>
      </div>
    </article>
  );
}
