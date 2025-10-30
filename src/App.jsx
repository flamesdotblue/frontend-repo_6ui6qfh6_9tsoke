import { useEffect, useMemo, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') // all | active | completed
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/tasks`)
      if (!res.ok) throw new Error('Failed to load tasks')
      const data = await res.json()
      setTasks(data)
    } catch (e) {
      setError('Unable to load tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTask = async (title) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      if (!res.ok) throw new Error('Failed to add task')
      const task = await res.json()
      setTasks((prev) => [task, ...prev])
    } catch (e) {
      setError('Unable to add task.')
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, { method: 'PATCH' })
      if (!res.ok) throw new Error('Failed to toggle task')
      const updated = await res.json()
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (e) {
      setError('Unable to update task.')
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete task')
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      setError('Unable to delete task.')
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (!res.ok) throw new Error('Failed to update task')
      const updated = await res.json()
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (e) {
      setError('Unable to update task.')
    }
  }

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  const clearCompleted = async () => {
    // Optimistic: delete each completed
    const completed = tasks.filter((t) => t.completed)
    await Promise.allSettled(completed.map((t) => deleteTask(t.id)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">Todo App</h1>
          <p className="mt-1 text-slate-500">Keep track of what matters. Simple, fast, and beautiful.</p>
        </div>

        <div className="space-y-4">
          <TodoInput onAdd={addTask} loading={loading} />

          <TodoStats
            total={tasks.length}
            completed={completedCount}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={clearCompleted}
          />

          {error && (
            <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
          )}

          {loading && tasks.length === 0 ? (
            <div className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-500">Loading tasks...</div>
          ) : (
            <TodoList items={filtered} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
          )}
        </div>
      </div>
    </div>
  )
}
