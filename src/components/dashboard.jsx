import { data } from "../assets/cities";
import WeatherCard from "./weatherCard";

const cityCodes = data.List.map((city) => city.CityCode);
console.log(cityCodes);
console.log(cityCodes[0]);

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* <WeatherCard cityCode={cityCodes[0]} /> */}
      {cityCodes.map((code) => (
        <WeatherCard key={code} cityCode={code} />
      ))}
    </div>
  );
}
