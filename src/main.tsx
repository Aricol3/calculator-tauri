import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import store from "./store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <App />
          </NextThemesProvider>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
