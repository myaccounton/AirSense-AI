import { motion } from 'framer-motion';

export default function AITransparencyCard() {
  const timestamp = new Date().toISOString();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        marginTop: '40px',
        padding: '24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--accent-cyan)' }}>🤖</span> Generated using
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Groq Llama-3.3-70b</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--accent-green)' }}>📊</span> Dataset
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Weather + Historical Records</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--accent-blue)' }}>⚡</span> Inference Time
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{'< 2.5s'}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--accent-purple)' }}>🕰️</span> Generation Timestamp
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{timestamp}</span>
      </div>
    </motion.div>
  );
}
