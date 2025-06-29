import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseEventBusReturn, EventBusError, EventBusMessage } from '@/types';
import EventBus from 'vertx3-eventbus-client';

interface UseEventBusOptions {
  readonly url?: string;
  readonly autoConnect?: boolean;
  readonly onOpen?: () => void;
  readonly onClose?: () => void;
  readonly onError?: (error: EventBusError) => void;
}

export const useEventBus = (options: UseEventBusOptions = {}): UseEventBusReturn => {
  const {
    url = 'http://localhost:8080/eventbus',
    autoConnect = false,
    onOpen,
    onClose,
    onError
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const eventBusRef = useRef<InstanceType<typeof EventBus> | null>(null);

  // Fonction de connexion atomique avec destructuration
  const connect = useCallback(() => {
    if (eventBusRef.current) {
      return;
    }

    try {
      const eventBus = new EventBus(url);
      eventBusRef.current = eventBus;

      eventBus.onopen = () => {
        setIsConnected(true);
        onOpen?.();
      };

      eventBus.onclose = () => {
        setIsConnected(false);
        eventBusRef.current = null;
        onClose?.();
      };

      if (onError) {
        eventBus.onerror = onError;
      }
    } catch (error) {
      console.error('Erreur lors de la connexion EventBus:', error);
    }
  }, [url, onOpen, onClose, onError]);

  // Fonction de déconnexion atomique
  const disconnect = useCallback(() => {
    if (eventBusRef.current) {
      try {
        eventBusRef.current.close();
      } catch (error) {
        console.error('Erreur lors de la déconnexion EventBus:', error);
      }
      eventBusRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Fonction d'enregistrement de handler atomique avec destructuration
  const registerHandler = useCallback((
    address: string,
    handler: (error: EventBusError, message: EventBusMessage) => void
  ) => {
    if (eventBusRef.current && isConnected) {
      try {
        eventBusRef.current.registerHandler(address, handler);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du handler:', error);
      }
    }
  }, [isConnected]);

  // Connexion automatique au montage avec destructuration
  useEffect(() => {
    if (autoConnect) {
      const timer = setTimeout(() => {
        connect();
      }, 100);

      return () => {
        clearTimeout(timer);
        disconnect();
      };
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    eventBus: eventBusRef.current,
    isConnected,
    connect,
    disconnect,
    registerHandler
  };
}; 