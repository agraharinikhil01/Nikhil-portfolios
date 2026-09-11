import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { supabaseAdmin, Certificate } from '../lib/supabase'
import { FiTrash2, FiUpload } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

const EMPTY_FORM = { name: '', issuer: '', issued_date: '' }

export default function CertificateManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function fetchCerts() {
    setLoading(true)
    const { data } = await supabaseAdmin.from('certificates').select('*').order('created_at', { ascending: false })
    setCertificates(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchCerts() }, [])

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null)
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault()
    if (!form.name || !form.issuer) {
      setMessage({ type: 'error', text: 'Name and Issuer are required.' })
      return
    }
    setUploading(true)
    setProgress(10)
    setMessage(null)

    try {
      let file_url = ''
      let file_type = ''

      if (file) {
        const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
        file_type = ext === 'pdf' ? 'pdf' : 'image'
        const filePath = `${uuidv4()}-${file.name}`
        setProgress(30)

        const { error: uploadError } = await supabaseAdmin.storage
          .from('certificates')
          .upload(filePath, file, { upsert: false })

        if (uploadError) throw uploadError
        setProgress(70)

        const { data: urlData } = supabaseAdmin.storage
          .from('certificates')
          .getPublicUrl(filePath)
        file_url = urlData.publicUrl
      }

      setProgress(85)

      const { error: insertError } = await supabaseAdmin.from('certificates').insert({
        name: form.name,
        issuer: form.issuer,
        issued_date: form.issued_date || null,
        file_url,
        file_type,
      })

      if (insertError) throw insertError

      setProgress(100)
      setMessage({ type: 'success', text: 'Certificate uploaded successfully!' })
      setForm(EMPTY_FORM)
      setFile(null)
      await fetchCerts()
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Upload failed' })
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 1500)
    }
  }

  async function handleDelete(cert: Certificate) {
    if (!confirm(`Delete "${cert.name}"?`)) return
    try {
      if (cert.file_url) {
        const path = cert.file_url.split('/certificates/')[1]
        if (path) {
          await supabaseAdmin.storage.from('certificates').remove([path])
        }
      }
      const { error } = await supabaseAdmin.from('certificates').delete().eq('id', cert.id)
      if (error) throw error
      setMessage({ type: 'success', text: 'Certificate deleted.' })
      await fetchCerts()
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Delete failed' })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Existing Certificates ({certificates.length})
        </h2>
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <p className="text-gray-400 text-sm">No certificates yet.</p>
        ) : (
          <div className="space-y-3">
            {certificates.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 bg-[#f4f6fb] rounded-xl gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.issuer}</p>
                  {c.file_url && (
                    <a href={c.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-500 hover:underline">
                      View file
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(c)}
                  className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Upload Certificate
        </h2>

        {message && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message.text}
          </div>
        )}

        {/* Progress bar */}
        {uploading && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="AWS Cloud Practitioner"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#f4f6fb] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuer *</label>
            <input
              type="text"
              value={form.issuer}
              onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))}
              placeholder="Amazon Web Services"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#f4f6fb] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
            <input
              type="date"
              value={form.issued_date}
              onChange={(e) => setForm((f) => ({ ...f, issued_date: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#f4f6fb] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificate File (PDF or Image)</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 transition-colors bg-[#f4f6fb]">
              <FiUpload className="text-gray-400 w-6 h-6 mb-2" />
              <span className="text-sm text-gray-500">
                {file ? file.name : 'Click to select file'}
              </span>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center justify-center gap-2 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <FiUpload size={16} />
            )}
            {uploading ? 'Uploading...' : 'Upload Certificate'}
          </button>
        </form>
      </div>
    </div>
  )
}
