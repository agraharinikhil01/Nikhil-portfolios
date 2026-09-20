import { motion } from "framer-motion"
import { FiGithub, FiExternalLink, FiGlobe } from "react-icons/fi"
import { useProjects } from "../hooks/useProjects"
import { Project } from "../lib/supabase"

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "RailLine - Real-Time Train Tracking Platform",
    description:
      "Comprehensive full-stack railway tracking platform providing live train status, accurate ETA, delay insights, and weather-based travel information. Integrated interactive route maps and journey analytics utilizing MapLibre/MapTiler and REST APIs.",
    tech_stack: ["React", "TypeScript", "Node.js", "MapLibre", "Supabase", "REST APIs"],
    live_url: "https://rail-line-695qi0kuh-nikhil-agrahari.vercel.app/",
    github_url: "https://github.com/agraharinikhil01/RailLine",
    order_index: 1,
    created_at: "",
  },
  {
    id: "2",
    title: "CareSync HMS - Hospital Management System",
    description:
      "Full-stack Hospital Management System incorporating role-based access control to ensure secure, structured workflows. Features Emergency QR Health Passport, QR payments, and an AI prescription scribe to streamline patient care.",
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "AI Medical Assistant"],
    live_url: "https://care-sync-3o8iuykgu-nikhil-agrahari.vercel.app/login",
    github_url: "https://github.com/agraharinikhil01/CareSync-",
    order_index: 2,
    created_at: "",
  },
  {
    id: "3",
    title: "HR AGENT - HireFlow AI",
    description:
      "AI-powered HR Agent built for intelligent hiring workflows, automated candidate screening, and streamlined interview pipelines with a modern responsive analytics dashboard.",
    tech_stack: ["React", "Node.js", "AI", "TypeScript", "Tailwind CSS"],
    live_url: "https://hr-agent-steel.vercel.app/login",
    github_url: "",
    order_index: 3,
    created_at: "",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const getBadge = (idx: number) => {
    if (idx === 0) return { label: "Featured • GIS & Maps", color: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800" }
    if (idx === 1) return { label: "Full-Stack • Healthcare", color: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800" }
    return { label: "AI Agent • Automation", color: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800" }
  }

  const badge = getBadge(index)

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group bg-white dark:bg-[#111c35] rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xl shadow-purple-500/5 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
      onClick={() => window.open(project.live_url, "_blank")}
    >
      {/* Decorative Mockup Header (Browser style) */}
      <div className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-400"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.color}`}>
          {badge.label}
        </span>
        <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
          <FiGlobe size={14} />
          <span className="hidden sm:inline">Live Deployment</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <h3
              className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {project.title}
            </h3>
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
              <FiExternalLink size={16} />
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-semibold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700 rounded-lg group-hover:bg-purple-50/70 dark:group-hover:bg-purple-950/40 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => window.open(project.live_url, "_blank")}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-purple-300/40 dark:shadow-purple-900/40 hover:shadow-purple-400/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Visit Live Web App</span>
              <FiExternalLink size={14} />
            </button>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all"
                title="View Source Code on GitHub"
              >
                <FiGithub size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { projects } = useProjects()
  const displayProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS

  return (
    <section id="projects" className="py-28 bg-white dark:bg-[#0c1427] relative border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/80 dark:border-purple-800">
            Portfolio Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white mt-3.5 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Featured Software Engineering Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Click any project card to immediately launch and interact with the live deployed web application.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
