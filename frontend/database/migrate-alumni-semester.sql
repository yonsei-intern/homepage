BEGIN;

ALTER TABLE alumni
  ADD COLUMN IF NOT EXISTS graduated_semester SMALLINT;

ALTER TABLE alumni
  DROP CONSTRAINT IF EXISTS alumni_graduated_semester_check;
ALTER TABLE alumni
  ADD CONSTRAINT alumni_graduated_semester_check
    CHECK (graduated_semester IN (1, 2));

DROP INDEX IF EXISTS alumni_public_listing_idx;
CREATE INDEX alumni_public_listing_idx
  ON alumni (is_published, school, graduated_year DESC, graduated_semester DESC, name, id);

COMMIT;
