import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, afterEach, expect } from 'vitest';
import SignInForm from '@/components/signInForm/signInForm';

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

  it('- should close the modal when close button is clicked', () => {
    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    expect(
      screen.queryByText(/The password is incorrect/i)
    ).not.toBeInTheDocument();
  });
});
