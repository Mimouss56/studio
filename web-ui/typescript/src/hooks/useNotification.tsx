import { useCallback } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import type { Notification } from '../types/state';
import { NOTIFICATION_DURATIONS } from '../constants';

interface UseNotificationReturn {
  readonly showNotification: (notification: Omit<Notification, 'id'>) => void;
  readonly showSuccess: (message: string, title?: string) => void;
  readonly showError: (message: string, title?: string) => void;
  readonly showWarning: (message: string, title?: string) => void;
  readonly showInfo: (message: string, title?: string) => void;
  readonly dismissNotification: (id: string) => void;
}

export const useNotification = (): UseNotificationReturn => {
  // Fonction atomique pour afficher une notification avec destructuration
  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const { type, message, title, duration = NOTIFICATION_DURATIONS.MEDIUM, action } = notification;

    const toastOptions: ToastOptions = {
      position: 'top-right',
      autoClose: duration === NOTIFICATION_DURATIONS.PERSISTENT ? false : duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const toastContent = (
      <div>
        {title && <div className="fw-bold">{title}</div>}
        <div>{message}</div>
        {action && (
          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
    );

    switch (type) {
      case 'success':
        toast.success(toastContent, toastOptions);
        break;
      case 'error':
        toast.error(toastContent, toastOptions);
        break;
      case 'warning':
        toast.warning(toastContent, toastOptions);
        break;
      case 'info':
        toast.info(toastContent, toastOptions);
        break;
      default:
        toast(toastContent, toastOptions);
    }
  }, []);

  // Fonctions atomiques spécialisées avec destructuration
  const showSuccess = useCallback((message: string, title?: string) => {
    showNotification({ type: 'success', message, title });
  }, [showNotification]);

  const showError = useCallback((message: string, title?: string) => {
    showNotification({ type: 'error', message, title });
  }, [showNotification]);

  const showWarning = useCallback((message: string, title?: string) => {
    showNotification({ type: 'warning', message, title });
  }, [showNotification]);

  const showInfo = useCallback((message: string, title?: string) => {
    showNotification({ type: 'info', message, title });
  }, [showNotification]);

  // Fonction atomique pour fermer une notification avec destructuration
  const dismissNotification = useCallback((id: string) => {
    toast.dismiss(id);
  }, []);

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissNotification
  };
}; 