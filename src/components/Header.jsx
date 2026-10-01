import { useAuth0 } from "@auth0/auth0-react";
import { useSettings } from "../context/SettingsContext";
import LogoutButton from "./logoutButton";
import SearchBar from "./SearchBar";
import Brand from "./ui/Brand";

export default function Header({ onSelectLocation }) {
  const { user } = useAuth0();
  const { units, toggleUnits } = useSettings();

  return (
    <header className="relative z-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1>
        <Brand />
      </h1>

      <SearchBar onSelect={onSelectLocation} />

      <div className="flex items-center gap-2 self-end md:self-auto">
        {/* °C / °F segmented toggle */}
        <button
          onClick={toggleUnits}
          aria-label="Toggle temperature units"
          className="glass flex rounded-full p-1 text-sm font-medium"
        >
          {["metric", "imperial"].map((u) => (
            <span
              key={u}
              className={`rounded-full px-3 py-1 transition ${
                units === u ? "bg-white text-slate-900" : "text-white/70"
              }`}
            >
              {u === "metric" ? "°C" : "°F"}
            </span>
          ))}
        </button>

        <div className="glass flex items-center gap-1 rounded-full p-1">
          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <div className="hidden px-1 leading-tight lg:block">
            <p className="text-[10px] text-white/60">Welcome back</p>
            <p className="text-sm font-semibold">
              {user?.given_name || user?.nickname || "Explorer"}
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
