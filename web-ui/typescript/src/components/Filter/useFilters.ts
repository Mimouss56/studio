import { useCallback } from 'react';
import type { LibraryFilters } from '../../../@types/pack';

export const useFilters = (
  filters: LibraryFilters,
  onFiltersChange: (filters: LibraryFilters) => void
) => {
  const handleSearchChange = useCallback((searchTerm: string) => {
    onFiltersChange({
      ...filters,
      searchTerm: searchTerm || ""
    });
  }, [filters, onFiltersChange]);

  const handleAgeFilterChange = useCallback((min: number, max: number) => {
    onFiltersChange({
      ...filters,
      ageMin: min,
      ageMax: max
    });
  }, [filters, onFiltersChange]);

  return {
    handleSearchChange,
    handleAgeFilterChange
  };
};