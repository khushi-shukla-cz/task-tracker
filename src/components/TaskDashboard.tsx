
import { useState, useEffect } from 'react';
import { LogOut, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { Task, TaskFilter as FilterType } from '../types/Task';
import { loadTasks, saveTasks } from '../utils/localStorage';

interface TaskDashboardProps {
  user: string;
  onLogout: () => void;
}

const TaskDashboard = ({ user, onLogout }: TaskDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId: number) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by status
    switch (filter) {
      case 'completed':
        if (!task.completed) return false;
        break;
      case 'pending':
        if (task.completed) return false;
        break;
      default:
        break;
    }
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      if (!task.title.toLowerCase().includes(q) && !task.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  };

  const completionRate = tasks.length > 0 ? Math.round((taskCounts.completed / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-6 lg:space-y-0 gap-4">
          <div className="space-y-2 w-full lg:w-auto">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Hello, {user}! ✨
                </h1>
                <p className="text-gray-600 text-lg">
                  {taskCounts.pending > 0 
                    ? `${taskCounts.pending} task${taskCounts.pending === 1 ? '' : 's'} waiting for you`
                    : 'All caught up! Time to celebrate '}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            <DarkModeToggle />
            <Button
              variant="outline"
              className="hidden sm:inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl shadow"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
            <Button
              variant="default"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow hover:from-purple-600 hover:to-pink-600"
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-5 h-5" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20 min-w-[120px] w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
                <p className="text-xs text-gray-600">Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-green-200 transform hover:scale-105 transition-all duration-300 h-12 px-8 w-full sm:w-auto"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Task
          </Button>
        </div>

        {/* Task Form */}
        {(showForm || editingTask) && (
          <div className="mb-8 animate-fade-in">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? updateTask : addTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-4 flex w-full justify-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-2xl border border-gray-200 bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-base"
          />
        </div>

        {/* Task Filter */}
        <div className="mb-8">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3 sm:space-y-4">
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-10 sm:py-16 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">
                {filter === 'all' ? '📝' : filter === 'completed' ? '🎉' : '⏳'}
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              {filter === 'all' 
                ? "Your canvas awaits"
                : filter === 'completed'
                ? "No completed tasks yet"
                : "No pending tasks"
              }
            </h3>
            <p className="text-gray-500 text-base sm:text-lg max-w-xs sm:max-w-md mx-auto">
              {filter === 'all' 
                ? "Create your first task and start your productivity journey!"
                : `No ${filter} tasks found. ${filter === 'completed' ? 'Complete some tasks to see them here!' : 'Great job staying on top of things!'}`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
