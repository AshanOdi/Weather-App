import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "../components/dashboard";
import LogoutButton from "../components/logoutButton";

export default function HomePage() {
  const { logout, user } = useAuth0();
  console.log(user);

  return (
    <div>
      <header className="w-full h-[100px]   max-w-6xl flex flex-row justify-center gap-10 items-center mb-4">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Welcome, {user?.nickname}
        </h2>
        <LogoutButton />
      </header>

      <main className=" bg-green-500flex-1 w-full flex justify-center items-center"></main>

      <Dashboard />
    </div>
  );
}
