import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherCard({ cityCode }) {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_REACT_APP_AUTH_OPEN_WEATHER_API;

  console.log("City Code:", cityCode);
  console.log("API Key:", apiKey);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${apiKey}`
        );
        console.log(response.data);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeatherData();
  }, [cityCode, apiKey]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Cloudiness: {weather.clouds.all}%</p>
    </div>
  );
}
