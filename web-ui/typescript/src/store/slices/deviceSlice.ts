import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { DeviceState, DeviceInfo } from '@/types/state';

// État initial avec destructuration atomique
const initialState: DeviceState = {
  isPlugged: false,
  isMonitoring: false,
  isLoading: false,
  deviceInfo: undefined
};

// Actions asynchrones avec destructuration atomique
export const checkDevice = createAsyncThunk(
  'device/checkDevice',
  async (_, { rejectWithValue }) => {
    try {
      // Simulation d'une vérification de device
      const response = await fetch('/api/device/status');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Erreur lors de la vérification du device');
    }
  }
);

// Slice avec destructuration atomique
export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    // Action atomique pour device branché avec destructuration
    devicePlugged: (state, action: PayloadAction<DeviceInfo>) => {
      const { id, name, version, connectedAt } = action.payload;
      state.isPlugged = true;
      state.deviceInfo = { id, name, version, connectedAt };
    },

    // Action atomique pour device débranché avec destructuration
    deviceUnplugged: (state) => {
      state.isPlugged = false;
      state.deviceInfo = undefined;
    },

    // Action atomique pour démarrer le monitoring avec destructuration
    startMonitoring: (state) => {
      state.isMonitoring = true;
    },

    // Action atomique pour arrêter le monitoring avec destructuration
    stopMonitoring: (state) => {
      state.isMonitoring = false;
    },

    // Action atomique pour mettre à jour les infos du device avec destructuration
    updateDeviceInfo: (state, action: PayloadAction<Partial<DeviceInfo>>) => {
      if (state.deviceInfo) {
        state.deviceInfo = { ...state.deviceInfo, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion atomique des actions asynchrones avec destructuration
      .addCase(checkDevice.pending, (state) => {
        state.isMonitoring = true;
      })
      .addCase(checkDevice.fulfilled, (state, action) => {
        const { isPlugged, deviceInfo } = action.payload;
        state.isPlugged = isPlugged;
        state.deviceInfo = deviceInfo;
        state.isMonitoring = false;
      })
      .addCase(checkDevice.rejected, (state) => {
        state.isMonitoring = false;
      });
  }
});

// Export des actions avec destructuration atomique
export const {
  devicePlugged,
  deviceUnplugged,
  startMonitoring,
  stopMonitoring,
  updateDeviceInfo
} = deviceSlice.actions;

// Export du reducer avec destructuration atomique
export const deviceReducer = deviceSlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectDeviceState = (state: { device: DeviceState }) => state.device;
export const selectIsDevicePlugged = (state: { device: DeviceState }) => state.device.isPlugged;
export const selectIsMonitoring = (state: { device: DeviceState }) => state.device.isMonitoring;
export const selectDeviceInfo = (state: { device: DeviceState }) => state.device.deviceInfo; 