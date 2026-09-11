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
    <section id="skills" className="py-24 bg-slate-50/70 relative overflow-hidden border-y border-slate-200/60 bg-mesh-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Section Details & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">


            {/* Title with Underline */}
            <div>
              <h2
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Skills
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            </div>

            {/* Description paragraphs */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
              <p>
                My engineering approach combines rigorous algorithmic discipline with modern full-stack web development. Proficient in crafting responsive frontend experiences, high-throughput backend APIs, and distributed database systems.
              </p>
              <p>
                With a strong command of C++, Java, and TypeScript, I emphasize clean architectural patterns, robust error handling, and intuitive user interfaces.
              </p>
            </div>

            {/* Social Icons on left border */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Connect:</span>
              <a
                href="https://linkedin.com/in/nikhil-agrahari-2a78822a1"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-xs transition-all"
                title="LinkedIn"
              >
                <FiLinkedin size={16} />
              </a>
              <a
                href="https://github.com/agraharinikhil01"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-400 shadow-xs transition-all"
                title="GitHub"
              >
                <FiGithub size={16} />
              </a>
              <a
                href="https://leetcode.com/u/Nikhil_0909"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300 shadow-xs transition-all"
                title="LeetCode"
              >
                <SiLeetcode size={16} />
              </a>
              <a
                href="mailto:agraharinikhill999@gmail.com"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 shadow-xs transition-all"
                title="Email"
              >
                <FiMail size={16} />
              </a>
            </div>
          </div>

          {/* Right: Categorized Progress Bars with Carousel Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xl shadow-purple-500/5">
            {/* Category Header with Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                {SKILL_GROUPS.map((group, idx) => (
                  <button
                    key={group.category}
                    onClick={() => setActiveGroupIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeGroupIndex === idx
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-purple-600"
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
                  className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-purple-600 hover:border-purple-300 shadow-xs transition-all cursor-pointer"
                  title="Previous Category"
                >
                  <FiArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-purple-600 hover:border-purple-300 shadow-xs transition-all cursor-pointer"
                  title="Next Category"
                >
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Active Category Display */}
            <motion.div
              key={activeGroupIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {SKILL_GROUPS[activeGroupIndex].category}
              </h3>

              <div className="space-y-5">
                {SKILL_GROUPS[activeGroupIndex].skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-800">{skill.name}</span>
                      <span className="text-xs font-mono font-bold text-purple-600">{skill.percentage}%</span>
                    </div>

                    {/* Progress Bar styled to match our purple-indigo theme */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-full shadow-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <span className="text-purple-700 font-bold block mb-1">Algorithmic Problem Solving</span>
                <span>Active practice on LeetCode with emphasis on Graphs, DP, Trees, and Array manipulation.</span>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <span className="text-indigo-700 font-bold block mb-1">Production Readiness</span>
                <span>End-to-end deployments on Vercel with responsive cross-device optimization and clean codebases.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

