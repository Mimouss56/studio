export interface LibraryMetadata {
  path: string;
  version?: string;
}

export interface LibraryPack {
  uuid: string;
  title: string;
  version: string;
  format: 'archive' | 'raw' | 'fs';
  path: string;
  image?: string;
  nightModeAvailable: boolean;
  official: boolean;
  ageMin: number;
  ageMax: number;
}

export interface LibraryProps {
  metadata: LibraryMetadata;
  packs: LibraryPack[];
}


interface FilterSectionProps {
  searchTerm: string | null;
  ageMin: number;
  ageMax: number;
  onSearchChange: (term: string) => void;
  onAgeChange: (min: number, max: number) => void;
}