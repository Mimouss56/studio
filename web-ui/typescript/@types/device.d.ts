export interface DeviceStorage {
  size: number;
  taken: number;
}

export interface DeviceMetadata {
  uuid: string;
  serial: string;
  firmware: string;
  storage: DeviceStorage;
  driver: string;
  error?: boolean;
}

export interface DevicePack {
  uuid: string;
  title: string;
  version: string;
  format: string;
  image?: string;
  nightModeAvailable: boolean;
  official: boolean;
}

export interface DeviceProps {
  metadata: DeviceMetadata;
  packs: DevicePack[];
}