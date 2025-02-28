/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnrichedPackMetadata } from "./enrichedPackMetadata";
import { DeviceInfos } from '../../@types/device';
export interface LibraryPack{
  uuid: string;
  packs: Pack[];
}

export interface Pack{
  format: string;
  uuid: string;
  version: number;
  path: string;
  timestamp: number;
  ageMin: number;
  ageMax: number;
  nightModeAvailable: boolean;
  title: string;
  description: string;
  image: string;
  official: boolean;
}

export interface StoryPack {
  uuid: string;
  factoryDisabled: boolean;
  version: number;
  stageNodes: StageNode[];
  enriched: EnrichedPackMetadata;
  nightModeAvailable: boolean;
}

export interface DevicePackInfos {
  uuid: string;
  folderName: string;
  version: number;
  sizeInBytes: number;
  nightModeAvailable: boolean;
  ageMin: number;
  ageMax: number;
}

export interface PackMetadata {
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

export interface PackLibraryState {
  searchTerm: string | null;
  ageMinFilter: number;
  ageMaxFilter: number;
  showRemoveFromLibraryConfirmDialog: boolean;
  showRemoveFromDeviceConfirmDialog: boolean;
  removingFromLibrary: string | null;
  removingFromDevice: string | null;
  dragging: string | null;
  reordering: PackMetadata | null;
  beforeReordering: PackMetadata[] | null;
  allowEnrichedDialog: {
    show: boolean;
    data: any | null;
  };
  confirmConversionDialog: {
    show: boolean;
    data: any | null;
  };
}

export interface PackLibraryProps {
  device: {
    metadata: DeviceInfos | null;
    packs: DevicePackInfos[];
  };
  library: {
    metadata: any;
    packs: any[];
  };
  settings: {
    allowEnriched: boolean;
  };
}

export interface LibraryFilters {
  searchTerm: string;
  ageMin: number;
  ageMax: number;
}