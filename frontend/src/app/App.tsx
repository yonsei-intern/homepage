import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { JailbreakChatPage } from "./components/JailbreakChatPage";
import { HomeSection } from "./components/HomeSection";
import { RecruitSection } from "./components/RecruitSection";
import { ProfessorSection } from "./components/ProfessorSection";
import { PeopleTabSection } from "./components/PeopleTabSection";
import { AlumniSection } from "./components/AlumniSection";
import { PublicationsSection } from "./components/PublicationsSection";
import { PatentsSection } from "./components/PatentsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactTabSection } from "./components/ContactTabSection";
import { TABS, type TabKey } from "./tabs";

function renderTab(
  tab: TabKey,
  setActiveTab: (t: TabKey) => void,
  setShowJailbreak: (v: boolean) => void,
) {
  if (tab === "home")
    return <HomeSection onNavigate={setActiveTab} onTry={() => setShowJailbreak(true)} />;
  if (tab === "recruit") return <RecruitSection />;
  if (tab === "professor") return <ProfessorSection />;
  if (tab === "people") return <PeopleTabSection />;
  if (tab === "alumni") return <AlumniSection />;
  if (tab === "publications") return <PublicationsSection />;
  if (tab === "patents") return <PatentsSection />;
  if (tab === "projects") return <ProjectsSection />;
  return <ContactTabSection />;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [showJailbreak, setShowJailbreak] = useState(false);
  const isHome = activeTab === "home";
  const isContact = activeTab === "contact";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#1e3a8a] rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center gap-4">
          <div className="shrink-0 whitespace-nowrap font-bold text-sm md:text-base text-white tracking-tight">
            AI Security <span className="font-normal text-white/50">LAB</span>
          </div>
          <nav className="overflow-x-auto scrollbar-hide ml-auto">
            <div className="inline-flex items-center whitespace-nowrap">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setShowJailbreak(false); }}
                  className={`px-2.5 md:px-3 py-1.5 text-xs md:text-sm transition-colors ${activeTab === tab.key && !showJailbreak
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white/85"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main
        className={
          (isHome || isContact) && !showJailbreak
            ? "h-[calc(100dvh-82px)] w-full no-text-reveal"
            : "max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 no-text-reveal"
        }
      >
        <AnimatePresence mode="wait">
          {renderTab(activeTab, setActiveTab, setShowJailbreak)}
        </AnimatePresence>
      </main>

      {/* Jailbreak Chat Overlay */}
      {showJailbreak && (
        <JailbreakChatPage onBack={() => setShowJailbreak(false)} />
      )}
    </div>
  );
}
