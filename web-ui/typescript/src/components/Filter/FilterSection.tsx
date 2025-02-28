import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFilters } from './useFilters';
import type { LibraryFilters } from '../../../@types/pack';

interface FiltersSectionProps {
  filters: LibraryFilters;
  onFiltersChange: (filters: LibraryFilters) => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  const { t } = useTranslation();
  const { handleSearchChange, handleAgeFilterChange } = useFilters(filters, onFiltersChange);

  if (!filters) {
    return null; // ou un état de chargement
  }

  return (
    <div className="filters-section">
      <div className="search-filter">
        <input
          type="text"
          placeholder={t('library.filters.search')}
          value={filters.searchTerm || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="age-filter">
        <label>{t('library.filters.age')}</label>
        <div className="age-range">
          <input
            type="number"
            min={0}
            max={filters.ageMax}
            value={filters.ageMin}
            onChange={(e) => handleAgeFilterChange(Number(e.target.value), filters.ageMax)}
          />
          <span>-</span>
          <input
            type="number"
            min={filters.ageMin}
            max={12}
            value={filters.ageMax}
            onChange={(e) => handleAgeFilterChange(filters.ageMin, Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};