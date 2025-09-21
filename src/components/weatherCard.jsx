import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherCard({ cityCode }) {
  const [weather, setWeather] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const apiKey = import.meta.env.VITE_REACT_APP_AUTH_OPEN_WEATHER_API;

  //used for testing
  // console.log("City Code:", cityCode);
  // console.log("API Key:", apiKey);

  useEffect(() => {
    async function fetchWeatherData() {
      const cacheKey = `weather_${cityCode}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        if (now - timestamp < 300000) {
          setWeather(data);
          console.log("Used cached data"); //for testing
          return;
        }
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${apiKey}`
        );
        console.log("CAlled data"); //for testing

        // Convert temperature from Kelvin to Celsius
        let temp = response.data.main.temp;
        temp = temp - 273.15;
        response.data.main.temp = parseInt(temp);
        setWeather(response.data);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeatherData();

    const timer = setTimeout(() => {
      setRefreshToggle((prev) => !prev);
    }, 300000);

    // cleanup timer when effect re-runs
    return () => clearTimeout(timer);
  }, [cityCode, apiKey, refreshToggle]);

  if (!weather)
    return (
      <div className="w-[70px] h-[70px]  border-[5px] border-gray-500 border-t-blue-900 rounded-full animate-spin"></div>
    );

  return (
    <div
      className=" backdrop-blur-xl shadow-2xl shadow-gray-700 max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 rounded-xl shadow-lg text-center md:text-left
    transition-transform duration-300 
              hover:-translate-y-1 hover:shadow-2xl"
    >
      <h2 className="md:text-center text-2xl md:text-3xl font-bold mb-2">
        {weather.name}
      </h2>
      <p className="text-lg md:text-xl mb-1">
        Temperature:{" "}
        <span className="font-semibold">{weather.main.temp}°C</span>
      </p>
      <p className="text-lg md:text-xl mb-1">
        Humidity:{" "}
        <span className="font-semibold">{weather.main.humidity}%</span>
      </p>
      <p className="text-lg md:text-xl mb-1">
        Condition:{" "}
        <span className="font-semibold capitalize">
          {weather.weather[0].description}
        </span>
      </p>
      <p className="text-lg md:text-xl mb-1">
        Wind: <span className="font-semibold">{weather.wind.speed} m/s</span>
      </p>
      <p className="text-lg md:text-xl">
        Cloudiness: <span className="font-semibold">{weather.clouds.all}%</span>
      </p>
    </div>
  );
}
