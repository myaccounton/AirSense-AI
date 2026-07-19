import { motion } from 'framer-motion';
import { getPriorityColor } from '../../utils';
import type { RecommendationImpact } from '../../types';

interface Props {
  recs: RecommendationImpact[];
}

export default function RecommendationImpactCard({ recs }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px', height: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '24px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          🏢
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#fff' }}>Recommendation Impact</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>AI-driven municipal action plans</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {recs.map((rec, i) => {
          const pColor = getPriorityColor(rec.priority);
          return (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: `4px solid ${pColor}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{rec.title}</h4>
                <div style={{ background: `${pColor}20`, color: pColor, padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {rec.priority}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AQI Reduction</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-green)' }}>-{rec.estimatedAQIReduction}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Difficulty</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{rec.implementationDifficulty}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{rec.expectedTime}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Reason: </span>
                {rec.reason}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
