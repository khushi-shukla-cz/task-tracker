
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO date string, optional
  tags?: string[]; // categories or tags
}

export type TaskFilter = 'all' | 'completed' | 'pending';
