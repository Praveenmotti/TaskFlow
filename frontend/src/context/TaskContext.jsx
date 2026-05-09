import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const TaskContext = createContext(null)

const SAMPLE_TASKS = [
  { id: 1, title: 'Set up GitHub repository', description: 'Initialize project and push to GitHub', priority: 'low', status: 'completed', dueDate: '2025-05-01', category: 'Work', createdAt: new Date().toISOString() },
  { id: 2, title: 'Build auth system with JWT', description: 'Implement login, register, and protected routes', priority: 'high', status: 'in-progress', dueDate: '2025-05-07', category: 'Work', createdAt: new Date().toISOString() },
  { id: 3, title: 'Design dashboard UI', description: 'Create the main dashboard with stats and task list', priority: 'high', status: 'todo', dueDate: '2025-05-08', category: 'Work', createdAt: new Date().toISOString() },
  { id: 4, title: 'Connect MongoDB database', description: 'Setup Mongoose schemas and connect to Atlas', priority: 'medium', status: 'todo', dueDate: '2025-05-10', category: 'Work', createdAt: new Date().toISOString() },
  { id: 5, title: 'Read React documentation', description: 'Cover hooks, context, and router sections', priority: 'medium', status: 'in-progress', dueDate: '2025-05-12', category: 'Learning', createdAt: new Date().toISOString() },
  { id: 6, title: 'Morning workout', description: '30 min cardio + stretching', priority: 'low', status: 'completed', dueDate: '2025-05-06', category: 'Personal', createdAt: new Date().toISOString() },
]

export function TaskProvider({ children }) {
  const { user } = useAuth()

  const getKey = () => user ? `tf_tasks_${user.id}` : null

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const key = getKey()
    if (!key) { setTasks([]); return }
    const stored = localStorage.getItem(key)
    if (stored) {
      setTasks(JSON.parse(stored))
    } else {
      setTasks(SAMPLE_TASKS)
      localStorage.setItem(key, JSON.stringify(SAMPLE_TASKS))
    }
  }, [user])

  const save = (updated) => {
    setTasks(updated)
    const key = getKey()
    if (key) localStorage.setItem(key, JSON.stringify(updated))
  }

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), createdAt: new Date().toISOString(), status: 'todo' }
    save([newTask, ...tasks])
    return newTask
  }

  const updateTask = (id, changes) => {
    save(tasks.map(t => t.id === id ? { ...t, ...changes } : t))
  }

  const deleteTask = (id) => {
    save(tasks.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    save(tasks.map(t => t.id === id
      ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' }
      : t
    ))
  }

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    completionRate: tasks.length ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0,
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleComplete, stats }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
