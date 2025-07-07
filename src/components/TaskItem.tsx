
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onToggleComplete: (taskId: number) => void;
}

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={`group backdrop-blur-lg border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl ${
      task.completed 
        ? 'bg-gradient-to-r from-green-50/90 to-emerald-50/90 shadow-green-200/50' 
        : 'bg-white/90 shadow-purple-200/30'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg"></div>
      
      <CardContent className="relative p-6">
        <div className="flex items-start gap-4">
          {/* Custom Checkbox */}
          <div className="mt-1">
            <div 
              onClick={() => onToggleComplete(task.id)}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                task.completed 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg shadow-green-200' 
                  : 'border-gray-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-xl mb-2 transition-all duration-300 ${
              task.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800 group-hover:text-purple-700'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-base mb-3 leading-relaxed ${
                task.completed 
                  ? 'line-through text-gray-400' 
                  : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <p className="text-sm text-gray-500 font-medium">
                Created {formatDate(task.createdAt)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              onClick={() => onEdit(task)}
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 rounded-2xl transition-all duration-300 shadow-lg"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 bg-white/80 backdrop-blur-sm border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white/95 backdrop-blur-lg border-0 rounded-3xl shadow-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold text-gray-800">Delete Task</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 text-base">
                    Are you sure you want to delete "<span className="font-semibold text-gray-800">{task.title}</span>"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3">
                  <AlertDialogCancel className="rounded-2xl bg-gray-100 hover:bg-gray-200 border-0">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(task.id)}
                    className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-200"
                  >
                    Delete Task
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
