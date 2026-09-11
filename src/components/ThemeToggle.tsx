import { motion } from "framer-motion"
import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 sm:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs ${
        isDark
          ? "bg-slate-800/90 border-purple-500/40 text-amber-300 hover:bg-slate-700 hover:border-purple-400 shadow-purple-500/20"
          : "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:text-amber-300"
      }`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <FiMoon size={17} className="fill-amber-300/20" /> : <FiSun size={17} />}
      </motion.div>
    </button>
  )
}
