BEGIN;

ALTER TABLE publications
  ADD COLUMN IF NOT EXISTS is_award BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_bk BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_impact_factor BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE publications
SET is_award = citation ~* '(award|수상|우수논문상|최우수논문상)',
    is_bk = citation ~* '(^|[^[:alnum:]_])BK([^[:alnum:]_]|$)',
    has_impact_factor = citation ~* 'impact[[:space:]]*factor',
    updated_at = NOW()
WHERE TRUE;

COMMIT;
