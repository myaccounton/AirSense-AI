import { motion } from 'framer-motion';
import type { ConfidenceScore } from '../../types';

interface Props {
  data: ConfidenceScore;
}

export default function ConfidenceCard({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '20px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          🎯
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#fff' }}>AI Confidence</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Confidence Score</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-green)' }}>{data.score}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Data Quality</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{data.dataQuality}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Forecast Reliability</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{data.forecastReliability}</span>
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>Reasoning</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            {data.reason}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
