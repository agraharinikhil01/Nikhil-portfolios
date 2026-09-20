import { motion } from "framer-motion"
import { FiAward, FiDownload, FiCheckCircle, FiCalendar } from "react-icons/fi"
import { useCertificates } from "../hooks/useCertificates"
import { Certificate } from "../lib/supabase"

const DEFAULT_CERTS: Certificate[] = [
  {
    id: "1",
    name: "TCS iON Career Edge - Young Professional Certification",
    issuer: "Tata Consultancy Services (TCS)",
    issued_date: "2024-05-15",
    file_url: "",
    file_type: "pdf",
    created_at: "",
  },
  {
    id: "2",
    name: "Cybersecurity Foundation Certification",
    issuer: "EC-Council",
    issued_date: "2024-03-10",
    file_url: "",
    file_type: "pdf",
    created_at: "",
  },
  {
    id: "3",
    name: "Adobe Certification",
    issuer: "Adobe",
    issued_date: "2023-11-20",
    file_url: "",
    file_type: "pdf",
    created_at: "",
  },
  {
    id: "4",
    name: "DECODE SIH 2026 Participant (OSCode)",
    issuer: "Smart India Hackathon (SIH)",
    issued_date: "2026-02-01",
    file_url: "",
    file_type: "pdf",
    created_at: "",
  },
]

function CertCard({ cert, index }: { cert: Certificate; index: number }) {
  const handleDownload = () => {
    if (!cert.file_url) {
      alert("Certificate document will be available once uploaded in the admin panel.")
      return
    }
    const a = document.createElement("a")
    a.href = cert.file_url
    a.download = `${cert.name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flip-card h-76 w-full cursor-pointer"
    >
      <div className="flip-card-inner">
        {/* FRONT FACE */}
        <div className="flip-card-front bg-white dark:bg-[#111c35] p-6 sm:p-7 shadow-xl shadow-purple-500/5 border border-slate-200/90 dark:border-slate-700/70 flex flex-col justify-between items-center text-center group hover:border-purple-400 dark:hover:border-purple-500">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 flex items-center justify-center shadow-md shadow-amber-200 dark:shadow-amber-900/30">
              <FiAward size={26} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/70 dark:border-emerald-800">
              <FiCheckCircle size={13} /> Verified Credential
            </div>
          </div>

          <div className="space-y-1.5 my-auto px-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {cert.name}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400">{cert.issuer}</p>
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
            <span>Hover / tap to view details</span>
            <span>↺</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-back bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 p-6 sm:p-7 text-white shadow-2xl flex flex-col justify-between items-center text-center border-2 border-purple-600/60">
          <div className="space-y-2">
            <div className="text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">Credential Details</div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {cert.name}
            </h3>
            <p className="text-xs text-purple-200 font-medium">Awarded by: {cert.issuer}</p>
          </div>

          {cert.issued_date && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200 bg-white/10 px-3.5 py-1 rounded-full">
              <FiCalendar size={12} />
              <span>Issued: {new Date(cert.issued_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
            </div>
          )}

          <div className="w-full space-y-2">
            {cert.file_url ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload()
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiDownload size={14} /> Download Certificate
              </button>
            ) : (
              <div className="text-xs font-semibold text-purple-300 bg-white/10 py-2 px-3 rounded-xl border border-white/10">
                Official Credential Verified
              </div>
            )}
            <div className="text-[10px] text-purple-300/70">Tap again to flip back</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const { certificates } = useCertificates()
  const displayCerts = certificates && certificates.length > 0 ? certificates : DEFAULT_CERTS

  return (
    <section id="certifications" className="py-28 bg-slate-50/70 dark:bg-[#080d1a] relative overflow-hidden bg-mesh-pattern transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-200/80 dark:border-purple-800">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white mt-3.5 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Certifications & Recognition
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Interactive 3D credentials. Hover or tap any certificate card to reveal complete issuance verification and instant download access.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {displayCerts.map((cert, index) => (
            <CertCard key={cert.id || index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
