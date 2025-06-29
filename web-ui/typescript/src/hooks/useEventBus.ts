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
    autoConnect = true,
    onOpen,
    onClose,
    onError
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const eventBusRef = useRef<InstanceType<typeof EventBus> | null>(null);

  // Fonction de connexion atomique avec destructuration
  const connect = useCallback(() => {
    if (eventBusRef.current) {
      eventBusRef.current.close();
    }

    const eventBus = new EventBus(url);
    eventBusRef.current = eventBus;

    eventBus.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    eventBus.onclose = () => {
      setIsConnected(false);
      onClose?.();
    };

    if (onError) {
      eventBus.onerror = onError;
    }
  }, [url, onOpen, onClose, onError]);

  // Fonction de déconnexion atomique
  const disconnect = useCallback(() => {
    if (eventBusRef.current) {
      eventBusRef.current.close();
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
      eventBusRef.current.registerHandler(address, handler);
    }
  }, [isConnected]);

  // Connexion automatique au montage avec destructuration
  useEffect(() => {
    if (autoConnect) {
      connect();
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