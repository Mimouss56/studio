import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loadLibrary, 
  searchLibrary, 
  filterLibrary, 
  setSearchTerm, 
  setFilter,
  clearError,
  resetLoadingState
} from '../store/slices/librarySlice';
import { selectLibraryState } from '../store/slices/librarySlice';
import { AppDispatch } from '../store';
import type { LibraryFilter } from '../types/state';

// Hook personnalisé pour la gestion de la bibliothèque
export const useLibrary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const libraryState = useSelector(selectLibraryState);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Charger la bibliothèque au montage du composant
  useEffect(() => {
    if (libraryState.packs.length === 0 && !libraryState.isLoading) {
      dispatch(loadLibrary());
    }
    // eslint-disable-next-line
  }, [dispatch, libraryState.packs.length]);

  // Fonction de recherche avec debounce
  const handleSearch = useCallback((searchTerm: string) => {
    if (libraryState.isLoading) return;
    dispatch(setSearchTerm(searchTerm));
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (libraryState.isLoading) return;
      if (searchTerm.trim()) {
        dispatch(searchLibrary(searchTerm.trim()));
      } else {
        dispatch(loadLibrary());
      }
    }, 300);
  }, [dispatch, libraryState.isLoading]);

  // Fonction de filtrage avec debounce
  const handleFilter = useCallback((filter: Partial<LibraryFilter>) => {
    if (libraryState.isLoading) return;
    dispatch(setFilter(filter));
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }
    filterTimeoutRef.current = setTimeout(() => {
      if (libraryState.isLoading) return;
      dispatch(filterLibrary(filter));
    }, 500);
  }, [dispatch, libraryState.isLoading]);

  // Fonction pour recharger la bibliothèque
  const reloadLibrary = useCallback(() => {
    if (libraryState.isLoading) return;
    dispatch(resetLoadingState());
    dispatch(loadLibrary());
  }, [dispatch, libraryState.isLoading]);

  // Fonction pour effacer les erreurs
  const clearLibraryError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Nettoyer les timeouts au démontage
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, []);

  return {
    // État
    packs: libraryState.packs,
    isLoading: libraryState.isLoading,
    error: libraryState.error,
    searchTerm: libraryState.searchTerm,
    filter: libraryState.filter,
    
    // Actions
    handleSearch,
    handleFilter,
    reloadLibrary,
    clearLibraryError
  };
}; 