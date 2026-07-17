import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import SectionTitle from '../components/SectionTitle';
import StatusBadge from '../components/StatusBadge';
import { getAQIColor, getAQICategory, formatDate } from '../utils';
import { HiDocumentArrowDown, HiShare, HiPrinter, HiDocumentText } from 'react-icons/hi2';

/**
 * Reports Page — Professional report preview with parameter-driven city support
 */
export default function Reports() {
  const { city } = useParams();
  const { reportData, loading, error } = useMockData(city);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--text-primary)',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ef4444', marginBottom: 12, fontWeight: 600 }}>API Error</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 450 }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Only block on loading basic stats
  if (loading) {
    return <LoadingScreen />;
  }

  const currentCityName = city || 'Delhi';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        title="Environmental Report"
        subtitle={`AI-generated comprehensive air quality report for ${currentCityName}`}
        badge="Auto-Generated"
      />

      {!reportData ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20,
          textAlign: 'center',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            display: 'inline-flex',
            padding: 16,
            borderRadius: 16,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            marginBottom: 20
          }}>
            <HiDocumentText size={32} />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>
            Generate AI Analysis First
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 450 }}>
            Please navigate to the Dashboard and click the <strong>Analyze with AI</strong> button to compile the environmental intelligence report.
          </p>
        </div>
      ) : (
        <>
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
                  height: 24,
                  borderRadius: 4,
                  background: 'var(--accent-cyan)'
                }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                  {reportData.sections.currentAQI.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {reportData.sections.currentAQI.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.04)',
                width: 'fit-content'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status Index</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: getAQIColor(getAQICategory(reportData.sections.currentAQI.aqi)) }}>
                    {reportData.sections.currentAQI.aqi}
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 16 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trend Assessment</div>
                  <StatusBadge 
                    label={reportData.sections.currentAQI.category} 
                    color={getAQIColor(reportData.sections.currentAQI.category)} 
                  />
                </div>
              </div>
            </motion.div>

            {/* Short-term Forecast */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 8,
                  height: 24,
                  borderRadius: 4,
                  background: 'var(--accent-blue)'
                }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                  {reportData.sections.forecast.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {reportData.sections.forecast.description}
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 10 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Expected Peak AQI</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: getAQIColor(getAQICategory(reportData.sections.forecast.peakAQI)) }}>
                    {reportData.sections.forecast.peakAQI}
                  </div>
                </div>
                <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 10 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Peak Occurrence</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    {reportData.sections.forecast.peakTime}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pollution Source Analysis */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 8,
                  height: 24,
                  borderRadius: 4,
                  background: 'var(--accent-purple)'
                }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                  {reportData.sections.analysis.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {reportData.sections.analysis.description}
              </p>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 10 }}>Key Driver Sources</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {reportData.sections.analysis.topSources.map((source: string) => (
                    <span
                      key={source}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Municipal Action Plan */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 8,
                  height: 24,
                  borderRadius: 4,
                  background: 'var(--accent-orange)'
                }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                  {reportData.sections.municipal.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {reportData.sections.municipal.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {reportData.sections.municipal.actions.map((act: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>{idx + 1}.</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Citizen Advisory */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 8,
                  height: 24,
                  borderRadius: 4,
                  background: 'var(--accent-red)'
                }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                  {reportData.sections.health.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {reportData.sections.health.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {reportData.sections.health.advisories.map((adv: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>•</span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
