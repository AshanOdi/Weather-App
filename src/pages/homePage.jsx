import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "../components/dashboard";
import LogoutButton from "../components/logoutButton";

export default function HomePage() {
  const { logout, user } = useAuth0();
  console.log(user);

  return (
    <div>
      <header className="w-full h-[100px]   max-w-6xl flex flex-row justify-center gap-20 items-center mb-4">
        <h2 className="text-xl font-semibold">Welcome, {user?.nickname}</h2>

        {/* <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button> */}
        <LogoutButton />
      </header>

      <main className=" bg-green-500flex-1 w-full flex justify-center items-center"></main>

      <Dashboard />
    </div>
  );
}
