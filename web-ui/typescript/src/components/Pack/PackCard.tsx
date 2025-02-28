import React from 'react';
import { useTranslation } from 'react-i18next';
import { PackThumbnail } from './PackThumbnail';
import { PackInfo } from './PackInfo';
import { PackActions } from './PackActions';
import { PackMetadata } from '../../../@types/pack';
interface PackCardProps {
  pack: PackMetadata;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const PackCard: React.FC<PackCardProps> = ({
  pack,
  onClick,
  onRemove,
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`pack-tile pack-${pack.format} ${pack.nightModeAvailable ? 'pack-night-mode' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="pack-thumb">
        <PackThumbnail
          image={pack.image}
          format={pack.format}
          version={pack.version}
          ageMin={pack.ageMin}
          isOfficial={pack.official}
        />
      </div>

      <PackInfo
        title={pack.title}
        format={pack.format}
        version={pack.version}
        ageRange={`${pack.ageMin}-${pack.ageMax}`}
      />

      {onRemove && (
        <PackActions
          onRemove={onRemove}
          removeTitle={t('library.actions.remove')}
        />
      )}
    </div>
  );
};