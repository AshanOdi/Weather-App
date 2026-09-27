import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiDayRain,
  WiNightAltRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

// OpenWeather icon codes: https://openweathermap.org/weather-conditions
const ICONS = {
  "01d": WiDaySunny,
  "01n": WiNightClear,
  "02d": WiDayCloudy,
  "02n": WiNightAltCloudy,
  "03": WiCloud,
  "04": WiCloudy,
  "09": WiShowers,
  "10d": WiDayRain,
  "10n": WiNightAltRain,
  "11": WiThunderstorm,
  "13": WiSnow,
  "50": WiFog,
};

export function getWeatherIcon(code = "01d") {
  return ICONS[code] || ICONS[code.slice(0, 2)] || WiDaySunny;
}

export function isDaytime(weather) {
  const { dt, sys } = weather;
  return dt >= sys.sunrise && dt < sys.sunset;
}

// Full class strings so Tailwind can detect them at build time
const THEMES = {
  clearDay: "from-sky-400 via-blue-500 to-indigo-700",
  clearNight: "from-slate-900 via-indigo-950 to-slate-950",
  cloudsDay: "from-slate-400 via-slate-500 to-slate-700",
  cloudsNight: "from-slate-800 via-slate-900 to-gray-950",
  rain: "from-slate-600 via-blue-900 to-slate-900",
  thunder: "from-gray-800 via-purple-950 to-black",
  snow: "from-slate-400 via-sky-700 to-slate-800",
  mist: "from-stone-500 via-slate-600 to-slate-800",
};

export function getTheme(weather) {
  if (!weather) return THEMES.clearNight;
  const main = weather.weather[0].main;
  const day = isDaytime(weather);

  switch (main) {
    case "Clear":
      return day ? THEMES.clearDay : THEMES.clearNight;
    case "Clouds":
      return day ? THEMES.cloudsDay : THEMES.cloudsNight;
    case "Rain":
    case "Drizzle":
      return THEMES.rain;
    case "Thunderstorm":
      return THEMES.thunder;
    case "Snow":
      return THEMES.snow;
    default:
      return THEMES.mist;
  }
}

// OpenWeather AQI index is 1 (good) to 5 (very poor)
export const AQI_LEVELS = {
  1: { label: "Good", color: "bg-emerald-400", advice: "Air quality is great. Enjoy outdoor activities." },
  2: { label: "Fair", color: "bg-lime-400", advice: "Acceptable air. Unusually sensitive people should take care." },
  3: { label: "Moderate", color: "bg-amber-400", advice: "Sensitive groups should reduce long outdoor exertion." },
  4: { label: "Poor", color: "bg-orange-500", advice: "Limit time outdoors, especially if you have breathing issues." },
  5: { label: "Very poor", color: "bg-red-500", advice: "Avoid outdoor activity. Consider wearing a mask." },
};
