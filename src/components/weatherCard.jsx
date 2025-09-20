export default function WeatherCard({ weather }) {
  return (
    <div className="bg-white p-4 rounded shadow-md w-64">
      <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
      <p className="text-gray-700">Temperature: {weather.main.temp}°C</p>
      <p className="text-gray-700">Humidity: {weather.main.humidity}%</p>
      <p className="text-gray-700">
        Condition: {weather.weather[0].description}
      </p>
    </div>
  );
}
