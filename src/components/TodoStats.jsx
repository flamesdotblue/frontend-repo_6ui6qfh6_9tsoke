export default function TodoStats({ total, completed, filter, setFilter, onClearCompleted }) {
  const remaining = total - completed

  const FilterButton = ({ value, label }) => (
    <button
      onClick={() => setFilter(value)}
      className={`rounded-md px-3 py-1 text-xs font-medium border ${
        filter === value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-md border border-gray-100 bg-white p-3">
      <div className="text-sm text-gray-600">
        {remaining} remaining • {completed} completed
      </div>
      <div className="flex items-center gap-2">
        <FilterButton value="all" label="All" />
        <FilterButton value="active" label="Active" />
        <FilterButton value="completed" label="Completed" />
        <button
          onClick={onClearCompleted}
          className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
        >
          Clear completed
        </button>
      </div>
    </div>
  )
}
