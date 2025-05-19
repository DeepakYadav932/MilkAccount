import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LayoutPage } from "./pages/layout/layout.tsx";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { SnackBar } from "./components/snackbar/snackbar.tsx";
import "../src/i18n/i18n.ts"; // import once at app entry
// import LanguageSwitcher from "./components/language-switcher/language-switcher.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <LanguageSwitcher /> */}
      <LayoutPage />
      <SnackBar />
    </Provider>
  </StrictMode>
);
