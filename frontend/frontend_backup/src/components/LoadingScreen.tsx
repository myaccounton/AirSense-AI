import { motion } from 'framer-motion';

/**
 * Loading Screen — Full-page loader with animation
 */
export default function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'var(--bg-primary)',
      gap: '24px',
    }}>
      {/* Animated Rings */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: 'var(--accent-cyan)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: 'var(--accent-blue)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            inset: 16,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: 'var(--accent-purple)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Logo Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center' }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          AirSense AI
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 8 }}>
          Loading intelligence platform...
        </p>
      </motion.div>
    </div>
  );
}
