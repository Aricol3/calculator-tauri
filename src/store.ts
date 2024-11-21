import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import settingsReducer from "./slices/settingsSlice.ts"

const rootReducer = combineReducers({
  settings: settingsReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
  // middleware: [thunkMiddleware]
});

export type IRootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;

export default store;
