import { useState } from "react"
import { motion } from "framer-motion"
import { FiLinkedin, FiGithub, FiMail, FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { SiLeetcode } from "react-icons/si"

interface SkillItem {
  name: string
  percentage: number
}

interface SkillGroup {
  category: string
  skills: SkillItem[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming & Core CS",
    skills: [
      { name: "C++", percentage: 88 },
      { name: "Java", percentage: 82 },
      { name: "JavaScript & TypeScript", percentage: 92 },
      { name: "Python", percentage: 78 },
      { name: "Data Structures & Algorithms", percentage: 90 },
      { name: "OOP, DBMS & OS", percentage: 85 },
    ],
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js & Hooks", percentage: 94 },
      { name: "Tailwind CSS & Modern UI", percentage: 92 },
      { name: "HTML5 / Semantic Web", percentage: 95 },
      { name: "CSS3 / Responsive Design", percentage: 90 },
      { name: "Vite & Tooling", percentage: 88 },
    ],
  },
  {
    category: "Backend & Cloud Services",
    skills: [
      { name: "Node.js & Express.js", percentage: 86 },
      { name: "RESTful API Engineering", percentage: 90 },
      { name: "Supabase Backend & Storage", percentage: 92 },
      { name: "MongoDB & MySQL", percentage: 84 },
      { name: "MapLibre & Spatial Telemetry", percentage: 85 },
    ],
  },
]

export default function Skills() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0)

  const handlePrev = () => {
    setActiveGroupIndex((prev) => (prev === 0 ? SKILL_GROUPS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveGroupIndex((prev) => (prev === SKILL_GROUPS.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="skills" className="py-28 bg-slate-50/70 dark:bg-[#080d1a] relative overflow-hidden border-y border-slate-200/80 dark:border-slate-800 bg-mesh-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Section Details & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-7">
            {/* Title with Underline */}
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-950 dark:text-white mb-3.5"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Skills
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-full"></div>
            </div>

            {/* Description paragraphs - Clean & Legible */}
            <div className="space-y-3.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              <p>
                My engineering approach combines rigorous algorithmic discipline with modern full-stack web development. Proficient in crafting responsive frontend experiences, high-throughput backend APIs, and distributed database systems.
              </p>
              <p>
                With a strong command of C++, Java, and TypeScript, I emphasize clean architectural patterns, robust error handling, and intuitive user interfaces.
              </p>
            </div>

            {/* Social Icons on left border */}
            <div className="flex items-center gap-3.5 pt-5 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Connect:</span>
              <a
                href="https://linkedin.com/in/nikhil-agrahari-2a78822a1"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:border-blue-300 shadow-xs transition-all"
                title="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://github.com/agraharinikhil01"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 shadow-xs transition-all"
                title="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://leetcode.com/u/Nikhil_0909"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 hover:border-amber-300 shadow-xs transition-all"
                title="LeetCode"
              >
                <SiLeetcode size={18} />
              </a>
              <a
                href="mailto:agraharinikhill999@gmail.com"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-rose-600 hover:border-rose-300 shadow-xs transition-all"
                title="Email"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* Right: Categorized Progress Bars with Carousel Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8 bg-white dark:bg-[#111c35] p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xl shadow-purple-500/5">
            {/* Category Header with Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2.5">
                {SKILL_GROUPS.map((group, idx) => (
                  <button
                    key={group.category}
                    onClick={() => setActiveGroupIndex(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                      activeGroupIndex === idx
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 hover:text-purple-600"
                    }`}
                  >
                    {group.category}
                  </button>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:border-purple-300 shadow-xs transition-all cursor-pointer"
                  title="Previous Category"
                >
                  <FiArrowLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:border-purple-300 shadow-xs transition-all cursor-pointer"
                  title="Next Category"
                >
                  <FiArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Active Category Display */}
            <motion.div
              key={activeGroupIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {SKILL_GROUPS[activeGroupIndex].category}
              </h3>

              <div className="space-y-4">
                {SKILL_GROUPS[activeGroupIndex].skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">{skill.name}</span>
                      <span className="text-xs sm:text-sm font-mono font-extrabold text-purple-600 dark:text-purple-400">{skill.percentage}%</span>
                    </div>

                    {/* Progress Bar - Refined & Animated */}
                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800">
                <span className="text-purple-700 dark:text-purple-400 font-extrabold block text-sm sm:text-base mb-1">Algorithmic Problem Solving</span>
                <span>Active practice on LeetCode with emphasis on Graphs, DP, Trees, and Array manipulation.</span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800">
                <span className="text-indigo-700 dark:text-indigo-400 font-extrabold block text-sm sm:text-base mb-1">Production Readiness</span>
                <span>End-to-end deployments on Vercel with responsive cross-device optimization and clean codebases.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
