import { useState, useEffect } from "react"
import { FiMail, FiTrash2, FiClock, FiUser, FiExternalLink, FiRefreshCw } from "react-icons/fi"
import { supabaseAdmin } from "../lib/supabase"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function MessageManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabaseAdmin
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (err) {
      console.error("Error loading messages:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    setDeletingId(id)
    try {
      const { error } = await supabaseAdmin
        .from("contact_messages")
        .delete()
        .eq("id", id)

      if (error) throw error
      setMessages((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      console.error("Error deleting message:", err)
      alert("Failed to delete message")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Inbox - Received Contact Messages ({messages.length})
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Every inquiry submitted from your portfolio is permanently preserved in your Supabase database.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} size={14} />
          Refresh Messages
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          Loading messages from database...
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-gray-400 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mx-auto">
            <FiMail size={32} />
          </div>
          <div className="font-semibold text-gray-700">No messages received yet</div>
          <div className="text-xs text-gray-400">When visitors submit inquiries on your site, they will appear here.</div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-slate-50/50 hover:bg-white hover:border-purple-200 hover:shadow-md transition-all duration-200 space-y-3"
            >
              {/* Message Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                    <FiUser size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                      {msg.name}
                    </h4>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Inquiry")}`}
                      className="text-xs text-purple-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      {msg.email} <FiExternalLink size={10} />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <FiClock size={12} />
                    {new Date(msg.created_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={deletingId === msg.id}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Subject */}
              {msg.subject && (
                <div className="text-xs font-bold text-gray-700 bg-purple-50/70 text-purple-900 px-3 py-1 rounded-md w-fit">
                  Subject: {msg.subject}
                </div>
              )}

              {/* Message Body */}
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-100">
                {msg.message}
              </p>

              {/* Quick Reply Button */}
              <div className="flex justify-end pt-1">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Inquiry")}`}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FiMail size={13} /> Reply Directly to {msg.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
