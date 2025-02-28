import React from 'react';

interface PackThumbnailProps {
  image?: string;
  format: string;
  version: string;
  ageMin: number;
  isOfficial: boolean;
}

export const PackThumbnail: React.FC<PackThumbnailProps> = ({
  image,
  version,
  ageMin,
  isOfficial
}) => {
  return (
    <>
      <img src={image} alt="" />
      
      <div className="pack-version">
        <span>{version}</span>
      </div>

      <div className="pack-age">
        <span>{ageMin}</span>
      </div>

      {isOfficial && (
        <div className="pack-ribbon blue">
          <span>Official</span>
        </div>
      )}
    </>
  );
};