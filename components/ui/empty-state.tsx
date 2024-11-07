import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

type IconComponent = IconType | LucideIcon | React.ComponentType<{ className?: string }>;

interface EmptyStateProps {
  icon: IconComponent;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-6 px-4">
      <Icon className="mx-auto h-8 w-8 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
} 