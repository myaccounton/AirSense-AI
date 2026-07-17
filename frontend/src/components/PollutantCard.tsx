import { motion } from 'framer-motion';
import type { Pollutants } from '../types';

interface PollutantCardProps {
  pollutants: Pollutants;
}

interface PollutantInfo {
  key: keyof Pollutants;
  name: string;
  unit: string;
  limit: number;
  color: string;
}

const POLLUTANT_INFO: PollutantInfo[] = [
  { key: 'pm25', name: 'PM2.5', unit: 'µg/m³', limit: 15, color: '#ef4444' },
  { key: 'pm10', name: 'PM10', unit: 'µg/m³', limit: 45, color: '#f97316' },
  { key: 'no2', name: 'NO₂', unit: 'ppb', limit: 25, color: '#eab308' },
  { key: 'co', name: 'CO', unit: 'mg/m³', limit: 2, color: '#22c55e' },
  { key: 'so2', name: 'SO₂', unit: 'ppb', limit: 20, color: '#3b82f6' },
  { key: 'o3', name: 'O₃', unit: 'ppb', limit: 50, color: '#8b5cf6' },
];

/**
 * PollutantCard — Shows all pollutant levels with animated progress bars
 */
export default function PollutantCard({ pollutants }: PollutantCardProps) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ padding: '28px' }}
    >
      <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
        Pollutant Levels
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {POLLUTANT_INFO.map((info, i) => {
          const value = pollutants[info.key];
          const percentage = Math.min((value / (info.limit * 3)) * 100, 100);
          const isExceeded = value > info.limit;

          return (
            <motion.div
              key={info.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{info.name}</span>
                  {isExceeded && (
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      color: '#ef4444',
                      background: 'rgba(239,68,68,0.1)',
                      padding: '1px 6px',
                      borderRadius: 4,
                    }}>
                      EXCEEDED
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: info.color }}>
                  {value} <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-muted)' }}>{info.unit}</span>
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: 6,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.05)',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${info.color}, ${info.color}cc)`,
                    boxShadow: `0 0 8px ${info.color}40`,
                  }}
                />
              </div>

              {/* Limit indicator */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  WHO Limit: {info.limit} {info.unit}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
