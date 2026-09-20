import { Link as ScrollLink } from "react-scroll"
import { FiArrowUp, FiHeart, FiGithub, FiLinkedin } from "react-icons/fi"
import { SiLeetcode } from "react-icons/si"

export default function Footer() {
  return (
    <footer className="bg-[#080d1a] text-white py-14 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              NA
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Nikhil Agrahari
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Software Engineer & Problem Solver</span>
            </div>
          </div>

          {/* Nav Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-semibold text-slate-300">
            <ScrollLink to="home" smooth duration={500} className="hover:text-purple-400 cursor-pointer transition-colors">Home</ScrollLink>
            <ScrollLink to="about" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">About</ScrollLink>
            <ScrollLink to="skills" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Skills</ScrollLink>
            <ScrollLink to="projects" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Projects</ScrollLink>
            <ScrollLink to="certifications" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Certifications</ScrollLink>
            <ScrollLink to="contact" smooth duration={500} offset={-80} className="hover:text-purple-400 cursor-pointer transition-colors">Contact</ScrollLink>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3.5">
            <a href="https://github.com/agraharinikhil01" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-purple-600 text-slate-200 hover:text-white transition-all shadow-xs" title="GitHub">
              <FiGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/nikhil-agrahari-2a78822a1" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-blue-600 text-slate-200 hover:text-white transition-all shadow-xs" title="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href="https://leetcode.com/u/Nikhil_0909" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-amber-600 text-slate-200 hover:text-white transition-all shadow-xs" title="LeetCode">
              <SiLeetcode size={18} />
            </a>
            <ScrollLink to="home" smooth duration={500} className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all cursor-pointer shadow-md shadow-purple-500/30" title="Back to top">
              <FiArrowUp size={18} />
            </ScrollLink>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800/80 text-center text-xs sm:text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Nikhil Agrahari. Built with React, TypeScript, Tailwind & Supabase.</p>
          <p className="flex items-center gap-1.5 font-medium">Designed for speed, scalability & elegance <FiHeart className="text-purple-500 fill-purple-500" size={14} /></p>
        </div>
      </div>
    </footer>
  )
}
