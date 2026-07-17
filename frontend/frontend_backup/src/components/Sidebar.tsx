import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChartBar, HiCpuChip, HiDocumentText, HiCog6Tooth, HiXMark } from 'react-icons/hi2';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', icon: <HiChartBar size={20} />, label: 'Dashboard' },
  { to: '/analysis', icon: <HiCpuChip size={20} />, label: 'Analysis' },
  { to: '/reports', icon: <HiDocumentText size={20} />, label: 'Reports' },
  { to: '/settings', icon: <HiCog6Tooth size={20} />, label: 'Settings' },
];

/**
 * Sidebar — Left navigation panel with animated route links
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="sidebar-backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 199,
              display: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          width: 240,
          minHeight: '100%',
          background: 'rgba(10, 14, 26, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="sidebar-close"
          style={{
            display: 'none',
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 4,
            marginBottom: 8,
          }}
        >
          <HiXMark size={22} />
        </button>

        {/* Navigation */}
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0 12px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Navigation
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.15)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            })}
          >
            <span style={{ display: 'flex' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {/* Bottom section */}
        <div style={{ marginTop: 'auto', padding: '16px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'white',
            }}>
              AI
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Engine</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Active
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 200;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sidebar-open {
            transform: translateX(0) !important;
          }
          .sidebar-close {
            display: flex !important;
          }
          .sidebar-backdrop {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
