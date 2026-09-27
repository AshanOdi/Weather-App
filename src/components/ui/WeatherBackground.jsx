import { AnimatePresence, motion } from "motion/react";

// Full-screen gradient that cross-fades when the weather theme changes,
// with a couple of soft glowing orbs drifting on top.
export default function WeatherBackground({ theme }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className={`absolute inset-0 bg-linear-to-br ${theme}`}
        />
      </AnimatePresence>

      <motion.div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
