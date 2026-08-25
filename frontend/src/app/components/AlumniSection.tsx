import { motion } from "motion/react";
import { TabPage } from "./TabPrimitives";

type AlumniEntry = {
  degree: string;
  name: string;
  company: string;
};

type AlumniGroup = {
  school: string;
  entries: AlumniEntry[];
};

const ALUMNI_GROUPS: AlumniGroup[] = [
  {
    school: "연세대학교",
    entries: [
      { degree: "Ph.D.", name: "조민기", company: "티오리(병역특례)" },
      { degree: "M.S.", name: "정지우", company: "국가보안기술연구소" },
      { degree: "M.S.", name: "오명교", company: "KT" },
      { degree: "M.S.", name: "박재우", company: "씨이랩(병역특례)" },
      { degree: "M.S.", name: "임은지", company: "엔아이티서비스" },
      { degree: "M.S.", name: "엄주언", company: "안랩" },
      { degree: "M.S.", name: "진호용", company: "아우토크립트(병역특례)" },
      { degree: "M.S.", name: "안도현", company: "코인원(병역특례)" },
      { degree: "M.S.", name: "윤혜민", company: "삼정KPMG" },
      { degree: "M.S.", name: "정세연", company: "슈어소프트테크" },
      { degree: "M.S.", name: "정수창", company: "베이글코드(인턴)" },
      { degree: "M.S.", name: "김해니", company: "김앤장 법률사무소" },
      { degree: "M.S.", name: "김서영", company: "삼성전자" },
      { degree: "M.S.", name: "김종신", company: "딥테크인컴퍼니" },
      { degree: "M.S.", name: "오상진", company: "현대엔지니어링" },
      { degree: "M.S.", name: "구예은", company: "우리은행" },
      { degree: "M.S.", name: "김슬기", company: "한국정보통신기술협회(TTA)" },
      { degree: "M.S.", name: "장재동", company: "한국인터넷진흥원(KISA)" },
      { degree: "M.S.", name: "윤정환", company: "네이버" },
      { degree: "M.S.", name: "서예지", company: "안랩" },
      { degree: "M.S.", name: "유정빈", company: "피플펀드" },
      { degree: "M.S.", name: "신민식", company: "삼성전자" },
      { degree: "M.S.", name: "이영주", company: "로드맵" },
      { degree: "M.S.", name: "이호연", company: "네이버" },
      { degree: "M.S.", name: "김민우", company: "SK주식회사 C&C" },
      { degree: "M.S.", name: "김경훈", company: "NICE 평가정보" },
      { degree: "M.S.", name: "양원석", company: "Univ. of Oklahoma" },
      { degree: "M.S.", name: "정성미", company: "포스코(POSCO)" },
      { degree: "M.S.", name: "조현웅", company: "우정사업본부" },
      { degree: "M.S.", name: "윤영진", company: "한화 S&C" },
      { degree: "M.S.", name: "유홍렬", company: "지니언스" },
      { degree: "M.S.", name: "방지현", company: "코나아이(Konai)" },
      { degree: "M.S.", name: "노승훈", company: "카카오" },
      { degree: "M.S.", name: "최재우", company: "한국인터넷진흥원(KISA)" },
      { degree: "M.S.", name: "홍모세", company: "펜타시큐리티" },
      { degree: "M.S.", name: "현석우", company: "국가보안기술연구소" },
      { degree: "M.S.", name: "이동건", company: "국방부" },
      { degree: "M.S.", name: "이준원", company: "삼성전자" },
      { degree: "M.S.", name: "김승연", company: "넷엔드(병역특례)" },
    ],
  },
  {
    school: "세종대학교",
    entries: [
      { degree: "Ph.D.", name: "박상호", company: "한국정보통신기술협회(TTA)" },
      { degree: "Ph.D.", name: "신수연", company: "연세대학교 (포스트닥)" },
      { degree: "M.S.", name: "나사랑", company: "한국인터넷진흥원(KISA), 연세대학교 박사과정(파트)" },
      { degree: "M.S.", name: "최원석", company: "유비벨록스 모바일 | 선임연구원" },
      { degree: "M.S.", name: "송성현", company: "금융보안연구원 | 주임연구원" },
      { degree: "M.S.", name: "조길용", company: "유비벨록스 모바일 | 선임연구원" },
      { degree: "M.S.", name: "정연호", company: "유비벨록스 | 과장" },
      { degree: "M.S.", name: "김수희", company: "한영회계법인 | Senior" },
      { degree: "M.S.", name: "김문권", company: "(주)에고소프트 | 과장" },
      { degree: "M.S.", name: "송현수", company: "유비벨록스" },
      { degree: "M.S.", name: "이영권", company: "한국정보통신기술협회(TTA) | 센터장" },
      { degree: "M.S.", name: "정재웅", company: "GMT소프트 | 팀장" },
    ],
  },
];

export function AlumniSection() {
  return (
    <TabPage pageKey="alumni" title="ALUMNI">
      <div className="w-full space-y-8">
        {ALUMNI_GROUPS.map((group) => (
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
                  key={`${group.school}-${entry.degree}-${entry.name}`}
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
        ))}
      </div>
    </TabPage>
  );
}
