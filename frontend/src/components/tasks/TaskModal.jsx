import { useState, useEffect } from 'react'
import { useTasks } from '../../context/TaskContext'

export default function TaskModal({ onClose, task }) {
  const { addTask, updateTask } = useTasks()
  const isEdit = Boolean(task)

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    category: 'Work',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (task) setForm({ title: task.title, description: task.description || '', priority: task.priority, status: task.status, dueDate: task.dueDate || '', category: task.category || 'Work' })
  }, [task])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.title.trim()) { setError('Task title is required'); return }
    if (isEdit) updateTask(task.id, form)
    else addTask(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0d0d1f] border border-purple-500/30 rounded-2xl shadow-2xl shadow-violet-900/40 z-10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/20">
          <h2 className="font-black text-white text-lg">{isEdit ? '✏️ Edit Task' : '➕ New Task'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-slate-700/50 transition-all text-xl">×</button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 text-sm">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Task Title *</label>
            <input value={form.title} onChange={e => { set('title', e.target.value); setError('') }}
              placeholder="e.g. Build the login page"
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-slate-800/80 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={3} placeholder="Add more details about this task..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-all resize-none"
            />
          </div>

          {/* Row: Priority + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Priority</label>
              <select value={form.priority} onChange={e => set('priority', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/60 cursor-pointer transition-all">
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/60 cursor-pointer transition-all">
                <option value="Work">💼 Work</option>
                <option value="Personal">🏠 Personal</option>
                <option value="Learning">📚 Learning</option>
              </select>
            </div>
          </div>

          {/* Row: Status + Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/60 cursor-pointer transition-all">
                <option value="todo">📌 Todo</option>
                <option value="in-progress">⚡ In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Due Date</label>
              <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/60 transition-all [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-purple-900/20">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm font-semibold">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold text-sm transition-all shadow-lg shadow-violet-900/30 hover:-translate-y-0.5">
            {isEdit ? 'Save Changes' : 'Add Task ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}
