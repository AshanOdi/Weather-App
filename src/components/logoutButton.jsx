import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

export default function LoginButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button
        onClick={() => logout()}
        className="p-5 border rounded rounded-40 shadow-lg bg-blue-500 text-white"
      >
        Sign Out
      </button>
    )
  );
}
