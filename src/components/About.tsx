import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { FiLinkedin, FiGithub, FiMail, FiCheckCircle, FiCpu, FiServer, FiLayers } from "react-icons/fi"
import { SiLeetcode } from "react-icons/si"
import { useProjects } from "../hooks/useProjects"
import { useCertificates } from "../hooks/useCertificates"

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(parseFloat(current.toFixed(2)))
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, start])
  return count
}

const SOCIALS = [
  { icon: FiLinkedin, href: "https://linkedin.com/in/nikhil-agrahari-2a78822a1", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white text-blue-600 border-blue-200 dark:border-blue-800" },
  { icon: FiGithub, href: "https://github.com/agraharinikhil01", label: "GitHub", color: "hover:bg-slate-900 hover:text-white text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/Nikhil_0909", label: "LeetCode", color: "hover:bg-amber-500 hover:text-white text-amber-600 border-amber-200 dark:border-amber-800" },
  { icon: FiMail, href: "mailto:agraharinikhill999@gmail.com", label: "Email", color: "hover:bg-rose-500 hover:text-white text-rose-600 border-rose-200 dark:border-rose-800" },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  const { projects } = useProjects()
  const { certificates } = useCertificates()

  const dynamicProjectsCount = projects && projects.length > 0 ? projects.length : 3
  const dynamicCertsCount = certificates && certificates.length > 0 ? certificates.length : 4

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cgpaCount = useCountUp(8.1, 1500, inView)
  const projectsCount = useCountUp(dynamicProjectsCount, 1200, inView)
  const certsCount = useCountUp(dynamicCertsCount, 1200, inView)

  return (
    <section id="about" ref={ref} className="py-28 bg-white/80 dark:bg-[#0c1427] backdrop-blur-md relative border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-4 py-1.5 rounded-full border border-purple-200/80 dark:border-purple-800">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Passionate About Crafting Impactful Software
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            Bridging algorithmic problem solving with full-stack execution to build high-performance, real-world solutions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-[#111c35] p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xl shadow-purple-500/5 flex flex-col justify-between gap-8"
          >
            <div className="space-y-5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Undergraduate IT Engineer & Web Architect
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                I am a dedicated Information Technology undergraduate studying at <strong className="text-slate-900 dark:text-white font-bold">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</strong> with a cumulative <strong className="text-indigo-600 dark:text-indigo-400 font-bold">8.10 CGPA</strong>. My development journey revolves around mastering complex Data Structures & Algorithms and translating that computational mindset into modern web architectures.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                From real-time railway telemetry with MapLibre to role-based hospital management workflows and automated AI agents, I take pride in writing scalable, secure, and clean code that creates measurable impact.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800 flex items-center gap-3">
                <FiCpu className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={22} />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">DSA & Problem Solving</span>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 flex items-center gap-3">
                <FiLayers className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" size={22} />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Modern Frontend</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-800 flex items-center gap-3">
                <FiServer className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" size={22} />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Robust Backends</span>
              </div>
            </div>

            {/* Social Connect strip */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Connect with me directly:</span>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-3 rounded-xl border bg-white dark:bg-slate-800 shadow-sm transition-all duration-200 ${s.color}`}
                    title={s.label}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Stats & Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Stat Box 1: CGPA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white p-7 sm:p-8 rounded-3xl shadow-xl shadow-purple-600/20 relative overflow-hidden flex items-center justify-between"
            >
              <div className="relative z-10">
                <div className="text-xs uppercase font-extrabold tracking-widest text-purple-200">Academic Standing</div>
                <div className="text-5xl sm:text-6xl font-black mt-1.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {inView ? cgpaCount.toFixed(2) : "8.10"}
                </div>
                <div className="text-sm text-purple-100 font-semibold mt-1">AKTU (2024 - 2028) B.Tech in IT</div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white text-3xl font-black shadow-inner">
                ⭐
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </motion.div>

            {/* Stat Box 2: Dynamic Projects & Certifications Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-[#111c35] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-md flex flex-col justify-center"
              >
                <div className="text-4xl sm:text-5xl font-black text-purple-600 dark:text-purple-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {inView ? Math.round(projectsCount) : dynamicProjectsCount}+
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1.5">Production Projects</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Live & Interactive</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-[#111c35] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-md flex flex-col justify-center"
              >
                <div className="text-4xl sm:text-5xl font-black text-indigo-600 dark:text-indigo-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {inView ? Math.round(certsCount) : dynamicCertsCount}+
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1.5">Certifications</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Verified Credentials</div>
              </motion.div>
            </div>

            {/* Quick Highlights Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-slate-50 dark:bg-[#0d172c] p-6 rounded-3xl border border-slate-200/70 dark:border-slate-700/60"
            >
              <div className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Verified Highlights</div>
              <ul className="text-sm font-semibold text-slate-700 dark:text-slate-300 space-y-2">
                <li className="flex items-center gap-2.5"><FiCheckCircle className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={17} /> DECODE SIH 2026 Participant (OSCode)</li>
                <li className="flex items-center gap-2.5"><FiCheckCircle className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={17} /> Active problem solver on LeetCode</li>
                <li className="flex items-center gap-2.5"><FiCheckCircle className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={17} /> Dynamic real-time database sync</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
