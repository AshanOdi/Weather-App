export const APP_NAME = "කාලගුණේ";
export const LOGO_SRC = "/new1.png";

const SIZES = {
  sm: { logo: "h-9 w-9", text: "text-xl" },
  md: { logo: "h-11 w-11", text: "text-2xl" },
};

// App logo with the Sinhala name next to it
export default function Brand({ size = "md", className = "" }) {
  const s = SIZES[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src={LOGO_SRC} alt="" className={`${s.logo} drop-shadow-lg`} />
      <span className={`font-sinhala font-bold leading-none tracking-tight ${s.text}`}>
        {APP_NAME}
      </span>
    </span>
  );
}
