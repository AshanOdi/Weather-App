import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between bg-[url('/back.jpg')] bg-cover bg-center px-4 py-8">
      {/* Logo Section */}
      <div className="flex flex-col items-center text-center mt-6">
        <img
          src="/new1.png"
          alt="App Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 mb-4 drop-shadow-xl hover:scale-105 transition-transform duration-500"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
          Your Weather, Your Way
        </h1>
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center mt-12 sm:mt-20">
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 text-base sm:text-lg"
        >
          Log In
        </button>
      </div>

      {/* Footer text */}
      <p className="text-white text-xs sm:text-sm opacity-75 mt-6">
        © 2025 Weather App
      </p>
    </div>
  );
}
