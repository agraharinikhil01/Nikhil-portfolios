import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"
import { FiMenu, FiX, FiFileText, FiLock } from "react-icons/fi"
import ThemeToggle from "./ThemeToggle"

const NAV_ITEMS = [
  { label: "Home", to: "home" },
  { label: "About Me", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Certifications", to: "certifications" },
  { label: "Contact", to: "contact" },
]

interface NavbarProps {
  onOpenResume?: () => void
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c1017] text-white border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <ScrollLink to="home" smooth duration={500} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-amber-400 flex items-center justify-center text-white font-black text-sm shadow-md">
            NA
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-purple-400 transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Nikhil
          </span>
        </ScrollLink>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth
              duration={500}
              offset={-70}
              spy
              activeClass="text-purple-400 font-semibold"
              className="text-sm font-medium text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Animated Sun / Moon Theme Toggle */}
          <ThemeToggle />

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-full transition-all cursor-pointer"
            >
              <FiFileText size={13} /> Resume
            </button>
          )}

          <ScrollLink
            to="contact"
            smooth
            duration={500}
            offset={-70}
            className="px-5 py-2 bg-white text-slate-950 font-bold text-xs rounded-full hover:bg-purple-100 transition-all shadow-md cursor-pointer"
          >
            Let's Chat
          </ScrollLink>

          <RouterLink
            to="/admin"
            className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
            title="Admin Portal"
          >
            <FiLock size={15} />
          </RouterLink>
        </div>

        {/* Mobile menu button & theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {onOpenResume && (
            <button onClick={onOpenResume} className="p-2 text-slate-300">
              <FiFileText size={18} />
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0c1017] border-b border-slate-800 px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth
              duration={500}
              offset={-70}
              spy
              activeClass="text-purple-400 font-semibold"
              className="block py-2 text-sm text-slate-300 hover:text-white cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </ScrollLink>
          ))}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <ScrollLink
              to="contact"
              smooth
              duration={500}
              offset={-70}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 bg-white text-slate-900 font-bold text-xs rounded-full cursor-pointer"
            >
              Let's Chat
            </ScrollLink>
            <RouterLink to="/admin" onClick={() => setMobileOpen(false)} className="text-xs text-slate-400">
              Admin Login
            </RouterLink>
          </div>
        </div>
      )}
    </header>
  )
}
