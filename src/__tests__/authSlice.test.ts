import authReducer, { login, logout, restoreAuth } from '@/store/authSlice';

describe('Auth Slice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  it('should handle login action', () => {
    const user = { email: 'test@example.com' };
    const state = authReducer(initialState, login(user));

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('should handle logout action', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { email: 'test@example.com' },
    };
    const state = authReducer(loggedInState, logout());

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('should handle restoreAuth action with user', () => {
    const user = { email: 'test@example.com' };
    const state = authReducer(initialState, restoreAuth(user));

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('should handle restoreAuth action with null', () => {
    const state = authReducer(initialState, restoreAuth(null));

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });
});
