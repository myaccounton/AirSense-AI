import { motion } from 'framer-motion';
import type { RootCause } from '../../types';

interface Props {
  causes: RootCause[];
}

export default function RootCauseCard({ causes }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '24px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          🔍
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#fff' }}>AI Root Cause Analysis</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Evidence-based breakdown of dominant contributors</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {causes.map((cause, idx) => (
          <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: `4px solid ${idx === 0 ? '#ef4444' : idx === 1 ? '#f97316' : '#3b82f6'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{cause.source}</h4>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Contribution: {cause.contribution}%
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Evidence</div>
                <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {cause.evidence.map((ev, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{ev}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>Reasoning</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{cause.reasoning}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
