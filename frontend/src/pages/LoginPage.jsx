import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060612] flex items-center justify-center p-4 font-outfit relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-3xl -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-700/8 blur-3xl -bottom-20 -right-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white font-black text-lg">T</div>
            <span className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TaskFlow</span>
          </Link>
          <h1 className="text-2xl font-black text-white">Welcome back 👋</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d1f] border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-violet-900/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                <span>⚠️</span> {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" value={form.email} onChange={e => { set('email', e.target.value); setError('') }}
                placeholder="you@example.com" autoComplete="email"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-slate-800/80 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input type="password" value={form.password} onChange={e => { set('password', e.target.value); setError('') }}
                placeholder="Enter your password" autoComplete="current-password"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-slate-800/80 transition-all"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold text-sm transition-all shadow-lg shadow-violet-900/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">Create one free</Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          <Link to="/" className="hover:text-slate-400 transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
