import React from 'react';
import type { BaseComponentProps } from '@/types';

// Interface pour les props du LoadingSpinner avec destructuration atomique
interface LoadingSpinnerProps extends BaseComponentProps {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  readonly text?: string;
  readonly fullScreen?: boolean;
}

// Composant LoadingSpinner avec destructuration atomique et Bootstrap 5.3.7
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  text = 'Chargement...',
  fullScreen = false,
  className = '',
  ...props
}) => {
  // Destructuration des classes Bootstrap
  const spinnerClasses = [
    'spinner-border',
    `spinner-border-${size}`,
    `text-${variant}`,
    className
  ].filter(Boolean).join(' ');

  // Destructuration des classes pour le conteneur
  const containerClasses = fullScreen
    ? 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75'
    : 'd-flex justify-content-center align-items-center';

  // Destructuration des classes pour le contenu
  const contentClasses = fullScreen
    ? 'text-center'
    : 'd-flex align-items-center';

  return (
    <div className={containerClasses} {...props}>
      <div className={contentClasses}>
        <div className={spinnerClasses} role="status" aria-label="Chargement">
          <span className="visually-hidden">{text}</span>
        </div>
        {text && (
          <span className="ms-2 text-muted">{text}</span>
        )}
      </div>
    </div>
  );
}; 