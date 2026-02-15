'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { resetBoard, setSearch, setPriority, setSort } from '@/store/boardSlice';
import { removeFromStorage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LogOut, RotateCcw, Search } from 'lucide-react';

export function BoardNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.board.filters);
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleLogout = () => {
    dispatch(logout());
    removeFromStorage('user');
    router.push('/login');
  };

  const handleResetBoard = () => {
    dispatch(resetBoard());
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    dispatch(setSearch(value));
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200" data-testid="board-navbar">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-slate-900">Task Board</h1>
        </div>
        
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 h-9 bg-slate-50 border-slate-200"
              data-testid="search-input"
            />
          </div>
          
          <Select
            value={filters.priority || 'all'}
            onValueChange={(value) => dispatch(setPriority(value === 'all' ? null : value))}
          >
            <SelectTrigger className="w-32 h-9 bg-slate-50 border-slate-200" data-testid="priority-filter">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(value) => dispatch(setSort(value as 'asc' | 'desc'))}
          >
            <SelectTrigger className="w-32 h-9 bg-slate-50 border-slate-200" data-testid="sort-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Due: Earliest</SelectItem>
              <SelectItem value="desc">Due: Latest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-9" data-testid="reset-board-button">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Board
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Board</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all tasks. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetBoard} className="bg-red-600 hover:bg-red-700">
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="h-9" data-testid="logout-button">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
