import { screen, render, act, waitFor } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import SignUpForm from '@components/signUpForm/signUpForm.tsx';
import SignUp from '@app/[lang]/sign-up/page.tsx';

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
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<SignUp />);
    });
  });

  test('renders sign up form', async () => {
    render(<SignUpForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Sign Up/i })
      ).toBeInTheDocument();
    });
  });
});
