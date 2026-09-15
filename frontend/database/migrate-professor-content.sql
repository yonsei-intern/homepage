BEGIN;

CREATE TABLE IF NOT EXISTS professor_activities (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  period VARCHAR(50) NOT NULL,
  detail TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS professor_career (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  period VARCHAR(50) NOT NULL,
  detail TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS professor_papers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  paper_year SMALLINT NOT NULL CHECK (paper_year BETWEEN 1900 AND 2100),
  citation TEXT NOT NULL UNIQUE,
  link_url TEXT CHECK (link_url IS NULL OR link_url ~* '^https?://'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS professor_papers_listing_idx
  ON professor_papers (paper_year DESC, id);

GRANT SELECT ON professor_activities, professor_career, professor_papers TO homepage_reader;
GRANT SELECT, INSERT, UPDATE, DELETE ON professor_activities, professor_career, professor_papers TO homepage_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO homepage_admin;

COMMIT;
