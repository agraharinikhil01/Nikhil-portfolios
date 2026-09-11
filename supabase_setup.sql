-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/_/sql

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  description  text,
  tech_stack   text[],
  live_url     text,
  github_url   text,
  order_index  int DEFAULT 0,
  created_at   timestamptz DEFAULT now()
);

-- 2. Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  issuer       text,
  issued_date  date,
  file_url     text,
  file_type    text,
  created_at   timestamptz DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 4. Public read policies (anyone can view)
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);

-- 5. Service role can do everything (admin panel uses service key)
CREATE POLICY "Service role all projects" ON projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all certificates" ON certificates FOR ALL USING (auth.role() = 'service_role');

-- 6. Create storage bucket for certificates
-- Run in Supabase Dashboard > Storage > New Bucket
-- Bucket name: certificates
-- Public: YES (so download URLs work)

-- 7. Seed default projects
INSERT INTO projects (title, description, tech_stack, live_url, github_url, order_index) VALUES
(
  'RailLine – Real-Time Train Tracking',
  'Comprehensive full-stack railway tracking platform providing live train status, accurate ETA, delay insights, and weather-based travel info. Features interactive route maps and journey analytics using MapLibre/MapTiler and REST APIs.',
  ARRAY['React', 'TypeScript', 'Node.js', 'MapLibre', 'Supabase'],
  'https://rail-line-695qi0kuh-nikhil-agrahari.vercel.app/',
  'https://github.com/agraharinikhill01/RailLine',
  1
),
(
  'CareSync HMS – Hospital Management System',
  'Full-stack Hospital Management System with role-based access control, Emergency QR Health Passport, QR payments, AI prescription scribe, and intelligent medical assistant for rapid health inquiries.',
  ARRAY['React', 'Node.js', 'Express', 'MongoDB'],
  'https://care-sync-3o8iuykgu-nikhil-agrahari.vercel.app/login',
  'https://github.com/agraharinikhill01/CareSync-',
  2
),
(
  'HR AGENT – HireFlow AI',
  'AI-powered HR Agent for intelligent hiring workflows, candidate screening, and automated recruitment pipeline management.',
  ARRAY['React', 'Node.js', 'AI', 'TypeScript'],
  'https://hr-agent-steel.vercel.app/login',
  '',
  3
);


-- 8. Create contact_messages table for permanent inbox
CREATE TABLE IF NOT EXISTS contact_messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  subject      text,
  message      text NOT NULL,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role all contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'service_role');
