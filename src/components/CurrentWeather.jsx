import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiRefreshCw, FiStar } from "react-icons/fi";
import { useSettings } from "../context/SettingsContext";
import { formatTemp } from "../utils/units";
import { formatFullDate, formatTime, timeAgo } from "../utils/time";
import { getWeatherIcon } from "../utils/weatherTheme";

// Ticks every 30 seconds so the local clock and "updated" label stay fresh
function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

export default function CurrentWeather({
  current,
  today,
  isSaved,
  onToggleSave,
  onRefresh,
  loading,
  updatedAt,
}) {
  const { units } = useSettings();
  const now = Math.floor(useNow() / 1000);
  const Icon = getWeatherIcon(current.weather[0].icon);
  const high = Math.max(today?.max ?? -Infinity, current.main.temp_max);
  const low = Math.min(today?.min ?? Infinity, current.main.temp_min);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {current.name}
            <span className="ml-2 align-middle text-sm font-medium text-white/60">
              {current.sys.country}
            </span>
          </h2>
          <p className="mt-1 text-sm text-white/70">
            {formatFullDate(now, current.timezone)} ·{" "}
            {formatTime(now, current.timezone)} local time
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onToggleSave}
            title={isSaved ? "Remove from saved cities" : "Save city"}
            aria-label={isSaved ? "Remove from saved cities" : "Save city"}
            className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
          >
            <FiStar className={isSaved ? "fill-amber-300 text-amber-300" : ""} />
          </button>
          <button
            onClick={onRefresh}
            title="Refresh"
            aria-label="Refresh weather"
            className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-6xl font-light tracking-tighter sm:text-8xl">
            {formatTemp(current.main.temp, units)}
          </p>
          <p className="mt-1 text-lg font-medium capitalize">
            {current.weather[0].description}
          </p>
          <p className="mt-1 text-sm text-white/70">
            Feels like {formatTemp(current.main.feels_like, units)} · H:
            {formatTemp(high, units)} L:{formatTemp(low, units)}
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="h-24 w-24 drop-shadow-2xl sm:h-40 sm:w-40" />
        </motion.div>
      </div>

      {updatedAt && (
        <p className="mt-4 text-xs text-white/50">
          Updated {timeAgo(updatedAt)}
        </p>
      )}
    </motion.section>
  );
}
