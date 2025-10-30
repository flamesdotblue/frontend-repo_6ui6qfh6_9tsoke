import TodoItem from './TodoItem'

export default function TodoList({ items, onToggle, onDelete, onUpdate }) {
  if (!items.length) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
        No tasks yet. Add your first one above!
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />)
      )}
    </div>
  )
}
