import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Link as ScrollLink } from "react-scroll"
import { FiUser, FiFileText, FiAward, FiCheckCircle } from "react-icons/fi"
import { useProjects } from "../hooks/useProjects"
import { useCertificates } from "../hooks/useCertificates"

interface HeroProps {
  onOpenResume?: () => void
}

export default function Hero({ onOpenResume }: HeroProps) {
  const { projects } = useProjects()
  const { certificates } = useCertificates()

  const projectsCount = projects && projects.length > 0 ? projects.length : 3
  const certsCount = certificates && certificates.length > 0 ? certificates.length : 4

  return (
    <section id="home" className="pt-20 lg:pt-18 bg-white dark:bg-[#080d1a] min-h-[90vh] flex items-stretch transition-colors duration-300">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side (7 cols) - Clean Editorial Layout with Perfectly Balanced Typography */}
        <div className="lg:col-span-7 px-6 sm:px-12 lg:px-20 py-14 lg:py-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-xl"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
              Hi! I'm Nikhil Agrahari
            </div>

            {/* Main Title - Balanced & Crisp */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Full-Stack Web Developer
            </h1>

            {/* Dynamic Role Animation */}
            <div className="text-base sm:text-lg lg:text-xl font-bold text-indigo-600 dark:text-indigo-400 min-h-[30px]">
              <TypeAnimation
                sequence={[
                  "Crafting Scalable Full-Stack Web Apps",
                  2000,
                  "Data Structures & Algorithms in C++ / Java",
                  2000,
                  "React, Node.js & Supabase Architect",
                  2000,
                  "Interactive Spatial & Real-Time Telemetry",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            {/* Paragraph - Clean & Legible */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Information Technology undergraduate at <strong className="text-slate-900 dark:text-white font-bold">AKTU (8.10 CGPA)</strong>. Dedicated to engineering high-performance, user-centric web applications through robust software architecture, clean TypeScript code, and modern cloud infrastructure.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <ScrollLink
                to="contact"
                smooth
                duration={500}
                offset={-80}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <FiUser size={16} />
                <span>Hire Me</span>
              </ScrollLink>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="px-6 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm sm:text-base rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <FiFileText size={16} />
                  <span>Download CV</span>
                </button>
              )}
            </div>

            {/* Bottom Row Stats */}
            <div className="grid grid-cols-3 gap-6 pt-7 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  8.10
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">AKTU CGPA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-600 dark:text-indigo-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {projectsCount}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Live Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-600 dark:text-purple-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {certsCount}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Certifications</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side (5 cols) - Deep Executive Midnight-Navy Gradient Matching Photo */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0c162c] via-[#122244] to-[#1c325c] relative overflow-hidden flex items-end justify-center min-h-[480px] lg:min-h-full">
          {/* Subtle Ambient Backlight Glow behind the portrait */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(99, 102, 241, 0.3) 0%, rgba(56, 189, 248, 0.15) 35%, transparent 70%)",
            }}
          />

          {/* Faint Watermark Name */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span
              className="text-white/[0.07] font-black text-6xl sm:text-7xl lg:text-8xl tracking-[0.2em] uppercase text-center leading-none"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              NIKHIL<br />AGRAHARI
            </span>
          </div>

          {/* Portrait Photo Container with Seamless Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-[85%] max-w-sm sm:max-w-md pt-10"
          >
            {/* Floating Badge Top Right */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-12 -right-2 sm:-right-4 bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-2 z-20"
            >
              <FiCheckCircle className="text-cyan-400" size={14} />
              <span className="text-xs sm:text-sm font-bold">Full-Stack Engineer</span>
            </motion.div>

            {/* Floating Badge Bottom Left */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -left-3 sm:-left-6 bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-2 z-20"
            >
              <FiAward className="text-amber-400" size={14} />
              <span className="text-xs sm:text-sm font-bold">8.10 CGPA • AKTU</span>
            </motion.div>

            {/* Photo with subtle luminous top border and soft shadow */}
            <div className="relative rounded-t-[2.5rem] overflow-hidden shadow-2xl border-t-2 border-x-2 border-white/20 bg-slate-950">
              <img
                src="/profile.jpg"
                alt="Nikhil Agrahari"
                className="w-full h-auto object-cover object-top"
              />
              {/* Bottom Subtle Gradient Fade so photo merges seamlessly */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c162c] via-[#0c162c]/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
