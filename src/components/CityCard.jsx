import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useSettings } from "../context/SettingsContext";
import { getCurrentWeather } from "../services/weatherApi";
import { formatTemp } from "../utils/units";
import { formatTime } from "../utils/time";
import { getTheme, getWeatherIcon } from "../utils/weatherTheme";

const REFRESH_INTERVAL = 5 * 60 * 1000;

// Compact card for a saved city. Uses the same cached request as the
// main view, so selecting a city doesn't trigger an extra API call.
export default function CityCard({ location, selected, onSelect, onRemove }) {
  const { units } = useSettings();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getCurrentWeather(location);
        if (!ignore) {
          setWeather(data);
          setError(false);
        }
      } catch {
        if (!ignore) setError(true);
      }
    }

    load();
    const timer = setInterval(load, REFRESH_INTERVAL);
    return () => {
      ignore = true;
      clearInterval(timer);
    };
  }, [location]);

  if (error)
    return (
      <div className="glass rounded-2xl p-4 text-sm text-white/60">
        Couldn't load {location.name}
      </div>
    );

  if (!weather)
    return <div className="h-[92px] animate-pulse rounded-2xl bg-white/10" />;

  const Icon = getWeatherIcon(weather.weather[0].icon);

  return (
    <div className="group relative">
      <button
        onClick={onSelect}
        className={`relative w-full overflow-hidden rounded-2xl bg-linear-to-br p-4 text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ${getTheme(
          weather
        )} ${selected ? "ring-2 ring-white" : "ring-1 ring-white/15"}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">{weather.name}</p>
            <p className="text-xs text-white/70">
              {formatTime(Math.floor(Date.now() / 1000), weather.timezone)}
            </p>
          </div>
          <p className="text-3xl font-light">{formatTemp(weather.main.temp, units)}</p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-white/80">
          <span className="flex items-center gap-1 capitalize">
            <Icon className="h-6 w-6" />
            {weather.weather[0].description}
          </span>
          <span>
            H:{formatTemp(weather.main.temp_max, units)} L:
            {formatTemp(weather.main.temp_min, units)}
          </span>
        </div>
      </button>

      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${weather.name}`}
          className="absolute -right-1.5 -top-1.5 rounded-full sm:hidden sm:group-hover:block bg-slate-900 p-1 text-xs text-white/80 shadow ring-1 ring-white/20 hover:bg-red-500 group-hover:block"
        >
          <FiX />
        </button>
      )}
    </div>
  );
}
