import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiDownload, FiExternalLink, FiCheck, FiFileText, FiImage, FiMail, FiPhone, FiMapPin } from "react-icons/fi"
import { generateResumePdf } from "../lib/generateResumePdf"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"digital" | "custom">("digital")
  const [customResumeUrl, setCustomResumeUrl] = useState<string>("")
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("custom_resume_url") || ""
    setCustomResumeUrl(saved)
  }, [isOpen])

  const handleDownloadVector = () => {
    setDownloading(true)
    try {
      generateResumePdf()
    } finally {
      setTimeout(() => setDownloading(false), 800)
    }
  }

  const handleDownloadCustom = () => {
    if (customResumeUrl) {
      const a = document.createElement("a")
      a.href = customResumeUrl
      a.download = "Nikhil_Agrahari_Resume.pdf"
      a.target = "_blank"
      a.rel = "noopener noreferrer"
      a.click()
    } else {
      const a = document.createElement("a")
      a.href = "/resume_img.png"
      a.download = "Nikhil_Agrahari_Resume.png"
      a.click()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-purple-50/50 via-white to-indigo-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-200">
                  NA
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Nikhil Agrahari - Curriculum Vitae
                  </h3>
                  <p className="text-xs text-slate-500">Full-Stack Engineer & Problem Solver</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={customResumeUrl ? handleDownloadCustom : handleDownloadVector}
                  disabled={downloading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-200 transition-all cursor-pointer"
                >
                  <FiDownload />
                  {downloading ? "Downloading..." : customResumeUrl ? "Download Active Resume" : "Download Crisp PDF"}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex border-b border-slate-100 px-6 bg-slate-50/50 gap-4">
              <button
                onClick={() => setActiveTab("digital")}
                className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === "digital"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <FiFileText />
                Crisp Digital View (High-Res)
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`flex items-center gap-2 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === "custom"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <FiImage />
                {customResumeUrl ? "Custom Cloud Resume File" : "Original Scanned Document"}
              </button>
            </div>

            {/* Body Content */}
            <div className="overflow-y-auto p-6 space-y-6 flex-1 bg-slate-50/30 text-slate-700">
              {activeTab === "digital" ? (
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                  {/* Top Header info */}
                  <div className="text-center border-b border-slate-100 pb-5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      Nikhil Agrahari
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5"><FiMapPin className="text-purple-500" /> Greater Noida, India</span>
                      <span className="flex items-center gap-1.5"><FiPhone className="text-purple-500" /> +91 8528930905</span>
                      <span className="flex items-center gap-1.5"><FiMail className="text-purple-500" /> agraharinikhill999@gmail.com</span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-purple-600 mt-3">
                      <a href="https://linkedin.com/in/nikhil-agrahari-2a78822a1" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        LinkedIn <FiExternalLink size={11} />
                      </a>
                      <a href="https://github.com/agraharinikhil01" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        GitHub <FiExternalLink size={11} />
                      </a>
                      <a href="https://leetcode.com/u/Nikhil_0909" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        LeetCode <FiExternalLink size={11} />
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1.5 mb-2">
                      Professional Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Highly motivated Information Technology undergraduate (8.10 CGPA) with a strong foundation in Data Structures & Algorithms and full-stack web development. Proficient in C++, Java, JavaScript, and modern frameworks like React and Node.js. Passionate about engineering scalable, user-focused applications and translating complex problem-solving into real-world software solutions.
                    </p>
                  </div>

                  {/* Technical Skills */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1.5 mb-3">
                      Technical Skills
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
                        <span className="font-bold text-slate-800 block mb-1">Programming Languages:</span>
                        <span className="text-slate-600">C++, Java, Python, JavaScript, TypeScript</span>
                      </div>
                      <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
                        <span className="font-bold text-slate-800 block mb-1">Frontend Development:</span>
                        <span className="text-slate-600">React.js, HTML5, CSS3, Tailwind CSS, Vite</span>
                      </div>
                      <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
                        <span className="font-bold text-slate-800 block mb-1">Backend & APIs:</span>
                        <span className="text-slate-600">Node.js, Express.js, RESTful APIs</span>
                      </div>
                      <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
                        <span className="font-bold text-slate-800 block mb-1">Databases & Cloud:</span>
                        <span className="text-slate-600">MongoDB, MySQL, Supabase, PostgreSQL</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Projects */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1.5 mb-3">
                      Featured Projects
                    </h4>
                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4 space-y-1">
                        <div className="flex flex-wrap items-center justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">RailLine - Real-Time Train Tracking Platform</h5>
                          <span className="text-xs text-purple-600 font-medium">React, TypeScript, Node.js, MapLibre, Supabase</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Comprehensive full-stack railway telemetry platform providing live train status, delay insights, and interactive spatial route maps.
                        </p>
                        <div className="pt-1 flex gap-3 text-xs">
                          <a href="https://rail-line-695qi0kuh-nikhil-agrahari.vercel.app/" target="_blank" rel="noreferrer" className="text-purple-600 font-semibold hover:underline flex items-center gap-1">
                            Live Demo <FiExternalLink size={10} />
                          </a>
                          <a href="https://github.com/agraharinikhil01/RailLine" target="_blank" rel="noreferrer" className="text-slate-600 font-semibold hover:underline flex items-center gap-1">
                            GitHub Repo <FiExternalLink size={10} />
                          </a>
                        </div>
                      </div>

                      <div className="border-l-2 border-purple-500 pl-4 space-y-1">
                        <div className="flex flex-wrap items-center justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">CareSync HMS - Hospital Management System</h5>
                          <span className="text-xs text-purple-600 font-medium">React, Node.js, Express, MongoDB</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Full-stack hospital platform with role-based access, Emergency QR Health Passport, QR payments, and AI prescription scribe.
                        </p>
                        <div className="pt-1 flex gap-3 text-xs">
                          <a href="https://care-sync-3o8iuykgu-nikhil-agrahari.vercel.app/login" target="_blank" rel="noreferrer" className="text-purple-600 font-semibold hover:underline flex items-center gap-1">
                            Live Demo <FiExternalLink size={10} />
                          </a>
                          <a href="https://github.com/agraharinikhil01/CareSync-" target="_blank" rel="noreferrer" className="text-slate-600 font-semibold hover:underline flex items-center gap-1">
                            GitHub Repo <FiExternalLink size={10} />
                          </a>
                        </div>
                      </div>

                      <div className="border-l-2 border-purple-500 pl-4 space-y-1">
                        <div className="flex flex-wrap items-center justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">HR AGENT - HireFlow AI</h5>
                          <span className="text-xs text-purple-600 font-medium">React, Node.js, AI, TypeScript</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          AI-driven recruitment agent automating candidate screening, resume parsing, and interview workflow coordination.
                        </p>
                        <div className="pt-1 flex gap-3 text-xs">
                          <a href="https://hr-agent-steel.vercel.app/login" target="_blank" rel="noreferrer" className="text-purple-600 font-semibold hover:underline flex items-center gap-1">
                            Live Demo <FiExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1.5 mb-2">
                      Certifications & Achievements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2"><FiCheck className="text-emerald-500 flex-shrink-0" /> TCS iON Career Edge - Young Professional</div>
                      <div className="flex items-center gap-2"><FiCheck className="text-emerald-500 flex-shrink-0" /> Cybersecurity Foundation Certification</div>
                      <div className="flex items-center gap-2"><FiCheck className="text-emerald-500 flex-shrink-0" /> Adobe Certification</div>
                      <div className="flex items-center gap-2"><FiCheck className="text-emerald-500 flex-shrink-0" /> DECODE SIH 2026 Participant (OSCode)</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  {customResumeUrl ? (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 text-center space-y-4 max-w-md">
                      <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 mx-auto flex items-center justify-center">
                        <FiFileText size={32} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">Custom Resume File is Active</h4>
                        <p className="text-xs text-slate-500 mt-1">Uploaded and managed via Admin Panel</p>
                      </div>
                      <div className="flex gap-3 justify-center pt-2">
                        <button
                          onClick={handleDownloadCustom}
                          className="px-5 py-2.5 bg-purple-600 text-white font-semibold text-xs rounded-xl shadow-md hover:bg-purple-700 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <FiDownload /> Download File
                        </button>
                        <a
                          href={customResumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 bg-slate-800 text-white font-semibold text-xs rounded-xl hover:bg-slate-900 transition-all flex items-center gap-2"
                        >
                          <FiExternalLink /> Open in Tab
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 max-w-2xl">
                        <img
                          src="/resume_img.png"
                          alt="Nikhil Agrahari Resume"
                          className="w-full rounded-xl object-contain max-h-[70vh]"
                        />
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={handleDownloadCustom}
                          className="px-4 py-2 border border-purple-300 text-purple-700 font-semibold text-xs rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <FiDownload /> Download Original Image
                        </button>
                        <a
                          href="/resume_img.png"
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-slate-800 text-white font-semibold text-xs rounded-xl hover:bg-slate-900 transition-colors flex items-center gap-2"
                        >
                          <FiExternalLink /> Open in Full Tab
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
