import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function TodoInput({ onAdd, loading }) {
  const [title, setTitle] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    await onAdd(t)
    setTitle('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        <Plus size={16} />
        Add
      </button>
    </form>
  )
}
