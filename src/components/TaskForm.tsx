
import { useState, useEffect } from 'react';
import { Save, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '../types/Task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (task: Task | Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority || 'medium');
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setTags(task.tags || []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setTags([]);
    }
  }, [task]);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = (tag: string) => {
    const clean = tag.trim().replace(/[,]/g, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
      setTagInput('');
    }
  };

  const removeTag = (remove: string) => {
    setTags(tags.filter(t => t !== remove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task) {
      onSubmit({
        ...task,
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        tags,
      });
    } else {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        tags,
      });
    }
  }; 

  return (
    <Card className="backdrop-blur-lg bg-white/90 border-0 shadow-2xl shadow-purple-200/30 rounded-3xl overflow-hidden transform animate-scale-in w-full max-w-xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg"></div>
      
      <CardHeader className="relative bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/20 px-4 py-6 sm:px-8">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
          {task ? (
            <>
              <Save className="mr-3 h-6 w-6 text-purple-500" />
              Edit Your Task
            </>
          ) : (
            <>
              <Plus className="mr-3 h-6 w-6 text-green-500" />
              Create New Task
            </>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative px-4 py-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
              Task Title *
            </label>
            <Input
              id="title"
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-12 text-base bg-white/70 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
              Description (Optional)
            </label>
            <Textarea
              id="description"
              placeholder="Add more details about your task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="text-base bg-white/70 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-3">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white/70 text-base focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-3">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white/70 text-base focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Tags input */}
          <div className="space-y-2">
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-3">
              Categories/Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-purple-400 hover:text-red-500 focus:outline-none"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={handleTagInput}
              onKeyDown={handleTagKeyDown}
              className="h-10 w-full rounded-2xl border border-gray-200 bg-white/70 text-base focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
              placeholder="Add a tag and press Enter"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-200 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              disabled={!title.trim()}
            >
              <Save className="mr-2 h-5 w-5" />
              {task ? 'Update Task' : 'Create Task'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="h-12 px-8 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 rounded-2xl transition-all duration-300 w-full sm:w-auto"
            >
              <X className="mr-2 h-5 w-5" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
