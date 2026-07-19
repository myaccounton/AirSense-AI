import { motion } from 'framer-motion';
import type { TimelinePrediction } from '../../types';

interface Props {
  timeline: TimelinePrediction[];
}

export default function PredictionTimeline({ timeline }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px', height: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '24px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          ⏳
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#fff' }}>AI Prediction Timeline</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Forecasted AQI progression</p>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Vertical line connecting timeline nodes */}
        <div style={{ position: 'absolute', left: 15, top: 20, bottom: 20, width: 2, background: 'rgba(255,255,255,0.1)' }} />

        {timeline.map((point, idx) => (
          <div key={idx} style={{ position: 'relative', display: 'flex', gap: '16px', zIndex: 1 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '2px solid var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-blue)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
            }}>
              {idx + 1}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', flex: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>{point.timeframe}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Risk: <span style={{ color: 'var(--accent-cyan)' }}>{point.risk}</span></div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444' }}>
                  {point.predictedAQI}
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {point.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
