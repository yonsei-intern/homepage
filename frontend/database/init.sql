CREATE TABLE IF NOT EXISTS students (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  course VARCHAR(20) NOT NULL CHECK (course IN ('phd', 'master', 'intern')),
  name VARCHAR(100) NOT NULL,
  note VARCHAR(100),
  photo_url TEXT,
  public_email VARCHAR(255),
  admission_year SMALLINT CHECK (admission_year BETWEEN 1900 AND 2100),
  admission_semester SMALLINT CHECK (admission_semester IN (1, 2)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS students_public_listing_idx
  ON students (course, admission_year, admission_semester, name, id);

CREATE UNIQUE INDEX IF NOT EXISTS students_identity_idx
  ON students (course, name);

CREATE TABLE IF NOT EXISTS alumni (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  school VARCHAR(150) NOT NULL,
  degree VARCHAR(30) NOT NULL CHECK (degree IN ('Ph.D.', 'M.S.')),
  graduated_year SMALLINT CHECK (graduated_year BETWEEN 1900 AND 2100),
  graduated_semester SMALLINT CHECK (graduated_semester IN (1, 2)),
  company VARCHAR(255) NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS alumni_public_listing_idx
  ON alumni (is_published, school, graduated_year DESC, graduated_semester DESC, name, id);

CREATE UNIQUE INDEX IF NOT EXISTS alumni_identity_idx
  ON alumni (school, degree, name);

CREATE TABLE IF NOT EXISTS publications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  publication_year SMALLINT NOT NULL CHECK (publication_year BETWEEN 1900 AND 2100),
  publication_month SMALLINT CHECK (publication_month BETWEEN 1 AND 12),
  category VARCHAR(40) NOT NULL CHECK (
    category IN (
      'international_conference',
      'international_journal',
      'domestic_journal',
      'domestic_conference'
    )
  ),
  citation TEXT NOT NULL,
  is_award BOOLEAN NOT NULL DEFAULT FALSE,
  is_bk BOOLEAN NOT NULL DEFAULT FALSE,
  has_impact_factor BOOLEAN NOT NULL DEFAULT FALSE,
  source_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT publications_identity_unique UNIQUE (publication_year, citation)
);

CREATE INDEX IF NOT EXISTS publications_listing_idx
  ON publications (publication_year DESC, category, publication_month DESC, source_order, id);

CREATE TABLE IF NOT EXISTS patents (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category VARCHAR(40) NOT NULL CHECK (
    category IN (
      'international_registered',
      'international_filed',
      'domestic_registered',
      'domestic_filed',
      'software_output'
    )
  ),
  patent_number VARCHAR(100) NOT NULL,
  number_sort_key NUMERIC(30, 0) NOT NULL,
  title TEXT NOT NULL,
  source_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT patents_identity_unique UNIQUE (category, patent_number, title)
);

CREATE INDEX IF NOT EXISTS patents_listing_idx
  ON patents (category, number_sort_key DESC, patent_number DESC, source_order, id);

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_key VARCHAR(40) NOT NULL UNIQUE,
  title TEXT NOT NULL UNIQUE,
  organization VARCHAR(255) NOT NULL,
  start_year SMALLINT NOT NULL CHECK (start_year BETWEEN 1900 AND 2100),
  end_year SMALLINT NOT NULL CHECK (end_year BETWEEN start_year AND 2100),
  display_order INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_year_orders (
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  active_year SMALLINT NOT NULL CHECK (active_year BETWEEN 1900 AND 2100),
  display_order INTEGER NOT NULL,
  PRIMARY KEY (project_id, active_year)
);

CREATE INDEX IF NOT EXISTS projects_active_period_idx
  ON projects (start_year, end_year, id);
CREATE INDEX IF NOT EXISTS project_year_orders_listing_idx
  ON project_year_orders (active_year DESC, display_order, project_id);

CREATE TABLE IF NOT EXISTS latest_news (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  news_year SMALLINT NOT NULL CHECK (news_year BETWEEN 1900 AND 2100),
  source VARCHAR(150) NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  link_url TEXT CHECK (link_url IS NULL OR link_url ~* '^https?://'),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT latest_news_identity_unique UNIQUE (news_year, source, title)
);

CREATE INDEX IF NOT EXISTS latest_news_listing_idx
  ON latest_news (display_order, id);

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

CREATE TABLE IF NOT EXISTS site_images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slot_key VARCHAR(80) NOT NULL UNIQUE,
  label VARCHAR(150) NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'homepage_reader') THEN
    CREATE ROLE homepage_reader LOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'homepage_admin') THEN
    CREATE ROLE homepage_admin LOGIN;
  END IF;
END
$$;

GRANT CONNECT ON DATABASE homepage TO homepage_reader;
GRANT USAGE ON SCHEMA public TO homepage_reader;
GRANT SELECT ON TABLE students, alumni, publications, patents, projects, project_year_orders, latest_news,
  professor_activities, professor_career, professor_papers, site_images, home_research_papers TO homepage_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO homepage_reader;

GRANT CONNECT ON DATABASE homepage TO homepage_admin;
GRANT USAGE ON SCHEMA public TO homepage_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO homepage_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO homepage_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO homepage_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO homepage_admin;
