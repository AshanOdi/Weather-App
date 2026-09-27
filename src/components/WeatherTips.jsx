import { motion } from "motion/react";
import {
  FiAlertTriangle,
  FiCloudDrizzle,
  FiLayers,
  FiSmile,
  FiSun,
  FiThermometer,
  FiUmbrella,
  FiWind,
  FiZap,
} from "react-icons/fi";
import { MdOutlineAir } from "react-icons/md";
import GlassCard from "./ui/GlassCard";
import { getWeatherTips } from "../utils/tips";

const ICONS = {
  rain: FiUmbrella,
  storm: FiZap,
  cold: FiThermometer,
  hot: FiThermometer,
  sun: FiSun,
  wind: FiWind,
  fog: FiCloudDrizzle,
  air: MdOutlineAir,
  layers: FiLayers,
  good: FiSmile,
};

export default function WeatherTips(props) {
  const tips = getWeatherTips(props);

  return (
    <GlassCard title="Today's tips" icon={FiAlertTriangle} delay={0.1}>
      <ul className="space-y-2">
        {tips.map((tip, i) => {
          const Icon = ICONS[tip.type];
          return (
            <motion.li
              key={tip.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 text-sm"
            >
              <span className="rounded-full bg-white/15 p-2">
                <Icon />
              </span>
              <span className="pt-1">{tip.text}</span>
            </motion.li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
