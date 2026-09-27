import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiSunrise } from "react-icons/wi";
import GlassCard from "../ui/GlassCard";
import { formatDuration, formatTime } from "../../utils/time";

const R = 80;
const CX = 100;
const BASE = 90;

export default function SunCard({ sys, timezone }) {
  const now = Date.now() / 1000;
  const { sunrise, sunset } = sys;
  const progress = Math.min(Math.max((now - sunrise) / (sunset - sunrise), 0), 1);
  const isDay = now >= sunrise && now < sunset;

  // position of the sun along the semicircle
  const angle = Math.PI * (1 - progress);
  const sunX = CX + R * Math.cos(angle);
  const sunY = BASE - R * Math.sin(angle);
  const arc = `M ${CX - R},${BASE} A ${R},${R} 0 0 1 ${CX + R},${BASE}`;

  return (
    <GlassCard title="Sun" icon={WiSunrise} delay={0.25}>
      <svg viewBox="0 0 200 100" className="w-full" aria-hidden="true">
        <path d={arc} fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" />
        {/* travelled part of the arc */}
        <path
          d={arc}
          fill="none"
          stroke="#fcd34d"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray={`${progress} 1`}
        />
        <line x1="10" x2="190" y1={BASE} y2={BASE} stroke="white" strokeOpacity="0.2" />
        {isDay && (
          <>
            <circle cx={sunX} cy={sunY} r="12" fill="#fcd34d" opacity="0.25" />
            <circle cx={sunX} cy={sunY} r="7" fill="#fcd34d" />
          </>
        )}
      </svg>

      <div className="mt-2 flex justify-between text-sm">
        <div>
          <p className="flex items-center gap-1 text-xs text-white/60">
            <FiSunrise /> Sunrise
          </p>
          <p className="font-semibold">{formatTime(sunrise, timezone)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-white/60">Daylight</p>
          <p className="font-semibold">{formatDuration(sunset - sunrise)}</p>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1 text-xs text-white/60">
            <FiSunset /> Sunset
          </p>
          <p className="font-semibold">{formatTime(sunset, timezone)}</p>
        </div>
      </div>
    </GlassCard>
  );
}
