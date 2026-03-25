import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorToastProvider, useErrorToast } from '../../hooks/useErrorToast';

function TestComponent() {
  const { showError } = useErrorToast();
  return (
    <button onClick={() => showError('Something went wrong')}>
      Trigger Error
    </button>
  );
}

describe('ErrorToast', () => {
  it('shows error message when triggered', async () => {
    const user = userEvent.setup();
    render(
      <ErrorToastProvider>
        <TestComponent />
      </ErrorToastProvider>
    );

    await user.click(screen.getByText('Trigger Error'));
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
  });

  it('dismisses on click', async () => {
    const user = userEvent.setup();
    render(
      <ErrorToastProvider>
        <TestComponent />
      </ErrorToastProvider>
    );

    await user.click(screen.getByText('Trigger Error'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('alert'));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('has correct aria attributes', async () => {
    const user = userEvent.setup();
    render(
      <ErrorToastProvider>
        <TestComponent />
      </ErrorToastProvider>
    );

    await user.click(screen.getByText('Trigger Error'));
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });
});
