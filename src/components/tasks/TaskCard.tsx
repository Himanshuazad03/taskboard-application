"use client";

import { useDraggable } from "@dnd-kit/core";
import { Task } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar, MoreVertical, Tag } from "lucide-react";
import { format, isPast } from "date-fns";
import { useState } from "react";
import { EditTaskDialog } from "./EditTaskDialog";
import { DeleteTaskDialog } from "./DeleteTaskDialog";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const priorityColors = {
  Low: "bg-slate-100 text-slate-700 border-slate-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-red-100 text-red-700 border-red-200",
};

export function TaskCard({ task, isDragging = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isDraggingState,
  } = useDraggable({
    id: task.id,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const isOverdue =
    task.dueDate && isPast(new Date(task.dueDate)) && task.status !== "Done";

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${
          isOverdue ? "border-l-4 border-l-red-500" : "border-slate-200"
        } ${isDraggingState || isDragging ? "opacity-50" : ""}`}
        data-testid={`task-card-${task.id}`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-medium text-slate-900 flex-1 text-sm leading-snug"
            data-testid="task-title"
          >
            {task.title.length > 30
              ? task.title.slice(0, 30) + "..."
              : task.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                data-testid="task-menu"
              >
                <MoreVertical className="h-3.5 w-3.5 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setEditOpen(true)}
                data-testid="edit-task-button"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteOpen(true)}
                className="text-red-600"
                data-testid="delete-task-button"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {task.description && (
          <p
            className="text-xs text-slate-600 mb-3 line-clamp-2"
            data-testid="task-description"
          >
            {task.description.length > 40
              ? task.description.slice(0, 40) + "..."
              : task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${priorityColors[task.priority]}`}
            data-testid="task-priority"
          >
            {task.priority}
          </Badge>

          {task.dueDate && (
            <div
              className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-600" : "text-slate-500"}`}
              data-testid="task-due-date"
            >
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(task.dueDate), "MMM d")}</span>
            </div>
          )}
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3" data-testid="task-tags">
            {task.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditTaskDialog task={task} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteTaskDialog
        task={task}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
