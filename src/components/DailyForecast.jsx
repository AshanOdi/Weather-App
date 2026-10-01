import { FiCalendar, FiDroplet } from "react-icons/fi";
import GlassCard from "./ui/GlassCard";
import { useSettings } from "../context/SettingsContext";
import { formatTemp } from "../utils/units";
import { formatWeekday } from "../utils/time";
import { getWeatherIcon } from "../utils/weatherTheme";

export default function DailyForecast({ daily, timezone }) {
  const { units } = useSettings();

  // Bars are positioned against the whole week's range, like iOS weather
  const weekMin = Math.min(...daily.map((d) => d.min));
  const weekMax = Math.max(...daily.map((d) => d.max));
  const span = weekMax - weekMin || 1;

  return (
    <GlassCard id="forecast" title="5-day forecast" icon={FiCalendar} delay={0.15}>
      <ul className="divide-y divide-white/10">
        {daily.map((day, i) => {
          const Icon = getWeatherIcon(day.icon);
          const left = ((day.min - weekMin) / span) * 100;
          const width = Math.max(((day.max - day.min) / span) * 100, 4);

          return (
            <li
              key={day.dt}
              className="grid grid-cols-[3.5rem_2.5rem_3rem_2.5rem_1fr_2.5rem] items-center gap-2 py-2.5 text-sm"
              title={day.description}
            >
              <span className="font-medium">
                {i === 0 ? "Today" : formatWeekday(day.dt, timezone)}
              </span>
              <Icon className="h-8 w-8" />
              <span className="flex items-center gap-0.5 text-xs text-sky-200">
                {day.pop >= 0.1 && (
                  <>
                    <FiDroplet className="h-3 w-3" />
                    {Math.round(day.pop * 100)}%
                  </>
                )}
              </span>
              <span className="text-right text-white/60">
                {formatTemp(day.min, units)}
              </span>
              <div className="relative h-1.5 rounded-full bg-white/15">
                <div
                  className="absolute h-full rounded-full bg-linear-to-r from-sky-300 via-amber-200 to-orange-400"
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </div>
              <span className="font-semibold">{formatTemp(day.max, units)}</span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
