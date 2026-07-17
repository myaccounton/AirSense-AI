import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { TrendPoint } from '../types';

interface TrendChartProps {
  title: string;
  data: TrendPoint[];
  color: string;
  unit?: string;
}

/**
 * Custom tooltip component
 */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.95)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
      padding: '10px 14px',
      backdropFilter: 'blur(8px)',
    }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{payload[0].value}</p>
    </div>
  );
}

/**
 * TrendChart — Responsive time-series area chart with gradient fill
 */
export default function TrendChart({ title, data, color, unit }: TrendChartProps) {
  const gradientId = `gradient-${title.replace(/\s+/g, '-')}`;

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {title}
        </h3>
        {unit && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 6 }}>{unit}</span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 5, stroke: color, strokeWidth: 2, fill: 'var(--bg-primary)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
