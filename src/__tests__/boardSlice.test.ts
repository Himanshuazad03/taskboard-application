import boardReducer, { addTask, updateTask, deleteTask } from '@/store/boardSlice';
import { Task } from '@/lib/types';

jest.mock('@/lib/storage', () => ({
  saveToStorage: jest.fn(),
  loadFromStorage: jest.fn(),
}));

describe('Board Slice - Task Management', () => {
  const initialState = {
    tasks: [],
    activityLog: [],
    filters: {
      search: '',
      priority: null,
      sort: 'asc' as const,
    },
  };

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    priority: 'Medium',
    dueDate: '2024-12-31',
    tags: ['test'],
    createdAt: new Date().toISOString(),
    status: 'Todo',
  };

  it('should handle addTask action', () => {
    const state = boardReducer(initialState, addTask(mockTask));

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(mockTask);
    expect(state.activityLog).toHaveLength(1);
    expect(state.activityLog[0].message).toContain('Test Task');
    expect(state.activityLog[0].message).toContain('created');
  });

  it('should handle updateTask action', () => {
    const stateWithTask = {
      ...initialState,
      tasks: [mockTask],
    };

    const updatedTask = { ...mockTask, title: 'Updated Task' };
    const state = boardReducer(stateWithTask, updateTask(updatedTask));

    expect(state.tasks[0].title).toBe('Updated Task');
    expect(state.activityLog).toHaveLength(1);
    expect(state.activityLog[0].message).toContain('Updated Task');
    expect(state.activityLog[0].message).toContain('edited');
  });

  it('should handle deleteTask action', () => {
    const stateWithTask = {
      ...initialState,
      tasks: [mockTask],
    };

    const state = boardReducer(stateWithTask, deleteTask('1'));

    expect(state.tasks).toHaveLength(0);
    expect(state.activityLog).toHaveLength(1);
    expect(state.activityLog[0].message).toContain('Test Task');
    expect(state.activityLog[0].message).toContain('deleted');
  });

  it('should not delete task if id does not exist', () => {
    const stateWithTask = {
      ...initialState,
      tasks: [mockTask],
    };

    const state = boardReducer(stateWithTask, deleteTask('non-existent-id'));

    expect(state.tasks).toHaveLength(1);
    expect(state.activityLog).toHaveLength(0);
  });
});
