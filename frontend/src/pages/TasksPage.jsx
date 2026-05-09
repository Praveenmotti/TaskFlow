import { useState, useMemo } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskModal from '../components/tasks/TaskModal'

const PRIORITY_COLOR = {
  high:   { bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/20' },
  medium: { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  low:    { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/20' },
}
const STATUS_LABEL = { 'todo': 'Todo', 'in-progress': 'In Progress', 'completed': 'Completed' }

export default function TasksPage() {
  const { tasks, stats, toggleComplete, deleteTask, updateTask } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [priority, setPriority] = useState('all')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('list') // 'list' | 'grid'

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      if (filter !== 'all' && t.status !== filter) return false
      if (priority !== 'all' && t.priority !== priority) return false
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description?.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [tasks, filter, priority, search])

  const handleEdit = (task) => { setEditTask(task); setShowModal(true) }
  const handleClose = () => { setShowModal(false); setEditTask(null) }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">My Tasks</h1>
          <p className="text-slate-400 mt-1 text-sm">{tasks.length} total · {stats.completed} completed · {stats.todo} remaining</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-900/30 hover:-translate-y-0.5 text-sm">
          <span className="text-lg">+</span> Add Task
        </button>
      </div>

      {/* Filters bar */}
      <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-colors"
          />
        </div>

        {/* Status filter */}
        <div className="flex gap-1.5 bg-slate-800/50 rounded-xl p-1">
          {[['all','All'],['todo','Todo'],['in-progress','In Progress'],['completed','Done']].map(([val,label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter===val ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <select value={priority} onChange={e => setPriority(e.target.value)}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500/60 cursor-pointer">
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* View toggle */}
        <div className="flex gap-1 bg-slate-800/50 rounded-xl p-1">
          <button onClick={() => setView('list')} className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${view==='list'?'bg-violet-600 text-white':'text-slate-400 hover:text-white'}`}>☰</button>
          <button onClick={() => setView('grid')} className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${view==='grid'?'bg-violet-600 text-white':'text-slate-400 hover:text-white'}`}>⊞</button>
        </div>
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-white font-bold text-lg">No tasks found</p>
          <p className="text-slate-500 text-sm mt-2">Try changing your filters or search query</p>
        </div>
      ) : view === 'list' ? (
        <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 px-4 py-2.5 border-b border-purple-900/20 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <div className="w-8"></div>
            <div>Task</div>
            <div className="w-24 text-center hidden sm:block">Due Date</div>
            <div className="w-20 text-center hidden md:block">Priority</div>
            <div className="w-24 text-center hidden md:block">Status</div>
            <div className="w-16 text-center">Actions</div>
          </div>
          {filtered.map(task => (
            <div key={task.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-0 px-4 py-3 border-b border-purple-900/10 hover:bg-violet-600/5 transition-all group last:border-0">
              <div className="w-8">
                <button onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    task.status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-slate-600 hover:border-violet-500'
                  }`}>
                  {task.status === 'completed' && <span className="text-xs font-bold">✓</span>}
                </button>
              </div>
              <div className="min-w-0 pr-4">
                <p className={`text-sm font-semibold truncate ${task.status==='completed'?'line-through text-slate-500':'text-white'}`}>{task.title}</p>
                {task.description && <p className="text-xs text-slate-500 truncate mt-0.5">{task.description}</p>}
              </div>
              <div className="w-24 text-center hidden sm:block">
                <span className="text-xs font-mono text-slate-500">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-IN',{month:'short',day:'numeric'}) : '—'}
                </span>
              </div>
              <div className="w-20 text-center hidden md:block">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLOR[task.priority]?.bg} ${PRIORITY_COLOR[task.priority]?.text}`}>
                  {task.priority}
                </span>
              </div>
              <div className="w-24 text-center hidden md:block">
                <select value={task.status} onChange={e => updateTask(task.id, { status: e.target.value })}
                  className="text-[11px] bg-transparent border border-slate-700 rounded-lg px-2 py-0.5 text-slate-300 cursor-pointer focus:outline-none focus:border-violet-500">
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="w-16 flex items-center justify-center gap-1">
                <button onClick={() => handleEdit(task)} className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all opacity-0 group-hover:opacity-100">✏️</button>
                <button onClick={() => deleteTask(task.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(task => (
            <div key={task.id}
              className={`bg-[#0d0d1f] border rounded-2xl p-5 hover:border-violet-500/30 transition-all group cursor-pointer ${PRIORITY_COLOR[task.priority]?.border} border-purple-900/20`}>
              <div className="flex items-start justify-between mb-3">
                <button onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                    task.status==='completed' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600 hover:border-violet-500'
                  }`}>
                  {task.status==='completed' && <span className="text-xs font-bold">✓</span>}
                </button>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => handleEdit(task)} className="text-slate-500 hover:text-violet-400 p-1">✏️</button>
                  <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-red-400 p-1">🗑️</button>
                </div>
              </div>
              <h3 className={`font-bold text-sm mb-1 ${task.status==='completed'?'line-through text-slate-500':'text-white'}`}>{task.title}</h3>
              {task.description && <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>}
              <div className="flex items-center justify-between mt-3">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLOR[task.priority]?.bg} ${PRIORITY_COLOR[task.priority]?.text}`}>{task.priority}</span>
                {task.dueDate && <span className="text-xs font-mono text-slate-500">{new Date(task.dueDate).toLocaleDateString('en-IN',{month:'short',day:'numeric'})}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <TaskModal onClose={handleClose} task={editTask} />}
    </div>
  )
}
