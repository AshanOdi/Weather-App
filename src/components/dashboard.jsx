import { data } from "../assets/cities";
import WeatherCard from "./weatherCard";

const cityCodes = data.List.map((city) => city.CityCode);
console.log(cityCodes);
console.log(cityCodes[0]);

export default function Dashboard() {
  return (
    <div>
      {/* <WeatherCard cityCode={cityCodes[0]} /> */}
      {cityCodes.map((code) => (
        <WeatherCard key={code} cityCode={code} />
      ))}
    </div>
  );
}
