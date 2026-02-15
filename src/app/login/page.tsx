'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/authSlice';
import { saveToStorage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const VALID_EMAIL = 'intern@demo.com';
const VALID_PASSWORD = 'intern123';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/board');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      setError('Invalid email or password');
      return;
    }

    const user = { email };
    dispatch(login(user));
    
    if (rememberMe) {
      saveToStorage('user', user);
    }

    router.push('/board');
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-12">
    <Card className="w-full max-w-md shadow-lg border border-slate-200">
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-slate-500">
          Enter your credentials to access your task board
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          data-testid="login-form"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="intern@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              data-testid="email-input"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
              data-testid="password-input"
            />
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setRememberMe(checked as boolean)
              }
              data-testid="remember-checkbox"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Remember me
            </Label>
          </div>

          {/* Error */}
          {error && (
            <div
              className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2"
              data-testid="error-message"
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 mt-2"
            data-testid="submit-button"
          >
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
);

}
