import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
  level: string;
  description: string;
}

/**
 * RiskMeter — Semi-circular gauge showing risk level
 */
export default function RiskMeter({ score, level, description }: RiskMeterProps) {
  // Map score (0-100) to color
  const getColor = (s: number) => {
    if (s <= 25) return '#22c55e';
    if (s <= 50) return '#eab308';
    if (s <= 75) return '#f97316';
    return '#ef4444';
  };

  const color = getColor(score);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Risk Level
      </h3>

      {/* Semi-circular gauge */}
      <div style={{ position: 'relative', width: 160, height: 90, overflow: 'hidden' }}>
        <svg width="160" height="90" viewBox="0 0 160 90">
          {/* Background arc */}
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Active arc */}
          <motion.path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>

        {/* Center value */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontSize: '1.75rem', fontWeight: 800, color }}
          >
            {score}
          </motion.span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/100</span>
        </div>
      </div>

      <span style={{
        fontSize: '0.85rem',
        fontWeight: 700,
        color,
        background: `${color}15`,
        padding: '4px 16px',
        borderRadius: 999,
        border: `1px solid ${color}30`,
      }}>
        {level}
      </span>

      <p style={{
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </motion.div>
  );
}
