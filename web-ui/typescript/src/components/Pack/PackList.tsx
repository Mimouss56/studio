import React, { useMemo, useState } from 'react';
import { PackCard } from './PackCard';
import type { LibraryFilters, PackMetadata } from '../../../@types/pack';

interface PackListProps {
  packs: PackMetadata[];
  filters: LibraryFilters;
  isDraggable?: boolean;
  onPackClick?: (pack: PackMetadata) => void;
  onRemove?: (pack: PackMetadata) => void;
  onReorder?: (sourceIndex: number, destinationIndex: number) => void;
}

export const PackList: React.FC<PackListProps> = ({
  packs,
  filters,
  isDraggable = false,
  onPackClick,
  onRemove,
  onReorder
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null || !onReorder) return;

    onReorder(draggedItem, dropIndex);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const filteredPacks = useMemo(() => 
    packs.filter(pack => {
      const matchesSearch = !filters.searchTerm || 
        pack.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesAge = pack.ageMin >= filters.ageMin && 
        pack.ageMax <= filters.ageMax;
      return matchesSearch && matchesAge;
    }),
    [packs]
  );

  return (
    <div className="pack-list">
      {filteredPacks.map((pack, index) => (
        <div
          key={pack.uuid}
          className={`pack-item ${isDraggable ? 'draggable' : ''} ${draggedItem === index ? 'dragging' : ''}`}
          draggable={isDraggable}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          <PackCard
            pack={pack}
            onClick={() => onPackClick?.(pack)}
            onRemove={() => onPackRemove?.(pack)}
          />
        </div>
      ))}
    </div>
  );
};