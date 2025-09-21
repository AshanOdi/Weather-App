import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButtonn;
