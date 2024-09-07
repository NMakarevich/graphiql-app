import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpForm from '@components/signUpForm/signUpForm.tsx';

describe('SignUpForm', () => {
  it('Sign Up button should be disabled', () => {
    render(<SignUpForm />);
    const button: HTMLButtonElement = screen.getByRole('button', {
      name: /Sign Up/i,
    });
    expect(button).toBeDisabled();
  });
  it('Should display error when invalid email address is provided', async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.input(emailInput, { target: { value: 'test' } });
    const errorMessage = await screen.findByText(/Please enter valid email/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('Sign Up button should be enabled after providing all fields with valid data.', async () => {
    render(<SignUpForm />);
    const nameInput = screen.getByLabelText(/name/i);
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
    screen.debug();
    expect(button.disabled).toBeFalsy();
  });
});
