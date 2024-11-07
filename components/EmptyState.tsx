'use client'


interface EmptyStateProps {
  icon: any
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="p-4 text-center">
      <Icon className="h-12 w-12 text-gray-400 mx-auto" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 text-sm text-blue-500 hover:text-blue-700"
        >
          {action.label}
        </button>
      )}
    </div>
  )
} 