import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist specific reducers from being persisted
  // blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  
const persistor = persistStore(store);

export { store, persistor };
