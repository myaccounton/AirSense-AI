import { motion } from 'framer-motion';
import { getAQIColor, getAQICategory } from '../utils';
import StatusBadge from './StatusBadge';

interface AQICardProps {
  aqi: number;
  category: string;
  dominantPollutant: string;
  lastUpdated?: string;
}

/**
 * AQICard — Main AQI display with circular gauge and category
 */
export default function AQICard({ aqi, category, dominantPollutant }: AQICardProps) {
  const color = getAQIColor(category);
  const resolvedCategory = category || getAQICategory(aqi);

  // Calculate gauge percentage (AQI max ~500)
  const percentage = Math.min((aqi / 500) * 100, 100);
  const circumference = 2 * Math.PI * 58;
  const dashOffset = circumference - (percentage / 100) * circumference;

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: color,
        opacity: 0.06,
        filter: 'blur(40px)',
      }} />

      <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Air Quality Index
      </h3>

      {/* Circular Gauge */}
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70" cy="70" r="58"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <motion.circle
            cx="70" cy="70" r="58"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            transform="rotate(-90 70 70)"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        {/* Center Value */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: color,
              lineHeight: 1,
            }}
          >
            {aqi}
          </motion.span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>AQI</span>
        </div>
      </div>

      <StatusBadge label={resolvedCategory} color={color} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
      }}>
        <span>Dominant:</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{dominantPollutant}</span>
      </div>
    </motion.div>
  );
}
