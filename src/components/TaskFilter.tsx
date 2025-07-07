
import { Button } from '@/components/ui/button';
import { TaskFilter as FilterType } from '../types/Task';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) => {
  const filters: { key: FilterType; label: string; count: number; emoji: string; color: string }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, emoji: '📋', color: 'from-gray-500 to-gray-600' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, emoji: '⏳', color: 'from-orange-500 to-red-500' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, emoji: '✅', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-2 sm:p-3 shadow-lg border border-white/20 flex flex-wrap gap-2 justify-center">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative h-12 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              currentFilter === filter.key
                ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                : 'bg-transparent text-gray-600 hover:bg-white/80 hover:text-gray-800'
            }`}
          >
            <span className="mr-2 text-lg">{filter.emoji}</span>
            {filter.label}
            <span className={`ml-3 px-2 py-1 rounded-full text-xs font-bold ${
              currentFilter === filter.key
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {filter.count}
            </span>
            
            {/* Active indicator */}
            {currentFilter === filter.key && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
