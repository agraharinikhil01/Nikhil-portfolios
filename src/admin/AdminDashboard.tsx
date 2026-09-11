import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiLogOut, FiBriefcase, FiAward, FiFileText, FiInbox } from "react-icons/fi"
import ProjectManager from "./ProjectManager"
import CertificateManager from "./CertificateManager"
import ResumeManager from "./ResumeManager"
import MessageManager from "./MessageManager"
import { supabaseAdmin } from "../lib/supabase"

type Tab = "projects" | "certificates" | "resume" | "messages"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>("projects")
  const [messageCount, setMessageCount] = useState<number>(0)

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/admin")
    } else {
      // Fetch message count for badge
      supabaseAdmin
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .then(({ count }) => {
          if (count !== null) setMessageCount(count)
        })
    }
  }, [navigate, activeTab])

  function handleLogout() {
    sessionStorage.removeItem("admin_auth")
    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              NA
            </div>
            <h1 className="text-lg font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Admin Management Portal
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg hover:border-red-300 transition-colors cursor-pointer"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-1.5 shadow-sm w-fit border border-gray-100">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiBriefcase size={15} /> Projects
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "certificates"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiAward size={15} /> Certificates
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "resume"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiFileText size={15} /> Resume / CV
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === "messages"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiInbox size={15} /> Inbox Messages
            {messageCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-400 text-slate-900">
                {messageCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "projects" && <ProjectManager />}
        {activeTab === "certificates" && <CertificateManager />}
        {activeTab === "resume" && <ResumeManager />}
        {activeTab === "messages" && <MessageManager />}
      </div>
    </div>
  )
}
