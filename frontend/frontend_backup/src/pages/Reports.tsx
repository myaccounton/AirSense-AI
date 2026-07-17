import { motion } from 'framer-motion';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import SectionTitle from '../components/SectionTitle';
import StatusBadge from '../components/StatusBadge';
import { getAQIColor, formatDate } from '../utils';
import { HiDocumentArrowDown, HiShare, HiPrinter } from 'react-icons/hi2';

/**
 * Reports Page — Professional report preview with download/share actions
 */
export default function Reports() {
  const { reportData, loading } = useMockData();

  if (loading || !reportData) {
    return <LoadingScreen />;
  }

  const { sections } = reportData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        title="Environmental Report"
        subtitle="AI-generated comprehensive air quality report"
        badge="Auto-Generated"
      />

      {/* Report Header */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '28px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          opacity: 0.06,
          filter: 'blur(40px)',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Report ID</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent-cyan)', marginBottom: 12 }}>
              {reportData.reportId}
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>City</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reportData.city}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Region</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reportData.region}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Period</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reportData.period}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Generated</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{formatDate(reportData.generatedAt)}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              onClick={() => alert('PDF download would be triggered here')}
              id="download-pdf-btn"
            >
              <HiDocumentArrowDown size={16} /> Download PDF
            </button>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              onClick={() => alert('Share dialog would open here')}
              id="share-report-btn"
            >
              <HiShare size={16} /> Share
            </button>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              onClick={() => window.print()}
              id="print-report-btn"
            >
              <HiPrinter size={16} /> Print
            </button>
          </div>
        </div>
      </motion.div>

      {/* Report Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Current AQI Section */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ padding: '28px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: getAQIColor(sections.currentAQI.category),
              boxShadow: `0 0 8px ${getAQIColor(sections.currentAQI.category)}`,
            }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{sections.currentAQI.title}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: getAQIColor(sections.currentAQI.category),
              lineHeight: 1,
            }}>
              {sections.currentAQI.aqi}
            </div>
            <StatusBadge label={sections.currentAQI.category} color={getAQIColor(sections.currentAQI.category)} />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {sections.currentAQI.description}
          </p>
        </motion.div>

        {/* Forecast Section */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: '28px' }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>{sections.forecast.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            {sections.forecast.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{
              padding: '8px 16px',
              borderRadius: 10,
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Peak AQI</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f97316' }}>{sections.forecast.peakAQI}</div>
            </div>
            <div style={{
              padding: '8px 16px',
              borderRadius: 10,
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Peak Time</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ef4444' }}>{sections.forecast.peakTime}</div>
            </div>
          </div>
        </motion.div>

        {/* Analysis Section */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ padding: '28px' }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>{sections.analysis.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            {sections.analysis.description}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sections.analysis.topSources.map((source) => (
              <span
                key={source}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  fontSize: '0.8rem',
                  color: '#8b5cf6',
                  fontWeight: 500,
                }}
              >
                {source}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Municipal Actions */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ padding: '28px' }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>{sections.municipal.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            {sections.municipal.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sections.municipal.actions.map((action, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: 'rgba(59,130,246,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#3b82f6',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{action}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Health Advisory */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ padding: '28px' }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>{sections.health.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            {sections.health.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sections.health.advisories.map((advisory, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(239,68,68,0.05)',
                border: '1px solid rgba(239,68,68,0.1)',
              }}>
                <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>⚕</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{advisory}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
