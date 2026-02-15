'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { restoreAuth } from '@/store/authSlice';
import { loadTasks, loadActivityLog } from '@/store/boardSlice';
import { loadFromStorage } from '@/lib/storage';
import { Task, ActivityLogEntry } from '@/lib/types';

function StoreInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = loadFromStorage<{ email: string } | null>('user', null);
    const tasks = loadFromStorage<Task[]>('tasks', []);
    const activityLog = loadFromStorage<ActivityLogEntry[]>('activityLog', []);

    if (user) {
      dispatch(restoreAuth(user));
    }
    dispatch(loadTasks(tasks));
    dispatch(loadActivityLog(activityLog));
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
}
