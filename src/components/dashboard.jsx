import { data } from "../assets/cities";
import WeatherCard from "./weatherCard";

const cityCodes = data.List.map((city) => city.CityCode);
console.log(cityCodes);

export default function Dashboard() {
  return (
    <div>
      <WeatherCard weather={data.List[0]} />
    </div>
  );
}
