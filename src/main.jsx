import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { SettingsProvider } from "./context/SettingsContext";
import "./index.css";

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH_CLIENT_ID;

// Show a clear message instead of redirecting to https://undefined
const missingEnv = Object.entries({
  VITE_REACT_APP_AUTH0_DOMAIN: domain,
  VITE_REACT_APP_AUTH_CLIENT_ID: clientId,
  VITE_REACT_APP_AUTH_OPEN_WEATHER_API: import.meta.env.VITE_REACT_APP_AUTH_OPEN_WEATHER_API,
})
  .filter(([, value]) => !value)
  .map(([name]) => name);

const root = ReactDOM.createRoot(document.getElementById("root"));

if (missingEnv.length) {
  root.render(
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-lg rounded-2xl border border-red-400/40 bg-red-500/10 p-6">
        <h1 className="text-lg font-semibold">Missing environment variables</h1>
        <p className="mt-2 text-sm text-white/70">
          Copy <code>.env.example</code> to <code>.env</code>, add these values
          and restart the dev server:
        </p>
        <ul className="mt-3 list-disc pl-5 font-mono text-sm">
          {missingEnv.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} else {
  root.render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </Auth0Provider>
  );
}
