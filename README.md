# Nikhil Agrahari - Advanced Portfolio

A modern, animated portfolio website built with React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Quick Start

### 1. Fill in .env file
Open `.env` and fill in your keys (see setup guide below).

### 2. Run Supabase SQL
Open `supabase_setup.sql` and run it in your Supabase SQL Editor.

### 3. Create Supabase Storage Bucket
- Go to Supabase Dashboard > Storage
- Create new bucket named: `certificates`
- Set to PUBLIC

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Admin Panel
Go to: http://localhost:3000/admin

---

## Environment Variables

| Variable | Where to Get |
|---|---|
| VITE_SUPABASE_URL | Supabase Dashboard > Settings > API |
| VITE_SUPABASE_ANON_KEY | Supabase Dashboard > Settings > API |
| VITE_SUPABASE_SERVICE_ROLE_KEY | Supabase Dashboard > Settings > API |
| VITE_ADMIN_PASSWORD | Choose your own |
| VITE_EMAILJS_SERVICE_ID | emailjs.com > Email Services |
| VITE_EMAILJS_TEMPLATE_ID | emailjs.com > Email Templates |
| VITE_EMAILJS_PUBLIC_KEY | emailjs.com > Account > Public Key |

## Deploy to Vercel
```bash
npm run build
# Then push to GitHub and connect to Vercel
# Add all .env variables in Vercel Dashboard > Settings > Environment Variables
```
