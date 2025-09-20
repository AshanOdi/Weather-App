import Dashboard from "../components/dashboard";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-fixed  bg-cover  bg-[url('/back.jpg')]  flex flex-row justify-center items-center">
      <Dashboard />
    </div>
  );
}
