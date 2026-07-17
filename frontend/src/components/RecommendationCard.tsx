import { motion } from 'framer-motion';
import { getPriorityColor } from '../utils';
import { HiTruck, HiBeaker, HiBuildingOffice2, HiFire, HiWrenchScrewdriver, HiShieldCheck } from 'react-icons/hi2';
import { FaBus, FaTree, FaRunning, FaMask, FaHome, FaLungs, FaWind } from 'react-icons/fa';

interface RecommendationCardProps {
  title: string;
  description: string;
  priority: string;
  icon: string;
  impact?: string;
  forGroup?: string;
  index?: number;
}

function getIcon(iconName: string, size: number = 20) {
  const map: Record<string, React.ReactNode> = {
    truck: <HiTruck size={size} />,
    water: <HiBeaker size={size} />,
    building: <HiBuildingOffice2 size={size} />,
    factory: <HiWrenchScrewdriver size={size} />,
    fire: <HiFire size={size} />,
    bus: <FaBus size={size} />,
    tree: <FaTree size={size} />,
    running: <FaRunning size={size} />,
    mask: <FaMask size={size} />,
    home: <FaHome size={size} />,
    lungs: <FaLungs size={size} />,
    shield: <HiShieldCheck size={size} />,
    wind: <FaWind size={size} />,
    leaf: <FaTree size={size} />,
  };
  return map[iconName] || <HiShieldCheck size={size} />;
}

/**
 * RecommendationCard — Action item card with icon, priority badge, and impact
 */
export default function RecommendationCard({ title, description, priority, icon, impact, forGroup, index = 0 }: RecommendationCardProps) {
  const priorityColor = getPriorityColor(priority);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      style={{
        padding: '24px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent line */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: priorityColor,
        borderRadius: '0 4px 4px 0',
      }} />

      <div style={{ display: 'flex', gap: 16 }}>
        {/* Icon */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${priorityColor}15`,
          border: `1px solid ${priorityColor}25`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: priorityColor,
          flexShrink: 0,
        }}>
          {getIcon(icon)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h4>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: priorityColor,
              background: `${priorityColor}15`,
              padding: '2px 8px',
              borderRadius: 999,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {priority}
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: impact || forGroup ? 10 : 0 }}>
            {description}
          </p>

          {impact && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--accent-green)',
              background: 'rgba(16,185,129,0.08)',
              padding: '4px 10px',
              borderRadius: 6,
              display: 'inline-block',
            }}>
              📈 {impact}
            </div>
          )}

          {forGroup && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
              background: 'rgba(6,182,212,0.08)',
              padding: '4px 10px',
              borderRadius: 6,
              display: 'inline-block',
            }}>
              👥 {forGroup}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
