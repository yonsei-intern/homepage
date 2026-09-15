CREATE TABLE IF NOT EXISTS home_research_papers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section_key VARCHAR(40) NOT NULL CHECK (
    section_key IN ('ai_security', 'deepfake_detection', 'vulnerability_detection')
  ),
  venue VARCHAR(150) NOT NULL,
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT home_research_papers_identity_unique UNIQUE (section_key, title)
);

CREATE INDEX IF NOT EXISTS home_research_papers_listing_idx
  ON home_research_papers (section_key, display_order, id);

GRANT SELECT ON home_research_papers TO homepage_reader;
GRANT SELECT, INSERT, UPDATE, DELETE ON home_research_papers TO homepage_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO homepage_admin;
