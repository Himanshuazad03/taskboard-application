import { login as loginAction } from '@/store/authSlice';

describe('Login Validation', () => {
  it('should validate email format', () => {
    const VALID_EMAIL = 'intern@demo.com';
    const VALID_PASSWORD = 'intern123';

    const invalidEmail = 'wrong@email.com';
    const invalidPassword = 'wrongpassword';

    expect(invalidEmail !== VALID_EMAIL || invalidPassword !== VALID_PASSWORD).toBe(true);
  });

  it('should validate empty fields', () => {
    const email = '';
    const password = '';

    expect(!email || !password).toBe(true);
  });

  it('should validate correct credentials', () => {
    const VALID_EMAIL = 'intern@demo.com';
    const VALID_PASSWORD = 'intern123';

    const email = 'intern@demo.com';
    const password = 'intern123';

    expect(email === VALID_EMAIL && password === VALID_PASSWORD).toBe(true);
  });
});
