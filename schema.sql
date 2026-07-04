-- ResusPro BloodGas CloudPRNT v1.0.1 D1 schema
-- The Worker creates this automatically. This file is supplied for reference
-- and manual recovery only.

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued','offered','printing','completed','failed')),
  patient_id TEXT NOT NULL DEFAULT '',
  resus_bay TEXT NOT NULL DEFAULT '',
  receipt_text TEXT NOT NULL,
  png BLOB,
  has_png INTEGER NOT NULL DEFAULT 0,
  claimed_by TEXT,
  offered_at INTEGER,
  downloaded_at INTEGER,
  completed_at INTEGER,
  failed_at INTEGER,
  confirmation_code TEXT,
  is_test INTEGER NOT NULL DEFAULT 0
) STRICT;

CREATE INDEX IF NOT EXISTS idx_jobs_status_created
ON jobs(status, created_at);

CREATE TABLE IF NOT EXISTS printers (
  mac TEXT PRIMARY KEY,
  unique_id TEXT NOT NULL DEFAULT '',
  status_code TEXT NOT NULL DEFAULT '',
  printing_in_progress INTEGER NOT NULL DEFAULT 0,
  reported_token TEXT,
  current_job_id TEXT,
  last_seen INTEGER NOT NULL,
  last_confirmation_code TEXT,
  last_completed_job_id TEXT,
  last_completed_at INTEGER
) STRICT;

