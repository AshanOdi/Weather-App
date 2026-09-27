import { FiCloud, FiDroplet, FiEye, FiThermometer, FiUmbrella } from "react-icons/fi";
import { WiBarometer } from "react-icons/wi";
import StatCard from "./StatCard";
import { useSettings } from "../../context/SettingsContext";
import {
  dewPoint,
  formatPrecip,
  formatTemp,
  formatVisibility,
} from "../../utils/units";

function feelsLikeCaption(temp, feels) {
  const diff = feels - temp;
  if (Math.abs(diff) < 1.5) return "Similar to the actual temperature.";
  if (diff > 0) return "Humidity is making it feel warmer.";
  return "Wind is making it feel colder.";
}

function pressureCaption(hpa) {
  if (hpa < 1000) return "Low pressure, unsettled weather likely.";
  if (hpa > 1022) return "High pressure, usually calm and settled.";
  return "Normal atmospheric pressure.";
}

function visibilityCaption(m) {
  if (m >= 10000) return "Perfectly clear view.";
  if (m >= 5000) return "Good visibility.";
  if (m >= 1000) return "Haze is reducing visibility.";
  return "Very poor visibility, take care on the roads.";
}

export default function Highlights({ current, hourly }) {
  const { units } = useSettings();
  const { main, clouds, visibility = 10000 } = current;

  const dew = dewPoint(main.temp, main.humidity);
  const vis = formatVisibility(visibility, units);
  const lastHour = (current.rain?.["1h"] ?? 0) + (current.snow?.["1h"] ?? 0);
  const next24 = formatPrecip(
    hourly.reduce((sum, h) => sum + (h.precip ?? 0), 0),
    units
  );
  const precip = formatPrecip(lastHour, units);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <StatCard
        title="Feels like"
        icon={FiThermometer}
        value={formatTemp(main.feels_like, units)}
        caption={feelsLikeCaption(main.temp, main.feels_like)}
        delay={0.2}
      />
      <StatCard
        title="Humidity"
        icon={FiDroplet}
        value={main.humidity}
        unit="%"
        meter={main.humidity}
        caption={`Dew point is ${formatTemp(dew, units)} right now.`}
        delay={0.25}
      />
      <StatCard
        title="Precipitation"
        icon={FiUmbrella}
        value={precip.value}
        unit={precip.unit}
        caption={`In the last hour. ${next24.value} ${next24.unit} expected in the next 24h.`}
        delay={0.3}
      />
      <StatCard
        title="Pressure"
        icon={WiBarometer}
        value={main.pressure}
        unit="hPa"
        caption={pressureCaption(main.pressure)}
        delay={0.35}
      />
      <StatCard
        title="Visibility"
        icon={FiEye}
        value={vis.value}
        unit={vis.unit}
        caption={visibilityCaption(visibility)}
        delay={0.4}
      />
      <StatCard
        title="Cloud cover"
        icon={FiCloud}
        value={clouds.all}
        unit="%"
        meter={clouds.all}
        caption={clouds.all > 80 ? "Overcast skies." : clouds.all > 30 ? "Partly cloudy." : "Mostly clear skies."}
        delay={0.45}
      />
    </div>
  );
}
