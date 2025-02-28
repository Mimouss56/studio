import React from 'react';

interface PackActionsProps {
  onRemove: () => void;
  removeTitle: string;
}

export const PackActions: React.FC<PackActionsProps> = ({
  onRemove,
  removeTitle
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="pack-actions">
      <button 
        className="pack-action"
        onClick={handleRemove}
        title={removeTitle}
      >
        <i className="fas fa-trash-alt" />
      </button>
    </div>
  );
};