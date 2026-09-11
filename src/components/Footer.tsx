import { Link as ScrollLink } from "react-scroll"
import { FiArrowUp, FiHeart, FiGithub, FiLinkedin } from "react-icons/fi"
import { SiLeetcode } from "react-icons/si"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              NA
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Nikhil Agrahari
              </span>
              <span className="text-[11px] text-slate-400">Software Engineer & Problem Solver</span>
            </div>
          </div>

          {/* Nav Quick links */}
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <ScrollLink to="home" smooth duration={500} className="hover:text-purple-400 cursor-pointer transition-colors">Home</ScrollLink>
            <ScrollLink to="about" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">About</ScrollLink>
            <ScrollLink to="skills" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Skills</ScrollLink>
            <ScrollLink to="projects" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Projects</ScrollLink>
            <ScrollLink to="certifications" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Certifications</ScrollLink>
            <ScrollLink to="contact" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Contact</ScrollLink>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/agraharinikhil01" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white transition-all">
              <FiGithub size={15} />
            </a>
            <a href="https://linkedin.com/in/nikhil-agrahari-2a78822a1" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
              <FiLinkedin size={15} />
            </a>
            <a href="https://leetcode.com/u/Nikhil_0909" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-all">
              <SiLeetcode size={15} />
            </a>
            <ScrollLink to="home" smooth duration={500} className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all cursor-pointer" title="Back to top">
              <FiArrowUp size={15} />
            </ScrollLink>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Nikhil Agrahari. Built with React, TypeScript, Tailwind & Supabase.</p>
          <p className="flex items-center gap-1">Designed for speed, scalability & elegance <FiHeart className="text-purple-500 fill-purple-500" size={12} /></p>
        </div>
      </div>
    </footer>
  )
}

