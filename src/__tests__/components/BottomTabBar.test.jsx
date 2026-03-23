import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BottomTabBar from '../../components/layout/BottomTabBar';

function renderWithRouter(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <BottomTabBar />
    </MemoryRouter>
  );
}

describe('BottomTabBar', () => {
  it('renders all 5 navigation tabs', () => {
    renderWithRouter();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Modes')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
    expect(screen.getByText('Me')).toBeInTheDocument();
  });

  it('has navigation role and aria-label', () => {
    renderWithRouter();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('marks active tab with aria-current', () => {
    renderWithRouter('/');
    const todayBtn = screen.getByLabelText('Navigate to Today');
    expect(todayBtn).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark inactive tabs with aria-current', () => {
    renderWithRouter('/');
    const modesBtn = screen.getByLabelText('Navigate to Modes');
    expect(modesBtn).not.toHaveAttribute('aria-current');
  });

  it('has aria-labels on all buttons', () => {
    renderWithRouter();
    expect(screen.getByLabelText('Navigate to Today')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to Modes')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to Progress')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to Journal')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate to Me')).toBeInTheDocument();
  });
});
