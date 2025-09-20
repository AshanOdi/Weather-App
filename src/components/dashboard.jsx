import { data } from "./cities";
import WeatherCard from "./weatherCard";

const cityCodes = data.List.map((city) => city.CityCode);
console.log(cityCodes);

export default function Dashboard() {
  return (
    <div>
      <WeatherCard
        weather={{
          name: "New York",
          main: { temp: 22, humidity: 60 },
          weather: [{ description: "clear sky" }],
        }}
      />
    </div>
  );
}
