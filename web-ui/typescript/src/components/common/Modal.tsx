import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '@/types';
import { BOOTSTRAP_CLASSES } from '@/constants';

// Interface pour les props du Modal avec destructuration atomique
interface ModalComponentProps extends ModalProps {
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly centered?: boolean;
  readonly scrollable?: boolean;
  readonly backdrop?: boolean | 'static';
  readonly keyboard?: boolean;
}

// Composant Modal avec destructuration atomique et Bootstrap 5.3.7
export const Modal: React.FC<ModalComponentProps> = ({
  title,
  content,
  buttons = [],
  onClose,
  size = 'md',
  centered = true,
  scrollable = false,
  backdrop = true,
  keyboard = true,
  className = '',
  id,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Destructuration des classes Bootstrap
  const {
    MODAL,
    MODAL_DIALOG,
    MODAL_CONTENT,
    MODAL_HEADER,
    MODAL_BODY,
    MODAL_FOOTER,
    MODAL_TITLE,
    BUTTON,
    BUTTON_PRIMARY,
    BUTTON_SECONDARY,
    BUTTON_CLOSE
  } = BOOTSTRAP_CLASSES;

  // Destructuration des classes pour le modal
  const modalClasses = [
    MODAL,
    'fade',
    'show',
    'd-block',
    className
  ].filter(Boolean).join(' ');

  // Destructuration des classes pour le modal dialog
  const dialogClasses = [
    MODAL_DIALOG,
    `modal-${size}`,
    centered && 'modal-dialog-centered',
    scrollable && 'modal-dialog-scrollable'
  ].filter(Boolean).join(' ');

  // Gestion des événements avec destructuration atomique
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && backdrop !== 'static') {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && keyboard) {
      onClose();
    }
  };

  // Effet pour gérer le focus et les événements clavier avec destructuration atomique
  useEffect(() => {
    const { current: modalElement } = modalRef;

    if (modalElement) {
      modalElement.focus();

      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = '';
      };
    }
  }, []);

  // Fonction pour obtenir la classe du bouton avec destructuration atomique
  const getButtonClass = (variant?: string) => {
    switch (variant) {
      case 'primary':
        return `${BUTTON} ${BUTTON_PRIMARY}`;
      case 'secondary':
        return `${BUTTON} ${BUTTON_SECONDARY}`;
      case 'danger':
        return `${BUTTON} btn-danger`;
      case 'warning':
        return `${BUTTON} btn-warning`;
      case 'info':
        return `${BUTTON} btn-info`;
      default:
        return `${BUTTON} ${BUTTON_SECONDARY}`;
    }
  };

  // Rendu du modal avec destructuration atomique
  const modalContent = (
    <div
      ref={modalRef}
      className={modalClasses}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={id ? `${id}-title` : undefined}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={dialogClasses}>
        <div className={MODAL_CONTENT}>
          {/* Header avec destructuration atomique */}
          <div className={MODAL_HEADER}>
            <h5 className={MODAL_TITLE} id={id ? `${id}-title` : undefined}>
              {title}
            </h5>
            <button
              type="button"
              className={BUTTON_CLOSE}
              aria-label="Fermer"
              onClick={onClose}
            />
          </div>

          {/* Body avec destructuration atomique */}
          <div className={MODAL_BODY}>
            {content}
          </div>

          {/* Footer avec destructuration atomique */}
          {buttons.length > 0 && (
            <div className={MODAL_FOOTER}>
              {buttons.map((button, index) => {
                const { label, onClick, disabled = false, variant } = button;
                return (
                  <button
                    key={index}
                    type="button"
                    className={getButtonClass(variant)}
                    onClick={onClick}
                    disabled={disabled}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Rendu avec backdrop si nécessaire avec destructuration atomique
  const fullModal = backdrop ? (
    <div className="modal-backdrop fade show" />
  ) : null;

  // Utilisation du portal pour le rendu avec destructuration atomique
  return createPortal(
    <>
      {fullModal}
      {modalContent}
    </>,
    document.body
  );
}; 