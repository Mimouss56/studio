import React from 'react';

interface PackInfoProps {
  title: string;
  format: string;
  version: string;
  ageRange: string;
}

export const PackInfo: React.FC<PackInfoProps> = ({
  title,
  format,
  version,
  ageRange
}) => {
  return (
    <div className="pack-info">
      <div className="pack-title">{title}</div>
      <div className="pack-metadata">
        <span className="pack-format">{format}</span>
        <span className="pack-version">v{version}</span>
        <span className="pack-age-range">{ageRange}</span>
      </div>
    </div>
  );
};