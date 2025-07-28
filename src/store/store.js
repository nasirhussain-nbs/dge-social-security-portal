import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import applicationReducer from "./slices/applicationSlice";
import uiReducer from "./slices/uiSlice";

const applicationPersistConfig = {
  key: "application",
  storage,
  whitelist: ["formData", "currentStep", "lastSaved"],
};

const persistedApplicationReducer = persistReducer(
  applicationPersistConfig,
  applicationReducer,
);

const rootReducer = combineReducers({
  application: persistedApplicationReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
