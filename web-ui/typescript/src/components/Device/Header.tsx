import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DeviceMetadata } from '../../../@types/device';

interface DeviceHeaderProps {
  metadata: DeviceMetadata;
}

export const DeviceHeader: React.FC<DeviceHeaderProps> = ({ metadata }) => {
  const { t } = useTranslation();

  const storagePercentage = (100 * metadata.storage.taken / metadata.storage.size);
  const storageStatus = storagePercentage > 90 ? 'critical' : storagePercentage > 75 ? 'warning' : '';

  return (
    <div className="header">
      <h4>{t('library.device.title')}</h4>
      
      <div className="header-uuid" title={metadata.uuid}>
        <strong>{t('library.device.uuid')}</strong> {metadata.uuid}
      </div>
      
      <div>
        <strong>{t('library.device.serial')}</strong> 
        {metadata.serial || '-'}
      </div>
      
      <div>
        <strong>{t('library.device.firmware')}</strong> 
        {metadata.firmware || '-'}
      </div>
      
      <div>
        <strong>{t('library.device.sdcardsize')}</strong>
        {(metadata.storage.size / 1073741824).toFixed(1)} {t('library.device.sdcardunit')}
      </div>

      {metadata.error && (
        <p><strong>DEVICE HAS ERRORS</strong></p>
      )}

      <div className="progress">
        <div 
          className={`progress-bar ${storageStatus}`}
          role="progressbar"
          style={{ width: `${storagePercentage}%` }}
          aria-valuenow={metadata.storage.taken}
          aria-valuemin={0}
          aria-valuemax={metadata.storage.size}
        >
          {storagePercentage}%
        </div>
      </div>
    </div>
  );
};