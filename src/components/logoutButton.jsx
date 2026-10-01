import { FiLogOut } from "react-icons/fi";
import { useSession } from "../context/SessionContext";

const LogoutButton = () => {
  const { signOut, isGuest } = useSession();
  const label = isGuest ? "Exit" : "Sign out";

  return (
    <button
      onClick={signOut}
      title={isGuest ? "Exit guest mode" : "Sign out"}
      className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition hover:bg-red-500/80 hover:text-white"
    >
      <FiLogOut />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default LogoutButton;
