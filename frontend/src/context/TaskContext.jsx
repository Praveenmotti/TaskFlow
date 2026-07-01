import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!user) { setTasks([]); return }
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
          headers: { 
            'Authorization': `Bearer ${user.token}` 
          }
        })
        const data = await res.json()
        if (res.ok) {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
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
    completionRate: tasks.length 
      ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) 
      : 0,
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