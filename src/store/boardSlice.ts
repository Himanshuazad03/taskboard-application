import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, ActivityLogEntry } from '@/lib/types';
import { saveToStorage, loadFromStorage } from '@/lib/storage';

export interface BoardState {
  tasks: Task[];
  activityLog: ActivityLogEntry[];
  filters: {
    search: string;
    priority: string | null;
    sort: 'asc' | 'desc';
  };
}

const initialState: BoardState = {
  tasks: [],
  activityLog: [],
  filters: {
    search: '',
    priority: null,
    sort: 'asc',
  },
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.activityLog.unshift({
        message: `Task "${action.payload.title}" created`,
        timestamp: new Date().toISOString(),
      });
      if (state.activityLog.length > 7) {
        state.activityLog = state.activityLog.slice(0, 7);
      }
      saveToStorage('tasks', state.tasks);
      saveToStorage('activityLog', state.activityLog);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.activityLog.unshift({
          message: `Task "${action.payload.title}" edited`,
          timestamp: new Date().toISOString(),
        });
        if (state.activityLog.length > 7) {
          state.activityLog = state.activityLog.slice(0, 7);
        }
        saveToStorage('tasks', state.tasks);
        saveToStorage('activityLog', state.activityLog);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        state.activityLog.unshift({
          message: `Task "${task.title}" deleted`,
          timestamp: new Date().toISOString(),
        });
        if (state.activityLog.length > 7) {
          state.activityLog = state.activityLog.slice(0, 7);
        }
        saveToStorage('tasks', state.tasks);
        saveToStorage('activityLog', state.activityLog);
      }
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: 'Todo' | 'Doing' | 'Done' }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task && task.status !== action.payload.newStatus) {
        task.status = action.payload.newStatus;
        state.activityLog.unshift({
          message: `Task "${task.title}" moved to ${action.payload.newStatus}`,
          timestamp: new Date().toISOString(),
        });
        if (state.activityLog.length > 7) {
          state.activityLog = state.activityLog.slice(0, 7);
        }
        saveToStorage('tasks', state.tasks);
        saveToStorage('activityLog', state.activityLog);
      }
    },
    resetBoard: (state) => {
      state.tasks = [];
      state.activityLog.unshift({
        message: 'Board reset',
        timestamp: new Date().toISOString(),
      });
      if (state.activityLog.length > 7) {
        state.activityLog = state.activityLog.slice(0, 7);
      }
      saveToStorage('tasks', state.tasks);
      saveToStorage('activityLog', state.activityLog);
    },
    addActivity: (state, action: PayloadAction<string>) => {
      state.activityLog.unshift({
        message: action.payload,
        timestamp: new Date().toISOString(),
      });
      if (state.activityLog.length > 7) {
        state.activityLog = state.activityLog.slice(0, 7);
      }
      saveToStorage('activityLog', state.activityLog);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setPriority: (state, action: PayloadAction<string | null>) => {
      state.filters.priority = action.payload;
    },
    setSort: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filters.sort = action.payload;
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    loadActivityLog: (state, action: PayloadAction<ActivityLogEntry[]>) => {
      state.activityLog = action.payload;
    },
  },
});

export { initialState };


export const {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  resetBoard,
  addActivity,
  setSearch,
  setPriority,
  setSort,
  loadTasks,
  loadActivityLog,
} = boardSlice.actions;
export default boardSlice.reducer;
