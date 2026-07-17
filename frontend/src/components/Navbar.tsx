import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiBell, HiMagnifyingGlass, HiSun, HiMoon, HiBars3 } from 'react-icons/hi2';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

/**
 * Navbar — Top navigation bar with search, notifications, and profile
 */
export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isLanding ? '16px 32px' : '12px 24px',
        background: isLanding ? 'transparent' : 'rgba(10, 14, 26, 0.8)',
        backdropFilter: isLanding ? 'none' : 'blur(12px)',
        borderBottom: isLanding ? 'none' : '1px solid rgba(255,255,255,0.06)',
        position: isLanding ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      {/* Left: Logo + Hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!isLanding && (
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: 4,
              display: 'none',
            }}
            className="sidebar-toggle"
            id="sidebar-toggle"
          >
            <HiBars3 size={22} />
          </button>
        )}

        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.8rem',
            color: 'white',
          }}>
            AS
          </div>
          <span style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AirSense AI
          </span>
        </Link>
      </div>

      {/* Center: Search (dashboard only) */}
      {!isLanding && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          maxWidth: 320,
          flex: 1,
          margin: '0 24px',
        }}>
          <HiMagnifyingGlass size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search locations, pollutants..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              width: '100%',
              fontFamily: 'inherit',
            }}
            id="navbar-search"
          />
          <kbd style={{
            padding: '2px 6px',
            borderRadius: 4,
            background: 'rgba(255,255,255,0.06)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            fontFamily: 'inherit',
          }}>⌘K</kbd>
        </div>
      )}

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {isLanding ? (
          <>
            <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '8px 20px' }}>
              Dashboard
            </Link>
          </>
        ) : (
          <>
            {/* Notifications */}
            <button style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              padding: 8,
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              position: 'relative',
            }} id="notifications-btn">
              <HiBell size={18} />
              <span style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#ef4444',
              }} />
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                padding: 8,
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
              id="dark-mode-toggle"
            >
              {darkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
            </button>

            {/* Profile Avatar */}
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: 'white',
              cursor: 'pointer',
              marginLeft: 4,
            }} id="profile-avatar">
              AK
            </div>
          </>
        )}
      </div>

      {/* Responsive sidebar toggle styles */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar-toggle {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}
