import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiLock, FiArrowLeft } from 'react-icons/fi'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD as string
    if (password === adminPass) {
      sessionStorage.setItem('admin_auth', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <FiLock className="text-purple-600 w-7 h-7" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Admin Panel
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">Enter your password to access the dashboard</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter admin password"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#f4f6fb] text-gray-800"
            />
          </div>

          {error && (
            <div className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm border border-red-200">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 transition-colors">
            <FiArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
