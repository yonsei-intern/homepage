INSERT INTO home_research_papers (section_key, venue, title, display_order) VALUES
  ('ai_security', 'RAID 2025', 'Red-Teaming LLMs with Token Control Score', 1),
  ('ai_security', 'IEEE TIFS 2025', 'Amplifying Training Data Exposure through Fine-Tuning', 2),
  ('ai_security', 'WISA 2025', 'LeakGuard: Detecting Attribute Leakage in Diffusion Models', 3),
  ('deepfake_detection', 'ICCV 2025', 'Multi-View Slot Attention Using Paraphrased Texts', 1),
  ('deepfake_detection', 'WDC 2024', 'On the Correlation Between Detection and Image Quality', 2),
  ('deepfake_detection', 'IEEE Access 2024', 'Coexistence of Deepfake Defenses', 3),
  ('vulnerability_detection', 'ISSTA 2024', 'Fuzzing JavaScript Interpreters with Coverage-Guided RL', 1),
  ('vulnerability_detection', 'USENIX Sec 2023', 'BoKASAN: Binary-only Kernel Address Sanitizer', 2),
  ('vulnerability_detection', 'ICISC 2024 (Best Paper)', 'Enhancing Differential Fuzzing with Hybrid Fuzzing', 3)
ON CONFLICT (section_key, title) DO NOTHING;
