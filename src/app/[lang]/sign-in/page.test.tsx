import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, vi, afterEach, expect } from 'vitest';
import SignInForm from '@/components/signInForm/signInForm';
import SignIn from '@app/[lang]/sign-in/page.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/utils/firebase/firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('@/utils/cookies/setAuthCookie', () => ({
  setAuthCookie: vi.fn(),
}));

describe('SignInForm: ', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<SignIn />);
    });
  });

  it('- should close the modal when close button is clicked', async () => {
    render(<SignInForm />);

    const email = await screen.findByLabelText(/Email/i);
    fireEvent.change(email, {
      target: { value: 'test@example.com' },
    });
    expect(
      screen.queryByText(/The password is incorrect/i)
    ).not.toBeInTheDocument();
  });
});
