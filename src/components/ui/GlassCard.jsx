import { motion } from "motion/react";

// Frosted glass panel that fades up into view
export default function GlassCard({ title, icon: Icon, className = "", delay = 0, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass rounded-3xl p-5 ${className}`}
    >
      {title && (
        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
          {Icon && <Icon className="text-base" />}
          {title}
        </h3>
      )}
      {children}
    </motion.section>
  );
}
