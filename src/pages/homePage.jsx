import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "../components/dashboard";

export default function HomePage() {
  const { logout, user } = useAuth0();

  return (
    <div className="w-full bg-yellow-500 min-h-screen bg-fixed   bg-cover  bg-[url('/back.jpg')]  flex flex-col justify-center items-center">
      <header className="w-full h-[100px]   max-w-6xl flex flex-row justify-center gap-20 items-center mb-4">
        <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </header>

      <main className=" bg-green-500flex-1 w-full flex justify-center items-center"></main>

      <Dashboard />
    </div>
  );
}
