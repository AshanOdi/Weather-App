// export default function LoginButton() {
//   const { loginWithRedirect, isAuthenticated } = useAuth0();

//   return (
//     !isAuthenticated && (
//       <button
//         onClick={() => {
//           console.log("Login button clicked");
//           loginWithRedirect();
//         }}
//         className="p-5 border rounded rounded-40 shadow-lg bg-blue-500 text-white"
//       >
//         Sign In
//       </button>
//     )
//   );
// }

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonn = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButtonn;
