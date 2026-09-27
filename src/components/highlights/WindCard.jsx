import { motion } from "motion/react";
import { FiWind } from "react-icons/fi";
import GlassCard from "../ui/GlassCard";
import { useSettings } from "../../context/SettingsContext";
import { formatWind, windDescription, windDirection } from "../../utils/units";

export default function WindCard({ wind }) {
  const { units } = useSettings();
  const speed = formatWind(wind.speed, units);
  const gust = wind.gust ? formatWind(wind.gust, units) : null;

  return (
    <GlassCard title="Wind" icon={FiWind} delay={0.2}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold">
            {speed.value}
            <span className="ml-1 text-base font-normal text-white/60">{speed.unit}</span>
          </p>
          <p className="mt-1 text-sm text-white/70">{windDescription(wind.speed)}</p>
          <p className="mt-2 text-xs text-white/60">
            From {windDirection(wind.deg)} ({wind.deg}°)
            {gust && ` · Gusts ${gust.value} ${gust.unit}`}
          </p>
        </div>

        {/* Compass: the arrow points where the wind is blowing to */}
        <div className="relative h-24 w-24 shrink-0 rounded-full border border-white/20">
          {["N", "E", "S", "W"].map((d, i) => (
            <span
              key={d}
              className="absolute text-[10px] font-semibold text-white/60"
              style={{
                top: ["4px", "50%", "auto", "50%"][i],
                bottom: i === 2 ? "4px" : "auto",
                left: ["50%", "auto", "50%", "6px"][i],
                right: i === 1 ? "6px" : "auto",
                transform: i % 2 === 0 ? "translateX(-50%)" : "translateY(-50%)",
              }}
            >
              {d}
            </span>
          ))}
          <motion.svg
            viewBox="0 0 24 24"
            className="absolute inset-0 m-auto h-14 w-14"
            initial={{ rotate: 0 }}
            animate={{ rotate: wind.deg + 180 }}
            transition={{ type: "spring", stiffness: 40, damping: 12 }}
          >
            <path d="M12 2 L16 12 L12 10 L8 12 Z" fill="white" />
            <path d="M12 10 L12 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </motion.svg>
        </div>
      </div>
    </GlassCard>
  );
}
