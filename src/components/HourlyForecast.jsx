import { useEffect, useRef, useState } from "react";
import { FiClock, FiDroplet } from "react-icons/fi";
import GlassCard from "./ui/GlassCard";
import { useSettings } from "../context/SettingsContext";
import { convertTemp, formatTemp, formatWind } from "../utils/units";
import { formatHour } from "../utils/time";
import { getWeatherIcon } from "../utils/weatherTheme";

const MIN_COL_WIDTH = 72;
const CHART_HEIGHT = 70;
const PAD = 12;

// Smooth curve through points using cubic bezier segments
function smoothPath(points) {
  return points.reduce((path, [x, y], i) => {
    if (i === 0) return `M ${x},${y}`;
    const [px, py] = points[i - 1];
    const cx = (px + x) / 2;
    return `${path} C ${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
}

export default function HourlyForecast({ hourly, timezone }) {
  const { units } = useSettings();
  const [hovered, setHovered] = useState(null);
  const scrollerRef = useRef(null);
  const [available, setAvailable] = useState(0);

  // Stretch columns to fill the card, scroll horizontally on small screens
  useEffect(() => {
    const el = scrollerRef.current;
    const observer = new ResizeObserver(() => setAvailable(el.clientWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const temps = hourly.map((h) => convertTemp(h.temp, units));
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;
  const colWidth = Math.max(MIN_COL_WIDTH, available / hourly.length);
  const width = hourly.length * colWidth;

  const points = temps.map((t, i) => [
    i * colWidth + colWidth / 2,
    PAD + (1 - (t - min) / range) * (CHART_HEIGHT - PAD * 2),
  ]);
  const line = smoothPath(points);
  const area = `${line} L ${points.at(-1)[0]},${CHART_HEIGHT} L ${points[0][0]},${CHART_HEIGHT} Z`;
  const active = hovered !== null ? hourly[hovered] : null;

  return (
    <GlassCard id="hourly" title="Next 24 hours" icon={FiClock} delay={0.1}>
      <div ref={scrollerRef} className="scrollbar-none overflow-x-auto">
        <div
          className="relative"
          style={{ width }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg
            width={width}
            height={CHART_HEIGHT}
            className="block overflow-visible"
            role="img"
            aria-label={`Temperature over the next 24 hours, from ${formatTemp(
              Math.min(...hourly.map((h) => h.temp)),
              units
            )} to ${formatTemp(Math.max(...hourly.map((h) => h.temp)), units)}`}
          >
            <defs>
              <linearGradient id="tempArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#tempArea)" />
            <path d={line} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />

            {hovered !== null && (
              <line
                x1={points[hovered][0]}
                x2={points[hovered][0]}
                y1={0}
                y2={CHART_HEIGHT}
                stroke="white"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
              />
            )}
            {points.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={hovered === i ? 5 : 3}
                fill="white"
                stroke="rgb(15 23 42 / 0.4)"
                strokeWidth="2"
              />
            ))}
          </svg>

          {/* Tooltip for the hovered hour */}
          {active && (
            <div
              className="pointer-events-none absolute top-0 z-10 w-40 rounded-xl border border-white/15 bg-slate-900/90 px-3 py-2 text-xs shadow-xl backdrop-blur"
              style={{
                // sit beside the crosshair, flipping to the left near the edge
                left:
                  points[hovered][0] + 172 > width
                    ? points[hovered][0] - 172
                    : points[hovered][0] + 12,
              }}
            >
              <p className="font-semibold">
                {formatHour(active.dt, timezone)} · {formatTemp(active.temp, units)}
              </p>
              <p className="capitalize text-white/70">{active.description}</p>
              <p className="text-white/70">
                Rain {Math.round(active.pop * 100)}% · Wind{" "}
                {formatWind(active.wind, units).value} {formatWind(active.wind, units).unit}
              </p>
            </div>
          )}

          <ul className="flex">
            {hourly.map((hour, i) => {
              const Icon = getWeatherIcon(hour.icon);
              return (
                <li
                  key={hour.dt}
                  onMouseEnter={() => setHovered(i)}
                  className={`flex flex-col items-center gap-1 rounded-2xl py-2 transition ${
                    hovered === i ? "bg-white/10" : ""
                  }`}
                  style={{ width: colWidth }}
                >
                  <span className="text-xs text-white/60">
                    {i === 0 ? "Now" : formatHour(hour.dt, timezone)}
                  </span>
                  <Icon className="h-9 w-9" />
                  <span className="text-sm font-semibold">
                    {formatTemp(hour.temp, units)}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 text-[11px] text-sky-200 ${
                      hour.pop < 0.1 ? "invisible" : ""
                    }`}
                  >
                    <FiDroplet className="h-3 w-3" />
                    {Math.round(hour.pop * 100)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}
