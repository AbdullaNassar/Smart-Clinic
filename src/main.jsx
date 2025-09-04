import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";

import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./shared/components/ui/ErrorFallback.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./shared/utils/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
