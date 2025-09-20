import WeatherCard from "../components/weatherCard";

export default function HomePage() {
  return (
    <div className="">
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
