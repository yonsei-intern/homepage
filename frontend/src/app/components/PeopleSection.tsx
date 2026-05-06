import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Member {
  name: string;
  role: string;
}

const MEMBERS: Member[] = Array.from({ length: 10 }, (_, i) => ({
  name: `name${i + 1}`,
  role: "Researcher",
}));

export function PeopleSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);

  const groupWidthRef = useRef(0);
  const xRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const baseVelocityRef = useRef(-16); // idle: move left slowly
  const velocityRef = useRef(-16);
  const scrollingUntilRef = useRef(0);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (groupRef.current) groupWidthRef.current = groupRef.current.offsetWidth;
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (groupRef.current) ro.observe(groupRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const markScrolling = () => {
      scrollingUntilRef.current = performance.now() + 280;
    };
    const pushVelocity = (delta: number) => {
      velocityRef.current = clamp(velocityRef.current - delta, -1200, 1200);
    };

    const onWheel = (e: WheelEvent) => {
      // wheel down(+) => move left faster(-), wheel up(-) => move right(+)
      markScrolling();
      pushVelocity(e.deltaY * 1.35);
    };
    const getScrollTop = (el: Element | Window) =>
      el instanceof Window ? el.scrollY : (el as HTMLElement).scrollTop;
    const getScrollableParent = (el: HTMLElement | null): Element | Window => {
      if (!el) return window;
      let cur: HTMLElement | null = el.parentElement;
      while (cur) {
        const style = getComputedStyle(cur);
        const y = style.overflowY;
        if ((y === "auto" || y === "scroll") && cur.scrollHeight > cur.clientHeight) {
          return cur;
        }
        cur = cur.parentElement;
      }
      return window;
    };

    const scrollTarget = getScrollableParent(sectionRef.current);
    let lastY = getScrollTop(scrollTarget);
    const onScroll = () => {
      const nowY = getScrollTop(scrollTarget);
      const dy = nowY - lastY;
      lastY = nowY;
      markScrolling();
      // scroll down(+) => left, scroll up(-) => right
      pushVelocity(dy * 22);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      scrollTarget.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const isScrollingNow = now < scrollingUntilRef.current;
      const shouldPause = isPaused && !isScrollingNow;

      if (!shouldPause) {
        xRef.current += velocityRef.current * dt;

        const width = groupWidthRef.current;
        if (width > 0) {
          if (-xRef.current >= width) xRef.current += width;
          if (xRef.current > 0) xRef.current -= width;
        }

        // decay toward idle velocity
        velocityRef.current += (baseVelocityRef.current - velocityRef.current) * 0.05;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused]);

  return (
    <section
      id="people"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
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

        <div className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div
            ref={trackRef}
            className="flex w-max gap-6 will-change-transform"
            onWheelCapture={(e) => {
              scrollingUntilRef.current = performance.now() + 280;
              velocityRef.current = Math.max(
                -1200,
                Math.min(1200, velocityRef.current - e.deltaY * 1.35),
              );
            }}
          >
            <div ref={groupRef} className="flex gap-6">
              {MEMBERS.map((member) => (
                <ProfileCard key={`a-${member.name}`} member={member} />
              ))}
            </div>
            <div className="flex gap-6" aria-hidden="true">
              {MEMBERS.map((member) => (
                <ProfileCard key={`b-${member.name}`} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ member }: { member: Member }) {
  return (
    <article className="w-[300px] md:w-[340px] h-[520px] p-0">
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 bg-[#e6e9ee]" />

        <div className="mt-3 bg-[#eef2f7] px-3 py-3 text-center">
          <div className="text-lg font-semibold uppercase tracking-wide text-[#1f2937]">{member.name}</div>
          <div className="text-xs text-[#6b7280] mt-0.5">{member.role}</div>
        </div>
      </div>
    </article>
  );
}
