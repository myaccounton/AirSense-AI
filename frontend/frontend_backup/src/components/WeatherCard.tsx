import { motion } from 'framer-motion';
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiDaySunny } from 'react-icons/wi';
import type { WeatherCurrent } from '../types';

interface WeatherCardProps {
  weather: WeatherCurrent;
}

/**
 * WeatherCard — Displays current weather conditions with icons
 */
export default function WeatherCard({ weather }: WeatherCardProps) {
  const stats = [
    { icon: <WiThermometer size={22} />, label: 'Feels Like', value: `${weather.feelsLike}°C`, color: '#f97316' },
    { icon: <WiHumidity size={22} />, label: 'Humidity', value: `${weather.humidity}%`, color: '#3b82f6' },
    { icon: <WiStrongWind size={22} />, label: 'Wind', value: `${weather.windSpeed} km/h`, color: '#06b6d4' },
    { icon: <WiBarometer size={22} />, label: 'Pressure', value: `${weather.pressure} hPa`, color: '#8b5cf6' },
  ];

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'var(--accent-blue)',
        opacity: 0.06,
        filter: 'blur(40px)',
      }} />

      <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
        Weather Conditions
      </h3>

      {/* Main Temperature */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <WiDaySunny size={48} color="#f59e0b" />
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>
            {weather.temperature}°C
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{weather.condition}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <span style={{ color: stat.color }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{stat.label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
