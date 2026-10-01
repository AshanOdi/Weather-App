import { MdOutlineAir } from "react-icons/md";
import GlassCard from "../ui/GlassCard";
import { AQI_LEVELS } from "../../utils/weatherTheme";

const POLLUTANTS = [
  { key: "pm2_5", label: "PM2.5" },
  { key: "pm10", label: "PM10" },
  { key: "o3", label: "O₃" },
  { key: "no2", label: "NO₂" },
];

export default function AirQualityCard({ air }) {
  const reading = air?.list?.[0];

  if (!reading) {
    return (
      <GlassCard id="air-quality" title="Air quality" icon={MdOutlineAir} delay={0.3}>
        <p className="text-sm text-white/60">Air quality data unavailable.</p>
      </GlassCard>
    );
  }

  const aqi = reading.main.aqi;
  const level = AQI_LEVELS[aqi];

  return (
    <GlassCard id="air-quality" title="Air quality" icon={MdOutlineAir} delay={0.3}>
      <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${level.color}`} />
        <p className="text-2xl font-semibold">{level.label}</p>
        <span className="text-sm text-white/60">AQI {aqi}/5</span>
      </div>

      {/* 1-5 scale with the current level highlighted */}
      <div className="mt-3 flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${
              n <= aqi ? AQI_LEVELS[n].color : "bg-white/15"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-white/70">{level.advice}</p>

      <dl className="mt-3 grid grid-cols-4 gap-2 text-center">
        {POLLUTANTS.map(({ key, label }) => (
          <div key={key} className="rounded-xl bg-white/10 py-1.5">
            <dt className="text-[10px] text-white/60">{label}</dt>
            <dd className="text-sm font-semibold">
              {Math.round(reading.components[key])}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-1 text-right text-[10px] text-white/50">μg/m³</p>
    </GlassCard>
  );
}
