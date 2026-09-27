import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_AUTH_OPEN_WEATHER_API;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const api = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: { appid: API_KEY },
});

// Returns cached response if it is still fresh, otherwise calls the API
// and stores the result in localStorage with a timestamp.
// Pass force = true to skip the cache (manual refresh).
async function cachedGet(path, params, { ttl = CACHE_TTL, force = false } = {}) {
  const cacheKey = `owm_${path}_${new URLSearchParams(params).toString()}`;

  if (!force) {
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      if (cached && Date.now() - cached.timestamp < ttl) return cached.data;
    } catch {
      // ignore broken cache entries
    }
  }

  const { data } = await api.get(path, { params });

  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // storage may be full or blocked, the app still works without cache
  }

  return data;
}

// A location has coordinates { lat, lon } and/or an OpenWeather city { id }.
// Coordinates are preferred because they are more precise.
export function locationParams(location) {
  if (location.lat !== undefined && location.lon !== undefined)
    return { lat: location.lat, lon: location.lon };
  return { id: location.id };
}

export function getCurrentWeather(location, options) {
  return cachedGet(
    "/data/2.5/weather",
    { ...locationParams(location), units: "metric" },
    options
  );
}

export function getForecast({ lat, lon }, options) {
  return cachedGet("/data/2.5/forecast", { lat, lon, units: "metric" }, options);
}

export function getAirQuality({ lat, lon }, options) {
  return cachedGet("/data/2.5/air_pollution", { lat, lon }, options);
}

export function searchCities(query) {
  return cachedGet(
    "/geo/1.0/direct",
    { q: query, limit: 5 },
    { ttl: 24 * 60 * 60 * 1000 } // city names don't change, cache for a day
  );
}
