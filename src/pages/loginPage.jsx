import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { FiClock, FiMapPin, FiStar, FiWind } from "react-icons/fi";
import WeatherBackground from "../components/ui/WeatherBackground";
import { APP_NAME, LOGO_SRC } from "../components/ui/Brand";

const FEATURES = [
  { icon: FiClock, text: "Hourly & 5-day forecasts" },
  { icon: FiWind, text: "Wind, air quality & sun times" },
  { icon: FiMapPin, text: "Search any city or use your location" },
  { icon: FiStar, text: "Save your favourite places" },
];

export default function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Already signed in, go straight to the dashboard
  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between px-4 py-8">
      <WeatherBackground theme="from-sky-400 via-blue-600 to-indigo-900" />

      <div />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass w-full max-w-md rounded-3xl p-8 text-center"
      >
        <motion.img
          src={LOGO_SRC}
          alt=""
          className="mx-auto h-20 w-auto drop-shadow-xl sm:h-24"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <h1 className="mt-4 font-sinhala text-4xl font-bold sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mt-3 text-lg font-semibold">Your Weather, Your Way</p>
        <p className="mt-1 text-sm text-white/70">
          Accurate, live weather for every city you care about.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-2 text-left text-xs">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <li key={feature.text} className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5">
                <Icon className="shrink-0 text-base" />
                {feature.text}
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => loginWithRedirect()}
          className="mt-8 w-full rounded-full bg-white py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-white/90 active:scale-100"
        >
          Log In
        </button>
      </motion.div>

      <p className="mt-6 text-xs text-white/60 sm:text-sm">
        © {new Date().getFullYear()} <span className="font-sinhala">{APP_NAME}</span>
      </p>
    </div>
  );
}
