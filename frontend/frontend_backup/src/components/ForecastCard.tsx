import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { ForecastPoint } from '../types';

interface ForecastCardProps {
  forecast: ForecastPoint[];
}

/**
 * ForecastCard — Today's AQI forecast with mini line chart
 */
export default function ForecastCard({ forecast }: ForecastCardProps) {
  const peakAQI = Math.max(...forecast.map(f => f.aqi));
  const peakHour = forecast.find(f => f.aqi === peakAQI)?.hour || '';

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Today's Forecast
        </h3>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Peak</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f97316' }}>
            {peakAQI} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>at {peakHour}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={forecast} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              backdropFilter: 'blur(8px)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, stroke: '#f97316', strokeWidth: 2, fill: 'var(--bg-primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
