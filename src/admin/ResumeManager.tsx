import { useState, useEffect } from "react"
import { FiUploadCloud, FiFileText, FiCheck, FiTrash2, FiExternalLink, FiAlertCircle } from "react-icons/fi"
import { supabaseAdmin } from "../lib/supabase"

export default function ResumeManager() {
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("custom_resume_url") || ""
    setCurrentResumeUrl(saved)
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setMessage({ text: "Please select a PDF or Image file to upload", type: "error" })
      return
    }

    setUploading(true)
    setMessage(null)

    try {
      const fileExt = file.name.split(".").pop() || "pdf"
      const fileName = `resume_${Date.now()}.${fileExt}`
      const filePath = `resumes/${fileName}`

      // Upload to Supabase Storage 'certificates' bucket
      const { error: uploadError } = await supabaseAdmin.storage
        .from("certificates")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from("certificates")
        .getPublicUrl(filePath)

      const finalUrl = publicUrlData.publicUrl
      localStorage.setItem("custom_resume_url", finalUrl)
      setCurrentResumeUrl(finalUrl)
      setFile(null)
      setMessage({ text: "Resume uploaded and updated successfully! All portfolio download buttons now use this resume.", type: "success" })
    } catch (err: any) {
      console.error("Resume upload error:", err)
      setMessage({ text: `Upload failed: ${err.message || "Unknown error"}`, type: "error" })
    } finally {
      setUploading(false)
    }
  }

  const handleReset = () => {
    localStorage.removeItem("custom_resume_url")
    setCurrentResumeUrl("")
    setMessage({ text: "Reset to default resume template.", type: "success" })
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Resume / CV Management
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload and swap your active resume (PDF or Image) anytime. Changes will instantly update all "Download CV" and "Resume" buttons across your portfolio.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
            message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? <FiCheck /> : <FiAlertCircle />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Current Active Resume Status */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
            <FiFileText size={22} />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-purple-600 tracking-wider">Active Resume</div>
            <div className="text-sm font-semibold text-slate-800">
              {currentResumeUrl ? "Custom Uploaded Resume" : "Default Built-in Vector Resume"}
            </div>
            {currentResumeUrl && (
              <a
                href={currentResumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-purple-600 hover:underline flex items-center gap-1 mt-0.5"
              >
                View active file <FiExternalLink size={11} />
              </a>
            )}
          </div>
        </div>

        {currentResumeUrl && (
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FiTrash2 size={13} /> Reset to Default
          </button>
        )}
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select New Resume File (PDF, PNG, JPG)
          </label>
          <div className="border-2 border-dashed border-purple-200 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors bg-purple-50/20 cursor-pointer">
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
            />
            {file && (
              <p className="mt-3 text-xs font-semibold text-emerald-600">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FiUploadCloud size={18} />
          {uploading ? "Uploading to Cloud Storage..." : "Upload & Set as Active Resume"}
        </button>
      </form>
    </div>
  )
}
