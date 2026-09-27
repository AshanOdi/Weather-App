import { useCallback, useEffect, useState } from "react";
import {
  getAirQuality,
  getCurrentWeather,
  getForecast,
} from "../services/weatherApi";

const REFRESH_INTERVAL = 5 * 60 * 1000;

// Loads current weather, forecast and air quality for a location and
// refreshes it automatically every five minutes.
export default function useWeather(location) {
  const [state, setState] = useState({
    current: null,
    forecast: null,
    air: null,
    loading: true,
    error: null,
    updatedAt: null,
  });

  const load = useCallback(
    async (force = false) => {
      if (!location) return;
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const current = await getCurrentWeather(location, { force });
        const coord = { lat: current.coord.lat, lon: current.coord.lon };
        const [forecast, air] = await Promise.all([
          getForecast(coord, { force }),
          // air quality is optional, don't fail the whole page without it
          getAirQuality(coord, { force }).catch(() => null),
        ]);

        setState({
          current,
          forecast,
          air,
          loading: false,
          error: null,
          updatedAt: current.dt * 1000,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message || error.message,
        }));
      }
    },
    [location]
  );

  useEffect(() => {
    load();
    const timer = setInterval(() => load(), REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [load]);

  return { ...state, refresh: () => load(true) };
}
