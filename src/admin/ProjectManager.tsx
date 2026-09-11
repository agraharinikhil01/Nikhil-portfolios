import { useState, useEffect, FormEvent } from 'react'
import { supabaseAdmin, Project } from '../lib/supabase'
import { FiTrash2, FiPlus } from 'react-icons/fi'

const EMPTY_FORM = { title: '', description: '', tech_stack: '', live_url: '', github_url: '' }

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function fetchProjects() {
    setLoading(true)
    const { data } = await supabaseAdmin.from('projects').select('*').order('order_index', { ascending: true })
    setProjects(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)
    try {
      const techArray = form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean)
      const maxOrder = projects.length > 0 ? Math.max(...projects.map((p) => p.order_index)) : 0
      const { error } = await supabaseAdmin.from('projects').insert({
        title: form.title,
        description: form.description,
        tech_stack: techArray,
        live_url: form.live_url,
        github_url: form.github_url,
        order_index: maxOrder + 1,
      })
      if (error) throw error
      setMessage({ type: 'success', text: 'Project added successfully!' })
      setForm(EMPTY_FORM)
      await fetchProjects()
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to add project' })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return
    const { error } = await supabaseAdmin.from('projects').delete().eq('id', id)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Project deleted.' })
      await fetchProjects()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Existing Projects ({projects.length})
        </h2>
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects yet.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-[#f4f6fb] rounded-xl gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{p.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.tech_stack.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs bg-purple-100 text-purple-700 rounded-full px-2 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
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

      {/* Add form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Add New Project
        </h2>

        {message && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          {([
            { label: 'Title', key: 'title', type: 'text', placeholder: 'My Awesome Project' },
            { label: 'Live URL', key: 'live_url', type: 'url', placeholder: 'https://myproject.vercel.app' },
            { label: 'GitHub URL', key: 'github_url', type: 'url', placeholder: 'https://github.com/user/repo (optional)' },
            { label: 'Tech Stack (comma separated)', key: 'tech_stack', type: 'text', placeholder: 'React, TypeScript, Node.js' },
          ] as const).map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                required={key !== 'github_url'}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#f4f6fb] text-sm"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Brief project description..."
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#f4f6fb] text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-60"
          >
            {submitting ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <FiPlus size={16} />
            )}
            {submitting ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  )
}
