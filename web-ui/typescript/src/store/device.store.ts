import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { FsDeviceInfos, DeviceState, DeviceContext } from '../../@types/device';
import { DevicePackInfos } from '../../@types/pack';
import { 
  fetchDeviceInfos, 
  addFromLibrary,
} from '../services/device';

// Thunks
export const checkDevice = createAsyncThunk(
  'device/check',
  async (_, { rejectWithValue }) => {
    try {
      const metadata = await fetchDeviceInfos();
      if (metadata?.plugged) {
        return metadata;
      }
      return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      return rejectWithValue('Failed to check device');
    }
  }
);

export const addPackFromLibrary = createAsyncThunk(
  'device/addFromLibrary',
  async ({uuid, path, format, driver, context}: {
    uuid: string;
    path: string;
    format: string;
    driver: string;
    context: DeviceContext;
  }, { rejectWithValue }) => {
    try {
      const response = await addFromLibrary(uuid, path);
      return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return rejectWithValue('Failed to add pack from library');
    }
  }
);


const initialState: DeviceState = {
  metadata: null,
  packs: [],
  status: 'idle',
  error: null
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    devicePlugged(state, action: PayloadAction<FsDeviceInfos>) {
      state.metadata = action.payload;
      state.status = 'succeeded';
    },
    deviceUnplugged(state) {
      state.metadata = null;
      state.packs = [];
      state.status = 'idle';
    },
    setDevicePacks(state, action: PayloadAction<DevicePackInfos[]>) {
      state.packs = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkDevice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkDevice.fulfilled, (state, action) => {
        if (action.payload) {
          state.metadata = action.payload;
          state.status = 'succeeded';
        } else {
          state.status = 'idle'; 
        }
      })
      .addCase(checkDevice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        toast.error('Failed to check device');
      });
  }
});

export const { devicePlugged, deviceUnplugged, setDevicePacks } = deviceSlice.actions;
export default deviceSlice.reducer;