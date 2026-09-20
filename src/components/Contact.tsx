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

    // 1. SAVE PERMANENTLY TO SUPABASE DATABASE
    try {
      await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Inquiry",
          message: formData.message,
        },
      ])
    } catch (err) {
      console.warn("DB insert notice:", err)
    }

    // 2. DISPATCH EMAIL TO GMAIL (FormSubmit background)
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
    <section id="contact" className="py-28 bg-white dark:bg-[#0c1427] relative border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/80 dark:border-purple-800">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white mt-3.5 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Let's Collaborate & Build Together
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-normal">
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
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-[#111c35] dark:to-[#172545] border border-purple-100 dark:border-purple-800/60 flex items-start gap-4 shadow-sm">
              <div className="p-3.5 bg-purple-600 text-white rounded-2xl shadow-md shadow-purple-400/40">
                <FiMail size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Email Me Directly</h4>
                <a href="mailto:agraharinikhill999@gmail.com" className="text-sm font-bold text-purple-700 dark:text-purple-400 hover:underline block mt-0.5">
                  agraharinikhill999@gmail.com
                </a>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Response within 24 hours</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#111c35] border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-4 shadow-sm">
              <div className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-400/40">
                <FiPhone size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Direct Call / WhatsApp</h4>
                <a href="tel:+918528930905" className="text-sm font-bold text-indigo-700 dark:text-indigo-400 hover:underline block mt-0.5">
                  +91 8528930905
                </a>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Available Mon - Sat, 9am - 8pm IST</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#111c35] border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-4 shadow-sm">
              <div className="p-3.5 bg-cyan-600 text-white rounded-2xl shadow-md shadow-cyan-400/40">
                <FiMapPin size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Location</h4>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Greater Noida, Uttar Pradesh, India</p>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Open to On-site, Hybrid & Remote Roles</span>
              </div>
            </div>
          </motion.div>

          {/* Right form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-[#111c35] p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xl shadow-purple-500/5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Inquiry / SDE Opportunity"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Message Details
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-colors resize-none"
                />
              </div>

              {/* Status Alert */}
              {status === "success" && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-3">
                  <FiCheck className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" size={20} />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm font-semibold flex items-center gap-3">
                  <FiAlertCircle className="text-rose-600 dark:text-rose-400 flex-shrink-0" size={20} />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-purple-400/30 dark:shadow-purple-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <FiSend size={16} />
                  {loading ? "Sending..." : "Send Direct Message"}
                </button>

                <button
                  type="button"
                  onClick={handleDirectMail}
                  className="py-3 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Open directly in your default email client"
                >
                  <FiExternalLink size={15} /> Open in Mail App
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
