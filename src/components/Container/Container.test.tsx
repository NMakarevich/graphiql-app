import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Тесты ограничивающего контейнера', () => {
  test('Рендер без класса', () => {
    const className = 'container';

    render(<Container>Lorem ipsum</Container>);
    const container = screen.getByText(/Lorem ipsum/i);

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(className);
  });

  test('Рендер с классом', () => {
    const className = 'test';

    render(<Container className={className}>Lorem ipsum</Container>);
    const container = screen.getByText(/Lorem ipsum/i);

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(`${className}_container`);
  });
});
