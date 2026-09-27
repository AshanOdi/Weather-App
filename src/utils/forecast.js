import { localDateKey } from "./time";

// Next 24 hours = first 8 entries of the 3-hour forecast
export function getHourly(forecast) {
  return forecast.list.slice(0, 8).map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    icon: item.weather[0].icon,
    description: item.weather[0].description,
    pop: item.pop ?? 0,
    wind: item.wind.speed,
  }));
}

// Group the 3-hour forecast into one summary per local calendar day
export function getDaily(forecast) {
  const offset = forecast.city.timezone;
  const days = new Map();

  for (const item of forecast.list) {
    const key = localDateKey(item.dt, offset);
    if (!days.has(key)) days.set(key, []);
    days.get(key).push(item);
  }

  return [...days.values()].map((items) => {
    // use the entry closest to local midday as the representative condition
    const midday = items.reduce((best, item) => {
      const hour = new Date((item.dt + offset) * 1000).getUTCHours();
      const bestHour = new Date((best.dt + offset) * 1000).getUTCHours();
      return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? item : best;
    });

    return {
      dt: items[0].dt,
      min: Math.min(...items.map((i) => i.main.temp_min)),
      max: Math.max(...items.map((i) => i.main.temp_max)),
      pop: Math.max(...items.map((i) => i.pop ?? 0)),
      precip: items.reduce(
        (sum, i) => sum + (i.rain?.["3h"] ?? 0) + (i.snow?.["3h"] ?? 0),
        0
      ),
      humidity: Math.round(
        items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length
      ),
      wind: Math.max(...items.map((i) => i.wind.speed)),
      icon: midday.weather[0].icon.replace("n", "d"),
      description: midday.weather[0].description,
    };
  });
}
