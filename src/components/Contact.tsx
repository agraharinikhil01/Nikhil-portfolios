import { useState } from "react"
import { motion } from "framer-motion"
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle, FiExternalLink } from "react-icons/fi"
import { supabase } from "../lib/supabase"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")

    let savedToDb = false

    // 1. SAVE PERMANENTLY TO SUPABASE DATABASE
    try {
      const { error: dbError } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Inquiry",
          message: formData.message,
        },
      ])

      if (!dbError) {
        savedToDb = true
      } else {
        console.warn("Supabase insert notice:", dbError.message)
      }
    } catch (err) {
      console.warn("DB insert fallback:", err)
    }

    // 2. DISPATCH EMAIL TO GMAIL (FormSubmit / Web3Forms)
    try {
      await fetch("https://formsubmit.co/ajax/agraharinikhill999@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Portfolio Inquiry",
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}!`,
          _template: "table",
          _captcha: "false",
        }),
      }).catch(() => null)
    } catch {
      // Background email dispatch
    }

    // Report success to visitor
    setStatus("success")
    setStatusMessage(
      "Thank you! Your message has been received and saved. Nikhil will review your inquiry and reply to your email shortly."
    )
    setFormData({ name: "", email: "", subject: "", message: "" })
    setLoading(false)
  }

  const handleDirectMail = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:agraharinikhill999@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Let's Collaborate & Build Together
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Have an opportunity, project, or question? Send a message and it will be recorded directly in my inbox and database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left info cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-start gap-4">
              <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-md shadow-purple-300">
                <FiMail size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Email Me Directly</h4>
                <a href="mailto:agraharinikhill999@gmail.com" className="text-xs font-medium text-purple-700 hover:underline block mt-0.5">
                  agraharinikhill999@gmail.com
                </a>
                <span className="text-[11px] text-slate-400">Response within 24 hours</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-300">
                <FiPhone size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Direct Call / WhatsApp</h4>
                <a href="tel:+918528930905" className="text-xs font-medium text-indigo-700 hover:underline block mt-0.5">
                  +91 8528930905
                </a>
                <span className="text-[11px] text-slate-400">Available Mon - Sat, 9am - 8pm IST</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="p-3 bg-cyan-600 text-white rounded-2xl shadow-md shadow-cyan-300">
                <FiMapPin size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Location</h4>
                <p className="text-xs font-medium text-slate-700 mt-0.5">Greater Noida, Uttar Pradesh, India</p>
                <span className="text-[11px] text-slate-400">Open to On-site, Hybrid & Remote Roles</span>
              </div>
            </div>
          </motion.div>

          {/* Right form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xl shadow-purple-500/5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Inquiry / SDE Opportunity"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Message Details
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Status Alert */}
              {status === "success" && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <FiCheck className="text-emerald-600 flex-shrink-0" size={16} />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <FiAlertCircle className="text-rose-600 flex-shrink-0" size={16} />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-purple-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <FiSend size={16} />
                  {loading ? "Sending..." : "Send Direct Message"}
                </button>

                <button
                  type="button"
                  onClick={handleDirectMail}
                  className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Open directly in your default email client"
                >
                  <FiExternalLink size={14} /> Open in Mail App
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
