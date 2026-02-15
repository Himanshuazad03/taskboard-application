"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { BoardNavbar } from "@/components/board/BoardNavbar";
import { BoardColumns } from "@/components/board/BoardColumns";
import { ActivityLog } from "@/components/activity/ActivityLog";

export default function BoardPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="h-screen bg-slate-50 flex flex-col"
      data-testid="board-page"
    >
      <BoardNavbar />

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-hidden min-h-0">
          <BoardColumns />
        </div>
        <ActivityLog />
      </div>
    </div>
  );
}
