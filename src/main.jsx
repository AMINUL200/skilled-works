import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CountryProvider } from "./context/CountryContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CountryProvider>
      <App />
    </CountryProvider>
  </AuthProvider>,
);
