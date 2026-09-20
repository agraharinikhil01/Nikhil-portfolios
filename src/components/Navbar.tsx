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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0c1017]/95 backdrop-blur-md text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <ScrollLink to="home" smooth duration={500} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-400 flex items-center justify-center text-white font-black text-base shadow-md group-hover:scale-105 transition-transform">
            NA
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Nikhil
          </span>
        </ScrollLink>

        {/* Center Nav Links - High Contrast in both modes */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth
              duration={500}
              offset={-80}
              spy
              activeClass="text-purple-600 dark:text-purple-400 font-bold"
              className="text-base font-semibold text-slate-600 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white cursor-pointer transition-colors"
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Animated Sun / Moon Theme Toggle */}
          <ThemeToggle />

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white border border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500 rounded-full transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800/60 shadow-xs"
            >
              <FiFileText size={15} /> Resume
            </button>
          )}

          <ScrollLink
            to="contact"
            smooth
            duration={500}
            offset={-80}
            className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-purple-100 font-extrabold text-sm rounded-full transition-all shadow-md cursor-pointer hover:scale-105"
          >
            Let's Chat
          </ScrollLink>

          <RouterLink
            to="/admin"
            className="p-2.5 text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
            title="Admin Portal"
          >
            <FiLock size={17} />
          </RouterLink>
        </div>

        {/* Mobile menu button & theme toggle */}
        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />
          {onOpenResume && (
            <button onClick={onOpenResume} className="p-2 text-slate-300">
              <FiFileText size={20} />
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0c1017]/95 border-b border-slate-200 dark:border-slate-800 px-5 py-5 space-y-3.5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth
              duration={500}
              offset={-80}
              spy
              activeClass="text-purple-600 dark:text-purple-400 font-bold"
              className="block py-2 text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </ScrollLink>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <ScrollLink
              to="contact"
              smooth
              duration={500}
              offset={-80}
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-sm rounded-full cursor-pointer shadow-md"
            >
              Let's Chat
            </ScrollLink>
            <RouterLink to="/admin" onClick={() => setMobileOpen(false)} className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Admin Login
            </RouterLink>
          </div>
        </div>
      )}
    </header>
  )
}
