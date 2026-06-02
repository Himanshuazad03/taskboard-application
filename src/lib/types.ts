export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  tags: string[];
  createdAt: string;
  status: 'Todo' | 'Doing' | 'Done';
}

export interface ActivityLogEntry {
  message: string;
  timestamp: string;
}
