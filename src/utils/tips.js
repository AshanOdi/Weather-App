import { formatHour } from "./time";
import { isDaytime } from "./weatherTheme";

// Turns raw weather data into short, actionable suggestions.
// Each tip has a `type` used by the UI to pick an icon.
export function getWeatherTips({ current, hourly, today, air }) {
  const tips = [];
  const main = current.weather[0].main;
  const temp = current.main.temp;
  const feels = current.main.feels_like;
  const offset = current.timezone;

  const next12 = hourly.slice(0, 4);
  const rainyHour = next12.find((h) => h.pop >= 0.5);

  if (["Rain", "Drizzle"].includes(main)) {
    tips.push({ type: "rain", text: "It's raining right now. Grab an umbrella before heading out." });
  } else if (rainyHour) {
    tips.push({
      type: "rain",
      text: `${Math.round(rainyHour.pop * 100)}% chance of rain around ${formatHour(
        rainyHour.dt,
        offset
      )}. Take an umbrella.`,
    });
  }

  if (main === "Thunderstorm" || hourly.some((h) => h.icon.startsWith("11"))) {
    tips.push({ type: "storm", text: "Thunderstorms expected. Stay indoors and away from open areas." });
  }

  if (main === "Snow" || temp <= 0) {
    tips.push({ type: "cold", text: "Freezing conditions. Watch out for icy roads and paths." });
  } else if (feels <= 8) {
    tips.push({ type: "cold", text: "It feels chilly. Wear a warm jacket." });
  } else if (feels >= 32) {
    tips.push({ type: "hot", text: "Very hot today. Stay hydrated and avoid the midday sun." });
  }

  if (main === "Clear" && isDaytime(current) && temp >= 20) {
    tips.push({ type: "sun", text: "Clear sunny skies. Sunscreen and sunglasses are a good idea." });
  }

  if (current.wind.speed >= 10.8 || (current.wind.gust ?? 0) >= 15) {
    tips.push({ type: "wind", text: "Strong winds. Secure loose items and take care cycling." });
  }

  if ((current.visibility ?? 10000) < 1000) {
    tips.push({ type: "fog", text: "Low visibility. Drive slowly and use your fog lights." });
  }

  const aqi = air?.list?.[0]?.main.aqi;
  if (aqi >= 4) {
    tips.push({ type: "air", text: "Poor air quality. Limit outdoor exercise today." });
  }

  if (today && today.max - today.min >= 10) {
    tips.push({ type: "layers", text: "Big temperature swing today. Dress in layers." });
  }

  if (tips.length === 0) {
    tips.push({ type: "good", text: "Pleasant conditions. A great time to be outside!" });
  }

  return tips.slice(0, 4);
}
