import { motion } from 'framer-motion';

interface StatusBadgeProps {
  label: string;
  color: string;
  size?: 'sm' | 'md';
}

/**
 * StatusBadge — Pill-shaped status indicator with dot
 */
export default function StatusBadge({ label, color, size = 'md' }: StatusBadgeProps) {
  const isSmall = size === 'sm';
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? 4 : 6,
        padding: isSmall ? '2px 8px' : '4px 12px',
        borderRadius: 999,
        fontSize: isSmall ? '0.7rem' : '0.75rem',
        fontWeight: 600,
        color: color,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        letterSpacing: '0.02em',
      }}
    >
      <span style={{
        width: isSmall ? 5 : 6,
        height: isSmall ? 5 : 6,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
      }} />
      {label}
    </motion.span>
  );
}
