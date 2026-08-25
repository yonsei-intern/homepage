import { motion } from "motion/react";
import { useState } from "react";
import { TabPage } from "./TabPrimitives";

const PROFESSOR_BIO_PARAGRAPHS = [
  "Prof. Kwon was born in Seoul, Korea, and received his academic degrees (B.S., M.S., and Ph.D.) in computer science from Yonsei University, Seoul, Korea. From 1999 to 2000, he did his post-doc study at U.C. Berkeley and developed a password authenticated key exchange protocol called AMP, which was presented at ISOC NDSS 2001 and standardized in IEEE P1363.2 and ISO/IEC 11770-4, respectively.",
  "From 2001 to 2013 Spring, he was a professor of computer engineering at Sejong University, Seoul, Korea. In 2013, he came back to Shinchon Campus to join the faculty of Yonsei University where he is currently a professor of information. He is on the director board of the Korea Institute of Information Security and Cryptology (KIISC) and the editorial committee of the Korean Institute of Information Scientists and Engineers (KIISE). He also serves as committee members or chairs for many international and domestic conferences.",
  "His research interests are mainly in the field of Information Security and Privacy, and include authentication, cryptographic protocols, network security, usable security, software and system security, and adversarial machine learning.",
];

const PROFESSOR_ACTIVITIES = [
  "2013-현재 : 연세대학교 정보대학원 정교수",
  "2020-현재 : 연세대학교 인공지능대학원 AI+X 겸직교수",
  "2024-현재 : 연세대학교 교무처 교수학습혁신센터장",
  "2024-현재 : 연세대학교 LearnUs 추진본부 교과분야 단장",
  "2024-현재 : 연세대학교 지능형혁신연구소 소장",
  "2024-현재 : 한국정보보학회 AI보안연구회 위원장",
  "2006-현재 : 한국정보보호학회 상임이사",
  "2003-현재 : 한국정보보호학회 논문지 편집위원",
  "2007-현재 : 정보과학회 논문지 편집위원",
  "2008-현재 : 한국정보보호학회 암호연구회 운영위원",
  "2006-현재 : 대검찰청 디지털수사 자문위원",
  "2021-현재 : 국민생활과학자문단 사이버안전분과 위원",
  "2022-현재 : 에스알 AI빅데이터 분과 위원",
  "2024-현재 : 경찰청 디지털포렌식 자문위원",
  "2024-현재 : 경찰청 사이버성폭력 수사 자문위원",
  "2022-현재 : 서울시 개인정보보호 심의위원",
  "2025-현재 : 금융보안원 자문위원",
  "2025-현재 : 금융감독원 자문위원",
  "2025-현재 : 국가 딥페이크 대응 자문위원회 위원장",
  "2026-현재 : 개인정보보호위원회 인공지능 프라이버시 위원",
  "2026-현재 : 한국인터넷진흥원 램섬웨어 전주기 대응 위원",
  "2026-현재 : 국가인공지능전략위원회 보안TF 위원",
];

const PROFESSOR_CAREER = [
  "1999-2000 : Univ. of California at Berkeley, 포스트닥",
  "2001-2013 : 세종대학교 컴퓨터공학과 교수",
  "2007-2008 : Univ. of Maryland at College Park, 교환교수",
  "2009-2010 : 세종대학교 컴퓨터공학과 컴퓨터소프트웨어전공 학과장",
  "2011-2012 : 세종대학교 정보보호학과 학과장",
  "2013-2018 : 연세대학교 지식서비스보안과정 주임교수",
  "2015-2018 : 연세대학교 디지털포렌식 경찰청계약학과 주임교수",
  "2016-2019 : 연세대학교 IT정책전략연구소 소장",
  "2022-2024 : 연세대학교 글로벌인재대학 응용정보공학 책임교수",
  "2022-2024 : 연세대학교 교보AI빅데이터학과 주임교수",
  "2016-2017 : 정보과학회 이사",
  "2021-2024 : 한국연구재단 기초연구본부 전문위원",
  "2022-2026 : 경찰청 자체평가위원회 위원",
];

const PROFESSOR_PAPERS = [
  "Jeewoo Jung, Taekyoung Kwon, \"Enhancing Differential Fuzzing of Cryptographic Libraries with Sustainable Hybrid Fuzzing and Crypto-Specific Mutation,\" in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2024. (Best Paper Award)",
  "Leo Hyun Park, Jaeuk Kim, Myung Gyo Oh, Jaewoo Park, and Taekyoung Kwon, \"Adversarial Feature Alignment: Balancing Robustness and Accuracy in Deep Learning via Adversarial Training,\" in Proc. the 17th ACM Workshop on Artificial Intelligence and Security (AISec), Oct. 2024.",
  "Jueon Eom, Seyeon Jeong, and Taekyoung Kwon, \"Fuzzing JavaScript Interpreters with Coverage-Guided Reinforcement Learning for LLM-based Mutation,\" in Proc. the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA), Sep. 2024.",
  "Mingi Cho, Dohyeon An, Hoyong Jin, and Taekyoung Kwon, \"BoKASAN: Binary-only Kernel Address Sanitizer for Effective Kernel Fuzzing,\" 32nd USENIX Security Symposium (USENIX Security), Aug. 2023.",
  "Leo Hyun Park, Soochang Chung, Jaeuk Kim, and Taekyoung Kwon, \"GradFuzz: Fuzzing Deep Neural Networks with Gradient Vector Coverage for Adversarial Examples,\" Neurocomputing, Elsevier, Vol.522, pp.165-180, Feb. 2023.",
  "Hoyong Jin, Dohyeon An, and Taekyoung Kwon, \"Differential Testing of Cryptographic Libraries with Hybrid Fuzzing,\" Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022. (Best Paper Award)",
  "Leo Hyun Park, Eunbi Hwang, Donggun Lee, and Taekyoung Kwon, \"Towards Constructing Consistent Pattern Strength Meters with User’s Visual Perception,\" Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022.",
  "Leo Hyun Park, Jaeuk Kim, Jaewoo Park, and Taekyoung Kwon, \"Mixed and Constrained Input Mutation for Effective Fuzzing of Deep Learning Systems,\" Information Sciences, Elsevier, Vol.614, pp.497-517, Oct. 2022.",
  "Leo Hyun Park, Jungbeen Yu, Hong-Koo Kang, Taejin Lee, and Taekyoung Kwon, \"Birds of a Feature: Intrafamily Clustering for Version Identification of Packed Malware,\" IEEE Systems Journal, Vol.14, pp.4545-4556, Sep. 2020.",
  "Mingi Cho, Jaedong Jang, Yezee Seo, Seyeon Jeong, Soochang Chung, and Taekyoung Kwon, \"Towards Bidirectional LUT-level Detection of Hardware Trojans,\" Computers & Security, Elsevier, Vol.104, May 2021.",
  "Mingi Cho, Seoyoung Kim, and Taekyoung Kwon, \"Intriguer: Field-Level Constraint Solving for Hybrid Fuzzing,\" Proc. the ACM Conference on Computer and Communications Security (ACM CCS), pp.515-530, Nov. 2019.",
  "Hoyong Lee, Seungyeon Kim, and Taekyoung Kwon, \"Here Is Your Fingerprint! Actual Risk versus User Perception of Latent Fingerprints and Smudges Remaining on Smartphones,\" Proc. the 33rd Annual Computer Security Applications Conference (ACSAC), Orlando, Florida, pp.512-527, Dec. 2017.",
  "Taekyoung Kwon and Sarang Na, \"SteganoPIN: Two-Faced Human-Machine Interface for Practical Enforcement of PIN Entry Security,\" IEEE Trans. on Human-Machine Systems, Vol.46, No.1, pp.143-150, February 2016.",
  "Jonghyup Lee, Leehyung Kim, and Taekyoung Kwon, \"FlexiCast: Energy-Efficient Software Integrity Checks to Build Secure Industrial Wireless Active Sensor Networks,\" IEEE Trans. on Industrial Informatics, Vol.12, No.4, pp.6-14, 2016.",
  "Taekyoung Kwon and Jin Hong, \"Analysis and Improvement of a PIN-Entry Method Resilient to Shoulder-Surfing and Recording Attacks,\" IEEE Trans. on Information Forensics and Security, Vol.10, No.2, pp.278-292, February 2015.",
  "Taekyoung Kwon, Sooyeon Shin, and Sarang Na, \"Covert Attentional Shoulder Surfing: Human Adversaries Are More Powerful Than Expected,\" IEEE Trans. on Systems, Man, and Cybernetics Systems (Formerly Part A), Vol.44, No.6, pp.716-727, June 2014.",
  "Taekyoung Kwon and Sarang Na, \"TinyLock: Affordable Defense Against Smudge Attacks on Smartphone Pattern Lock Systems,\" Computers & Security, Elsevier, Vol.42, pp.137-150, May 2014.",
  "Taekyoung Kwon, \"Privacy Preservation with X.509 Standard Certificates,\" Information Sciences, Elsevier, Vol.181, No.13, pp.2906-2921, July 2011.",
  "Junghae Cheon, Stanislav Jarecki, Taekyoung Kwon, and Mun-Kyu Lee, \"Fast Exponentiation Using Split Exponents,\" IEEE Trans. on Information Theory, Vol.57, No.3, pp.1816-1826, March 2011.",
  "Sooyeon Shin, Taekyoung Kwon, Gil-yong Jo, Youngman Park, and Haekyu Rhy, \"An Experimental Study of Hierarchical Intrusion Detection for Wireless Industrial Sensor Networks,\" IEEE Trans. on Industrial Informatics, Vol.6, No.4, pp.744-757, November 2010.",
  "Taekyoung Kwon and Jin Hong, \"Secure and Efficient Broadcast Authentication in Wireless Sensor Networks,\" IEEE Trans. on Computers, Vol.59, No.8, pp.1120-1133, August 2010.",
  "JongHyup Lee, Taekyoung Kwon, and JooSeok Song, \"Group Connectivity Model for Industrial Wireless Sensor Networks,\" IEEE Trans. on Industrial Electronics, Vol.57, No.5, pp.1835-1844, July 2010.",
  "Taekyoung Kwon, JongHyup Lee, and JooSeok Song, \"Location-based Pairwise Key Predistribution for Wireless Sensor Networks,\" IEEE Trans. on Wireless Communications, Vol.8, No.11, pp.5436-5442, November 2009.",
  "Taekyoung Kwon and Hyeonjoon Moon, \"Biometric Authentication for Border Control Applications,\" IEEE Trans. on Knowledge and Data Engineering, Vol.20, No.8, pp.1091-1096, August 2008.",
  "Taekyoung Kwon, Hyungwoo Lee, and Jae-il Lee, \"A Practical Method for Generating Digital Signatures Using Biometrics,\" IEICE Trans. on Communications, Vol.E90-B, No.6, pp.1381-1389, 2007.",
  "Jiyong Jang, Taekyoung Kwon, and Jooseok Song, \"A Time-based Key Management Protocol for Wireless Sensor Networks,\" Information Security Practice and Experience, Lecture Notes in Computer Science, Vol.4464, Springer-Verlag, pp.314-328, 2007.",
  "Chaehoon Lim and Taekyoung Kwon, \"Strong and Robust RFID Authentication Enabling Perfect Ownership Transfer,\" Information and Communications Security, Lecture Notes in Computer Science, Vol.4307, Springer-Verlag, pp.1-20, 2006.",
  "Taekyoung Kwon, \"Practical Authenticated Key Agreement Using Passwords,\" Information Security, Lecture Notes in Computer Science, Vol.3225, Springer-Verlag, pp.1-12, September 2004.",
  "Taekyoung Kwon, \"Refinement and Improvement of Virtual Software Token Protocols,\" IEEE Communications Letters, Vol.8, No.1, pp.75-77, January 2004.",
  "Taekyoung Kwon, \"Authentication and Key Agreement via Memorable Password,\" Proc. of NDSS (Network and Distributed Systems Security), February 2001. (IEEE P1363.2 and ISO/IEC 11770-4 Proposal)",
  "Taekyoung Kwon and Jooseok Song, \"Secure Agreement Scheme for gxy via Password Authentication,\" IEE Electronics Letters, Vol.35, No.11, pp.892-893, May 1999.",
  "Taekyoung Kwon, Myeongho Kang, and Jooseok Song, \"An Adaptable and Reliable Authentication Protocol for Communication Networks,\" Proc. of IEEE INFOCOM 97, pp.738-745, April 1997.",
];

export function ProfessorSection() {
  const [activeTab, setActiveTab] = useState<"activities" | "career" | "papers">("activities");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

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

  const paperEntries = PROFESSOR_PAPERS.map((text, index) => {
    const years = text.match(/\b(?:19|20)\d{2}\b/g);
    const year = years && years.length > 0 ? years[years.length - 1] : "N/A";
    return {
      index,
      year,
      text,
      href: `https://scholar.google.com/scholar?q=${encodeURIComponent(text)}`,
    };
  }).sort((a, b) => {
    const ay = a.year === "N/A" ? -1 : Number(a.year);
    const by = b.year === "N/A" ? -1 : Number(b.year);
    if (by !== ay) return by - ay;
    return a.index - b.index;
  });

  const splitTimeline = (item: string) => {
    const separator = " : ";
    const idx = item.indexOf(separator);
    if (idx === -1) return { period: "", detail: item };
    return {
      period: item.slice(0, idx),
      detail: item.slice(idx + separator.length),
    };
  };

  return (
    <TabPage pageKey="professor" title="PROFESSOR">
      <div className="w-full space-y-12">
        <section className="pt-1">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-8 lg:gap-14 items-stretch">
            <div className="w-full max-w-[340px]">
              <div className="w-full h-full min-h-[430px] rounded-2xl bg-[#e5e8ed] flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-semibold tracking-[0.14em] text-gray-400/70">TBD</span>
              </div>
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

          {activeTab === "activities" && (
            <div className="space-y-2.5">
              {PROFESSOR_ACTIVITIES.map((item) => {
                const { period, detail } = splitTimeline(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[92px_1fr] gap-2"
                  >
                    <div className="text-[0.95rem] font-medium text-[#123f86] whitespace-nowrap">{period}</div>
                    <div className="text-[0.95rem] text-gray-700 leading-relaxed">{detail}</div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "career" && (
            <div className="space-y-2.5">
              {PROFESSOR_CAREER.map((item) => {
                const { period, detail } = splitTimeline(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[92px_1fr] gap-2"
                  >
                    <div className="text-[0.95rem] font-medium text-[#123f86] whitespace-nowrap">{period}</div>
                    <div className="text-[0.95rem] text-gray-700 leading-relaxed">{detail}</div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "papers" && (
            <div className="space-y-3">
              {paperEntries.map((paper, index) => (
                <motion.a
                  key={`${paper.index}-${paper.text.slice(0, 40)}`}
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
