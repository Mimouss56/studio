import React from 'react';
import { useTranslation } from 'react-i18next';

interface LibraryHeaderProps {
  metadata: {
    path: string;
  };
  packCount: number;
  onCreateNew: () => void;
  onOpenSample: () => void;
}

export const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  metadata,
  packCount,
  onCreateNew,
  onOpenSample
}) => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <h4>{t('library.local.title')}</h4>
      {metadata && (
        <div>
          <strong>{t('library.local.path')}</strong> {metadata.path}
        </div>
      )}
      <div>
        <strong>{t('library.local.packs.length')}</strong> {packCount || '-'}
      </div>

      <div className="editor-actions">
        <p>
          <button 
            className="library-action" 
            onClick={onCreateNew}
          >
            {t('library.local.empty.link1')}
          </button>
          {' '}
          <button 
            className="library-action" 
            onClick={onOpenSample}
          >
            {t('library.local.empty.link2')}
          </button>
          {' '}
          {t('library.local.empty.suffix')}
        </p>
      </div>
    </div>
  );
};