
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending';
