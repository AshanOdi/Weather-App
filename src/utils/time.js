// OpenWeather gives unix timestamps (seconds) and a timezone offset (seconds).
// Shifting the timestamp by the offset and formatting in UTC gives the
// city's local time regardless of the viewer's own timezone.

function shifted(unix, offset) {
  return new Date((unix + offset) * 1000);
}

export function formatTime(unix, offset) {
  return shifted(unix, offset).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function formatHour(unix, offset) {
  return shifted(unix, offset).toLocaleTimeString([], {
    hour: "numeric",
    timeZone: "UTC",
  });
}

export function formatWeekday(unix, offset) {
  return shifted(unix, offset).toLocaleDateString([], {
    weekday: "short",
    timeZone: "UTC",
  });
}

export function formatFullDate(unix, offset) {
  return shifted(unix, offset).toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

// yyyy-mm-dd in city local time, used to group forecast entries by day
export function localDateKey(unix, offset) {
  return shifted(unix, offset).toISOString().slice(0, 10);
}

export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export function timeAgo(timestamp) {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 min ago";
  return `${minutes} mins ago`;
}
