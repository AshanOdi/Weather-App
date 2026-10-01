import { FiGithub } from "react-icons/fi";

const LINKS = [
  { label: "Saved cities", href: "#saved-cities" },
  { label: "Hourly", href: "#hourly" },
  { label: "Forecast", href: "#forecast" },
  { label: "Air quality", href: "#air-quality" },
];

const GITHUB_URL = "https://github.com/AshanOdi/Weather-App";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="inline-flex items-center gap-2">
            <img src="/new1.png" alt="" className="h-9 w-9 drop-shadow-lg" />
            <span className="text-xl font-bold tracking-tight">
              Weather<span className="text-sky-300">App</span>
            </span>
          </a>
          <p className="mt-3 max-w-md text-sm text-white/70">
            Live conditions, forecasts and air quality for every city you care about.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="text-white/70 transition hover:text-white"
          >
            <FiGithub className="h-5 w-5" />
          </a>
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/50 md:flex-row md:justify-between">
        <p>
          Weather data provided by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            OpenWeather
          </a>
          . Updates automatically every 5 minutes.
        </p>
        <p>© {new Date().getFullYear()} Weather App · Built by Ashan Odithya</p>
      </div>
    </footer>
  );
}
