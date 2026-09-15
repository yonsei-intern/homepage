BEGIN;

ALTER TABLE students
  ADD COLUMN IF NOT EXISTS admission_year SMALLINT,
  ADD COLUMN IF NOT EXISTS admission_semester SMALLINT;

ALTER TABLE students
  DROP CONSTRAINT IF EXISTS students_admission_year_check,
  DROP CONSTRAINT IF EXISTS students_admission_semester_check;
ALTER TABLE students
  ADD CONSTRAINT students_admission_year_check
    CHECK (admission_year BETWEEN 1900 AND 2100),
  ADD CONSTRAINT students_admission_semester_check
    CHECK (admission_semester IN (1, 2));

ALTER TABLE alumni
  ADD COLUMN IF NOT EXISTS graduated_year SMALLINT,
  ADD COLUMN IF NOT EXISTS graduated_semester SMALLINT;

UPDATE alumni
SET graduated_year = EXTRACT(YEAR FROM graduated_at)::SMALLINT
WHERE graduated_year IS NULL
  AND graduated_at IS NOT NULL;

ALTER TABLE alumni
  DROP CONSTRAINT IF EXISTS alumni_graduated_year_check,
  DROP CONSTRAINT IF EXISTS alumni_graduated_semester_check;
ALTER TABLE alumni
  ADD CONSTRAINT alumni_graduated_year_check
    CHECK (graduated_year BETWEEN 1900 AND 2100),
  ADD CONSTRAINT alumni_graduated_semester_check
    CHECK (graduated_semester IN (1, 2));

DROP INDEX IF EXISTS students_public_listing_idx;
DROP INDEX IF EXISTS alumni_public_listing_idx;

ALTER TABLE students DROP COLUMN IF EXISTS display_order;
ALTER TABLE alumni
  DROP COLUMN IF EXISTS graduated_at,
  DROP COLUMN IF EXISTS school_sort_order,
  DROP COLUMN IF EXISTS sort_order;

CREATE INDEX students_public_listing_idx
  ON students (course, admission_year, admission_semester, name, id);
CREATE INDEX alumni_public_listing_idx
  ON alumni (is_published, school, graduated_year DESC, graduated_semester DESC, name, id);

COMMIT;
