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
import { partnerAuthSlice } from "./slice/partnerSlice";

const userPersistConfig = { key: "userAuth", storage, version: 1 };
const adminPersistConfig = { key: "adminAuth", storage, version: 1 };
const partnerPersistConfig = {key: "partnerAuth", storage, version:1};

const userPersistConfigReducer = persistReducer(
  userPersistConfig,
  userAuthSlice.reducer
);

const adminPersistConfigReducer = persistReducer(
  adminPersistConfig,
  adminAuthSlice.reducer
);

const partnerPersistConfigReducer = persistReducer(
  partnerPersistConfig,
  partnerAuthSlice.reducer
)

export const store = configureStore({
  reducer: {
    user: userPersistConfigReducer,
    admin: adminPersistConfigReducer,
    partner: partnerPersistConfigReducer
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
