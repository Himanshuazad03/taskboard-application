"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/lib/types";
import { TaskCard } from "@/components/tasks/TaskCard";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <div
      className="flex flex-col bg-white rounded-lg border border-slate-200 h-full min-h-0 overflow-hidden"
      data-testid={`column-${title.toLowerCase()}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        {title === "Todo" && <CreateTaskDialog />}
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div
          ref={setNodeRef}
          className={`p-4 space-y-3 transition-colors ${
            isOver ? "bg-slate-50" : ""
          }`}
        >
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">
              No tasks yet
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
