'use client';

import { useMemo } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, DragOverlay, closestCorners } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { moveTask } from '@/store/boardSlice';
import { Task } from '@/lib/types';
import { Column } from './Column';
import { TaskCard } from '@/components/tasks/TaskCard';
import { useState } from 'react';

const COLUMNS = ['Todo', 'Doing', 'Done'] as const;

export function BoardColumns() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.board.tasks);
  const filters = useAppSelector((state) => state.board.filters);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    if (filters.search) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      return filters.sort === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [tasks, filters]);

  const tasksByColumn = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column] = filteredAndSortedTasks.filter((task) => task.status === column);
      return acc;
    }, {} as Record<string, Task[]>);
  }, [filteredAndSortedTasks]);

  const handleDragStart = (event: any) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as 'Todo' | 'Doing' | 'Done';

    dispatch(moveTask({ taskId, newStatus }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full p-6" data-testid="board-columns">
        <div className="grid grid-cols-3 gap-6 h-full">
          {COLUMNS.map((column) => (
            <Column
              key={column}
              title={column}
              tasks={tasksByColumn[column]}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-80">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
