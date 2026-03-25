import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ModeHeader from '../../components/layout/ModeHeader';

const mockTheme = {
  name: 'Practice',
  icon: 'Target',
  headerGradient: 'linear-gradient(135deg, #1C1917, #292524)',
};

function renderModeHeader(props = {}) {
  return render(
    <MemoryRouter>
      <ModeHeader theme={mockTheme} {...props} />
    </MemoryRouter>
  );
}

describe('ModeHeader', () => {
  it('renders the title', () => {
    renderModeHeader({ title: 'Practice Mode' });
    expect(screen.getByText('Practice Mode')).toBeInTheDocument();
  });

  it('falls back to theme name if no title prop', () => {
    renderModeHeader();
    expect(screen.getByText('Practice')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    renderModeHeader({ subtitle: 'Sharpen your skills' });
    expect(screen.getByText('Sharpen your skills')).toBeInTheDocument();
  });

  it('has accessible back button with aria-label', () => {
    renderModeHeader();
    const backBtn = screen.getByLabelText('Go back');
    expect(backBtn).toBeInTheDocument();
  });
});
