import GlassCard from "../ui/GlassCard";

// Small highlight tile: big value, unit and a helpful caption.
// Optional `meter` (0-100) renders a progress bar under the value.
export default function StatCard({ title, icon, value, unit, caption, meter, delay }) {
  return (
    <GlassCard title={title} icon={icon} delay={delay} className="flex flex-col">
      <p className="text-3xl font-semibold">
        {value}
        {unit && <span className="ml-1 text-base font-normal text-white/60">{unit}</span>}
      </p>
      {meter !== undefined && (
        <div className="mt-3 h-1.5 rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white/80"
            style={{ width: `${Math.min(Math.max(meter, 0), 100)}%` }}
          />
        </div>
      )}
      {caption && <p className="mt-auto pt-3 text-xs text-white/70">{caption}</p>}
    </GlassCard>
  );
}
