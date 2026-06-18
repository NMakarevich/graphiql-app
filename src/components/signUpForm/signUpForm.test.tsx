import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpForm from '@components/signUpForm/signUpForm.tsx';

vi.mock('next/navigation', async () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SignUpForm', () => {
  it('Sign Up button should be disabled', async () => {
    render(<SignUpForm />);
    const button: HTMLButtonElement = await screen.findByRole('button', {
      name: /Sign Up/i,
    });
    expect(button).toBeDisabled();
  });
  it('Sign Up button should be enabled after providing all fields with valid data.', async () => {
    render(<SignUpForm />);
    const nameInput = await screen.findByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    fireEvent.input(nameInput, { target: { value: 'Test' } });
    fireEvent.input(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.input(passwordInput, { target: { value: 'Aa@11111' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'Aa@11111' } });
    const button: HTMLButtonElement = await screen.findByRole('button', {
      name: /Sign Up/i,
    });
    expect(button.disabled).toBeFalsy();
  });
});
