
import { Task } from '../types/Task';

const TASKS_KEY = 'taskTracker_tasks';

export const loadTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(TASKS_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const clearTasks = (): void => {
  try {
    localStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};
