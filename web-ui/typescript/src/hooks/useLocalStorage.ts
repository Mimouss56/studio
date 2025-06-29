import { useState, useEffect, useCallback } from 'react';
import type { UseLocalStorageReturn } from '@/types';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  // Fonction de lecture atomique du localStorage avec destructuration
  const getStoredValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Fonction d'écriture atomique dans le localStorage avec destructuration
  const setStoredValue = useCallback((value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // Fonction de suppression atomique du localStorage avec destructuration
  const removeStoredValue = useCallback((): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  // État local avec initialisation depuis localStorage avec destructuration
  const [value, setValue] = useState<T>(getStoredValue);

  // Mise à jour du localStorage quand la valeur change avec destructuration
  useEffect(() => {
    setStoredValue(value);
  }, [value, setStoredValue]);

  // Fonction de mise à jour de la valeur avec destructuration atomique
  const updateValue = useCallback((newValue: T | ((prevValue: T) => T)): void => {
    setValue(newValue);
  }, []);

  // Fonction de suppression de la valeur avec destructuration atomique
  const removeValue = useCallback((): void => {
    setValue(initialValue);
    removeStoredValue();
  }, [initialValue, removeStoredValue]);

  return {
    value,
    setValue: updateValue,
    removeValue
  };
}; 