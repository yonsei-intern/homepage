INSERT INTO site_images (slot_key, label, photo_url) VALUES
  ('home_hero', '메인 페이지 대표 사진', NULL),
  ('professor_profile', '교수님 프로필 사진', '/images/professor/taekyoung-kwon.png')
ON CONFLICT (slot_key) DO UPDATE SET
  label = EXCLUDED.label,
  photo_url = COALESCE(site_images.photo_url, EXCLUDED.photo_url),
  updated_at = NOW();
