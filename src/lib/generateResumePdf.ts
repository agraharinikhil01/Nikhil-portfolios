import jsPDF from "jspdf"

export function generateResumePdf() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 16
  const contentWidth = pageWidth - margin * 2
  let y = 18

  const drawSectionHeader = (title: string) => {
    y += 2
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10.5)
    doc.setTextColor(30, 41, 59)
    doc.text(title.toUpperCase(), margin, y)
    y += 1.8
    doc.setDrawColor(139, 92, 246)
    doc.setLineWidth(0.5)
    doc.line(margin, y, margin + contentWidth, y)
    y += 4.5
  }

  // HEADER
  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.setTextColor(15, 23, 42)
  doc.text("Nikhil Agrahari", pageWidth / 2, y, { align: "center" })
  y += 6.5

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(100, 116, 139)
  doc.text(
    "Greater Noida, India  |  +91 8528930905  |  agraharinikhill999@gmail.com",
    pageWidth / 2,
    y,
    { align: "center" }
  )
  y += 4.5

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(109, 40, 217)
  const links = "LinkedIn: linkedin.com/in/nikhil-agrahari-2a78822a1   GitHub: github.com/agraharinikhil01   LeetCode: leetcode.com/u/Nikhil_0909"
  doc.text(links, pageWidth / 2, y, { align: "center" })
  y += 5.5

  // SUMMARY
  drawSectionHeader("Professional Summary")
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(51, 65, 85)
  const summaryText =
    "Highly motivated Information Technology undergraduate (8.10 CGPA) with a strong foundation in Data Structures & Algorithms and full-stack web development. Proficient in C++, Java, JavaScript, and modern frameworks like React and Node.js. Passionate about engineering scalable, user-focused applications and translating complex problem-solving into real-world software solutions. Dedicated to continuous learning and contributing to impactful technology projects."
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth)
  doc.text(splitSummary, margin, y)
  y += splitSummary.length * 4 + 2

  // SKILLS
  drawSectionHeader("Technical Skills")
  const skills = [
    { cat: "Programming Languages:", list: "C++, Java, Python, JavaScript, TypeScript" },
    { cat: "Frontend Development:", list: "React.js, HTML5, CSS3, Tailwind CSS, Vite" },
    { cat: "Backend Development:", list: "Node.js, Express.js, RESTful APIs" },
    { cat: "Databases & Cloud:", list: "MongoDB, MySQL, Supabase, PostgreSQL" },
    { cat: "Core Computer Science:", list: "Data Structures & Algorithms (DSA), OOP, DBMS, OS" },
    { cat: "Tools & Technologies:", list: "Git, GitHub, MapLibre/MapTiler, Postman, Vercel" },
  ]
  skills.forEach((s) => {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.setTextColor(30, 41, 59)
    doc.text(s.cat, margin, y)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(71, 85, 105)
    doc.text(s.list, margin + 46, y)
    y += 4.2
  })

  // PROJECTS
  drawSectionHeader("Featured Projects")

  // Project 1: RailLine
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text("RailLine - Real-Time Train Tracking Platform", margin, y)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(8)
  doc.setTextColor(109, 40, 217)
  doc.text("React, TypeScript, Node.js, MapLibre, Supabase", margin + contentWidth, y, { align: "right" })
  y += 3.8

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.setTextColor(71, 85, 105)
  const p1Bullets = [
    "* Developed a comprehensive full-stack railway tracking platform providing live train status, accurate ETA, delay insights, and weather-based travel info.",
    "* Integrated interactive route maps and journey analytics utilizing MapLibre/MapTiler and REST APIs to enhance spatial data visualization for users.",
    "* Implemented secure user authentication and personalized application features using Supabase.",
    "* Engineered a scalable architecture combining a responsive React/TypeScript frontend with a robust Node.js backend.",
  ]
  p1Bullets.forEach((bullet) => {
    const split = doc.splitTextToSize(bullet, contentWidth - 4)
    doc.text(split, margin + 2, y)
    y += split.length * 3.6
  })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.setTextColor(109, 40, 217)
  doc.text("Live: https://rail-line-695qi0kuh-nikhil-agrahari.vercel.app/   |   GitHub: github.com/agraharinikhil01/RailLine", margin + 2, y)
  y += 5.5

  // Project 2: CareSync
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text("CareSync HMS - Hospital Management System", margin, y)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(8)
  doc.setTextColor(109, 40, 217)
  doc.text("React, Node.js, Express, MongoDB", margin + contentWidth, y, { align: "right" })
  y += 3.8

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.setTextColor(71, 85, 105)
  const p2Bullets = [
    "* Engineered a full-stack Hospital Management System incorporating role-based access control to ensure secure and structured operational workflows.",
    "* Integrated innovative features including an Emergency QR Health Passport, QR payments, and an AI prescription scribe to streamline patient care and hospital administration.",
    "* Designed and managed the database using MongoDB, enabling efficient ward bed management and secure data retrieval.",
    "* Implemented an AI medical assistant to aid in rapid health inquiries and operational support.",
  ]
  p2Bullets.forEach((bullet) => {
    const split = doc.splitTextToSize(bullet, contentWidth - 4)
    doc.text(split, margin + 2, y)
    y += split.length * 3.6
  })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.setTextColor(109, 40, 217)
  doc.text("Live: https://care-sync-ea36i7r40-nikhil-agrahari.vercel.app/   |   GitHub: github.com/agraharinikhil01/CareSync-", margin + 2, y)
  y += 5.5

  // Project 3: HR Agent
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text("HR AGENT - HireFlow AI", margin, y)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(8)
  doc.setTextColor(109, 40, 217)
  doc.text("React, Node.js, AI, TypeScript", margin + contentWidth, y, { align: "right" })
  y += 3.8

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.setTextColor(71, 85, 105)
  const p3Bullets = [
    "* Built an AI-driven recruitment agent automating candidate screening, resume parsing, and interview workflow coordination.",
    "* Engineered real-time dashboard analytics with high-converting responsive interfaces.",
  ]
  p3Bullets.forEach((bullet) => {
    const split = doc.splitTextToSize(bullet, contentWidth - 4)
    doc.text(split, margin + 2, y)
    y += split.length * 3.6
  })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.setTextColor(109, 40, 217)
  doc.text("Live: https://hr-agent-steel.vercel.app/login", margin + 2, y)
  y += 5.5

  // CERTIFICATIONS
  drawSectionHeader("Certifications & Achievements")
  const certs = [
    "* TCS iON Career Edge - Young Professional Certification",
    "* Cybersecurity Foundation Certification",
    "* Adobe Certification",
    "* DECODE SIH 2026 Participant (OSCode)",
  ]
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.setTextColor(51, 65, 85)
  certs.forEach((c) => {
    doc.text(c, margin + 2, y)
    y += 4
  })

  doc.save("Nikhil_Agrahari_Resume.pdf")
}

