import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PackList } from '../Pack/PackList';
import { LibraryHeader } from './Header';
import { FiltersSection } from '../Filter/FilterSection';
import type { LibraryProps } from '../../../@types/library';
import type { LibraryFilters, PackMetadata } from '../../../@types/pack';

interface LibrarySectionProps {
  library: LibraryProps;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onAdd: (file: File) => void;
  onCreateNew: () => void;
  onOpenSample: () => void;
  onPackRemove?: (pack: PackMetadata) => void;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  library,
  onDrop,
  onCreateNew,
  onOpenSample,
  onPackRemove
}) => {
  const { t } = useTranslation();
  
  const [filters, setFilters] = useState<LibraryFilters>({
    searchTerm: "",
    ageMin: 0,
    ageMax: 12
  });

  const filteredPacks = useMemo(() => {
    if (!library.packs) return [];
    
    return library.packs.filter(pack => {
      const matchesSearch = !filters.searchTerm || 
        pack.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesAge = pack.ageMin >= filters.ageMin && 
        pack.ageMax <= filters.ageMax;
      return matchesSearch && matchesAge;
    });
  }, [library.packs, filters]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleFiltersChange = useCallback((newFilters: LibraryFilters) => {
    setFilters(newFilters);
  }, []);


  return (
    <div className="local-library">
      <LibraryHeader
        metadata={library.metadata}
        packCount={filteredPacks.length}
        onCreateNew={onCreateNew}
        onOpenSample={onOpenSample}
      />

      <FiltersSection
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <div
        className="library-dropzone"
        onDrop={onDrop}
        onDragOver={handleDragOver}
      >
        {filteredPacks.length === 0 ? (
          <div className="empty">
            <p>{t('library.local.empty.header')}</p>
            <div className="empty-actions">
              <button 
                className="btn btn-primary" 
                onClick={onCreateNew}
              >
                {t('library.local.empty.createNew')}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={onOpenSample}
              >
                {t('library.local.empty.openSample')}
              </button>
            </div>
          </div>
        ) : (
          <PackList
            packs={filteredPacks}
            filters={filters}
            isDraggable={false}
            onRemove={onPackRemove}
          />
        )}
      </div>
    </div>
  );
};