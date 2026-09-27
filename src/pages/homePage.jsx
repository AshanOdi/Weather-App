import { useMemo } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { data } from "../assets/cities";
import Header from "../components/Header";
import SavedCities from "../components/SavedCities";
import CurrentWeather from "../components/CurrentWeather";
import WeatherTips from "../components/WeatherTips";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import WindCard from "../components/highlights/WindCard";
import SunCard from "../components/highlights/SunCard";
import AirQualityCard from "../components/highlights/AirQualityCard";
import Highlights from "../components/highlights/Highlights";
import WeatherBackground from "../components/ui/WeatherBackground";
import { DashboardSkeleton } from "../components/ui/Skeleton";
import useLocalStorage from "../hooks/useLocalStorage";
import useWeather from "../hooks/useWeather";
import { getDaily, getHourly } from "../utils/forecast";
import { getTheme } from "../utils/weatherTheme";

const DEFAULT_CITIES = data.List.map((city) => ({
  id: Number(city.CityCode),
  name: city.CityName,
}));

export default function HomePage() {
  const [savedCities, setSavedCities] = useLocalStorage("saved_cities", DEFAULT_CITIES);
  const [location, setLocation] = useLocalStorage("selected_location", DEFAULT_CITIES[0]);
  const { current, forecast, air, loading, error, updatedAt, refresh } =
    useWeather(location);

  const hourly = useMemo(() => (forecast ? getHourly(forecast) : []), [forecast]);
  const daily = useMemo(() => (forecast ? getDaily(forecast) : []), [forecast]);

  const isSaved = current && savedCities.some((c) => c.id === current.id);

  function toggleSave() {
    if (isSaved) {
      setSavedCities((cities) => cities.filter((c) => c.id !== current.id));
      toast(`${current.name} removed from saved cities`);
    } else {
      setSavedCities((cities) => [
        {
          id: current.id,
          name: current.name,
          lat: current.coord.lat,
          lon: current.coord.lon,
        },
        ...cities,
      ]);
      toast.success(`${current.name} saved`);
    }
  }

  function removeCity(city) {
    setSavedCities((cities) => cities.filter((c) => c.id !== city.id));
  }

  function selectLocation(next) {
    setLocation(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen w-full">
      <WeatherBackground theme={getTheme(current)} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <Header onSelectLocation={selectLocation} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <SavedCities
              cities={savedCities}
              selectedId={current?.id}
              onSelect={selectLocation}
              onRemove={removeCity}
            />
          </div>

          <main className="min-w-0">
            {error && !current ? (
              <div className="glass flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
                <FiAlertCircle className="h-10 w-10 text-red-300" />
                <div>
                  <p className="text-lg font-semibold">Couldn't load the weather</p>
                  <p className="mt-1 text-sm capitalize text-white/70">{error}</p>
                </div>
                <button
                  onClick={refresh}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                >
                  Try again
                </button>
              </div>
            ) : !current || !forecast ? (
              <DashboardSkeleton />
            ) : (
              <div className="grid gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <CurrentWeather
                    current={current}
                    today={daily[0]}
                    isSaved={isSaved}
                    onToggleSave={toggleSave}
                    onRefresh={refresh}
                    loading={loading}
                    updatedAt={updatedAt}
                  />
                </div>
                <WeatherTips current={current} hourly={hourly} today={daily[0]} air={air} />

                <div className="xl:col-span-3">
                  <HourlyForecast hourly={hourly} timezone={current.timezone} />
                </div>

                <div className="flex flex-col gap-4">
                  <DailyForecast daily={daily} timezone={current.timezone} />
                  <AirQualityCard air={air} />
                </div>

                <div className="flex flex-col gap-4 xl:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <WindCard wind={current.wind} />
                    <SunCard sys={current.sys} timezone={current.timezone} />
                  </div>
                  <Highlights current={current} hourly={hourly} />
                </div>
              </div>
            )}
          </main>
        </div>

        <footer className="mt-10 text-center text-xs text-white/50">
          Weather data by OpenWeather · Updates automatically every 5 minutes
        </footer>
      </div>
    </div>
  );
}
