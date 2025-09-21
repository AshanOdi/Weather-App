import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherCard({ cityCode }) {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_REACT_APP_AUTH_OPEN_WEATHER_API;

  console.log("City Code:", cityCode); //used for testing
  console.log("API Key:", apiKey); //used for testing

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        //fetch data from open weather api
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${apiKey}`
        );
        console.log(response.data); //for testing

        // Convert temperature from Kelvin to Celsius
        let temp = response.data.main.temp;
        temp = temp - 273.15;
        response.data.main.temp = parseInt(temp);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeatherData();
  }, [cityCode, apiKey]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className=" backdrop-blur-xl shadow-2xl shadow-gray-700 max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 rounded-xl shadow-lg text-center md:text-left">
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
