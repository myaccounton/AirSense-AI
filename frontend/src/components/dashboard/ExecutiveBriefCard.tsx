import { motion } from 'framer-motion';
import type { ExecutiveSummary } from '../../types';

interface Props {
  data: ExecutiveSummary;
}

export default function ExecutiveBriefCard({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '20px' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
          🧠
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Executive AI Brief</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Current AQI</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>{data.currentAQI} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>({data.riskLevel})</span></div>
        </div>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Dominant Pollutant</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{data.dominantPollutant}</div>
        </div>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Confidence Score</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{data.confidenceScore}%</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--accent-blue)', borderRadius: '0 8px 8px 0' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Overall Situation</h4>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0, color: 'var(--text-primary)' }}>{data.overallSituation}</p>
        </div>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--accent-cyan)', borderRadius: '0 8px 8px 0' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Expected Trend</h4>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0, color: 'var(--text-primary)' }}>{data.expectedTrend}</p>
        </div>
      </div>
    </motion.div>
  );
}
