
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO date string, optional
}

export type TaskFilter = 'all' | 'completed' | 'pending';
