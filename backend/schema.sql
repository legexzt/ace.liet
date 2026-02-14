-- =============================================
-- ACE SANKETIKA 2026 — SUPABASE SCHEMA
-- Run this SQL in Supabase SQL Editor
-- Dashboard → SQL Editor → New query
-- =============================================

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id BIGSERIAL PRIMARY KEY,
  event TEXT NOT NULL,
  team_name TEXT,
  leader_name TEXT NOT NULL,
  members TEXT,
  college TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  branch TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for registration form)
CREATE POLICY "Allow public insert on registrations"
  ON registrations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public inserts (for contact form)
CREATE POLICY "Allow public insert on contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service_role full access (for admin panel)
CREATE POLICY "Allow service_role full access on registrations"
  ON registrations FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow service_role full access on contacts"
  ON contacts FOR ALL
  TO service_role
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_registrations_event ON registrations(event);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
