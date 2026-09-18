export type ResearchTeamKey = "ai_security" | "deepfake" | "vulnerability";

export type ResearchTeam = {
  key: ResearchTeamKey;
  label: string;
  english: string;
  color: string;
  softColor: string;
  description: string;
  keywords: string[];
};

export type NewsItem = {
  id: string;
  year: string;
  source: string;
  title: string;
  sub: string | null;
  linkUrl: string | null;
};

export const RESEARCH_TEAMS: ResearchTeam[] = [
  {
    key: "ai_security",
    label: "AI 보안",
    english: "AI SECURITY",
    color: "#1A5FB4",
    softColor: "#f3f7ff",
    description:
      "시스템 자체의 안전성 확보를 위해 생성형 AI 기반 시스템에서의 정보 노출, 프롬프트 주입, 모델 탈옥 등 AI 고유의 취약점을 분석하고 방지하는 기술을 개발합니다.",
    keywords: ["ai", "llm", "model", "모델", "인공지능", "생성형", "프롬프트", "jailbreak", "탈옥", "fine-tuning", "membership"],
  },
  {
    key: "deepfake",
    label: "딥페이크",
    english: "DEEPFAKE",
    color: "#A16207",
    softColor: "#fff8f1",
    description:
      "AI가 만들어낸 위협에 대응하기 위해 다양한 플랫폼에서 유통되는 in-the-wild 딥페이크 콘텐츠에 대한 일반화된 탐지 모델을 연구합니다.",
    keywords: [
      "deepfake",
      "딥페이크",
      "fake",
      "synthetic",
      "media",
      "콘텐츠",
      "multi-view slot attention",
      "slot attention",
      "paraphrased",
      "image quality",
      "deepfake defenses",
    ],
  },
  {
    key: "vulnerability",
    label: "취약성 탐지",
    english: "VULNERABILITY",
    color: "#047857",
    softColor: "#f1fbf7",
    description:
      "퍼징, 심볼릭 실행, 정적·동적 분석 등 자동화된 보안 분석 방법에 AI 기술을 접목하여 코드, 시스템 로그, 네트워크 트래픽 상의 미확인 취약점을 탐지합니다.",
    keywords: ["취약", "vulnerab", "fuzz", "퍼징", "symbolic", "정적", "동적", "로그", "traffic", "트래픽", "사이버", "수사", "telegram", "텔레그램"],
  },
];

export const FALLBACK_NEWS: NewsItem[] = [
  {
    id: "fallback-ai-report",
    year: "2025",
    source: "보안뉴스",
    title: "[2025 AI 보안 솔루션 리포트] AI 보안 솔루션, 능동형 AI와 XAI로 진짜 AI가 되다",
    sub: null,
    linkUrl: "https://www.boannews.com/news/articleView.html?idxno=140730",
  },
  {
    id: "fallback-cyber-investigation",
    year: "2025",
    source: "베테랑경찰",
    title: "\"텔레그램 협력, 금단 영역 넘은 거죠\"…사이버 수사는 진화 중",
    sub: null,
    linkUrl: "https://n.news.naver.com/mnews/article/421/0008619418?sid=102",
  },
  {
    id: "fallback-kis-column",
    year: "2025",
    source: "KIS 칼럼",
    title: "[한국정보보호학회 칼럼] AI 모델 보안과 안전 그리고 신뢰",
    sub: null,
    linkUrl: "https://www.boannews.com/news/articleView.html?idxno=140284",
  },
  {
    id: "fallback-tifs",
    year: "2025",
    source: "IEEE TIFS",
    title: "Amplifying Training Data Exposure through Fine-Tuning with Pseudo-Labeled Memberships",
    sub: "IEEE Transactions on Information Forensics and Security · Impact Factor: 8",
    linkUrl: null,
  },
  {
    id: "fallback-raid",
    year: "2025",
    source: "RAID",
    title: "Red-Teaming LLMs with Token Control Score: Efficient, Universal, and Transferable Jailbreaks",
    sub: "Research in Attacks, Intrusions, and Defenses · BK, 정보과학회 우수학술대회",
    linkUrl: null,
  },
  {
    id: "fallback-wisa",
    year: "2025",
    source: "WISA",
    title: "LeakGuard: Detecting Attribute Leakage in Diffusion Models",
    sub: null,
    linkUrl: null,
  },
  {
    id: "fallback-iccv",
    year: "2025",
    source: "ICCV",
    title: "Multi-View Slot Attention Using Paraphrased Texts",
    sub: null,
    linkUrl: null,
  },
  {
    id: "fallback-issta",
    year: "2024",
    source: "ISSTA",
    title: "Fuzzing JavaScript Interpreters with Coverage-Guided RL",
    sub: null,
    linkUrl: null,
  },
];

export const HOME_NEWS_LIMIT = 7;

export function resolveNewsTeam(item: NewsItem) {
  const haystack = `${item.source} ${item.title} ${item.sub ?? ""}`.toLowerCase();
  return RESEARCH_TEAMS.find((team) =>
    team.keywords.some((keyword) => haystack.includes(keyword.toLowerCase())),
  ) ?? RESEARCH_TEAMS[0];
}
