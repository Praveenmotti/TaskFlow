import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTasks } from '../../context/TaskContext'

const NAV = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/tasks',     icon: '✅', label: 'My Tasks' },
  { to: '/analytics', icon: '📊', label: 'Analytics' },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { stats } = useTasks()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen bg-[#060612] overflow-hidden font-outfit">

      {/* ── SIDEBAR ── */}
      <aside className={`flex flex-col bg-[#0d0d1f] border-r border-purple-900/20 transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} flex-shrink-0`}>

        {/* Brand */}
        <div className={`flex items-center gap-2 px-4 py-5 border-b border-purple-900/20 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-sm font-black text-white flex-shrink-0">T</div>
          {!collapsed && <span className="font-black text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TaskFlow</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 pt-4 overflow-y-auto">
          {!collapsed && <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase px-2 mb-2">Main Menu</p>}
          {NAV.map(({ to, icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-violet-600/20 text-white border border-violet-500/30'
                  : 'text-slate-400 hover:bg-violet-600/10 hover:text-white border border-transparent'}`
              }
            >
              <span className="text-base flex-shrink-0">{icon}</span>
              {!collapsed && <span>{label}</span>}
              {!collapsed && label === 'My Tasks' && stats.todo > 0 && (
                <span className="ml-auto bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{stats.todo}</span>
              )}
            </NavLink>
          ))}

          {!collapsed && (
            <>
              <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase px-2 mb-2 mt-5">Categories</p>
              {['Work','Personal','Learning'].map(cat => (
                <button key={cat} className="flex items-center gap-3 px-3 py-2 rounded-xl mb-1 text-sm text-slate-400 hover:bg-violet-600/10 hover:text-white transition-all w-full text-left">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cat==='Work'?'bg-violet-400':cat==='Personal'?'bg-cyan-400':'bg-amber-400'}`}></span>
                  {cat}
                </button>
              ))}
            </>
          )}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-purple-900/20">
          {!collapsed && (
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all ${collapsed?'justify-center':''}`}>
            <span>🚪</span>{!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-[#060612] border-b border-purple-900/20 backdrop-blur">
          <button onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/20 transition-all text-lg">
            {collapsed ? '→' : '←'}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:block">{new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
