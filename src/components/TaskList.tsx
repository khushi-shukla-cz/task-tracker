
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onToggleComplete: (taskId: number) => void;
}

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div 
          key={task.id} 
          className="animate-fade-in" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <TaskItem
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
