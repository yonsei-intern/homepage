-- Current homepage database snapshot.
-- On a fresh PostgreSQL volume, this runs after the schema and seed scripts.
-- Existing seed rows are removed first so this snapshot is restored exactly.

DO $$
DECLARE
  table_list TEXT;
BEGIN
  SELECT string_agg(format('%I.%I', schemaname, tablename), ', ')
  INTO table_list
  FROM pg_tables
  WHERE schemaname = 'public';

  IF table_list IS NOT NULL THEN
    EXECUTE 'TRUNCATE TABLE ' || table_list || ' RESTART IDENTITY CASCADE';
  END IF;
END
$$;

--
-- PostgreSQL database dump
--

\restrict OEI6HAGPTRpCaHVtDpfDJg88YcIpF3Yr1LH6Ad67WP9eiZagUjCn86xy3KwGXpg

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: alumni; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alumni (id, name, school, degree, company, is_published, created_at, updated_at, graduated_year, graduated_semester) FROM stdin;
1	조민기	연세대학교	Ph.D.	티오리(병역특례)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:39:12.862835+00	2023	1
3	오명교	연세대학교	M.S.	KT	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:39:56.631203+00	2024	1
6	엄주언	연세대학교	M.S.	안랩	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:40:30.567318+00	2023	2
7	진호용	연세대학교	M.S.	아우토크립트(병역특례)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:40:41.984582+00	2023	2
8	안도현	연세대학교	M.S.	코인원(병역특례)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:40:48.011194+00	2023	1
2	정지우	연세대학교	M.S.	국가보안기술연구소	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:39:40.80743+00	2024	2
4	박재우	연세대학교	M.S.	씨이랩(병역특례)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:40:13.235051+00	2023	2
5	임은지	연세대학교	M.S.	엔아이티서비스	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:40:20.874247+00	2023	2
9	윤혜민	연세대학교	M.S.	삼정KPMG	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:40:56.114866+00	2023	1
10	정세연	연세대학교	M.S.	슈어소프트테크	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:05.901419+00	2023	1
11	정수창	연세대학교	M.S.	베이글코드(인턴)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:13.221744+00	2023	1
12	김해니	연세대학교	M.S.	김앤장 법률사무소	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:20.330475+00	2022	2
15	오상진	연세대학교	M.S.	현대엔지니어링	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:43.060934+00	2022	2
13	김서영	연세대학교	M.S.	삼성전자	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:46.570391+00	2022	2
14	김종신	연세대학교	M.S.	딥테크인컴퍼니	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:51.674585+00	2022	2
16	구예은	연세대학교	M.S.	우리은행	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:41:59.404329+00	2022	1
17	김슬기	연세대학교	M.S.	한국정보통신기술협회(TTA)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:42:07.918619+00	2022	1
18	장재동	연세대학교	M.S.	한국인터넷진흥원(KISA)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:42:15.670622+00	2022	1
19	윤정환	연세대학교	M.S.	네이버	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:42:22.632704+00	2022	1
20	서예지	연세대학교	M.S.	안랩	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:42:41.595585+00	2021	2
21	유정빈	연세대학교	M.S.	피플펀드	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:42:53.105883+00	2021	2
22	신민식	연세대학교	M.S.	삼성전자	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:02.44197+00	2021	1
23	이영주	연세대학교	M.S.	로드맵	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:13.09993+00	2021	1
24	이호연	연세대학교	M.S.	네이버	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:19.63143+00	2021	1
25	김민우	연세대학교	M.S.	SK주식회사 C&C	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:27.066544+00	2020	2
26	김경훈	연세대학교	M.S.	NICE 평가정보	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:38.900362+00	2020	2
27	양원석	연세대학교	M.S.	Univ. of Oklahoma	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:49.002559+00	2020	2
28	정성미	연세대학교	M.S.	포스코(POSCO)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:43:59.802435+00	2020	1
29	조현웅	연세대학교	M.S.	우정사업본부	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:44:08.390195+00	2020	1
30	윤영진	연세대학교	M.S.	한화 S&C	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:44:15.770345+00	2019	2
31	유홍렬	연세대학교	M.S.	지니언스	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:44:26.034756+00	2019	2
32	방지현	연세대학교	M.S.	코나아이(Konai)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:44:33.648732+00	2019	2
33	노승훈	연세대학교	M.S.	카카오	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:44:43.008243+00	2019	1
34	최재우	연세대학교	M.S.	한국인터넷진흥원(KISA)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:44:52.833515+00	2019	1
35	홍모세	연세대학교	M.S.	펜타시큐리티	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:45:00.287276+00	2019	1
36	현석우	연세대학교	M.S.	국가보안기술연구소	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:45:06.791255+00	2019	1
37	이동건	연세대학교	M.S.	국방부	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:45:13.753949+00	2018	2
38	이준원	연세대학교	M.S.	삼성전자	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:45:33.250959+00	2018	2
39	김승연	연세대학교	M.S.	넷엔드(병역특례)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:45:47.800525+00	2018	1
40	박상호	세종대학교	Ph.D.	한국정보통신기술협회(TTA)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:46:04.361747+00	2017	2
41	신수연	세종대학교	Ph.D.	연세대학교 (포스트닥)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:46:10.241895+00	2017	2
42	나사랑	세종대학교	M.S.	한국인터넷진흥원(KISA), 연세대학교 박사과정(파트)	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:46:25.271102+00	2017	2
43	최원석	세종대학교	M.S.	유비벨록스 모바일 | 선임연구원	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:46:52.721244+00	2017	2
44	송성현	세종대학교	M.S.	금융보안연구원 | 주임연구원	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:46:59.689299+00	2017	1
45	조길용	세종대학교	M.S.	유비벨록스 모바일 | 선임연구원	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:08.5455+00	2017	1
46	정연호	세종대학교	M.S.	유비벨록스 | 과장	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:17.793464+00	2017	1
47	김수희	세종대학교	M.S.	한영회계법인 | Senior	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:23.620395+00	2016	2
48	김문권	세종대학교	M.S.	(주)에고소프트 | 과장	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:31.383093+00	2016	2
49	송현수	세종대학교	M.S.	유비벨록스	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:38.702745+00	2016	2
50	이영권	세종대학교	M.S.	한국정보통신기술협회(TTA) | 센터장	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:45.724448+00	2016	2
51	정재웅	세종대학교	M.S.	GMT소프트 | 팀장	t	2026-09-01 06:35:13.198989+00	2026-09-02 04:47:54.507133+00	2016	2
\.


--
-- Data for Name: home_research_papers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.home_research_papers (id, section_key, venue, title, display_order, created_at, updated_at) FROM stdin;
1	ai_security	RAID 2025	Red-Teaming LLMs with Token Control Score	1	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
2	ai_security	IEEE TIFS 2025	Amplifying Training Data Exposure through Fine-Tuning	2	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
3	ai_security	WISA 2025	LeakGuard: Detecting Attribute Leakage in Diffusion Models	3	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
4	deepfake_detection	ICCV 2025	Multi-View Slot Attention Using Paraphrased Texts	1	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
5	deepfake_detection	WDC 2024	On the Correlation Between Detection and Image Quality	2	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
6	deepfake_detection	IEEE Access 2024	Coexistence of Deepfake Defenses	3	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
7	vulnerability_detection	ISSTA 2024	Fuzzing JavaScript Interpreters with Coverage-Guided RL	1	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
8	vulnerability_detection	USENIX Sec 2023	BoKASAN: Binary-only Kernel Address Sanitizer	2	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
9	vulnerability_detection	ICISC 2024 (Best Paper)	Enhancing Differential Fuzzing with Hybrid Fuzzing	3	2026-09-11 09:10:16.875458+00	2026-09-11 09:10:16.875458+00
\.


--
-- Data for Name: latest_news; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.latest_news (id, news_year, source, title, summary, link_url, created_at, updated_at, display_order) FROM stdin;
1	2025	보안뉴스	[2025 AI 보안 솔루션 리포트] AI 보안 솔루션, 능동형 AI와 XAI로 진짜 AI가 되다	\N	https://www.boannews.com/news/articleView.html?idxno=140730	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	1
2	2025	베테랑경찰	"텔레그램 협력, 금단 영역 넘은 거죠"…사이버 수사는 진화 중	\N	https://n.news.naver.com/mnews/article/421/0008619418?sid=102	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	2
3	2025	KIS 칼럼	[한국정보보호학회 칼럼] AI 모델 보안과 안전 그리고 신뢰	\N	https://www.boannews.com/news/articleView.html?idxno=140284	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	3
4	2025	IEEE TIFS	Amplifying Training Data Exposure through Fine-Tuning with Pseudo-Labeled Memberships	IEEE Transactions on Information Forensics and Security · Impact Factor: 8	\N	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	4
5	2025	RAID	Red-Teaming LLMs with Token Control Score: Efficient, Universal, and Transferable Jailbreaks	Research in Attacks, Intrusions, and Defenses · BK, 정보과학회 우수학술대회	\N	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	5
6	2025	WISA	LeakGuard: Detecting Attribute Leakage in Diffusion Models	\N	\N	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	6
7	2025	ICCV	Multi-View Slot Attention Using Paraphrased Texts	\N	\N	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	7
8	2024	ISSTA	Fuzzing JavaScript Interpreters with Coverage-Guided RL	\N	\N	2026-09-02 02:42:09.743766+00	2026-09-02 02:44:17.530113+00	8
\.


--
-- Data for Name: patents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.patents (id, category, patent_number, number_sort_key, title, source_order, created_at, updated_at) FROM stdin;
1	international_registered	US10372896B2	10372896	Pattern Input Apparatus and Method, and Recording Medium Using The Same	1	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
2	international_registered	US9280656B2	9280656	Device and Method for Providing Security Channel Interface	2	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
3	international_registered	US9113324B2	9113324	Mobile Privacy Protection System Using Proxy, Proxy Device And Mobile Privacy Protection Method	3	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
4	international_registered	US8160256B2	8160256	Key Calculation method and key agreement method using the same	4	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
5	international_registered	US8031055B2	8031055	Tag Authentication Method Using Rotation Function and Tag and Reader Performing the Method	5	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
6	international_registered	US7970134B2	7970134	Method for generating, operating, and using a sparse w-NAF key for encryption	6	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
7	international_filed	PCT/KR2025/021190	2025021190	딥페이크 탐지 방법 및 이를 이용한 시스템	7	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
8	international_filed	PCT/KR2019/010785	2019010785	User Authentication System Using Sensors Built in Plurality of Computing Devices	8	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
9	international_filed	PCT/KR2021/018312	2021018312	Method for Detecting Real-Time Error in Operating System Kernel Memory	9	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
10	domestic_registered	10-24834890000	1024834890000	동적 자원 분배가 가능한 하이브리드 퍼징 장치	10	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
11	domestic_registered	10-24063630000	1024063630000	딥러닝 기반 잠금 패턴 안전성 측정 장치 및 방법	11	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
12	domestic_registered	10-22731350000	1022731350000	기호 실행을 사용하는 소프트웨어 테스트 입력 생성 장치 및 방법	12	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
13	domestic_registered	10-22541590000	1022541590000	운영체제 커널 메모리의 실시간 오류 검출 방법	13	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
14	domestic_registered	10-22255560000	1022255560000	행위 기반 인증에서 다양한 자세 수용을 위한 사용자 인증 장치 및 방법	14	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
15	domestic_registered	10-22161580000	1022161580000	복수의 컴퓨팅 장치에 내장된 센서를 활용한 사용자 인증 시스템	15	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
16	domestic_registered	10-20976720000	1020976720000	프로그램 버그 발생 인자 결정 장치 및 그 방법	16	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
17	domestic_registered	10-20538640000	1020538640000	기계학습 기반의 FPGA 비트스트림 역공학 방법 및 장치	17	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
18	domestic_registered	10-19972210000	1019972210000	다중 기기를 제어하는 마스터 기기 및 제어 방법	18	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
19	domestic_registered	10-19950250000	1019950250000	지문인식센서 및 터치스크린에 남은 지문을 이용한 지문 이미지 복원 방법 및 장치	19	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
20	domestic_registered	10-19627210000	1019627210000	RNN을 이용한 FPGA 비트스트림에서의 PIP 정보 역공학 방법 및 장치	20	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
21	domestic_registered	10-19627200000	1019627200000	FPGA 비트스트림에서의 LUT 정보 역공학 방법 및 장치	21	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
22	domestic_registered	10-19622270000	1019622270000	기계학습 기반의 FPGA 하드웨어 악성기능 트리거 탐지 방법 및 장치	22	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
23	domestic_registered	10-19574050000	1019574050000	숄더 서핑 공격에 강인한 패턴 입력 방법 및 장치	23	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
24	domestic_registered	10-19302930000	1019302930000	정적 분석과 동적 분석을 이용하여 변종 악성코드를 식별하는 장치 및 방법	24	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
25	domestic_registered	10-18328610000	1018328610000	패스워드 평가 방법 및 장치	25	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
26	domestic_registered	10-18233660000	1018233660000	스머지 공격으로부터 안전한 패턴 입력 장치 및 방법	26	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
27	domestic_registered	10-17425230000	1017425230000	패스워드 추천 방법 및 그 장치	27	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
28	domestic_registered	10-17254820000	1017254820000	보안카드 비밀번호 입력방법과 입력장치 및 보안카드 비밀번호 입력을 위한 컴퓨터 판독가능 기록매체와 컴퓨터 프로그램	28	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
29	domestic_registered	10-16835740000	1016835740000	모션 센서를 이용한 캡차 시스템 및 그 방법	29	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
30	domestic_registered	10-16547970000	1016547970000	피싱 대응 상호 작용 캡차 시스템	30	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
31	domestic_registered	10-16334900000	1016334900000	모바일 기기에서 민감정보 사용 내역의 실시간 확인을 위한 사용자 인터페이스 장치 및 그 방법	31	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
32	domestic_registered	10-16182680000	1016182680000	정보제공 스마트카드, 정보제공 시스템 및 정보 제공방법	32	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
33	domestic_registered	10-16097360000	1016097360000	디지털 컨텐츠 구매 정보 관리 방법 및 이를 위한 컨텐츠 판매 서버	33	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
34	domestic_registered	10-16028940000	1016028940000	근거리 통신 장치 및 모바일 장치 관리자를 이용한 회의 보안 관리 시스템 및 그에 관한 방법	34	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
35	domestic_registered	10-15588970000	1015588970000	비밀 채널을 이용한 비밀 번호 입력 방법 및 장치	35	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
36	domestic_registered	10-15588960000	1015588960000	정보 입력 장치 및 입력제공 방법과 이를 이용한 기록매체	36	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
37	domestic_registered	10-15565990000	1015565990000	패턴 입력 장치 및 방법과 이를 이용한 기록 매체	37	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
38	domestic_registered	10-15487070000	1015487070000	사용자 인증 정보 입력 방법 및 그 장치	38	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
39	domestic_registered	10-15444600000	1015444600000	그룹 통신의 링크 계층에서 수신자 주소를 은닉하는 방법	39	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
40	domestic_registered	10-15441700000	1015441700000	사용자 인증 정보 입력 방법 및 그 장치	40	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
41	domestic_registered	10-15441690000	1015441690000	부가 신호를 이용한 사용자 정보 입력 방법과 그 장치 및 이를 이용한 사용자 인증방법	41	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
42	domestic_registered	10-15421070000	1015421070000	비밀번호 입력 장치 및 방법과 이를 이용한 프로그램을 기록한 기록매체	42	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
43	domestic_registered	10-14932140000	1014932140000	패스워드 기반 인증 방법 및 이를 수행하기 위한 장치	43	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
44	domestic_registered	10-14675440000	1014675440000	사용자 인증 처리 장치 및 방법	44	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
90	software_output	C-2020-045797	2020045797	리눅스 커널 메모리 오류 검출 프로그램	90	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
45	domestic_registered	10-14667420000	1014667420000	보안 인터페이스를 제공하는 모바일 기기 및 모바일 기기의 보안 강화 방법	45	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
46	domestic_registered	10-14404190000	1014404190000	전자금융서비스 상호 모니터링 시스템 및 방법	46	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
47	domestic_registered	10-14301990000	1014301990000	비밀 채널 인터페이스 제공 장치 및 방법	47	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
48	domestic_registered	10-14251710000	1014251710000	사용자 비밀번호 입력 장치 및 방법	48	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
49	domestic_registered	10-14250050000	1014250050000	비밀번호 입력 장치 및 방법	49	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
50	domestic_registered	10-13620610000	1013620610000	프록시를 이용한 모바일 프라이버시 보호 시스템, 프록시디바이스 및 모바일 프라이버시 보호 방법	50	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
51	domestic_registered	10-13609160000	1013609160000	성긴 w-NAF 키 생성방법, 이를 이용한 연산 방법 및 암호화 방법	51	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
52	domestic_registered	10-13097970000	1013097970000	성긴 w-NAF 키 생성방법, 이를 이용한 연산 방법 및 암호화 방법	52	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
53	domestic_registered	10-13008380000	1013008380000	로테이션을 이용한 태그 인증 방법 그리고 상기 방법을 수행하는 태그 및 리더	53	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
54	domestic_registered	10-12715000000	1012715000000	스킨형 인터페이스를 이용한 문자 입력 인터페이스 구현 방법 및 이를 구현하는 터치스크린 기기	54	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
55	domestic_registered	10-12714960000	1012714960000	스킨형 인터페이스를 이용한 사용자 인터페이스 구현 방법 및 이를 구현하는 터치스크린 기기	55	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
56	domestic_registered	10-12600160000	1012600160000	스킨형 인터페이스를 이용한 포인터 인터페이스 구현 방법 및 이를 구현하는 터치스크린 기기	56	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
57	domestic_registered	10-12437790000	1012437790000	터치 스크린 단말기의 잠금 제어 시스템 및 방법	57	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
58	domestic_registered	10-12280900000	1012280900000	비밀번호 입력 시스템 및 방법	58	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
59	domestic_registered	10-11668020000	1011668020000	비주얼 페어링을 이용한 데이터 교환 방법 및 시스템	59	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
60	domestic_registered	10-11538960000	1011538960000	비밀 번호 입력 인터페이스 제공 시스템 및 방법	60	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
61	domestic_registered	10-11330930000	1011330930000	하나의 인증서를 이용하여 암호화와 전자 서명을 제공하는 방법	61	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
62	domestic_registered	10-10854900000	1010854900000	숄더 서핑 공격에 대응하기 위한 프라이버시 보호형 사용자 비밀번호 입력 시스템 및 그 방법	62	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
63	domestic_registered	10-09947290000	1009947290000	무선 멀티홉 네트워크에서 경로 설정 방법	63	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
64	domestic_registered	10-05537220000	1005537220000	트리 구조의 무선 네트워크에서 라우팅 경로 복구 방법	64	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
65	domestic_filed	10-2025-0211880	1020250211880	RAG 기반의 사용자 지속 인증 방법 및 장치	65	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
66	domestic_filed	10-2025-0151832	1020250151832	품질 적응형 앙상블 기반의 딥페이크 탐지 방법 및 시스템	66	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
67	domestic_filed	10-2025-0075436	1020250075436	다중 디바이스의 메타버스 환경에서 사용자와 아바타 간의 지속 인증 시스템 및 방법	67	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
68	domestic_filed	10-2023-0027800	1020230027800	딥페이크 탐지 모델 학습 방법 및 장치	68	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
69	domestic_filed	10-2022-0172074	1020220172074	구조적 입력을 필요로 하는 소프트웨어에 대한 신경망을 활용한 테스팅 방법 및 장치	69	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
70	domestic_filed	10-2021-0169681	1020210169681	딥러닝 적대적 예제의 신뢰성 검증 방법 및 장치	70	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
71	domestic_filed	10-2021-0157211	1020210157211	소프트웨어 테스팅 방법 및 소프트 테스팅을 위한 취약점 분류 모델 생성 방법	71	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
72	domestic_filed	10-2021-0097770	1020210097770	펌웨어 에뮬레이션 방법 및 이를 위한 장치	72	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
73	domestic_filed	10-2021-0099908	1020210099908	전자 장치의 소프트웨어 검증 방법	73	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
74	domestic_filed	10-2021-0005880	1020210005880	그래디언트를 활용한 커버리지 기반의 모델 검증 방법 및 그를 위한 장치	74	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
75	domestic_filed	10-2020-0155318	1020200155318	딥러닝 기반 잠금 패턴 안전성 측정 장치 및 방법	75	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
76	domestic_filed	10-2015-0061311	1020150061311	안전한 사용자 인증을 위한 다중 채널 기반 비밀 정보 전달 방법	76	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
77	domestic_filed	10-2014-0149743	1020140149743	메시지 통신 장치 및 방법	77	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
78	software_output	C-2022-049791	2022049791	리눅스 커널 1-day 취약점 PoC 수집 프로그램	78	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
79	software_output	C-2022-049790	2022049790	qemu를 활용한 리눅스 커널 버그 테스트 프로그램	79	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
80	software_output	C-2022-049023	2022049023	그리디 알고리즘을 활용한 하이브리드 퍼저 동적 스케줄링 프로그램	80	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
81	software_output	C-2022-047235	2022047235	구조적 입력을 필요로하는 소프트웨어 대상 신경망을 활용한 퍼징 프로그램	81	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
82	software_output	C-2022-031756	2022031756	기계학습 기반 커널 취약점 패치 분류 프로그램	82	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
83	software_output	C-2021-053378	2021053378	딥러닝 모델 안전성 검증 및 시각화 통합 시스템	83	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
84	software_output	C-2021-052249	2021052249	리눅스 커널 시스템 콜 관련 함수 추출 프로그램	84	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
85	software_output	C-2021-043459	2021043459	머신러닝을 활용한 에프피지에이 하드웨어 트로잔 탐지 프로그램	85	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
86	software_output	C-2021-033990	2021033990	펌웨어 퍼징을 위한 유사 에이치에이엘 함수 탐색 프로그램	86	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
87	software_output	C-2021-033989	2021033989	에뮬레이터와 새니타이저를 활용한 임베디드 소프트웨어 메모리 오류 탐지 프로그램	87	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
88	software_output	C-2021-033971	2021033971	듀얼 레벨에서의 주변기기 모델링을 통한 펌웨어 퍼징 프로그램	88	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
89	software_output	C-2020-043856	2020043856	입력변이에 따른 딥러닝 모델 취약점 분석	89	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
91	software_output	C-2019-027793	2019027793	시스템 콜 퍼저의 코드커버리지 성능 평가 프로그램	91	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
92	software_output	C-2019-018635	2019018635	딥러닝 기반의 안드로이드 패턴 복잡도 측정 프로그램	92	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
93	software_output	C-2019-007340	2019007340	사용자 설문을 위한 안드로이드 패턴 클러스터링 및 이미지 생성 프로그램	93	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
94	software_output	C-2018-036389	2018036389	리눅스 커널 동적 오염 분석기	94	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
95	software_output	C-2018-014709	2018014709	하이브리드 특징 및 기계학습을 활용한 악성코드 식별 프로그램	95	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
96	software_output	C-2017-019391	2017019391	FPGA Virtex-5 계열 펌웨어(Firmware) 메타데이터(Metadata) 및 구성 비트 추출 프로그램	96	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
97	software_output	C-2017-021551	2017021551	패턴 입력 특징 추출을 위한 사용자 인터페이스	97	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
98	software_output	C-2017-022585	2017022585	새로운 TinyLock(타이니락) 패턴 인터페이스에서의 패턴 입력 특징 추출 프로그램	98	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
99	software_output	C-2017-028725	2017028725	아메리칸 퍼지 롭 (AFL) 크래시 파일 분류 프로그램	99	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
100	software_output	C-2017-028888	2017028888	다중 패턴락 인증 사용자 인터페이스	100	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
101	software_output	C-2017-029640	2017029640	샌드박스의 악성코드 동적 특징 선정 프로그램	101	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
102	software_output	C-2017-036843	2017036843	자동화된 FPGA(필드 프로그래머블 게이트 어레이) 비트스트림 생성 프로그램	102	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
103	software_output	C-2017-036844	2017036844	WARC(웹 아카이브) 파일의 영상 데이터 추출 및 다운로드 프로그램	103	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
104	software_output	C-2016-033136	2016033136	자동화된 유투브 영상 영상 수집 프로그램	104	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
105	software_output	C-2016-024450	2016024450	스머지 공격을 위한 지문 이미지 복원 프로그램	105	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
106	software_output	C-2016-024451	2016024451	자동화된 스머지 공격을 위한 이미지 인식 프로그램	106	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
107	software_output	C-2015-027057	2015027057	Touch Pointer (터치포인터) 사용자 인터페이스	107	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
108	software_output	C-2015-027056	2015027056	레코딩 저항 TictoPIN (틱톡핀) 인증 프로그램	108	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
109	software_output	C-2015-027055	2015027055	스머지 공격 저항 TinyLock (타이니락) 인증 프로그램	109	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
110	software_output	C-2014-031285	2014031285	불룸 필터 삽입 및 질의 프로그램	110	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
111	software_output	C-2014-031286	2014031286	CAPTCHA(캡차) 이미지 프로세싱 프로그램	111	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
112	software_output	C-2014-031115	2014031115	KNN(케이엔엔)을 이용한 CAPTCHA(캡차) 문자인식 프로그램	112	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
113	software_output	C-2014-031114	2014031114	숄더 서핑 저항 SwitchPIN (스위치핀) 인증 프로그램	113	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
114	software_output	C-2013-024527	2013024527	Drag & Type (드래그앤타입) 가상 키보드 프로그램	114	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
115	software_output	C-2013-024528	2013024528	스파이웨어 저항 RIK(릭) 가상 키보드 프로그램	115	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
116	software_output	C-2013-024529	2013024529	T-Lock(티락) 패턴기반 인증 프로그램	116	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
117	software_output	C-2013-024530	2013024530	PassSlot(패스슬롯) PIN(핀) 인증 프로그램	117	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
118	software_output	C-2013-024531	2013024531	플러그인 무설치 인증서 기반 웹 로그인 프로그램	118	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
119	software_output	C-2013-001869	2013001869	4 Color (컬러) 인증 프로그램	119	2026-09-02 02:28:48.060639+00	2026-09-02 02:28:48.060639+00
\.


--
-- Data for Name: professor_activities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.professor_activities (id, period, detail, created_at, updated_at) FROM stdin;
1	2013-현재	연세대학교 정보대학원 정교수	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
2	2020-현재	연세대학교 인공지능대학원 AI+X 겸직교수	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
3	2024-현재	연세대학교 교무처 교수학습혁신센터장	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
4	2024-현재	연세대학교 LearnUs 추진본부 교과분야 단장	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
5	2024-현재	연세대학교 지능형혁신연구소 소장	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
6	2024-현재	한국정보보학회 AI보안연구회 위원장	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
7	2006-현재	한국정보보호학회 상임이사	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
8	2003-현재	한국정보보호학회 논문지 편집위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
9	2007-현재	정보과학회 논문지 편집위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
10	2008-현재	한국정보보호학회 암호연구회 운영위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
11	2006-현재	대검찰청 디지털수사 자문위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
12	2021-현재	국민생활과학자문단 사이버안전분과 위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
13	2022-현재	에스알 AI빅데이터 분과 위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
14	2024-현재	경찰청 디지털포렌식 자문위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
15	2024-현재	경찰청 사이버성폭력 수사 자문위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
16	2022-현재	서울시 개인정보보호 심의위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
17	2025-현재	금융보안원 자문위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
18	2025-현재	금융감독원 자문위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
19	2025-현재	국가 딥페이크 대응 자문위원회 위원장	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
20	2026-현재	개인정보보호위원회 인공지능 프라이버시 위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
21	2026-현재	한국인터넷진흥원 램섬웨어 전주기 대응 위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
22	2026-현재	국가인공지능전략위원회 보안TF 위원	2026-09-02 05:44:29.264066+00	2026-09-02 05:44:29.264066+00
\.


--
-- Data for Name: professor_career; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.professor_career (id, period, detail, created_at, updated_at) FROM stdin;
1	1999-2000	Univ. of California at Berkeley, 포스트닥	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
2	2001-2013	세종대학교 컴퓨터공학과 교수	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
3	2007-2008	Univ. of Maryland at College Park, 교환교수	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
4	2009-2010	세종대학교 컴퓨터공학과 컴퓨터소프트웨어전공 학과장	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
5	2011-2012	세종대학교 정보보호학과 학과장	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
6	2013-2018	연세대학교 지식서비스보안과정 주임교수	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
7	2015-2018	연세대학교 디지털포렌식 경찰청계약학과 주임교수	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
8	2016-2019	연세대학교 IT정책전략연구소 소장	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
9	2022-2024	연세대학교 글로벌인재대학 응용정보공학 책임교수	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
10	2022-2024	연세대학교 교보AI빅데이터학과 주임교수	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
11	2016-2017	정보과학회 이사	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
12	2021-2024	한국연구재단 기초연구본부 전문위원	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
13	2022-2026	경찰청 자체평가위원회 위원	2026-09-02 05:44:29.266154+00	2026-09-02 05:44:29.266154+00
\.


--
-- Data for Name: professor_papers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.professor_papers (id, paper_year, citation, link_url, created_at, updated_at) FROM stdin;
1	2024	Jeewoo Jung, Taekyoung Kwon, "Enhancing Differential Fuzzing of Cryptographic Libraries with Sustainable Hybrid Fuzzing and Crypto-Specific Mutation," in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2024. (Best Paper Award)	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
2	2024	Leo Hyun Park, Jaeuk Kim, Myung Gyo Oh, Jaewoo Park, and Taekyoung Kwon, "Adversarial Feature Alignment: Balancing Robustness and Accuracy in Deep Learning via Adversarial Training," in Proc. the 17th ACM Workshop on Artificial Intelligence and Security (AISec), Oct. 2024.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
3	2024	Jueon Eom, Seyeon Jeong, and Taekyoung Kwon, "Fuzzing JavaScript Interpreters with Coverage-Guided Reinforcement Learning for LLM-based Mutation," in Proc. the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA), Sep. 2024.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
4	2023	Mingi Cho, Dohyeon An, Hoyong Jin, and Taekyoung Kwon, "BoKASAN: Binary-only Kernel Address Sanitizer for Effective Kernel Fuzzing," 32nd USENIX Security Symposium (USENIX Security), Aug. 2023.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
5	2023	Leo Hyun Park, Soochang Chung, Jaeuk Kim, and Taekyoung Kwon, "GradFuzz: Fuzzing Deep Neural Networks with Gradient Vector Coverage for Adversarial Examples," Neurocomputing, Elsevier, Vol.522, pp.165-180, Feb. 2023.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
6	2022	Hoyong Jin, Dohyeon An, and Taekyoung Kwon, "Differential Testing of Cryptographic Libraries with Hybrid Fuzzing," Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022. (Best Paper Award)	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
7	2022	Leo Hyun Park, Eunbi Hwang, Donggun Lee, and Taekyoung Kwon, "Towards Constructing Consistent Pattern Strength Meters with User’s Visual Perception," Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
8	2022	Leo Hyun Park, Jaeuk Kim, Jaewoo Park, and Taekyoung Kwon, "Mixed and Constrained Input Mutation for Effective Fuzzing of Deep Learning Systems," Information Sciences, Elsevier, Vol.614, pp.497-517, Oct. 2022.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
9	2020	Leo Hyun Park, Jungbeen Yu, Hong-Koo Kang, Taejin Lee, and Taekyoung Kwon, "Birds of a Feature: Intrafamily Clustering for Version Identification of Packed Malware," IEEE Systems Journal, Vol.14, pp.4545-4556, Sep. 2020.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
10	2021	Mingi Cho, Jaedong Jang, Yezee Seo, Seyeon Jeong, Soochang Chung, and Taekyoung Kwon, "Towards Bidirectional LUT-level Detection of Hardware Trojans," Computers & Security, Elsevier, Vol.104, May 2021.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
11	2019	Mingi Cho, Seoyoung Kim, and Taekyoung Kwon, "Intriguer: Field-Level Constraint Solving for Hybrid Fuzzing," Proc. the ACM Conference on Computer and Communications Security (ACM CCS), pp.515-530, Nov. 2019.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
12	2017	Hoyong Lee, Seungyeon Kim, and Taekyoung Kwon, "Here Is Your Fingerprint! Actual Risk versus User Perception of Latent Fingerprints and Smudges Remaining on Smartphones," Proc. the 33rd Annual Computer Security Applications Conference (ACSAC), Orlando, Florida, pp.512-527, Dec. 2017.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
13	2016	Taekyoung Kwon and Sarang Na, "SteganoPIN: Two-Faced Human-Machine Interface for Practical Enforcement of PIN Entry Security," IEEE Trans. on Human-Machine Systems, Vol.46, No.1, pp.143-150, February 2016.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
14	2016	Jonghyup Lee, Leehyung Kim, and Taekyoung Kwon, "FlexiCast: Energy-Efficient Software Integrity Checks to Build Secure Industrial Wireless Active Sensor Networks," IEEE Trans. on Industrial Informatics, Vol.12, No.4, pp.6-14, 2016.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
15	2015	Taekyoung Kwon and Jin Hong, "Analysis and Improvement of a PIN-Entry Method Resilient to Shoulder-Surfing and Recording Attacks," IEEE Trans. on Information Forensics and Security, Vol.10, No.2, pp.278-292, February 2015.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
16	2014	Taekyoung Kwon, Sooyeon Shin, and Sarang Na, "Covert Attentional Shoulder Surfing: Human Adversaries Are More Powerful Than Expected," IEEE Trans. on Systems, Man, and Cybernetics Systems (Formerly Part A), Vol.44, No.6, pp.716-727, June 2014.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
17	2014	Taekyoung Kwon and Sarang Na, "TinyLock: Affordable Defense Against Smudge Attacks on Smartphone Pattern Lock Systems," Computers & Security, Elsevier, Vol.42, pp.137-150, May 2014.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
18	2011	Taekyoung Kwon, "Privacy Preservation with X.509 Standard Certificates," Information Sciences, Elsevier, Vol.181, No.13, pp.2906-2921, July 2011.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
19	2011	Junghae Cheon, Stanislav Jarecki, Taekyoung Kwon, and Mun-Kyu Lee, "Fast Exponentiation Using Split Exponents," IEEE Trans. on Information Theory, Vol.57, No.3, pp.1816-1826, March 2011.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
20	2010	Sooyeon Shin, Taekyoung Kwon, Gil-yong Jo, Youngman Park, and Haekyu Rhy, "An Experimental Study of Hierarchical Intrusion Detection for Wireless Industrial Sensor Networks," IEEE Trans. on Industrial Informatics, Vol.6, No.4, pp.744-757, November 2010.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
21	2010	Taekyoung Kwon and Jin Hong, "Secure and Efficient Broadcast Authentication in Wireless Sensor Networks," IEEE Trans. on Computers, Vol.59, No.8, pp.1120-1133, August 2010.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
22	2010	JongHyup Lee, Taekyoung Kwon, and JooSeok Song, "Group Connectivity Model for Industrial Wireless Sensor Networks," IEEE Trans. on Industrial Electronics, Vol.57, No.5, pp.1835-1844, July 2010.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
23	2009	Taekyoung Kwon, JongHyup Lee, and JooSeok Song, "Location-based Pairwise Key Predistribution for Wireless Sensor Networks," IEEE Trans. on Wireless Communications, Vol.8, No.11, pp.5436-5442, November 2009.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
24	2008	Taekyoung Kwon and Hyeonjoon Moon, "Biometric Authentication for Border Control Applications," IEEE Trans. on Knowledge and Data Engineering, Vol.20, No.8, pp.1091-1096, August 2008.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
25	2007	Taekyoung Kwon, Hyungwoo Lee, and Jae-il Lee, "A Practical Method for Generating Digital Signatures Using Biometrics," IEICE Trans. on Communications, Vol.E90-B, No.6, pp.1381-1389, 2007.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
26	2007	Jiyong Jang, Taekyoung Kwon, and Jooseok Song, "A Time-based Key Management Protocol for Wireless Sensor Networks," Information Security Practice and Experience, Lecture Notes in Computer Science, Vol.4464, Springer-Verlag, pp.314-328, 2007.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
27	2006	Chaehoon Lim and Taekyoung Kwon, "Strong and Robust RFID Authentication Enabling Perfect Ownership Transfer," Information and Communications Security, Lecture Notes in Computer Science, Vol.4307, Springer-Verlag, pp.1-20, 2006.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
28	2004	Taekyoung Kwon, "Practical Authenticated Key Agreement Using Passwords," Information Security, Lecture Notes in Computer Science, Vol.3225, Springer-Verlag, pp.1-12, September 2004.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
29	2004	Taekyoung Kwon, "Refinement and Improvement of Virtual Software Token Protocols," IEEE Communications Letters, Vol.8, No.1, pp.75-77, January 2004.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
30	2001	Taekyoung Kwon, "Authentication and Key Agreement via Memorable Password," Proc. of NDSS (Network and Distributed Systems Security), February 2001. (IEEE P1363.2 and ISO/IEC 11770-4 Proposal)	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
31	1999	Taekyoung Kwon and Jooseok Song, "Secure Agreement Scheme for gxy via Password Authentication," IEE Electronics Letters, Vol.35, No.11, pp.892-893, May 1999.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
32	1997	Taekyoung Kwon, Myeongho Kang, and Jooseok Song, "An Adaptable and Reliable Authentication Protocol for Communication Networks," Proc. of IEEE INFOCOM 97, pp.738-745, April 1997.	\N	2026-09-02 05:44:29.267202+00	2026-09-02 05:44:29.267202+00
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, project_key, title, organization, start_year, end_year, created_at, updated_at, display_order) FROM stdin;
1	project_beb95bd3d898b242b1f9177b	AI 모델 취약성 분석, 평가 기술 및 생성정보 비밀성 판단 도구 개발	정보통신기획평가원	2024	2026	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
2	project_afc085308a710466bbd361e0	딥페이크 연구센터	정보통신기획평가원	2024	2026	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
3	project_f167078927616c3c0e167cfc	안전한 메타버스 환경을 위한 사용자 인증 및 프라이버시 보호 기술개발	정보통신기획평가원	2023	2026	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
4	project_79165b2fc7e1671a22b79fd3	지능형 사이버 위협 대응 기술 개발 및 인력양성	과학기술정보통신부	2020	2026	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
5	project_fc6f08f2c1af7a4d28d46525	악의적 변조 콘텐츠 대응을 위한 딥페이크 탐지 고도화, 생성억제, 유포 방지 플랫폼 개발	정보통신기획평가원	2023	2025	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
6	project_90327cc23ffd0ecdb81c4d7b	매킨토시 OS 보안 검증 자동화 기술 연구	국가보안기술연구소	2024	2024	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
7	project_e28cee9bfd788087187750fa	LLM 탈옥 프롬프트 유형 분석 및 응답 속도 기반 방어 체계 분석 기법 연구	AI보안연구회	2024	2024	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
8	project_1410a6df4d56cb9f5c8dc217	인공지능 모델 포렌식 기술 연구개발	경찰청 미래 치안 지원센터	2024	2024	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
9	project_9697c8ccfffc69bf3e2fe0ae	특징 공간 정렬 커버리지 전략을 통한 딥러닝 모델의 강건성-정확성 트레이드오프 문제 해결 방안 연구	한국연구재단	2023	2023	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
10	project_1c8ffd796ac6af2e9559946d	딥러닝 기반 네트워크 트래픽 관제 모델의 강건성 검증을 위한 퍼징 기술 연구	AI보안연구회	2023	2023	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
11	project_a00c18a8ced1257e6d6cf6a1	국가기관 챗GPT 기술 활용에 관한 보안대책 연구	정보보호학회	2023	2023	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
12	project_7d2c2e7a2473f91bd7aec653	암호 취약점 분석에 특화된 퍼징 기술 연구	암호연구회	2023	2023	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
13	project_a5986d584d279fbf777c335d	차세대 경량 암호 프로토콜 연구	국방과학연구소	2018	2023	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
14	project_25e26a877d9bb464c7857635	암호모듈 대상 기계학습 기반 동적 분석기술 적용에 관한 연구	국가보안기술연구소	2022	2022	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
15	project_d23e775b045000a0272add15	국가 · 공공용 간편인증 방식 안전성 평가 방법 및 설계방안 연구	국가보안기술연구소	2022	2022	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
16	project_3bf6667f100bd2cf33b77bb3	기계학습을 활용한 UNIX 기반 커널 취약점 탐지 자동화 연구	정보통신기획평가원	2018	2022	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
17	project_6a4d710c53c2c371803be5c7	딥러닝 모델의 신뢰성 제고를 위한 스마트 퍼징 기반 취약점 탐지 및 해석 기법 연구	한국연구재단	2019	2022	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
18	project_49dcd788f6251b0ec0d28857	임베디드 시스템을 위한 하드웨어 기반 사이버 보안 기술 연구	국방과학연구소	2017	2021	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
19	project_381ca343f4b9adf6a1b74067	Hybrid Fuzzing 기반 암호모듈 특화 분석기법 연구	국가보안기술연구소	2021	2021	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
20	project_c66cf77bc47c6044092c5add	차세대 인증 기술 개발	정보통신기술진흥센터	2017	2019	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
21	project_f6cb14d2879948d5b6208358	암호모듈 검증 활용을 위한 최신 퍼징 기술 연구	암호연구회	2019	2019	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
22	project_7ea6c088739dc0e1a68e6b63	퍼징 기반 취약점 검증 기술 및 강화 기술 연구	국가보안기술연구소	2019	2019	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
23	project_02a28664969644b3bdac95e4	운영체제 및 클라우드 서비스의 증거수집과 분석 방법 연구	대검찰청	2019	2019	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
24	project_d05a538e0c20a5179f7a6291	머신러닝 기반의 문서형 악성코드 분류 기법 연구	한국인터넷진흥원	2018	2018	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
25	project_ce5c49a42653e821671a7d89	임베디드 리눅스 기반 장비의 취약점 분석 및 안전성 강화 기술 연구	국가보안기술연구소	2018	2018	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
26	project_ad9b5cb1ec3ebcf669b7420c	모바일 포렌식에 대한 요구사항 및 도구 시험방안 연구	대검찰청	2018	2018	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
27	project_da6c0a0681f244f6baf0d4e1	멀티미디어 파일 포맷 인식 기반의 스마트 기기 퍼징 연구	암호연구회	2017	2017	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
28	project_686ad674aca9b05f756f41e3	IoT/CPS 안전을 위한 무선센서네트워크 DoS 공격 탐지 및 대응 기술 연구	한국연구재단	2015	2017	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
29	project_b06e749754b1d1baf9f148d7	클라우드 환경의 스마트 기기와 서비스 보안 기술 개발 및 연구 인력양성	정보통신기술진흥센터	2016	2017	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
30	project_97954e39d537d37082135077	동적정보 기반 악성코드 분류를 위한 머신러닝 알고리즘 연구	한국인터넷진흥원	2017	2017	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
31	project_5bc181ac852200089da0ecb5	데이터마이닝 기반 악성코드 변종그룹 식별방안 연구	한국인터넷진흥원	2016	2016	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
32	project_00f74f49fcb00f4101050c43	사용자 친화적 지능형 인증 인가 기술 및 이상거래 탐지 강화 기술 연구	정보통신기술진흥센터	2016	2016	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
33	project_b01bf7675a683c4aa5dd180d	IoT 사용정보 수집방법 및 사건증거 활용방안 연구	대검찰청	2016	2016	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
34	project_6ec131dbfcc96e879e8f4999	해외 의료보안 R&D 정책, 민간시장(서비스, 제품) 및 연구, 기술 동향 분석	중앙대학교 산학협력단	2016	2016	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
35	project_586263953e03706d748af86a	iOS Private API 및 활용 프로그램 분석 기술에 관한 연구	국가보안기술연구소	2015	2015	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
36	project_ea6217ac9f342ae9b04448b8	IoT 경량 인증 프로토콜 기반기술 연구	국가보안기술연구소	2015	2015	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
37	project_0eb26bce703c300f8d54cebf	개인정보 탐지 및 추론 고도화 연구	한국전자통신연구원	2015	2015	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
38	project_8ab5729fb74e8c607d84f775	WSN과 이동통신망을 위한 동적 네트워킹 보안 기술 연구	국방과학연구소	2014	2014	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
39	project_c96ae80efd0d831b6c38260f	유비쿼터스 컴퓨팅 환경을 위한 새로운 인증 계층(AuthLayer) 기술 연구	한국연구재단	2011	2014	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
40	project_5264a570b32486c96b4e93f3	모바일 환경의 인간-컴퓨터 상호작용(HCI)기반 Usable Security 원천기술 개발	한국산업기술평가관리원	2011	2014	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
41	project_1e65e34e680ffef4cf5831bf	1KB 이하 암호문 간의 연산을 지원하는 동형 암호 원천 기술 개발 및 응용기술 연구	정보통신기술진흥센터	2014	2014	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
42	project_e44acc28c33fbdf2d3ddd511	PC 및 스마트폰용 암호SW데이터 식별 및 패스워드 판별기법에 관한 연구	국가보안기술연구소	2013	2013	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
43	project_9702ddd447c9d7442637bb74	ID 기반 키 교환 프로토콜 개발 및 표준화 프로젝트	삼성SDS	2013	2013	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
44	project_4ce134fd929f6fc069ac3794	NFC 표준화 동향 및 보안 이슈	국가보안기술연구소	2012	2012	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
45	project_03d3f2583252df2c55f791f1	TLS-클라이언트 아이디 기반 암호 개발	삼성SDS	2012	2012	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
46	project_9a22b430b2faa99b9904849d	Black Vue 원격 모니터링 솔루션 개발	Pittasoft	2012	2012	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
47	project_a28cd163746e88c2b5b6f4c2	모바일 자동 접속 프레임 워크 구축 연구	국가보안기술연구소	2011	2011	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
48	project_4c57e380340a8440c5ecdd5c	암호 알고리즘 스마트기기 구현 최적화 기술 연구	국가보안기술연구소	2011	2011	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
49	project_a54a424103882abe3676eada	모바일 네트워크 환경에서의 사용자 원격인증 고도화 방안 연구	한국전자통신연구원	2011	2011	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
50	project_f1ba94446e5974a8006c16db	이동통신 및 제어보안에서의 암호기술 적용규격 연구(스마트 그리드)	국가보안기술연구소	2010	2010	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
51	project_7d630c15ab650a2e71e26f88	포렌식 워터마킹용 프라이버시 보호 기법 연구	한국전자통신연구	2010	2010	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
52	project_8aba5d2d0c57f13d37e7eb54	스마트폰 환경에서의 사용자인증 고도화 방안연구	한국전자통신연구원	2010	2010	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
53	project_742e40a252809292d0546818	유비쿼터스 컴퓨팅 환경을 위한 새로운 인증 계층	한국연구재단	2010	2010	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
54	project_e0f8f5201d738008dcc04b99	조건부 익명 ID 추적 및 제어기술 개발	한국전자통신연구원	2009	2009	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
55	project_1959042ba3f03f1e319b4489	운용환경에 최적화된 암호프로토콜의 설계를 위한 공개키 암호기술 연구	국가보안기술연구소	2009	2009	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
56	project_c3763219cd7b33e302200f7c	유비쿼터스 컴퓨팅 환경을 위한 새로운 인증 계층 기술연구	한국연구재단	2009	2009	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
57	project_f85c6528975bd4b1e5801f25	방송프로그램 보호를 위한 선택적 암호화 기법 연구	한국전자통신연구원	2008	2008	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
58	project_7d681f6577ba3c43370e775e	익명성 기반의 권한 분산 ID기술 개발	한국전자통신연구원	2008	2008	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
59	project_fd00d255bf135e4376acc594	그룹키 관리기술의 성능평가에 대한 연구	한국전자통신연구원	2007	2007	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
60	project_0dd17392556b19372c6e17b2	개인망 프라이버시 보호기술	삼성전자 종합기술원	2007	2007	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
61	project_25c7f5c83f7166d63bddaf2a	유비쿼터스 환경을 위한 컨텍스트 보호 인프라 기술 연구	한국연구재단	2007	2007	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
62	project_be0a78088d49d23a5c2d45ec	비밀키 암호를 사용하지 않는 RFID 인증 기술 연구	국가보안기술연구소	2007	2007	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
63	project_eb5922edacd676cf07e5a06b	U-Space에 적합한 침입 탐지 및 대응 기술 연구	KT	2007	2007	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
64	project_555d2cde4b50cdb399fd3734	위치 기반 키 분배 프로토콜 연구	한국전자통신연구원	2006	2006	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
65	project_e7d010aa2b8d6c6550a2b3fe	센서네트워크를 위한 다자간 프로토콜의 경량화 연구	국가보안기술연구소	2005	2005	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
66	project_0268d016969347582ee61664	정보보호기술 국제 표준화 추진 및 동향 분석	한국인터넷진흥원	2005	2005	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
67	project_2323809304ca9f362aef6b15	유비쿼터스 컴퓨팅 환경에 적합한 다자간 암호 프로토콜 및 효율적 프리미티브 연구	한국과학재단	2005	2005	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
68	project_e96e9c002038259d4b931b9c	공격에 강인한 DRM 소프트웨어 보호 기술 연구	국가보안기술연구원	2004	2004	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
69	project_2cb730f816a66e0f3c30ba4d	홈네트워크를 위한 인증 및 접근 권한 제어 기술 개발	한국인터넷진흥원	2004	2004	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
70	project_c5835a410d172d4d91326996	인터넷 게시판에서의 효과적인 개인 정보보호를 위한 신원 확인 시스템 개발	한국전자통신연구원	2004	2004	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
71	project_04c3d6b9ba6cd5a9c90daf76	다자간 통신을 위한 공개키 응용기술 연구	한국전자통신연구원	2004	2004	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
72	project_403e05bad53274e0243f9a72	생체인증을 이용한 비공개키기반 전자서명 기술의 안전성 평가 방안 연구	한국인터넷진흥원	2003	2003	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
73	project_9ed47cb4478b0aa7b325613b	패스워드 증폭 기술을 이용한 프로토콜의 안전성 모델에 관한 연구	학술진흥재단	2003	2003	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
74	project_d4fde988e8254d50059988eb	인간-컴퓨터 상호 작용을 고려한 (순향)능동적 암호프로토콜에 관한 연구	한국연구재단	2003	2003	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
75	project_ae2da9b384ee20b4a334b1e1	암호키 분배 및 사용자 인증 프로토콜의 논리성 검증 자동화 도구 개발	한국인터넷진흥원	2002	2002	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
76	project_0d73e479c88d23393cf85384	Trusted DRM Client 개발에 관한 연구	한국전자통신연구원	2002	2002	2026-09-02 02:36:36.580323+00	2026-09-02 02:36:36.580323+00	\N
\.


--
-- Data for Name: project_year_orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_year_orders (project_id, active_year, display_order) FROM stdin;
1	2026	1
2	2026	2
3	2026	3
4	2026	4
1	2025	1
2	2025	2
5	2025	3
3	2025	4
4	2025	5
1	2024	1
2	2024	2
6	2024	3
5	2024	4
3	2024	5
4	2024	6
7	2024	7
8	2024	8
9	2023	1
5	2023	2
10	2023	3
11	2023	4
4	2023	5
12	2023	6
3	2023	7
13	2023	8
14	2022	1
15	2022	2
16	2022	3
13	2022	4
17	2022	5
4	2022	6
16	2021	1
18	2021	2
13	2021	3
17	2021	4
4	2021	5
19	2021	6
16	2020	1
18	2020	2
13	2020	3
17	2020	4
4	2020	5
16	2019	1
18	2019	2
13	2019	3
20	2019	4
21	2019	5
22	2019	6
23	2019	7
17	2019	8
16	2018	1
24	2018	2
25	2018	3
26	2018	4
18	2018	5
13	2018	6
20	2018	7
18	2017	1
20	2017	2
27	2017	3
28	2017	4
29	2017	5
30	2017	6
31	2016	1
29	2016	2
32	2016	3
33	2016	4
34	2016	5
28	2016	6
35	2015	1
36	2015	2
28	2015	3
37	2015	4
38	2014	1
39	2014	2
40	2014	3
41	2014	4
40	2013	1
39	2013	2
42	2013	3
43	2013	4
44	2012	1
40	2012	2
39	2012	3
45	2012	4
46	2012	5
47	2011	1
48	2011	2
39	2011	3
40	2011	4
49	2011	5
50	2010	1
51	2010	2
52	2010	3
53	2010	4
54	2009	1
55	2009	2
56	2009	3
57	2008	1
58	2008	2
59	2007	1
60	2007	2
61	2007	3
62	2007	4
63	2007	5
64	2006	1
65	2005	1
66	2005	2
67	2005	3
68	2004	1
69	2004	2
70	2004	3
71	2004	4
72	2003	1
73	2003	2
74	2003	3
75	2002	1
76	2002	2
\.


--
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.publications (id, publication_year, publication_month, category, citation, source_order, created_at, updated_at, is_award, is_bk, has_impact_factor) FROM stdin;
226	2026	6	international_conference	Leo Hyun Park, Juwon Cho, Gyuhwan Kim, YoonDong Yeo and Taekyoung Kwon, "Chimera: Compositional Jailbreak Attacks on LLMs via Judgment-Driven Search over Heterogeneous Strategies," in Findings of the Association for Computational Linguistics: ACL 2026, Jul. 2026. (BK, 정보과학회 우수학술대회)	1	2026-09-02 05:34:40.924909+00	2026-09-02 05:34:40.924909+00	f	t	f
1	2026	2	domestic_journal	최지혁, 원신영, 한상수, 권태경, "RAG기반라이브러리하네스자동생성프레임워크", 정보보호학회논문지, Vol. 36, No.1, Feb. 2026.	1	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
4	2025	8	international_conference	A Yeon Kim, Jung Yup Rhee and Taekyoung Kwon, "LeakGuard: Detecting and Mitigating Attribute Leakage in Fine-Tuned Diffusion Models" In Proc. the 26th World Conference on Information Security Applications (WISA), Aug. 2025.	4	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
5	2025	\N	international_journal	Myunggyo Oh, Hong Eun Ahn, Leo Hyun Park, and Taekyoung Kwon, "Amplifying Training Data Exposure through Fine-Tuning with Pseudo-Labeled Memberships," IEEE Transactions on Information Forensics and Security (IEEE TIFS), 2025. (Impact Factor: 8)	5	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
6	2025	8	international_journal	Eunbi Hwang, YoonSik Kim and Taekyoung Kwon, “Continuous Authentication for Secure and Seamless User-Avatar Integration in Multi-Device Metaverses,”  IEEE Internet of Things Journal (IEEE IoT Journal), Aug.2025. (Impact Factor: 8.9)	6	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
7	2025	3	international_journal	Sangsoo Han, Eunbi Hwang, YoonSik Kim, and Taekyoung Kwon, “A Continuous Authentication Framework for Securing Metaverse Identities,” IEEE Transactions on Services Computing (IEEE TSC), Mar. 2025. (Impact Factor: 5.8)	7	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
8	2025	8	domestic_journal	김태호, 정지우, 최지혁, 권태경, "암호 라이브러리 퍼징을 위한 LLM 기반 하네스 자동 생성 연구", 정보보호학회논문지, Vol. 35, No.4, Aug. 2025.	8	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
9	2025	6	domestic_journal	권순신, 권태경 - "해무 환경에서 디헤이징 기반 객체 탐지 성능 향상 연구." 국군방첩사령부 국방과 보안 학술지 제13호(KCI), June. 2025	9	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
27	2024	11	domestic_conference	권순신, 한상수, 권태경, “AI 포렌식을 위한 XAI 기반 기술과 법적 신뢰성 확보 방안,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	27	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
28	2024	11	domestic_conference	김태호, 정지우, 권태경, “최신 퍼징 분야에서의 LLM 활용 동향,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	28	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
29	2024	11	domestic_conference	김아연, 이정엽, 박래현, 권태경, “생성형 모델의 악의적 위협에 대응하기 위한 가드레일 방어 기술 분석 연구,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	29	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
54	2023	6	domestic_conference	김현준, 박래현, 김재욱, 오명교, 박재우, 권태경, “딥페이크 탐지 모델의 검증 데이터셋의 보편화를 위한 딥페이크 생성 기법 분석 연구,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023.	54	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
57	2023	6	domestic_conference	전일신, 정지우, 황은비, 권태경, “최신 안티 퍼징 동향 분석,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023.	57	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
58	2023	6	domestic_conference	이정엽, 박래현, 오명교, 권태경, “이미지 변환과 JPG 압축을 통한 적대적 노이즈 제거,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023.	58	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
60	2022	11	international_conference	Leo Hyun Park, Eunbi Hwang, Donggun Lee, and Taekyoung Kwon, “Towards Constructing Consistent Pattern Strength Meters with User’s Visual Perception,” in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022.	60	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
61	2022	11	international_conference	Leo Hyun Park, Jaewoo Park, Soochang Chung, Jaeuk Kim, Myung Gyo Oh, and Taekyoung Kwon, “Poster: Adversarial Defense with Deep Learning Coverage on MagNet’s Purification,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), Los Angeles, CA, Nov. 2022.	61	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
81	2021	8	domestic_journal	박래현, 김재욱, 엄주언, 권태경, “딥러닝 적대적 예제와 퍼징기술 동향,” 정보과학회지, Vol. 39, No. 8, pp. 18-27, Aug. 2021.	81	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
83	2021	6	domestic_conference	김재욱, 박래현, 엄주언, 권태경, “심층 뉴럴 네트워크의 적대적 방어 기법 동향,” 한국정보보호학회 하계학술대회 (CISC S21), Jun. 2021.	83	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
84	2021	6	domestic_conference	이현석, 황은비, 조민기, 권태경, “임베디드 소프트웨어 취약점 탐지를 위한 최신 보안기술 동향,” 한국군사과학기술학회 종합학술대회, Jun. 2021.	84	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
85	2021	6	domestic_conference	황은비, 이현석, 조민기, 권태경, “펌웨어 퍼징을 위한 에뮬레이션 기술 동향,” 한국군사과학기술학회 종합학술대회, Jun. 2021.	85	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
86	2021	6	domestic_journal	신민식, 권태경, “정상 사용자로 위장한 웹 공격 탐지 목적의 사용자 행위 분석 기법,” 정보보호학회논문지, Vol.31, no.3, pp. 365-371, Jun. 2021	86	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
108	2019	6	international_journal	Sooyeon Shin, Kyounghoon Kim, and Taekyoung Kwon, “Detection of malicious packet dropping attacks in RPL-based Internet of Things,” International Journal of Ad Hoc and Ubiquitous Computing, Vol. 31, pp. 133-141, Jun. 2019.	108	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
135	2018	12	domestic_conference	이유찬, 권태경, “macOS 커널에서의 보호기법과 우회방법 분석,” 한국정보보호학회 동계학술대회 (CISC W18), Dec. 2018.	135	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
136	2018	10	domestic_journal	김승연, 구예은, 권태경, “스머지 기반의 스마트 기기 지문 인증 공격 연구,” 정보보호학회논문지, Vol. 28, No. 5, pp. 1113-1118, Oct. 2018.	136	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
137	2018	10	domestic_journal	윤정환, 서예지, 장재동, 권태경, “BIL 비트스트림 역공학 도구 개선 연구,” 정보보호학회논문지, Vol. 28, No. 5, pp. 1225-1231, Oct. 2018.	137	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
162	2016	\N	international_conference	JungBin Yu, MinSik Shin, Taejin Lee, Hong-Koo Kang, and Taekyoung Kwon, “The Malware Identity: Toward Efficient Identification of Malware Mutants,” Annual Computer Security Applications Conference (ACSAC), 2016. (poster)	162	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
192	2015	6	domestic_conference	최재우, 안미림, 이종협, 권태경, “IoT 환경에서 다양한 서비스를 제공하는 기기 간에 보안 요소를 고려한 라우팅 기법 연구,” 2015 한국정보보호학회 하계학술대회, 2015.	192	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
193	2014	10	international_journal	Sooyeon Shin and Taekyoung Kwon, “AAnA: Anonymous Authentication and Authorization based on Short Traceable Signatures,” International Journal of Information Security, Springer, Vol. 13, No. 5, pp. 477-495, Oct. 2014.	193	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
219	2013	12	domestic_conference	박상호, 권태경, “안드로이드 암호 사용 앱 보안 분석,” 한국정보보호학회 동계학술대회 논문집 (CISC W13), Vol. 23, No. 2, pp. 111-114, 2013.	219	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
221	2013	11	domestic_conference	박상호, 권태경, “안드로이드 앱을 위한 플랫폼 보안 분석,” 한국인터넷정보학회 추계학술발표대회 논문집, Vol. 14, No. 2, pp. 79-80, 2013.	221	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
98	2020	11	domestic_conference	박래현, 김재욱, 정수창, 권태경, “커버리지 기반 딥러닝 퍼징 기술의 유효성 검증,” 한국정보보호학회 동계학술대회 (CISC W20), Nov. 2020.(우수논문상 수상)	98	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
11	2025	6	domestic_conference	김규환, 권태경, "LLM 오픈소스 데이터셋 신뢰성 확보를 위한 데이터 중심 평가 동향 분석," 한국정보보호학회 하계학술대회 (CISC S25), June. 2025.	11	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
12	2025	6	domestic_conference	김태호, 권태경, "동적 취약점 분석 결과의 중복 제거 기법 연구 동향 분석," 한국정보보호학회 하계학술대회 (CISC S25), June. 2025.	12	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
13	2025	6	domestic_conference	권순신, 권태경, "해상 환경에서 디헤이징 객체 탐지 성능 향상을 위한 해무 데이터셋 생성 및 검증 연구," 한국정보보호학회 하계학술대회 (CISC S25), June. 2025.	13	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
15	2024	10	international_conference	Leo Hyun Park, Jaeuk Kim, Myung Gyo Oh, Jaewoo Park, and Taekyoung Kwon, “Adversarial Feature Alignment: Balancing Robustness and Accuracy in Deep Learning via Adversarial Training,” in Proc. the 17th ACM Workshop on Artificial Intelligence and Security (AISec), Oct. 2024.	15	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
17	2024	8	international_conference	Jung Yup Rhee, Leo Hyun Park and Taekyoung Kwon, “Enhancing Robustness in NIDS via Coverage Guided Fuzzing and Adversarial Training,” in Proc. the 25th World Conference on Information Security Applications (WISA), Aug. 2024.	17	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
18	2024	7	international_conference	Hyunjoon Kim, Jaehee Lee, Leo Hyun Park, and Taekyoung Kwon, “On the Correlation Between Deepfake Detection Performance and Image Quality Metrics,” Proceedings of the 3rd Workshop on Security Implications of Deepfakes and Cheapfakes (WDC), July. 2024.	18	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
19	2024	3	international_journal	Yoonsik Kim, Eunji Lim, and Taekyoung Kwon, “On the Impact of Deployment Errors in Location-based Key Predistribution Protocols for Wireless Sensor Networks,” IEEE Access, Vol.12, pp.35765 – 35778, Mar. 2024. (Impact Factor: 3.6)	19	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
20	2024	1	international_journal	Jaewoo Park, Leohyun Park, Hongeun Ahn, and Taekyoung Kwon, “Coexistence of Deepfake Defenses: Addressing the Poisoning Challenge,” IEEE Access, Vol.12, pp.11674 – 11687, Jan. 2024. (Impact Factor: 3.6)	20	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
21	2024	10	domestic_journal	김현준, 안홍은, 박래현, 권태경, “딥페이크 탐지 모델의 검증 방법론 불일치에 따른 성능 편향 분석 연구,” 정보보호학회논문지, Vol. 34, No. 5, Oct. 2024.	21	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
22	2024	10	domestic_journal	정지우, 김태호, 권태경, “기계학습 기반 스케줄링 전략을 적용한 최신 퍼징 연구,” 정보보호학회논문지, Vol. 34, No. 5, Oct. 2024.	22	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
23	2024	10	domestic_journal	이정엽, 조원영, 박래현, 권태경, “적대적 공격 및 방어 기술의 성능 향상을 위한 역방향 적대적 데이터 생성 연구,” 정보보호학회논문지, Vol. 34, No. 5, Oct. 2024.	23	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
25	2024	11	domestic_conference	이정엽, 김아연, 박래현, 권태경, “임의의 픽셀 단위 섭동에 대한 컴퓨터 비전 모델의 강건성 분석 연구,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	25	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
26	2024	11	domestic_conference	한상수, 권태경, “AI 모델 보안성 확보를 위한 RMF 설계 및 적용 방안,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	26	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
30	2024	11	domestic_conference	조주원, 안홍은, 박래현, 권태경, “대규모 언어 모델의 최신 Jailbreak 기법, 성공 평가 및 통합 프레임워크 분석,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	30	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
31	2024	11	domestic_conference	정지우, 권태경, “MacOS 취약점 탐지 동향에 관한 연구,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	31	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
32	2024	11	domestic_conference	김현준, 권태경, “일반화 데이터셋 구축을 위한 딥페이크 생성기법 동향 분석,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	32	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
33	2024	11	domestic_conference	안홍은, 조주원, 권태경, “LLM 및 MLLM을 대상으로 한 탈옥 공격 분석: 공격 턴 수와 모달리티 기반 접근,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	33	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
34	2024	11	domestic_conference	조원영, 김윤식, 권태경, “AI 포렌식의 신뢰성과 투명성 확보를 위한 블록체인 기술 활용 방안,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	34	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
35	2024	11	domestic_conference	이치훈, 김영록, 김병관, 김수진, 권태경, “한국어 딥보이스 판별을 위한 다중 딥러닝 모델 비교 연구,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	35	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
36	2024	11	domestic_conference	김영수, 박대형, 윤병선, 민상규, 이재희, 권태경, “적대적 공격에 대한 딥페이크 탐지 모델의 강건성 분석,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	36	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
37	2024	11	domestic_conference	송현중, 장우성, 최경수, 조효진, 권태경, “사이버범죄를 통한 비대면인증 취약점 분석 및웨어러블 기기 기반 개선 방안,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	37	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
38	2024	11	domestic_conference	이해찬, 전유등, 장연주, 김선진, 권태경, “범죄에 이용된 해외 가상자산 거래의 연관성 분석 모델 설계,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	38	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
39	2024	11	domestic_conference	하영정, 신승우, 박지호, 김승현, 권태경, “딥러닝 기반 디지털 성범죄물 탐색 모델 성능 평가,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024.	39	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
40	2024	6	domestic_conference	이재희, 김현준, 박래현, 권태경, “딥페이크 탐지 성능 검증을 위한 이미지 품질 평가 방법 분석,” 한국정보보호학회 하계학술대회 (CISC S24), Jun. 2024.	40	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
42	2023	11	international_conference	Seyeon Jeong, Eunbi Hwang, Yeongpil Cho, and Taekyoung Kwon, “PHI: Pseudo-HAL Identification for Scalable Firmware Fuzzing,” in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2023.	42	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
43	2023	8	international_conference	Jaewoo Park, Hong Eun Ahn, Leo Hyun Park, and Taekyoung Kwon, “Robust Training for Deepfake Detection Models Against Disruption-Induced Data Poisoning,” in Proc. the 24th World Conference on Information Security Applications (WISA), Aug. 2023.	43	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
45	2023	2	international_journal	Leo Hyun Park, Soochang Chung, Jaeuk Kim, and Taekyoung Kwon, “GradFuzz: Fuzzing Deep Neural Networks with Gradient Vector Coverage for Adversarial Examples,” Neurocomputing, Elsevier, Vol. 522, pp. 165-180, Feb. 2023. (Impact Factor: 6.8)	45	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
46	2023	1	international_journal	Myung Gyo Oh, Leo Hyun Park, Jaeuk Kim, Jaewoo Park, and Taekyoung Kwon, “Membership Inference Attacks with Token-Level Deduplication on Korean Language Models,” IEEE Access, Vol.11, pp.10207 – 10217, Jan. 2023. (Impact Factor: 3.6)	46	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
47	2023	8	domestic_journal	김재욱, 오명교, 박래현, 권태경, “Attention 기법에 기반한 적대적 공격의 강건성 향상 연구,” 정보보호학회논문지, Vol. 33, No. 4, pp. 621-631, Aug. 2023.	47	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
49	2023	12	domestic_conference	이정엽, 박래현, 권태경, “변형된 정상 범주 이미지 기반의 지속 학습을 통한 딥러닝 모델의 강건성 훼손 연구,” 한국정보보호학회 동계학술대회 (CISC S23), Dec. 2023.	49	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
50	2023	12	domestic_conference	김현준, 박래현, 박재우, 안홍은, 권태경, “압축센싱을 통한 적대적 공격 정화,” 한국정보보호학회 동계학술대회 (CISC S23), Dec. 2023.	50	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
51	2023	12	domestic_conference	안홍은, 박래현, 오명교, 권태경, “정보보안의 CIA 기반 LLM 정렬 분석,” 한국정보보호학회 동계학술대회 (CISC S23), Dec. 2023.	51	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
52	2023	6	domestic_conference	안홍은, 박래현, 오명교, 권태경, “ChatGPT 플러그인의 특징과 보안 위협 분석,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023.	52	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
53	2023	6	domestic_conference	오명교, 박래현, 권태경, “대형 언어 모델의 훈련 데이터 추출 공격에 관한 연구: 위협, 문제점, 그리고 대응 방안,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023.	53	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
62	2022	\N	international_conference	Myung Gyo Oh, Leo Hyun Park, Jaeuk Kim, Jaewoo Park, and Taekyoung Kwon, “On Membership Inference Attacks to Generative Language Models across Language Domains,” in Proc. the 23rd World Conference on Information Security Applications (WISA), Lecture Notes in Computer Science, Vol. 13720, Springer, Cham, pp. 143-155, 2022.	62	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
63	2022	10	international_journal	Leo Hyun Park, Jaeuk Kim, Jaewoo Park, and Taekyoung Kwon, “Mixed and Constrained Input Mutation for Effective Fuzzing of Deep Learning Systems,” Information Sciences, Elsevier, Vol. 614, pp. 497-517, Oct. 2022. (Impact Factor: 6.8)	63	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
64	2022	12	domestic_journal	정세연, 황은비, 조영필, 권태경, “유사 HAL 함수 탐색을 통한 펌웨어 퍼징 기법,” 정보보호학회논문지, Vol. 32, No. 6, pp. 1121-1125, Dec. 2022.	64	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
65	2022	12	domestic_conference	김윤식, 임은지, 권태경, “무선센서네트워크 응용과 위치기반 키 분배 기법 활용 연구,” 한국해군과학기술학회 동계학술대회, Dec. 2022.	65	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
66	2022	11	domestic_conference	황은비, 양경덕, 권태경, “임베디드 시스템 대상 펌웨어 퍼징 기술 동향,” 한국정보보호학회 동계학술대회 (CISC W22), Nov. 2022.	66	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
67	2022	11	domestic_conference	양경덕, 황은비, 권태경, “모바일 앱 기반 간편인증 모델 비교 분석: 안전성과 편리성 중심으로,” 한국정보보호학회 동계학술대회 (CISC W22), Nov. 2022.	67	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
69	2022	11	domestic_conference	박재우, 박래현, 김재욱, 오명교, 권태경, “딥러닝 모델 대상의 퍼징 입력 생성 연구 동향,” 한국정보보호학회 동계학술대회 (CISC W22), Nov. 2022.	69	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
70	2022	11	domestic_conference	전일신, 정지우, 권태경, “AFL++의 AFL에 대한 성능 개선 여부에 대한 연구,” 한국정보보호학회 동계학술대회 (CISC W22), Nov. 2022.	70	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
71	2022	6	domestic_conference	김윤식, 임은지, 권태경, “무선 센서 네트워크의 다양한 배치 방법에 대한 고찰,” 한국정보보호학회 하계학술대회 (CISC S22), Jun. 2022.	71	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
72	2022	6	domestic_conference	박재우, 박래현, 김재욱, 오명교, 엄주언, 권태경, “GAN을 이용한 적대적 공격 기법 동향 분석,” 한국정보보호학회 하계학술대회 (CISC S22), Jun. 2022.	72	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
73	2021	11	international_journal	Mingi Cho, Hoyoung Jin, Dohyeon An, and Taekyoung Kwon, “Evaluating Code Coverage for Kernel Fuzzers via Function Call Graph,” IEEE Access,Vol.9, pp.157267 – 157277, Nov. 2021. (Impact Factor: 3.6)	73	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
74	2021	10	international_journal	Eunbi Hwang, Hyunseok Lee, Seyeon Jeong, Mingi Cho, and Taekyoung Kwon, “Toward Fast and Scalable Firmware Fuzzing with Dual-Level Peripheral Modeling,” IEEE Access, Vol.9, pp.141790 – 141799, Oct. 2021 (Impact Factor: 3.6)	74	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
75	2021	6	international_journal	JongHyup Lee, and Taekyoung Kwon, “Distributed Watchdogs Based on Blockchain for Securing Industrial Internet of Things,” Sensors, Vol. 21, No. 13, June. 2021. (Impact Factor: 3.5)	75	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
76	2021	5	international_journal	Mingi Cho, Jaedong Jang, Yezee Seo, Seyeon Jeong, Soochang Chung, and Taekyoung Kwon, “Towards Bidirectional LUT-level Detection of Hardware Trojans,” Computers & Security, Elsevier, Vol.104, May 2021. (Impact Factor: 5.4)	76	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
77	2021	1	international_journal	Pyung Kim, Younho Lee, Youn-Sik Hong, and Taekyoung Kwon,”A Password Meter without Password Exposure,” Sensors, Vol. 21, No. 2, pp. 345-370, Jan. 2021. (Impact Factor: 3.5)	77	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
79	2021	11	domestic_conference	임은지, 권태경, “배치 정보 기반 키 분배 기법의 배치 오류 시뮬레이션 모델링에 관한 연구,” 한국정보보호학회 동계학술대회 (CISC W21), Nov. 2021.	79	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
80	2021	11	domestic_conference	진호용, 조민기, 안도현, 권태경, “리눅스 커널 함수 호출 그래프 추출 기법에 관한 연구,” 한국정보보호학회 동계학술대회 (CISC W21), Nov. 2021.	80	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
87	2021	4	domestic_journal	김영훈, 권태경, “협업 툴의 사용자 행위별 아티팩트 분석 연구 – 윈도우즈 및 안드로이드 환경의 Microsoft Teams를 대상으로,” 정보보호학회논문지, Vol. 31, No. 3, pp. 353-363, Apr. 2021.	87	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
88	2021	4	domestic_journal	조민기, 정세연, 권태경, “비트스트림 역공학을 활용한 FPGA 하드웨어 악성기능 탐지 기법 연구,” 정보보호학회논문지, Vol. 31, No. 2, pp. 187-195, Apr. 2021.	88	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
89	2021	2	domestic_journal	김재욱, 박래현, 권태경, “Analysis of Deep Learning Model Vulnerability According to Input Mutation,” 정보보호학회논문지, Vol. 31, No. 1, pp. 51-59, Feb. 2021.	89	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
90	2020	9	international_journal	Leo Hyun Park, Jungbeen Yu, Hong-Koo Kang, Taejin Lee, and Taekyoung Kwon “Birds of a Feature: Intrafamily Clustering for Version Identification of Packed Malware,” IEEE Systems Journal, Vol. 14, pp. 4545-4556, Sep. 2020. (Impact Factor: 4.4)	90	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
91	2020	4	international_journal	Sooyeon Shin, Taekyoung Kwon, “A Privacy-Preserving Authentication, Authorization, and Key Agreement Scheme for Wireless Sensor Networks in 5G-Integrated Internet of Things,” IEEE Access, Vol. 8, pp. 67555-67571, Apr. 2020.  (Impact Factor: 3.6)	91	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	t
92	2020	12	domestic_journal	윤혜민,신수연, 권태경 “3D 환경을 고려한 무선 센서 네트워크의 키 사전 분배 기법 실험 연구,” 정보보호학회논문지, Vol.30, No.6, pp. 975-980, Dec. 2020.	92	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
93	2020	12	domestic_journal	김서영,조민기,김종신, 권태경 “라이브러리 퍼징의 커버리지 향상 방법 연구,” 정보보호학회논문지, Vol. 30, No. 6, pp. 1079-1085, Dec. 2020.	93	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
94	2020	11	domestic_conference	황은비, 정세연, 조민기, 권태경, “임베디드 디바이스 펌웨어 퍼징 기술의 동향 분석,” 한국정보보호학회 동계학술대회 (CISC W20), Nov. 2020.	94	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
95	2020	11	domestic_conference	김영훈, 권태경, “협업 툴의 사용자 행위별 아티팩트 분석 연구– 윈도우즈 및 안드로이드 환경의 Microsoft Teams를 대상으로,” 한국정보보호학회 동계학술대회 (CISC W20), Nov. 2020.	95	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
96	2020	11	domestic_conference	안도현, 조민기, 진호용, 권태경, “커널 어드레스 새니타이저 분석,” 한국정보보호학회 동계학술대회 (CISC W20), Nov. 2020.	96	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
97	2020	11	domestic_conference	정세연, 황은비, 조민기, 권태경, “임베디드 펌웨어 테스트 최신 기술 동향,” 한국정보보호학회 동계학술대회 (CISC W20), Nov. 2020.	97	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
99	2020	11	domestic_conference	정수창, 박래현, 권태경 “적대적 예시 탐지를 위한 뉴런 기반 커버리지 기법의 적합성 연구,” 한국정보보호학회 동계학술대회 (CISC W20), Nov. 2020.	99	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
100	2020	9	domestic_journal	정세연, 조민기, 황은비, 권태경 “FPGA 기반 임베디드 시스템의 사이버 보안 위협 동향 분석,” 한국해군학회지, Vol. 3, No. 2, pp. 113-117, Sep. 2020.	100	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
101	2020	8	domestic_journal	김슬기, 유상봉, 장윤, 권태경 “아이트래킹을 이용한 안전한 패스워드 입력 방법에 관한 연구 – 숄더 서핑 공격 대응을 중심으로,” 정보보호학회논문지, Vol. 30, No. 4, pp. 545-558, Aug. 2020.	101	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
102	2020	7	domestic_conference	정세연, 조민기, 황은비, 권태경, “FPGA 기반 임베디드 시스템의 사이버 보안 위협 동향 분석,” 한국해군과학기술학회 춘계학술대회, Jul. 2020.	102	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
104	2020	4	domestic_journal	장재동, 조민기, 서예지, 정세연, 권태경, “FPGA의 Hardware Trojan 대응을 위한 기계학습 기반 탐지 기술 연구,” 한국인터넷정보학회논문지, Vol. 21, No. 2, pp. 109-119, Apr. 2020.	104	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
106	2019	11	international_conference	Seoyoung Kim, Seyeon Jeong, Mingi Cho, Soochang Chung, and Taekyoung Kwon, “POSTER: Evaluating Code Coverage for System Call Fuzzers,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), London, UK, Nov. 2019.	106	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
107	2019	11	international_conference	Leo Hyun Park , Sangjin Oh, Jaeuk Kim, Soochang Chung, and Taekyoung Kwon, “POSTER: Effective Layers in Coverage Metrics for Deep Neural Networks,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), London, UK, Nov. 2019.	107	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
109	2019	5	international_journal	Yeeun Ku, Leo Hyun Park, Sooyeon Shin, and Taekyoung Kwon, “Draw It As Shown: Behavioral Pattern Lock for Mobile User Authentication,” IEEE Access, Vol. 7, pp. 69363-69378, May. 2019.	109	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
110	2019	4	international_journal	Sooyeon Shin and Taekyoung Kwon, “A Lightweight Three-Factor Authentication and Key Agreement Scheme in Wireless Sensor Networks for Smart Homes,” Sensors, Vol. 19, No. 9, Apr. 2019.	110	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
111	2019	8	international_journal	Sangbong Yoo, Hong Ryeol Ryu, Hanbyul Yeon, Taekyoung Kwon, and Yun Jang, “Visual Analytics and Visualization for Android Security Risk,” Elsevier Journal of Computer Languages, Vol. 53, pp. 9-21, Aug. 2019.	111	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
112	2019	12	domestic_journal	윤혜민, 김재욱, 황은비, 김해니, 권태경, “Windows 10 환경의 Box 클라우드 아티팩트 분석,” 정보보호학회지, Vol. 29, No. 6, pp. 29-37, Dec. 2019.	112	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
113	2019	11	domestic_conference	정세연, 정수창, 김서영, 조민기, 권태경, “커버리지 기반 퍼징 최신 기술 분석,” 한국정보보호학회 동계학술대회 (CISC W19), Nov. 2019.	113	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
114	2019	11	domestic_conference	황은비, 박래현, 권태경, “행위 기반의 지속인증을 위한 스마트폰 인증 연구 동향 분석,” 한국정보보호학회 동계학술대회 (CISC W19), Nov. 2019.	114	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
115	2019	8	domestic_journal	김해니, 김재욱, 권태경, “시나리오 기반 이미지 개발을 통한 파일 카빙 도구 검증 방안 연구,” 정보보호학회논문지, Vol. 29, No. 4, pp. 835-845, Aug. 2019.	115	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
116	2019	6	domestic_conference	김종신, 윤혜민, 권태경, “NS-3 시뮬레이션을 이용한 무선 센서 네트워크 FRP 프로토콜 구현 실험 연구,” 한국정보보호학회 하계학술대회 (CISC S19), Jun. 2019.	116	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
117	2019	6	domestic_conference	조민기, 김서영, 정세연, 정수창, 권태경, “시스템 콜 퍼저의 코드 커버리지 성능 평가 방법 연구,” 한국정보보호학회 하계학술대회 (CISC S19), Jun. 2019.	117	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
118	2019	6	domestic_conference	정수창, 박래현, 오상진, 김재욱, 권태경, “딥러닝 모델 검증을 위한 퍼징 기술 연구 동향,” 한국정보보호학회 하계학술대회 (CISC S19), Jun. 2019.	118	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
119	2019	6	domestic_journal	오상진, 박래현, 권태경, “악성코드 분석의 Ground-Truth 향상을 위한 Unified Labeling과 Fine-Grained 검증,” 정보보호학회논문지, Vol. 29, No. 3, pp. 549-555, Jun. 2019.	119	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
120	2019	2	domestic_journal	이영주, 구예은, 권태경, “행위 기반 인증을 위한 사용자 중심의 인증 요소 분석 연구,” 정보보호학회논문지, Vol. 29, No. 1, pp. 127-137, Feb. 2019.	120	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
121	2019	2	domestic_journal	이준원, 권태경, “기계학습 기반 비트코인 채굴 난이도 예측 연구,” 정보보호학회논문지, Vol. 29, No. 1, pp. 225-234, Feb. 2019.	121	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
122	2018	10	international_conference	Junghwan Yoon, Yezee Seo, Jaedong Jang, Mingi Cho, Jingoog Kim, Hyeonsook Kim and Taekyoung Kwon, “POSTER: A Bitstream Reverse Engineering Tool for FPGA Hardware Trojan Detection,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), Toronto, Canada, Oct. 2018.	122	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
123	2018	10	international_conference	Yeeun Ku, Leo Hyun Park, Sooyeon Shin, and Taekyoung Kwon, “POSTER: A Guided Approach to Behavioral Authentication,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), Toronto, Canada, Oct. 2018.	123	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
124	2018	10	international_conference	Mingi Cho, Seoyoung Kim, Yoochan Lee and Taekyoung Kwon, “Diving into OS Kernels to Trigger Deeper Bugs,” 13th USENIX Symposium on Operating Systems Design and Implementation (OSDI), Carlsbad, California, Oct. 2018. (poster)	124	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
125	2018	9	international_conference	Jung Yeon Hwang, Stanislaw Jarecki, Taekyoung Kwon, Joohee Lee, Ji Sun Shin, Jiayu Xu, “Round-Reduced Modular Construction of Asymmetric Password-Authenticated Key Exchange,” in Proc. 11th Conference on Security and Cryptography for Networks (SCN), Amalfi, Italy, Sep. 2018.	125	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
126	2018	7	international_journal	Youngjoo Lee, Wonseok Yang, and Taekyoung Kwon, “Data Transfusion: Pairing Wearable Devices and Its Implication on Security for Internet of Things,” IEEE Access, Vol. 6, pp. 48994-49006, Jul. 2018.	126	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
127	2018	2	international_conference	Yezee Seo, Junghwan Yoon, Jaedong Jang, Mingi Cho, Hoon-Kyu Kim, and Taekyoung Kwon, “Poster: Towards Reverse Engineering FPGA Bitstreams for Static Hardware Trojan Detection,” Network and Distributed System Security Symposium (NDSS), San Diego, California, Feb. 2018.	127	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
128	2018	2	international_conference	Leo Hyun Park, JungBeen Yu, and Taekyoung Kwon, “Poster: Exploring Family Features for Classification and Lineage Inference of Packed Malware,” Network and Distributed System Security Symposium (NDSS), San Diego, California, Feb. 2018. (Honorable Mention)	128	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
129	2018	1	international_journal	Sooyeon Shin and Taekyoung Kwon, “Two-Factor Authenticated Key Agreement Supporting Unlinkability in 5G-Integrated Wireless Sensor Networks,” IEEE Access, Vol. 6, pp. 11229-11241, Jan. 2018.	129	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
130	2018	12	domestic_journal	이동건, 권태경, “기계학습을 활용한 이더리움 미확인 스마트 컨트랙트 자동 분류 방안,” 정보보호학회논문지, Vol. 28, No. 6, pp. 1319-1328, Dec. 2018.	130	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
131	2018	12	domestic_conference	김해니, 권태경, “모바일포렌식 가이드라인 현황 연구,” 한국정보보호학회 동계학술대회 (CISC W18), Dec. 2018.	131	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
132	2018	12	domestic_conference	김서영, 권태경, “임베디드 리눅스 시스템의 보안 설정 검사 방법 연구,” 한국정보보호학회 동계학술대회 (CISC W18), Dec. 2018.	132	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
133	2018	12	domestic_conference	김종신, 권태경, “위치기반 키 관리 기법을 적용한 무선센서네트워크 연구 동향 분석,” 한국정보보호학회 동계학술대회 (CISC W18), Dec. 2018.	133	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
138	2018	10	domestic_journal	유정빈, 오상진, 박래현, 권태경, “하이브리드 특징 및 기계학습을 활용한 효율적인 악성코드 분류 시스템 개발 연구,” 정보보호학회논문지, Vol. 28, No. 5, pp. 1161-1167, Oct. 2018.	138	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
139	2018	4	domestic_journal	윤정환, 서예지, 김훈규, 권태경, “BIL 비트스트림 역공학 도구 분석 연구,” 정보보호학회논문지, Vol. 28, No. 2, pp. 287-293, Apr. 2018.	139	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
140	2018	2	domestic_journal	김승연, 권태경, “모바일 환경의 사용자 인증 기법에 대한 usable security 연구 동향,” 정보보호학회지, Vol. 28, No. 1, pp. 22-28, Feb. 2018.	140	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
141	2018	2	domestic_journal	구예은, 권태경, “머신러닝 기반의 차세대 사용자 인증 연구 동향 분석,” 정보과학회지, Vol. 36, No. 2, pp. 43-48, Feb. 2018.	141	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
143	2017	11	international_conference	Youngjoo Lee, Wonseok Yang, and Taekyoung Kwon, “POSTER: Watch Out Your Smart Watch When Paired,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), Dallas, Texas, pp. 2527-2529, Nov. 2017.	143	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
144	2017	11	international_conference	Seungyeon Kim, Hoyeon Lee, and Taekyoung Kwon, “POSTER: Rethinking Fingerprint Identification on Smartphones,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), Dallas, Texas, pp. 2515-2517, Nov. 2017.	144	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
145	2017	8	international_conference	Jungwoo Joh, Yezee Seo, Hoon-Kyu Kim, and Taekyoung Kwon, “Glitch Recall: A Hardware Trojan Exploiting Natural Glitches in Logic Circuits,” in Proc. the World Conference of Information Security Applications (WISA), Aug. 2017.	145	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
146	2017	8	international_conference	Sangbong Yoo, HongRyeol Ryu, Hanbyul Yeon, Taekyoung Kwon, and Yun Jang, “Personal visual analytics for android security risk lifelog,” Proceedings of the 10th International Symposium on Visual Information Communication and Interaction, pp. 29-36, Aug. 2017.	146	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
148	2017	11	international_journal	Sooyeon Shin, Minwoo Kim, and Taekyoung Kwon, “Experimental Performance Analysis of Lightweight Block Ciphers and Message Authentication Codes for Wireless Sensor Networks,” International Journal of Distributed Sensor Networks, Vol. 13, No. 11, Nov. 2017.	148	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
149	2017	6	international_journal	Jaewoo Choi, Jihyun Bang, LeeHyung Kim, Mirim Ahn, and Taekyoung Kwon, “Location-Based Key Management Strong Against Insider Threats in Wireless Sensor Networks,” IEEE Systems Journal, Vol. 11, Iss. 2, pp. 494-502, Jun. 2017.	149	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
150	2017	3	international_conference	Sooyeon Shin and Taekyoung Kwon, “A Corrupted Cloud and Corrupted Multi-Cloud Identification Method for Batch Auditing in Cloud Storage Services,” Computer Systems Science & Engineering, Vol. 32, No. 2, Mar. 2017.	150	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
151	2017	12	domestic_journal	이영주, 양원석, 권태경, “스마트워치 데이터 분석 및 위험도 평가,” 정보보호학회논문지, Vol. 27, No. 6, pp. 1483-1490, Dec. 2017.	151	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
152	2017	8	domestic_journal	김경훈, 권태경, “모바일 핀테크 서비스에서 이용 가능한 인증 수단의 사용성, 안전성 분석 연구,” 정보보호학회논문지, Vol. 27, No. 4, pp. 843-853, Aug. 2017.	152	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
153	2017	6	domestic_journal	유정빈, 신민식, 권태경, “기계 학습을 활용한 변종 악성코드 식별 연구 동향 분석,” 정보보호학회지, Vol. 27, No. 3, pp. 12-19, Jun. 2017.	153	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
154	2017	6	domestic_journal	신민식, 유정빈, 권태경, “스마트폰 미디어 서버 데몬에 대한 파일 포맷 인식 기반의 퍼징 연구,” 정보보호학회논문지, Vol. 27, No. 3, pp. 541-548, Jun. 2017.	154	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
155	2017	6	domestic_journal	양원석, 권태경, “자동화 공격과 릴레이 공격에 저항하는 Emerging Image Cue CAPTCHA 연구,” 정보보호학회논문지, Vol. 27, No. 3, pp. 531-539, Jun. 2017.	155	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
156	2017	4	domestic_journal	이호연, 권태경, “지문 영상 복원 기반의 스마트 기기 지문 스머지 공격 연구,” 정보보호학회논문지, Vol. 27, No. 2, pp. 233-240, Apr. 2017.	156	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
157	2017	4	domestic_journal	김민우, 김승연, 권태경, “안드로이드에서 앱 사용과 터치 정보를 이용한 행위 기반 사용자 인증 기술 연구,” 정보보호학회논문지, Vol. 27, No. 2, pp. 361-371, Apr. 2017.	157	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
158	2017	2	domestic_journal	김경훈, 김승연, 권태경, “패스워드 강도 측정 방법 연구 동향,” 정보보호학회지, Vol. 27, No. 1, pp. 31-38, Feb. 2017.	158	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
159	2017	12	domestic_conference	박래현, 유정빈, 박준형, 권태경, “동적 정보 기반 악성코드 그룹 분류 및 특징 연구,” 한국정보보호학회 동계학술대회 (CISC W17), Dec. 2017.	159	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
160	2017	12	domestic_conference	구예은, 이호연, 권태경, “지속 인증을 위한 사용자 행위 정보 기반 특징 요소 별 성능 분석 연구,” 한국정보보호학회 동계학술대회 (CISC W17), Dec. 2017.	160	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
161	2016	\N	international_conference	Wonseok Yang, Youngjoo Lee, and Taekyoung Kwon, “The Bourne Security: Your Wearable Device Can Leak Your Sensitive Data in Locked States,” Annual Computer Security Applications Conference (ACSAC), 2016. (poster)	161	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
163	2016	10	international_journal	JongHyup Lee and Taekyoung Kwon, “Secure dissemination of software updates for intelligent mobility in future wireless networks,” EURASIP Journal on Wireless Communications and Networking, Vol. 2016, No. 1, pp. 250, Oct. 2016.	163	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
164	2016	9	international_journal	Sooyeon Shin and Seulgi Kim and Jaewoo Choi and Taekyoung Kwon, “A Study on Detection and Detour Methods against Packet Dropping Attacks in IPv6-based IoT,” IT CoNvergence PRActice (INPRA), Vol. 4, No. 3, pp. 20-27, Sep. 2016.	164	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
165	2016	\N	international_journal	Minwoo Kim, Jihyun Bang, and Taekyoung Kwon, “LinkA: A link layer anonymization method based on bloom filter for authenticated IoT devices,” Intelligent Automation & Soft Computing, Vol. 22, Iss. 3, pp. 365-369, 2016.	165	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
166	2016	2	international_journal	Taekyoung Kwon and Sarang Na, “SteganoPIN: Two-Faced Human-Machine Interface for Practical Enforcement of PIN Entry Security,” IEEE Transactions on Human-Machine Systems, Vol. 46, No. 1, pp. 143-150, Feb. 2016.	166	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
167	2016	2	international_journal	JongHyup Lee, LeeHyung Kim, and Taekyoung Kwon, “FlexiCast: Energy-Efficient Software Integrity Checks to Build Secure Industrial Wireless Active Sensor Networks,” IEEE Transactions on Industrial Informatics, Vol. 12, No. 1, pp. 6-14, Feb. 2016.	167	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
168	2016	\N	domestic_journal	조현웅, 김슬기, 권태경, “오픈 소스 중복 제거 파일시스템에서의 완전 삭제,” 정보보호학회논문지, Vol. 26, No. 5, pp. 1141-1149, 2016.	168	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
169	2016	\N	domestic_journal	김민우, 권태경, “메시지 인증 코드에 대한 연구 동향,” 정보과학회논문지:정보통신, Vol. 43, No. 11, pp. 1245-1258, 2016.	169	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
170	2016	\N	domestic_journal	정성미, 권태경, “기계 학습 기반의 자동화된 스머지 공격과 패턴 락 시스템 안전성 분석,” 정보보호학회논문지, Vol. 26, No. 4, pp. 903-910, 2016.	170	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
171	2016	\N	domestic_journal	김승연, 권태경, “국내 사용자의 패스워드 사용 현황 분석,” 정보보호학회논문지, Vol. 26, No. 4, pp. 961-972, 2016.	171	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
172	2016	\N	domestic_journal	김민우, 권태경, “저사양 마이크로 컨트롤러에서 ARX 경량 암호를 위한 효율적인 Rotation 구현 방법 연구,” 정보보호학회논문지,  Vol. 26, No. 3, pp. 623-630, 2016.	172	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
173	2016	\N	domestic_journal	김경훈, 권태경, “국내 웹 사이트 패스워드 미터 분석,” 정보보호학회논문지, Vol. 26, No. 3, pp. 757-767, 2016.	173	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
174	2016	\N	domestic_journal	최재우, 권태경, “IPv6 기반의 사물인터넷 환경에서 악성 노드의 패킷 유실 공격 탐지 및 우회 기법 분석,” 정보보호학회논문지,  Vol. 26, No. 3, pp. 655-659, 2016.	174	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
176	2016	12	domestic_conference	유정빈, 신민식, 이태진, 강홍구, 권태경, “효율적인 악성코드 탐지를 위한 데이터마이닝 기반 악성코드 변종그룹 식별 방안 연구,” 한국정보보호학회 동계학술대회 (CISC W16), 2016.	176	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
177	2016	12	domestic_conference	김민우, 김슬기, 이호연, 권태경, “앱 사용 정보와 터치 정보를 이용한 행위 기반 인증 기술,” 한국정보보호학회 동계학술대회 (CISC W16), 2016.	177	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
178	2016	12	domestic_conference	양원석, 권태경, “CAPTCHA에 대한 연구 동향,” 한국정보보호학회 동계학술대회 (CISC W16), 2016.	178	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
179	2016	12	domestic_conference	김용회, 권태경, “패킷 헤더 필드의 우선순위 비교 연구 : 수사단서 중심으로,” 한국정보보호학회 동계학술대회 (CISC W16), 2016.	179	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
180	2016	12	domestic_conference	노재훈, 권태경, “악성코드에 자주 사용되는 API 정보를 이용한 유사도 비교 방법,” 한국정보보호학회 동계학술대회 (CISC W16), 2016.	180	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
181	2016	6	domestic_conference	윤영진, 권태경, “iOS 보안 취약점 탐지를 위한 퍼징 연구,” 한국정보보호학회 하계학술대회 (CISC S16), 2016.	181	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
182	2016	6	domestic_conference	조현웅, 권태경, “오픈 소스 중복 제거 파일시스템에서의 완전 삭제,” 한국정보보호학회 하계학술대회 (CISC S16), 2016.	182	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
183	2016	6	domestic_conference	김경훈, 권태경, “국내 웹 사이트 패스워드 미터 정확성 분석,” 한국정보보호학회 하계학술대회 (CISC S16), 2016.	183	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
184	2015	2	international_journal	Taekyoung Kwon and Jin Hong, “Analysis and Improvement of a PIN-Entry Method Resilient to Shoulder-Surfing and Recording Attacks,” IEEE Transactions on Information Forensics and Security, Vol. 10, Iss. 2, pp. 278-292, Feb. 2015.	184	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
185	2015	11	international_conference	Sooyeon Shin, Seungyeon Kim, and Taekyoung Kwon, “Identification of Corrupted Cloud Storage in Batch Auditing for Multi-Cloud Environments,” AsiaARES 2015, pp.221-225, Nov. 2015.	185	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
186	2015	6	international_conference	Kyu Young Choi, Jihoon Cho, Jung Yeon Hwang, and Taekyoung Kwon, “Constructing Efficient PAKE Protocols from Identity-Based KEM/DEM,” Information Security Applications (WISA), Lecture Notes in Computer Science, Vol. 2015, Springer-Verlag, pp.606-619, Jun. 2015.	186	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
187	2015	12	domestic_journal	유홍렬, 장윤, 권태경, “안드로이드 OS에서 앱 설치 의사결정 지원을 위한 악성 앱 분류 시스템,” 정보과학회논문지:정보통신, Vol. 42, No. 12, pp. 1611-1622, Dec. 2015.	187	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
188	2015	\N	domestic_journal	김승연, 권태경, “패스워드의 표기 방식이 패스워드 생성에 미치는 영향,” 정보보호학회논문지, Vol. 25, No. 5, 2015.	188	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
189	2015	\N	domestic_journal	최재우, 김용현, 김주엽, 권태경, “무선 센서 네트워크에서 그리드 정보를 활용한 위치 기반 키 관리 연구,” 정보보호학회논문지, Vol. 25, No. 4, 2015.	189	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
190	2015	\N	domestic_journal	신수연, 권태경, “손상 클라우드 식별 가능한 다중 클라우드 일괄 감사 기법에 관한 연구,” 정보보호학회논문지, Vol. 25, No. 1, 2015.	190	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
194	2014	8	international_journal	Taekyoung Kwon, Sarang Na, and Sooyeon Shin, “Touch Pointer: Rethink Point-and-Click for Accurate Indirect Touch Interactions on Small Touchscreens,” IEEE Transactions on Consumer Electronics, Vol. 60, No. 3, pp. 285-293, Aug. 2014.	194	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
195	2014	6	international_journal	Taekyoung Kwon, Sooyeon Shin, and Sarang Na, “Covert Attentional Shoulder Surfing: Human Adversaries Are More Powerful Than Expected,” IEEE Transactions on Systems, Man, and Cybernetics: Systems (Formerly, Part A), Vol. 44, No. 6, pp. 716-727, Jun. 2014.	195	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
196	2014	5	international_journal	Taekyoung Kwon and Sarang Na, “TinyLock: Affordable Defense Against Smudge Attacks on Smartphone Pattern Lock Systems,” Computers & Security, Elsevier, Vol. 42, pp. 137-150, May 2014.	196	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
197	2014	5	international_journal	JongHyup Lee and Taekyoung Kwon, “GENDEP: Location-Aware Key Management for General Deployment of Wireless Sensor Networks,” International Journal of Distributed Sensor Networks, Vol. 2014, Article ID. 490202, May 2014.	197	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
198	2014	2	international_journal	Taekyoung Kwon, Sarang Na, and Sang-ho Park, “Drag-and-Type: A New Method for Typing with Virtual Keyboards on Small Touchscreens,” IEEE Transactions on Consumer Electronics, Vol. 60, Iss. 1, pp. 99-106, Feb. 2014.	198	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
199	2014	1	international_conference	Taekyoung Kwon and Sarang Na, “SwitchPIN: Securing Smartphone PIN Entry with Switchable Keypads,” IEEE ICCE 2014, pp. 23-24, Jan. 2014.	199	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
200	2014	1	international_conference	Sarang Na and Taekyoung Kwon, “RIK: A Virtual Keyboard Resilient to Spyware in Smartphones,” IEEE ICCE 2014, pp. 25-26, Jan. 2014.	200	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
201	2014	\N	domestic_journal	유홍렬, 홍모세, 권태경, “사용자의 패스워드 인증 행위 분석 및 피싱 공격시 대응방안 – 사용자 경험 및 HCI의 관점에서,” 한국인터넷정보학회, Vol. 15, No. 3, pp. 79-90, 2014.	201	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
202	2014	\N	domestic_journal	유홍렬, 정성미, 권태경, “새롭게 진화하는 위협의 패러다임 – 지능형 지속 위협(APT),” 전자공학회지, Vol. 41, No. 4, pp. 16-30, 2014.	202	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
203	2014	12	domestic_conference	유홍렬, 권태경, “프라이버시 대시보드 : 안드로이드 OS 환경에서 민감정보 접근내역 확인을 위한 사용자 인터페이스 제안,” 한국정보과학회 동계학술대회, 2014.	203	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
204	2014	12	domestic_conference	이재빈, 강지원, 권태경, “302 리다이렉트 공격에 대한 분석 및 대응방안,” 한국정보보호학회 동계학술대회 논문집 (CISC W14), 2014.	204	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
205	2014	12	domestic_conference	홍모세, 권태경, “폰갭 기반의 하이브리드 앱 XSS 취약점 정적 탐지,” 한국정보보호학회 동계학술대회 논문집 (CISC W14), 2014.	205	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
206	2014	12	domestic_conference	이건희, 박상호, 권태경, “NFC와 MDM을 이용한 안전한 회의 시스템,” 한국정보보호학회 동계학술대회 논문집 (CISC W14), 2014.	206	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
207	2014	11	domestic_conference	노승훈, 권태경, “국내 모바일 환경 간편결제 서비스에 대한 비교 연구,” 한국경영정보학회 추계학술대회, 2014.	207	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
208	2014	\N	domestic_conference	유홍렬, 권태경, “안드로이드 권한의 위험을 판단하기 위한 평가척도에 관한 연구,” 2014년 한국컴퓨터종합학술대회 논문집, 2014.	208	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
209	2014	6	domestic_conference	최재우, 권태경, “무선 센서 네트워크를 위한 위치 기반 키 관리 기법 개선 연구,” 한국정보보호학회 하계학술대회 논문집 (CISC S14), 2014.	209	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
211	2014	6	domestic_conference	유홍렬, 최보윤 권태경, “유연한 대학 전공 트랙 운영을 통한 융합형 정보보호 전문인력 양성방안,” 한국정보보호학회 하계학술대회 논문집 (CISC S14), 2014.	211	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
212	2014	5	domestic_conference	노승훈, 권태경, “개인정보 취급방침 읽기에 소요되는 시간 측정 연구,” 한국경영정보학회 춘계공동학술대회, pp. 896-899, 2014.	212	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
213	2013	3	international_journal	Kwantae Cho, Minho Jo, Taekyoung Kwon, Hsiao-Hwa Chen, and Dong Hoon Lee, “Classification and Experimental Analysis for Clone Detection Approaches in Wireless Sensor Networks,” IEEE Systems Journal, Vol. 7, No. 1, pp.26-35, Mar. 2013.	213	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
214	2013	1	international_conference	Taekyoung Kwon, Sarang Na, and Sooyeon Shin, “Touch Pointer: Rethink Point-and-Click for Accurate Indirect Touch Interactions on Small Touchscreens,” IEEE ICCE 2013, pp. 600-601, Jan. 2013.	214	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
215	2013	1	international_conference	Taekyoung Kwon, Sarang Na, and Sang-ho Park, “Drag-and-Type: A New Method for Typing with Virtual Keyboards on Small Touchscreens,” IEEE ICCE 2013, pp. 460-461, Jan. 2013.	215	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
216	2013	\N	domestic_journal	유홍렬, 홍모세, 권태경, “피싱 및 파밍 공격에 의한 다수의 패스워드 유출 요인에 관한 연구,” 정보보호학회논문지, Vol. 23, No. 6, pp. 1225-1229, 2013.	216	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
217	2013	\N	domestic_journal	나사랑, 권태경, “스마트폰 환경에서 스파이웨어에 저항하는 동적 이미지 기반 가상 키보드 기법,” 정보보호학회논문지, Vol. 23, No. 6, pp. 1219-1223, 2013.	217	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
218	2013	\N	domestic_journal	박상호, 김현진, 권태경, “안드로이드 스마트폰 암호 사용 앱 보안 분석 및 대응,” 정보보호학회논문지, Vol. 23, No. 6, pp. 1049-1055, 2013.	218	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
222	2013	11	domestic_conference	나사랑, 권태경, “스마트폰 환경에서 숄더 서핑과 스파이웨어에 저항하는 패스워드 입력 기법,” 한국인터넷정보학회 추계학술발표대회 논문집, Vol. 14, No. 2, pp. 77-78, 2013.	222	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	f	f
2	2025	10	international_conference	Leo Hyun Park and Taekyoung Kwon, "Red-Teaming LLMs with Token Control Score: Efficient, Universal, and Transferable Jailbreaks," in Proc. International Symposium on Research in Attacks, Intrusions, and Defenses (RAID), Oct.2025 (BK, 정보과학회 우수학술대회)	2	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
3	2025	10	international_conference	Jeongmin Yu, Susang Kim, Kisu Lee, Taekyoung Kwon, Won-Yong Shin, Ha Young Kim, "Multi-View Slot Attention Using Paraphrased Texts for Face Anti-Spoofing," In Proc. International Conference on Computer Vision (ICCV), Oct. 2025.  (BK, 정보과학회 최우수학술대회)	3	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
10	2025	6	domestic_conference	김예지, 황은비, 권태경, "딥페이크 탐지 기술의 최신 연구 동향과 일반화 관점 분석," 한국정보보호학회 하계학술대회 (CISC S25), June. 2025. (정보보호학회장상 우수논문상)	10	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
14	2024	11	international_conference	Jeewoo Jung, Taekyoung Kwon, “Enhancing Differential Fuzzing of Cryptographic Libraries with Sustainable Hybrid Fuzzing and Crypto-Specific Mutation,” in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2024. (Best Paper Award)	14	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
16	2024	9	international_conference	Jueon Eom, Seyeon Jeong, and Taekyoung Kwon, “Fuzzing JavaScript Interpreters with Coverage-Guided Reinforcement Learning for LLM-based Mutation,” in Proc. the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA), Sep. 2024. (BK, 정보과학회 최우수학술대회)	16	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
24	2024	11	domestic_conference	이재희, 권태경, “CLIP 모델 미세 조정을 통한 제로샷 기반 딥페이크 탐지 성능 향상 연구,” 한국정보보호학회 동계학술대회 (CISC W24), Nov. 2024. (한국전자통신연구원 원장상 수상)	24	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
41	2024	6	domestic_conference	조원영, 김윤식, 황은비, 한상수, 권태경, “블록체인 기술을 사용한 메타버스 로그인 방식 분석,” 한국정보보호학회 하계학술대회 (CISC S24), Jun. 2024. (부채널분석 연구회 회장상 수상)	41	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
44	2023	8	international_conference	Mingi Cho, Dohyeon An, Hoyong Jin, and Taekyoung Kwon, “BoKASAN: Binary-only Kernel Address Sanitizer for Effective Kernel Fuzzing,” in Proc. the 32nd USENIX Security Symposium (USENIX Security), Aug. 2023. (BK, 정보과학회 최우수학술대회)	44	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
48	2023	12	domestic_conference	이서린, 박래현, 김현준, 박재우, 권태경, “딥페이크 탐지 모델의 성능 검증 방법론 동향 분석,” 한국정보보호학회 동계학술대회 (CISC S23), Dec. 2023. (우수논문상 수상)	48	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
55	2023	6	domestic_conference	김윤식, 임은지, 권태경, “3D 환경에서의 무선 센서 네트워크 위치 기반 Pairwise 키 사전 분배 기법 성능 비교 연구,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023. (우수논문상 수상)	55	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
56	2023	6	domestic_conference	정지우, 전일신, 황은비, 권태경, “기계학습 기반으로 입력을 최적화하는 퍼징 기술 연구,” 한국정보보호학회 하계학술대회 (CISC S23), Jun. 2023. (KISA 원장상 수상)	56	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
59	2022	11	international_conference	Hoyong Jin, Dohyeon An and Taekyoung Kwon, “Differential Testing of Cryptographic Libraries with Hybrid Fuzzing,” in Proc. the Annual International Conference on Information Security and Cryptology (ICISC), Nov. 2022. (Best Paper Award)	59	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
68	2022	11	domestic_conference	김재욱, 박래현, 오명교, 박재우, 권태경, “적대적 공격으로부터 강건한 딥러닝 모델을 위한 Attention 기반 적대적 학습 기법 연구,” 한국정보보호학회 동계학술대회 (CISC W22), Nov. 2022. (우수논문상 수상)	68	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
78	2021	11	domestic_conference	엄주언, 박래현, 권태경, “딥러닝 모델의 밀집 적대적 공격과 희소 적대적 공격에 관한 연구,” 한국정보보호학회 동계학술대회 (CISC W21), Nov. 2021. (우수논문상 수상)	78	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
82	2021	6	domestic_conference	엄주언, 박래현, 김재욱, 권태경, “적대적 공격과 커버리지 기반 딥러닝 퍼징의 유효성 비교 분석,” 한국정보보호학회 하계학술대회 (CISC S21), Jun. 2021. (우수논문상 수상)	82	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
103	2020	7	domestic_conference	조민기, 정세연, 황은비, 권태경, “임베디드 시스템 취약점 공격 탐지 기술 연구,” 한국해군과학기술학회 춘계학술대회, Jul. 2020.(우수논문상 수상)	103	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
105	2019	11	international_conference	Mingi Cho, Seoyoung Kim, and Taekyoung Kwon, “Intriguer: Field-Level Constraint Solving for Hybrid Fuzzing,” in Proc. the ACM Conference on Computer and Communications Security (ACM CCS), pp. 515-530, Nov. 2019. (BK, 정보과학회 최우수학술대회)	105	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
134	2018	12	domestic_conference	오상진, 박래현, 박준형, 권태경, “악성코드 패밀리명의 Ground-Truth를 위한 레이블링 기법 연구,” 한국정보보호학회 동계학술대회 (CISC W18), Dec. 2018. (우수논문상 수상)	134	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
142	2017	12	international_conference	Hoyeon Lee, Seungyeon Kim, and Taekyoung Kwon, “Here Is Your Fingerprint! Actual Risk versus User Perception of Latent Fingerprints and Smudges Remaining on Smartphones,” in Proc. the 33rd Annual Computer Security Applications Conference (ACSAC), Orlando, Florida, pp. 512-527, Dec. 2017. (BK, 정보과학회 우수학술대회)	142	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
147	2017	5	international_conference	MinSik Shin, JungBeen Yu, YoungJin Yoon, and Taekyoung Kwon, “The Fuzzing Awakens: File Format-Aware Mutational Fuzzing on Smartphone Media Server Daemons,” in Proc. the 32nd International Conference on ICT Systems Security and Privacy Protection (IFIP SEC), Rome, Italy, pp. 219-232, May 2017. (BK, 정보과학회 최우수학술대회)	147	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	f	t	f
175	2016	12	domestic_conference	이호연, 권태경, “지문 영상 복원을 이용한 스마트 기기 지문 스머지 공격 연구,” 한국정보보호학회 동계학술대회 (CISC W16), 2016. (우수논문상 수상)	175	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
191	2015	12	domestic_conference	정성미, 권태경, “기계 학습을 이용한 자동화된 스머지 공격과 안드로이드 패턴 락 안전성 분석,” 2015 한국정보보호학회 동계학술대회 (CISC W15), 2015. (최우수논문상 수상)	191	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
210	2014	6	domestic_conference	신수연, 이건희, 권태경, “프라이버시 보존 가능한 다중 클라우드와 다중 사용자의 일괄 감사 기법에 관한 연구,” 한국정보보호학회 하계학술대회 논문집 (CISC S14), 2014. (우수여성연구자상 수상)	210	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
220	2013	11	domestic_conference	홍모세, 유홍렬, 권태경, “사용자의 무의식적인 인증 과정이 패스워드 유출에 미치는 영향 – 피싱(Phishing)을 중심으로,” 한국인터넷정보학회 추계학술발표대회 논문집, Vol. 14, No. 2, pp. 73-74, 2013. (우수논문상 수상)	220	2026-09-02 02:23:40.738408+00	2026-09-02 05:30:55.130452+00	t	f	f
223	2026	7	domestic_journal	권혁주, 원신영, 한상수, 권태경, "M-MCP-F  Military-MCP(MMCP) 확장 프로토콜 기반 기밀 환경 AI 에이전트 보안 프레임워크 설계 및 평가", 국방과 보안 학술지 제15호(KCI), July. 2026. (국군방첩사령관상, 최우수논문상)	1	2026-09-02 05:25:23.820143+00	2026-09-02 05:30:55.130452+00	t	f	f
\.


--
-- Data for Name: site_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_images (id, slot_key, label, photo_url, created_at, updated_at) FROM stdin;
2	professor_profile	교수님 프로필 사진	/images/professor/taekyoung-kwon.png	2026-09-11 08:35:51.265151+00	2026-09-11 08:35:51.265151+00
1	home_hero	메인 페이지 대표 사진	/images/home/main.jpg	2026-09-11 08:35:51.265151+00	2026-09-11 08:46:08.761303+00
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students (id, course, name, note, photo_url, public_email, created_at, updated_at, admission_year, admission_semester) FROM stdin;
57	intern	GUNHYUNG LIM	\N	/images/interns/gunhyung-lim.jpg	\N	2026-09-02 05:37:54.075586+00	2026-09-02 05:37:54.075586+00	2026	1
58	intern	HUNYOUNG CHA	\N	/images/interns/hunyoung-cha.jpg	\N	2026-09-02 05:38:29.221299+00	2026-09-02 05:40:02.660343+00	2026	1
59	intern	JAEHYUN SON	\N	/images/interns/jaehyun-son.jpg	\N	2026-09-02 05:38:53.908991+00	2026-09-02 05:40:14.306785+00	2026	1
60	intern	SOYI LEE	\N	/images/interns/soyi-lee.jpg	\N	2026-09-02 05:39:15.38103+00	2026-09-02 05:40:18.692748+00	2026	1
61	intern	YEORA PI	\N	/images/interns/yeora-pi.png	\N	2026-09-02 05:39:39.616238+00	2026-09-02 05:40:21.715302+00	2026	1
24	master	JIHYEOK CHOI	\N	/images/students/jihyeok-choi.png	\N	2026-09-01 06:57:30.369856+00	2026-09-02 06:04:26.611636+00	2025	1
34	master	SANGHYEOK SEO	\N	/images/students/sanghyeok-seo.jpg	\N	2026-09-02 04:19:28.236765+00	2026-09-02 04:30:16.839107+00	2026	2
33	master	SONGHYUN CHU	\N	/images/students/songhyun-chu.png	\N	2026-09-02 04:18:12.858487+00	2026-09-02 04:30:26.168581+00	2026	2
30	master	YUNSEO LEE	\N	/images/students/yunseo-lee.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:30:33.074321+00	2026	1
29	master	GIWON KANG	\N	/images/students/giwon-kang.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:30:40.7169+00	2026	1
28	master	MINJUN SUN	\N	/images/students/minjun-sun.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:30:47.908522+00	2026	1
27	master	YEONKYO JUNG	(Part)	/images/students/yeonkyo-jung.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:30:55.260099+00	2025	2
26	master	SHINYOUNG WON	\N	/images/students/shinyoung-won.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:31:01.903659+00	2025	2
25	master	YOONDONG YEO	\N	/images/students/yoondong-yeo.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:31:08.622888+00	2025	2
23	master	HYEOKJOO KWON	\N	/images/students/hyeokjoo-kwon.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:31:19.205505+00	2025	1
22	master	GYUHWAN KIM	\N	/images/students/gyuhwan-kim.jpg	\N	2026-09-01 06:57:30.369856+00	2026-09-02 04:31:25.053599+00	2025	1
4	phd	BYUNGCHUL KIM	\N	/images/students/byungchul-kim.jpg	\N	2026-09-01 06:35:13.19621+00	2026-09-02 04:31:35.179936+00	2025	2
3	phd	EUNBI HWANG	\N	/images/students/eunbi-hwang.jpg	\N	2026-09-01 06:35:13.19621+00	2026-09-02 04:32:00.833767+00	2019	2
2	phd	YOONSIK KIM	\N	/images/students/yoonsik-kim.jpg	\N	2026-09-01 06:35:13.19621+00	2026-09-02 04:34:00.422734+00	2022	1
5	phd	SANGSOO HAN	\N	/images/students/sangsoo-han.jpg	\N	2026-09-01 06:35:13.19621+00	2026-09-02 04:34:06.638567+00	2023	1
6	phd	NARAE KANG	(Part)	/images/students/narae-kang.jpg	\N	2026-09-01 06:35:13.19621+00	2026-09-02 04:34:16.936634+00	2025	1
1	phd	LEOHYUN PARK	\N	/images/students/leohyun-park.jpg	\N	2026-09-01 06:35:13.19621+00	2026-09-11 08:38:56.5013+00	2017	1
\.


--
-- Name: alumni_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alumni_id_seq', 111, true);


--
-- Name: home_research_papers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_research_papers_id_seq', 9, true);


--
-- Name: latest_news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.latest_news_id_seq', 12, true);


--
-- Name: patents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patents_id_seq', 119, true);


--
-- Name: professor_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.professor_activities_id_seq', 23, true);


--
-- Name: professor_career_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.professor_career_id_seq', 13, true);


--
-- Name: professor_papers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.professor_papers_id_seq', 33, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 78, true);


--
-- Name: publications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.publications_id_seq', 226, true);


--
-- Name: site_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.site_images_id_seq', 5, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 61, true);


--
-- PostgreSQL database dump complete
--

\unrestrict OEI6HAGPTRpCaHVtDpfDJg88YcIpF3Yr1LH6Ad67WP9eiZagUjCn86xy3KwGXpg

