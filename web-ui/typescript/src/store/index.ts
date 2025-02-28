// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './device.store';
import libraryReducer from './library.store';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    library: libraryReducer,

    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Pour gérer les données binaires
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;