import { FiStar } from "react-icons/fi";
import CityCard from "./CityCard";

// Saved cities: a horizontal strip on mobile, a sidebar list on desktop
export default function SavedCities({ cities, selectedId, onSelect, onRemove }) {
  return (
    <aside id="saved-cities" className="scroll-mt-6">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        <FiStar /> Saved cities
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
          {cities.length}
        </span>
      </h2>

      {cities.length === 0 ? (
        <p className="glass rounded-2xl p-4 text-sm text-white/70">
          Search for a city and tap the star to save it here.
        </p>
      ) : (
        <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 pt-2 lg:mx-0 lg:max-h-[calc(100vh-10rem)] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:px-1">
          {cities.map((city) => (
            <div key={city.id} className="w-60 shrink-0 lg:w-auto">
              <CityCard
                location={city}
                selected={String(city.id) === String(selectedId)}
                onSelect={() => onSelect(city)}
                onRemove={() => onRemove(city)}
              />
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
