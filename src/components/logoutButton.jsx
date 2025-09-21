import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    // isAuthenticated && (
    <button
      className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300"
      onClick={() => logout()}
    >
      Sign Out
    </button>
    // )
  );
};

export default LogoutButton;
