import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

/**
 * SectionTitle — Reusable section heading with optional subtitle and badge
 */
export default function SectionTitle({ title, subtitle, badge }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 32 }}
    >
      {badge && (
        <span style={{
          display: 'inline-block',
          padding: '4px 14px',
          borderRadius: 999,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--accent-cyan)',
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          marginBottom: 12,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          {badge}
        </span>
      )}
      <h2 style={{
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        lineHeight: 1.2,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          marginTop: 8,
          maxWidth: 600,
          lineHeight: 1.6,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
