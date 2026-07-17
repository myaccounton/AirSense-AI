import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

/**
 * Footer — Site-wide footer with links and branding
 */
export default function Footer() {
  return (
    <footer style={{
      padding: '48px 32px 24px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(10, 14, 26, 0.8)',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        marginBottom: 40,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
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
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>AirSense AI</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            AI-powered urban air quality intelligence for smarter, healthier cities.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Product</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}>Dashboard</Link>
            <Link to="/analysis" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}>Analysis</Link>
            <Link to="/reports" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}>Reports</Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Resources</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Documentation</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>API Reference</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Changelog</a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>About</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.04)',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 AirSense AI. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaGithub size={18} /></a>
          <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaTwitter size={18} /></a>
          <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaLinkedin size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
