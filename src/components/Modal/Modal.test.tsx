import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Тесты модального окна', () => {
  afterEach(cleanup);

  test('Пререндер', () => {
    render(<Modal isOpenModal={false} onClose={() => {}} />);
    const modalElement = screen.queryByRole('dialog');

    expect(modalElement).not.toBeInTheDocument();
  });

  test('Рендер', () => {
    render(
      <Modal isOpenModal={true} onClose={() => {}}>
        Lorem ipsum
      </Modal>
    );
    const modalElement = screen.queryByRole('dialog');
    const modalContent = screen.getByText(/Lorem ipsum/i);

    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveClass(/modal/i);
    expect(modalContent).toBeInTheDocument();
  });

  test('Закрытие клавишей Escape', () => {
    const onClose = vi.fn();
    render(<Modal isOpenModal={true} onClose={onClose} />);

    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Не закрывается при нажатии клавиш', () => {
    const onClose = vi.fn();
    render(<Modal isOpenModal={true} onClose={onClose} />);

    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('Закрытие по клику вне модального окна', () => {
    const onClose = vi.fn();
    render(<Modal isOpenModal={true} onClose={onClose} />);

    fireEvent.click(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
