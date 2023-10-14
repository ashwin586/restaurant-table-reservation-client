import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { userAuthSlice } from "./slice/userSlice";
import { adminAuthSlice } from "./slice/adminSlice";

const userPersistConfig = { key: "userAuth", storage, version: 1 };
const adminPersistConfig = { key: "adminAuth", storage, version: 1 };

const userPersistConfigReducer = persistReducer(
  userPersistConfig,
  userAuthSlice.reducer
);

const adminPersistConfigReducer = persistReducer(
  adminPersistConfig,
  adminAuthSlice.reducer
);

export const store = configureStore({
  reducer: {
    user: userPersistConfigReducer,
    admin: adminPersistConfigReducer,
  },

  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middleware;
  },
});

export const persistor = persistStore(store);
