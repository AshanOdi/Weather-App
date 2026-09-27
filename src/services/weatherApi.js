import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_AUTH_OPEN_WEATHER_API;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const api = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: { appid: API_KEY },
});

// Returns cached response if it is still fresh, otherwise calls the API
// and stores the result in localStorage with a timestamp.
async function cachedGet(path, params, ttl = CACHE_TTL) {
  const cacheKey = `owm_${path}_${new URLSearchParams(params).toString()}`;

  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached && Date.now() - cached.timestamp < ttl) return cached.data;
  } catch {
    // ignore broken cache entries
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

// A location is either { id } (OpenWeather city id) or { lat, lon }
export function locationParams(location) {
  if (location.id) return { id: location.id };
  return { lat: location.lat, lon: location.lon };
}

export function getCurrentWeather(location) {
  return cachedGet("/data/2.5/weather", {
    ...locationParams(location),
    units: "metric",
  });
}

export function getForecast({ lat, lon }) {
  return cachedGet("/data/2.5/forecast", { lat, lon, units: "metric" });
}

export function getAirQuality({ lat, lon }) {
  return cachedGet("/data/2.5/air_pollution", { lat, lon });
}

export function searchCities(query) {
  return cachedGet(
    "/geo/1.0/direct",
    { q: query, limit: 5 },
    24 * 60 * 60 * 1000 // city names don't change, cache for a day
  );
}
