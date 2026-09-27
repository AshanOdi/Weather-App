// Pulsing placeholder shown while weather data loads
export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-3xl bg-white/10 ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Skeleton className="h-72 lg:col-span-2" />
      <Skeleton className="h-72" />
      <Skeleton className="h-56 lg:col-span-3" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  );
}
