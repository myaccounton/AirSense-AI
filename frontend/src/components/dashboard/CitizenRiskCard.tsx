import { motion } from 'framer-motion';
import type { CitizenAdvisory } from '../../types';

interface Props {
  advisories: CitizenAdvisory[];
}

export default function CitizenRiskCard({ advisories }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px', height: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '24px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          👨‍👩‍👧‍👦
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#fff' }}>Citizen Health Advisory</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Targeted advice for demographic groups</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {advisories.map((adv, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{adv.group}</h4>
              <div style={{ 
                background: adv.urgency === 'Immediate' ? 'rgba(239, 68, 68, 0.15)' : adv.urgency === 'Warning' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(59, 130, 246, 0.15)', 
                color: adv.urgency === 'Immediate' ? '#ef4444' : adv.urgency === 'Warning' ? '#f97316' : '#3b82f6', 
                padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' 
              }}>
                {adv.urgency}
              </div>
            </div>
            
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Risk Level: <span style={{ color: adv.risk === 'High' ? '#ef4444' : adv.risk === 'Medium' ? '#f97316' : '#10b981', fontWeight: 600 }}>{adv.risk}</span>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {adv.recommendation}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
