import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'
import TaskModal from '../components/tasks/TaskModal'

const PRIORITY_COLOR = {
  high:   { bg: 'bg-red-500/10',    text: 'text-red-400',    dot: 'bg-red-400' },
  medium: { bg: 'bg-amber-500/10',  text: 'text-amber-400',  dot: 'bg-amber-400' },
  low:    { bg: 'bg-green-500/10',  text: 'text-green-400',  dot: 'bg-green-400' },
}
const STATUS_COLOR = {
  'todo':       { bg: 'bg-violet-500/10', text: 'text-violet-400' },
  'in-progress':{ bg: 'bg-cyan-500/10',   text: 'text-cyan-400' },
  'completed':  { bg: 'bg-green-500/10',  text: 'text-green-400' },
}

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-5 hover:border-purple-500/30 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
        {sub && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{sub}</span>}
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{label}</div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { tasks, stats, toggleComplete, deleteTask } = useTasks()
  const [showModal, setShowModal] = useState(false)

  const recentTasks = tasks.slice(0, 6)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">
            {greeting}, <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{user?.name?.split(' ')[0]} 👋</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Here's what's happening with your tasks today.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-900/30 hover:-translate-y-0.5 text-sm">
          <span className="text-lg">+</span> New Task
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tasks"  value={stats.total}      icon="📋" color="bg-violet-500/15" sub={`${stats.completionRate}% done`} />
        <StatCard label="To Do"        value={stats.todo}       icon="🎯" color="bg-blue-500/15" />
        <StatCard label="In Progress"  value={stats.inProgress} icon="⚡" color="bg-amber-500/15" />
        <StatCard label="Completed"    value={stats.completed}  icon="✅" color="bg-green-500/15" sub="This week" />
      </div>

      {/* Progress + Quick info row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Overall progress */}
        <div className="lg:col-span-2 bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-5 text-base">Weekly Progress</h2>
          {[
            { label: 'Work',     pct: 72, color: 'from-violet-600 to-violet-400' },
            { label: 'Personal', pct: 50, color: 'from-cyan-600 to-cyan-400' },
            { label: 'Learning', pct: 30, color: 'from-amber-500 to-amber-400' },
          ].map(({ label, pct, color }) => (
            <div key={label} className="flex items-center gap-4 mb-4 last:mb-0">
              <div className="w-20 text-xs text-slate-400 flex-shrink-0">{label}</div>
              <div className="flex-1 bg-slate-800/60 rounded-full h-2.5 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
              <div className="w-10 text-xs font-mono text-slate-400 text-right flex-shrink-0">{pct}%</div>
            </div>
          ))}
        </div>

        {/* Focus card */}
        <div className="bg-gradient-to-br from-violet-900/30 to-cyan-900/20 border border-violet-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-5xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-1">
            {stats.completed}/{stats.total}
          </div>
          <div className="text-sm text-slate-400 mb-4">Tasks completed</div>
          <div className="w-full bg-slate-800/60 rounded-full h-3 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-700"
              style={{ width: `${stats.completionRate}%` }} />
          </div>
          <div className="text-xs text-slate-500 mt-2">{stats.completionRate}% completion rate</div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/20">
          <h2 className="font-bold text-white text-base">Recent Tasks</h2>
          <Link to="/tasks" className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors">View all →</Link>
        </div>
        <div className="p-3">
          {recentTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-slate-400 font-medium">No tasks yet</p>
              <p className="text-slate-600 text-sm mt-1">Click "New Task" to get started</p>
            </div>
          ) : (
            recentTasks.map(task => (
              <div key={task.id}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-violet-600/5 transition-all group cursor-pointer border border-transparent hover:border-violet-900/30">
                <button onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    task.status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-slate-600 hover:border-violet-500'
                  }`}>
                  {task.status === 'completed' && <span className="text-xs">✓</span>}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                    {task.title}
                  </p>
                  {task.description && <p className="text-xs text-slate-500 truncate mt-0.5">{task.description}</p>}
                </div>
                {task.dueDate && (
                  <span className="text-xs font-mono text-slate-500 flex-shrink-0 hidden sm:block">
                    {new Date(task.dueDate).toLocaleDateString('en-IN',{month:'short',day:'numeric'})}
                  </span>
                )}
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0 ${PRIORITY_COLOR[task.priority]?.bg} ${PRIORITY_COLOR[task.priority]?.text}`}>
                  {task.priority}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0 hidden sm:block ${STATUS_COLOR[task.status]?.bg} ${STATUS_COLOR[task.status]?.text}`}>
                  {task.status === 'in-progress' ? 'In Progress' : task.status === 'todo' ? 'Todo' : 'Done'}
                </span>
                <button onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all text-sm flex-shrink-0">✕</button>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
