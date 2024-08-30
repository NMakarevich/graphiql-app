'use client';
import {
  FC,
  PropsWithChildren,
  ReactPortal,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@hooks/useClickOutside';
import { useLockScroll } from '@hooks/useLockScroll';
import styles from './Modal.module.scss';

interface IModalProps {
  isOpenModal: boolean;
  onClose: () => void;
}

const modalCloseKeysCodes = ['Escape'];

export const Modal: FC<PropsWithChildren & IModalProps> = ({
  isOpenModal,
  onClose,
  children,
  ...props
}): ReactPortal | null => {
  const modalRef = useRef(null);
  const modalRoot = useMemo(() => {
    const element = document.createElement('div');

    element.classList.add(styles.modal);
    return element;
  }, []);
  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();

      if (modalCloseKeysCodes.includes(e.code)) {
        onClose();
      }
    },
    [onClose]
  );

  useClickOutside(modalRef, onClose);
  useLockScroll(isOpenModal);

  useEffect(() => {
    if (isOpenModal) {
      document.body.append(modalRoot);
      document.body.addEventListener('keydown', keydownHandler);
    }

    return () => {
      if (isOpenModal) {
        modalRoot.remove();
        document.body.removeEventListener('keydown', keydownHandler);
      }
    };
  });

  if (isOpenModal) {
    return createPortal(
      <div
        className={styles.modalBody}
        ref={modalRef}
        role="dialog"
        aria-modal={isOpenModal}
        {...props}
      >
        {children}
      </div>,
      modalRoot
    );
  }

  return null;
};
