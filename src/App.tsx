import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Certifications from "./components/Certifications"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ResumeModal from "./components/ResumeModal"
import AdminLogin from "./admin/AdminLogin"
import AdminDashboard from "./admin/AdminDashboard"

function HomePage() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div className="relative min-h-screen selection:bg-purple-500 selection:text-white transition-colors duration-300">
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      <main>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </ThemeProvider>
  )
}
