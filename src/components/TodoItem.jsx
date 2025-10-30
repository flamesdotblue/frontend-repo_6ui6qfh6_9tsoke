import { useState } from 'react'
import { Trash2, Pencil, Check } from 'lucide-react'

export default function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(item.title)

  const save = async () => {
    const t = title.trim()
    if (!t) return setEditing(false)
    if (t !== item.title) {
      await onUpdate(item.id, { title: t })
    }
    setEditing(false)
  }

  return (
    <div className="group flex items-center gap-3 rounded-md border border-gray-100 bg-white px-3 py-2 shadow-sm">
      <input
        type="checkbox"
        checked={!!item.completed}
        onChange={() => onToggle(item.id)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      {editing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && save()}
            className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={save}
            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-700"
          >
            <Check size={14} /> Save
          </button>
        </div>
      ) : (
        <div className="flex-1">
          <p className={`text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{item.title}</p>
        </div>
      )}
      {!editing && (
        <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => setEditing(true)}
            className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-50"
            aria-label="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="rounded-md border border-gray-200 p-1 text-red-600 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
