import { motion } from "framer-motion"
import { FiAward, FiDownload, FiCheckCircle, FiExternalLink, FiCalendar } from "react-icons/fi"
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
      className="flip-card h-72 w-full cursor-pointer"
    >
      <div className="flip-card-inner">
        {/* FRONT FACE */}
        <div className="flip-card-front bg-white p-7 shadow-lg shadow-purple-500/5 border border-slate-200/90 flex flex-col justify-between items-center text-center group hover:border-purple-300">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 flex items-center justify-center shadow-md shadow-amber-200">
              <FiAward size={26} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/60">
              <FiCheckCircle size={12} /> Verified Credential
            </div>
          </div>

          <div className="space-y-1.5 my-auto">
            <h3 className="text-base font-bold text-slate-800 leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {cert.name}
            </h3>
            <p className="text-xs font-medium text-purple-600">{cert.issuer}</p>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Hover / tap to view & download</span>
            <span>↺</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-back bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 p-7 text-white shadow-2xl flex flex-col justify-between items-center text-center border border-purple-800">
          <div className="space-y-2">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">Credential Details</div>
            <h3 className="text-sm font-bold text-white leading-snug">
              {cert.name}
            </h3>
            <p className="text-xs text-purple-200">Awarded by: {cert.issuer}</p>
          </div>

          {cert.issued_date && (
            <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-white/10 px-3 py-1 rounded-full">
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
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiDownload size={14} /> Download Certificate
              </button>
            ) : (
              <div className="text-xs text-purple-300 bg-white/5 py-2 px-3 rounded-xl border border-white/10">
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
    <section id="certifications" className="py-24 relative overflow-hidden bg-mesh-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Certifications & Recognition
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Interactive 3D credentials. Hover or tap any certificate card to reveal complete issuance verification and instant download access.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCerts.map((cert, index) => (
            <CertCard key={cert.id || index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
