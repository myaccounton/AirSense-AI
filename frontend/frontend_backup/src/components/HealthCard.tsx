import { motion } from 'framer-motion';
import type { HealthAdvisory } from '../types';
import RecommendationCard from './RecommendationCard';

interface HealthCardProps {
  advisories: HealthAdvisory[];
}

/**
 * HealthCard — Section wrapper for health advisories
 */
export default function HealthCard({ advisories }: HealthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'rgba(239, 68, 68, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
        }}>
          🏥
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Citizen Health Advisory
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Personal safety recommendations for current conditions
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {advisories.map((advisory, i) => (
          <RecommendationCard
            key={advisory.id}
            title={advisory.title}
            description={advisory.description}
            priority={advisory.priority}
            icon={advisory.icon}
            forGroup={advisory.forGroup}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}
