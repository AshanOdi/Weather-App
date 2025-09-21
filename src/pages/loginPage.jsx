import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-full bg-yellow-500 min-h-screen bg-fixed   bg-cover  bg-[url('/back.jpg')]  flex flex-col justify-center items-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => loginWithRedirect()}
      >
        Log Innnnnnn
      </button>
    </div>
  );
}
