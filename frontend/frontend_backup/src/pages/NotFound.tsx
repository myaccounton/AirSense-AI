import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * NotFound — 404 page with animated illustration
 */
export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 24,
      background: 'var(--bg-primary)',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: '6rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </motion.div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 28, maxWidth: 400 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Go Home
          </Link>
          <Link to="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
