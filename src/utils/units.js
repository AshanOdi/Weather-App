// All API data is fetched in metric; conversion happens only for display.

export function formatTemp(celsius, units) {
  const value = units === "imperial" ? celsius * 1.8 + 32 : celsius;
  return `${Math.round(value)}°`;
}

export function convertTemp(celsius, units) {
  return units === "imperial" ? celsius * 1.8 + 32 : celsius;
}

// API wind speed is m/s
export function formatWind(ms, units) {
  if (units === "imperial") return { value: Math.round(ms * 2.237), unit: "mph" };
  return { value: Math.round(ms * 3.6), unit: "km/h" };
}

// API visibility is in metres (max 10 km)
export function formatVisibility(metres, units) {
  if (units === "imperial")
    return { value: (metres / 1609.34).toFixed(1), unit: "mi" };
  return { value: (metres / 1000).toFixed(1), unit: "km" };
}

export function formatPrecip(mm, units) {
  if (units === "imperial") return { value: (mm / 25.4).toFixed(2), unit: "in" };
  return { value: mm.toFixed(1), unit: "mm" };
}

const DIRECTIONS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

export function windDirection(deg) {
  return DIRECTIONS[Math.round(deg / 22.5) % 16];
}

// Magnus formula approximation
export function dewPoint(tempC, humidity) {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}

// Beaufort scale description for wind in m/s
export function windDescription(ms) {
  if (ms < 0.5) return "Calm";
  if (ms < 3.4) return "Light breeze";
  if (ms < 8) return "Moderate breeze";
  if (ms < 10.8) return "Fresh breeze";
  if (ms < 17.2) return "Strong wind";
  if (ms < 24.5) return "Gale";
  return "Storm";
}
