import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="w-full bg-yellow-500 min-h-screen bg-fixed   bg-cover  bg-[url('/back.jpg')]  flex flex-col justify-center items-center">
      {!isAuthenticated ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
