import React from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceHeader } from './Header';
import type { DeviceProps } from '../../../@types/device';
import { PackList } from '../Pack/PackList';

interface DeviceSectionProps {
  device: DeviceProps;
  onDrop: (event: React.DragEvent) => void;
  onRemove: (uuid: string) => void;
  onReorder: (uuids: string[]) => void;
}

export const DeviceSection: React.FC<DeviceSectionProps> = ({
  device,
  onDrop,
  onRemove,
  onReorder
}) => {
  const { t } = useTranslation();
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="plugged-device">
      <DeviceHeader 
        metadata={device.metadata}
      />

      <div
        className="device-dropzone"
        onDrop={onDrop}
        onDragOver={handleDragOver}
      >
        {device.packs.length === 0 ? (
          <div className="empty">
            {t('library.device.empty')}
          </div>
        ) : (
          <PackList
            packs={device.packs}
            isDraggable={true}
            onPackRemove={onRemove}
            onReorder={onReorder}
          />
        )}
      </div>
    </div>
  );
};