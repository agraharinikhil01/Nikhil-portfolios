import { motion, AnimatePresence } from "framer-motion"
import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleTheme()
      }}
      className={`relative w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-95 ${
        isDark
          ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:border-amber-400/50 hover:text-amber-300 shadow-amber-500/10"
          : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:border-purple-400 hover:text-purple-600 shadow-slate-200"
      }`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <FiSun size={18} className="stroke-[2.2] text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <FiMoon size={18} className="stroke-[2.2] text-slate-700 fill-slate-700/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
