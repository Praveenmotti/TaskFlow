import { useTasks } from '../context/TaskContext'

export default function AnalyticsPage() {
  const { tasks, stats } = useTasks()

  const byPriority = {
    high:   tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low:    tasks.filter(t => t.priority === 'low').length,
  }
  const byCategory = tasks.reduce((acc, t) => {
    const cat = t.category || 'Uncategorized'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  const completedByPriority = {
    high:   tasks.filter(t => t.priority==='high'   && t.status==='completed').length,
    medium: tasks.filter(t => t.priority==='medium' && t.status==='completed').length,
    low:    tasks.filter(t => t.priority==='low'    && t.status==='completed').length,
  }

  const maxCat = Math.max(...Object.values(byCategory), 1)

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-black text-white">Analytics</h1>
        <p className="text-slate-400 mt-1 text-sm">Track your productivity patterns and task insights.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: '🎯', color: 'from-violet-600/20 to-violet-600/5', border: 'border-violet-500/20' },
          { label: 'Tasks Done',      value: stats.completed,            icon: '✅', color: 'from-green-600/20 to-green-600/5',  border: 'border-green-500/20' },
          { label: 'In Progress',     value: stats.inProgress,           icon: '⚡', color: 'from-amber-600/20 to-amber-600/5',  border: 'border-amber-500/20' },
          { label: 'Pending',         value: stats.todo,                 icon: '📌', color: 'from-cyan-600/20 to-cyan-600/5',    border: 'border-cyan-500/20' },
        ].map(({ label, value, icon, color, border }) => (
          <div key={label} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5`}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Priority breakdown */}
        <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-5">Tasks by Priority</h2>
          <div className="space-y-4">
            {[
              { label: 'High Priority',   count: byPriority.high,   done: completedByPriority.high,   color: 'from-red-600 to-red-400',    bg: 'bg-red-500/10',    text: 'text-red-400' },
              { label: 'Medium Priority', count: byPriority.medium, done: completedByPriority.medium, color: 'from-amber-500 to-amber-400', bg: 'bg-amber-500/10',  text: 'text-amber-400' },
              { label: 'Low Priority',    count: byPriority.low,    done: completedByPriority.low,    color: 'from-green-600 to-green-400', bg: 'bg-green-500/10',  text: 'text-green-400' },
            ].map(({ label, count, done, color, bg, text }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-slate-300">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{done}/{count} done</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg} ${text}`}>{count} tasks</span>
                  </div>
                </div>
                <div className="bg-slate-800/60 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
                    style={{ width: `${count > 0 ? (done/count)*100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-5">Tasks by Category</h2>
          {Object.keys(byCategory).length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">No categories yet</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([cat, count], i) => {
                const colors = ['from-violet-600 to-violet-400','from-cyan-600 to-cyan-400','from-amber-500 to-amber-400','from-green-600 to-green-400']
                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-slate-300">{cat}</span>
                      <span className="text-xs text-slate-500">{count} task{count!==1?'s':''}</span>
                    </div>
                    <div className="bg-slate-800/60 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700`}
                        style={{ width: `${(count/maxCat)*100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Status flow */}
      <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-6">
        <h2 className="font-bold text-white mb-5">Status Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Todo',        val: stats.todo,        icon: '📌', total: stats.total, color: 'bg-violet-500' },
            { label: 'In Progress', val: stats.inProgress,  icon: '⚡', total: stats.total, color: 'bg-amber-500' },
            { label: 'Completed',   val: stats.completed,   icon: '✅', total: stats.total, color: 'bg-green-500' },
          ].map(({ label, val, icon, total, color }) => {
            const pct = total > 0 ? Math.round((val/total)*100) : 0
            return (
              <div key={label} className="text-center p-4 bg-slate-800/20 rounded-xl">
                <div className="text-3xl mb-1">{icon}</div>
                <div className="text-2xl font-black text-white">{val}</div>
                <div className="text-xs text-slate-400 mb-3">{label}</div>
                <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">{pct}%</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-violet-900/20 to-cyan-900/10 border border-violet-500/20 rounded-2xl p-6">
        <h2 className="font-bold text-white mb-4">💡 Productivity Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: '🎯', tip: stats.completionRate >= 70 ? "Great job! You're completing 70%+ of tasks." : "Try to complete at least 70% of your tasks each week." },
            { icon: '⚡', tip: stats.inProgress > 3 ? "You have many tasks in progress. Focus on finishing before starting new ones." : "Good focus! Keep your in-progress tasks manageable." },
            { icon: '📅', tip: "Set due dates on all tasks to stay accountable and on schedule." },
          ].map(({ icon, tip }, i) => (
            <div key={i} className="bg-slate-800/30 rounded-xl p-4 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{icon}</span>
              <p className="text-sm text-slate-400 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
