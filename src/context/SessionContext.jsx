import { createContext, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorage from "../hooks/useLocalStorage";

const SessionContext = createContext(null);

const GUEST_USER = { given_name: "Guest" };

// Combines a real Auth0 login with an optional guest mode, so the rest of
// the app only has to ask one question: "is someone signed in?"
export function SessionProvider({ children }) {
  const auth0 = useAuth0();
  const [isGuest, setIsGuest] = useLocalStorage("guest_mode", false);

  // A real login always wins over guest mode
  useEffect(() => {
    if (auth0.isAuthenticated && isGuest) setIsGuest(false);
  }, [auth0.isAuthenticated, isGuest, setIsGuest]);

  const value = {
    isLoading: auth0.isLoading,
    isAuthenticated: auth0.isAuthenticated || isGuest,
    isGuest: isGuest && !auth0.isAuthenticated,
    user: auth0.isAuthenticated ? auth0.user : GUEST_USER,
    startGuest: () => setIsGuest(true),
    signIn: () => auth0.loginWithRedirect(),
    signOut: () => {
      if (isGuest && !auth0.isAuthenticated) {
        // nothing to end at Auth0, ProtectedRoute redirects to /login
        setIsGuest(false);
        return;
      }
      auth0.logout({
        logoutParams: { returnTo: window.location.origin + "/login" },
      });
    },
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession() {
  return useContext(SessionContext);
}
