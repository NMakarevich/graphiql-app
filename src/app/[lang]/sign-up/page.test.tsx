import { screen, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import SignUpForm from '@components/signUpForm/signUpForm.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/utils/firebase/firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('@/utils/cookies/setAuthCookie', () => ({
  setAuthCookie: vi.fn(),
}));

describe('SignUpForm', () => {
  test('renders sign up form', () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign Up/i })
    ).toBeInTheDocument();
  });
});
