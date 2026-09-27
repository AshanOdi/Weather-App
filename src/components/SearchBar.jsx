import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiMapPin, FiSearch, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { searchCities } from "../services/weatherApi";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [locating, setLocating] = useState(false);
  const wrapperRef = useRef(null);

  // Debounce the search so we don't call the API on every keystroke
  useEffect(() => {
    const text = query.trim();
    if (text.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const cities = await searchCities(text);
        setResults(cities);
        setActive(0);
        setOpen(true);
      } catch {
        toast.error("City search failed. Please try again.");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function choose(city) {
    onSelect({
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      country: city.country,
    });
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      toast.error("Location is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        onSelect({
          lat: Number(coords.latitude.toFixed(4)),
          lon: Number(coords.longitude.toFixed(4)),
          isCurrent: true,
        });
      },
      () => {
        setLocating(false);
        toast.error("Couldn't get your location. Check browser permissions.");
      },
      { timeout: 10000 }
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-white/40">
        <FiSearch className="shrink-0 text-white/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          aria-label="Search for a city"
          className="w-full bg-transparent text-sm placeholder:text-white/50 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-white/60 hover:text-white"
          >
            <FiX />
          </button>
        )}
        <button
          onClick={useMyLocation}
          disabled={locating}
          title="Use my location"
          aria-label="Use my location"
          className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white disabled:animate-pulse"
        >
          <FiMapPin />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900/90 shadow-2xl backdrop-blur-xl"
          >
            {results.length === 0 ? (
              <li className="px-4 py-3 text-sm text-white/60">No cities found</li>
            ) : (
              results.map((city, i) => (
                <li key={`${city.lat},${city.lon}`}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => choose(city)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                      i === active ? "bg-white/15" : ""
                    }`}
                  >
                    <span>
                      <span className="font-medium">{city.name}</span>
                      {city.state && (
                        <span className="text-white/60">, {city.state}</span>
                      )}
                    </span>
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/70">
                      {city.country}
                    </span>
                  </button>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
