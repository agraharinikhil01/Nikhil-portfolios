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
    <section id="home" className="pt-24 lg:pt-20 bg-white dark:bg-[#080d1a] min-h-[92vh] flex items-stretch transition-colors duration-300">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side (7 cols) - Clean Editorial Layout with Larger, Crisp Typography */}
        <div className="lg:col-span-7 px-6 sm:px-12 lg:px-20 py-16 lg:py-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7 max-w-2xl"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-sm sm:text-base font-bold px-5 py-2 rounded-full shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
              Hi! I'm Nikhil Agrahari
            </div>

            {/* Giant Bold Title */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Full-Stack Web Developer
            </h1>

            {/* Dynamic Role Animation - Clear & Prominent */}
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 min-h-[36px]">
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

            {/* Paragraph - Clear, Realistic & Readable */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
              Information Technology undergraduate at <strong className="text-slate-900 dark:text-white font-bold">AKTU (8.10 CGPA)</strong>. Dedicated to engineering high-performance, user-centric web applications through robust software architecture, clean TypeScript code, and modern cloud infrastructure.
            </p>

            {/* Two Action Buttons - Larger & Impactful */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ScrollLink
                to="contact"
                smooth
                duration={500}
                offset={-80}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-base sm:text-lg rounded-xl shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5 hover:shadow-indigo-500/35"
              >
                <FiUser size={18} />
                <span>Hire Me</span>
              </ScrollLink>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-850 dark:text-white font-extrabold text-base sm:text-lg rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
                >
                  <FiFileText size={18} />
                  <span>Download CV</span>
                </button>
              )}
            </div>

            {/* Bottom Row Stats - High-Impact Numbers */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  8.10
                </div>
                <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold mt-1.5">AKTU CGPA</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-indigo-600 dark:text-indigo-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {projectsCount}+
                </div>
                <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold mt-1.5">Live Projects</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-purple-600 dark:text-purple-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {certsCount}+
                </div>
                <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold mt-1.5">Certifications</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side (5 cols) - Deep Executive Midnight-Navy Gradient Matching Photo */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0c162c] via-[#122244] to-[#1c325c] relative overflow-hidden flex items-end justify-center min-h-[500px] lg:min-h-full">
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
              className="absolute top-12 -right-2 sm:-right-4 bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2.5 z-20"
            >
              <FiCheckCircle className="text-cyan-400" size={16} />
              <span className="text-sm font-bold">Full-Stack Engineer</span>
            </motion.div>

            {/* Floating Badge Bottom Left */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -left-3 sm:-left-6 bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2.5 z-20"
            >
              <FiAward className="text-amber-400" size={16} />
              <span className="text-sm font-bold">8.10 CGPA • AKTU</span>
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
