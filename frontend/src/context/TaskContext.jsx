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
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!user) { setTasks([]); return }
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/tasks', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const data = await res.json()
        if (res.ok) {
          // Map _id to id for seamless frontend compatibility
          const mapped = data.map(t => ({ ...t, id: t._id }))
          setTasks(mapped)
        } else {
          console.error('Failed to fetch tasks:', data.message)
        }
      } catch (err) {
        console.error('Error fetching tasks:', err)
      }
    }
    fetchTasks()
  }, [user])

  const addTask = async (task) => {
    try {
      const res = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to add task')
      
      const mapped = { ...data, id: data._id }
      setTasks(prev => [mapped, ...prev])
      return mapped
    } catch (err) {
      console.error('Error adding task:', err)
      throw err
    }
  }

  const updateTask = async (id, changes) => {
    try {
      const res = await fetch(`http://localhost:5001/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(changes)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to update task')
      
      const mapped = { ...data, id: data._id }
      setTasks(prev => prev.map(t => t.id === id ? mapped : t))
      return mapped
    } catch (err) {
      console.error('Error updating task:', err)
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to delete task')
      
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
      throw err
    }
  }

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const newStatus = task.status === 'completed' ? 'todo' : 'completed'
    await updateTask(id, { status: newStatus })
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
