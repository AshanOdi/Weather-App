import { useAuth0 } from "@auth0/auth0-react";
import Weather from "./Weather";

export default function Dashboard() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Weather />
      ) : (
        <p className="text-red-500">⚠️ Please log in to view weather data.</p>
      )}
    </div>
  );
}
