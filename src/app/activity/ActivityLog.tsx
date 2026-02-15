'use client';

import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ActivityLog() {
  const [isOpen, setIsOpen] = useState(true);
  const activityLog = useAppSelector((state) => state.board.activityLog);

  return (
    <div
      className={`bg-white border-l border-slate-200 transition-all duration-300 flex h-full min-h-0 overflow-hidden ${
        isOpen ? 'w-80' : 'w-12'
      }`}
      data-testid="activity-log"
    >
      {/* Collapsed State */}
      {!isOpen && (
        <div className="flex flex-col items-center py-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="h-8 w-8 p-0"
            data-testid="open-activity-log"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Expanded State */}
      {isOpen && (
        <div className="flex flex-col w-full min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <h2 className="font-semibold text-slate-900">Activity</h2>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
              data-testid="close-activity-log"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4 space-y-3">
              {activityLog.length === 0 ? (
                <div
                  className="text-sm text-slate-400 text-center py-8"
                  data-testid="empty-activity-log"
                >
                  No activity yet
                </div>
              ) : (
                activityLog.map((entry, index) => (
                  <div key={index} data-testid="activity-entry">
                    <div className="text-sm text-slate-700">
                      {entry.message}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      {formatDistanceToNow(new Date(entry.timestamp), {
                        addSuffix: true,
                      })}
                    </div>

                    {index < activityLog.length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
