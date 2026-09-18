INSERT INTO latest_news (news_year, source, title, summary, link_url) VALUES
  (
    2025,
    '보안뉴스',
    '[2025 AI 보안 솔루션 리포트] AI 보안 솔루션, 능동형 AI와 XAI로 진짜 AI가 되다',
    NULL,
    'https://www.boannews.com/news/articleView.html?idxno=140730'
  ),
  (
    2025,
    '베테랑경찰',
    '"텔레그램 협력, 금단 영역 넘은 거죠"…사이버 수사는 진화 중',
    NULL,
    'https://n.news.naver.com/mnews/article/421/0008619418?sid=102'
  ),
  (
    2025,
    'KIS 칼럼',
    '[한국정보보호학회 칼럼] AI 모델 보안과 안전 그리고 신뢰',
    NULL,
    'https://www.boannews.com/news/articleView.html?idxno=140284'
  ),
  (
    2025,
    'IEEE TIFS',
    'Amplifying Training Data Exposure through Fine-Tuning with Pseudo-Labeled Memberships',
    'IEEE Transactions on Information Forensics and Security · Impact Factor: 8',
    NULL
  ),
  (
    2025,
    'RAID',
    'Red-Teaming LLMs with Token Control Score: Efficient, Universal, and Transferable Jailbreaks',
    'Research in Attacks, Intrusions, and Defenses · BK, 정보과학회 우수학술대회',
    NULL
  ),
  (
    2025,
    'WISA',
    'LeakGuard: Detecting Attribute Leakage in Diffusion Models',
    NULL,
    NULL
  ),
  (
    2025,
    'ICCV',
    'Multi-View Slot Attention Using Paraphrased Texts',
    NULL,
    NULL
  ),
  (
    2024,
    'ISSTA',
    'Fuzzing JavaScript Interpreters with Coverage-Guided RL',
    NULL,
    NULL
  )
ON CONFLICT (news_year, source, title) DO UPDATE SET
  summary = EXCLUDED.summary,
  link_url = EXCLUDED.link_url,
  updated_at = NOW();

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id)::INTEGER AS position
  FROM latest_news
)
UPDATE latest_news
SET display_order = ranked.position
FROM ranked
WHERE latest_news.id = ranked.id
  AND latest_news.display_order = 0;
