import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin + "/login" } })
      }
      title="Sign out"
      className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition hover:bg-red-500/80 hover:text-white"
    >
      <FiLogOut />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  );
};

export default LogoutButton;
