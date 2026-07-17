import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import SectionTitle from '../components/SectionTitle';
import AIAnalysisCard from '../components/AIAnalysisCard';
import RecommendationCard from '../components/RecommendationCard';
import HealthCard from '../components/HealthCard';
import { HiArrowTrendingUp, HiArrowTrendingDown, HiMinus, HiCpuChip } from 'react-icons/hi2';

/**
 * Analysis Page — AI-powered pollution analysis and recommendations with parameterized city resolution
 */
export default function Analysis() {
  const { city } = useParams();
  const {
    analysisData,
    loading,
    generatingAI,
    error,
    analyzeWithAI
  } = useMockData(city);

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

  // Loading basic scenario parameters
  if (loading) {
    return <LoadingScreen />;
  }

  const currentCityName = city || 'Delhi';

  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return <HiArrowTrendingUp size={14} color="#ef4444" />;
    if (trend === 'falling') return <HiArrowTrendingDown size={14} color="#22c55e" />;
    return <HiMinus size={14} color="#eab308" />;
  };

  // If AI analysis is not generated yet, show placeholder screen
  if (!analysisData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle
          title="AI Pollution Analysis"
          subtitle={`Deep learning–powered insights for ${currentCityName}`}
          badge="AI Engine"
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20,
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            display: 'inline-flex',
            padding: 16,
            borderRadius: 16,
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            color: '#8b5cf6',
            marginBottom: 20
          }}>
            <HiCpuChip size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>
            AI Analysis Not Generated
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 450, marginBottom: 28 }}>
            Click Analyze with AI to query the orchestrator and generate intelligent recommendations and health alerts.
          </p>
          <button
            onClick={analyzeWithAI}
            disabled={generatingAI}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontWeight: 600,
              cursor: generatingAI ? 'not-allowed' : 'pointer',
              opacity: generatingAI ? 0.75 : 1,
              boxShadow: 'var(--shadow-glow-cyan)'
            }}
          >
            {generatingAI ? 'Generating AI Analysis...' : 'Analyze with AI'}
          </button>
        </div>
      </motion.div>
    );
  }

  // If AI analysis exists, render cards
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        title="AI Pollution Analysis"
        subtitle={`Deep learning–powered insights for ${currentCityName}`}
        badge="AI Engine"
      />

      {/* ===== AI Summary ===== */}
      <div style={{ marginBottom: 28 }}>
        <AIAnalysisCard
          title="Overall AI Summary"
          content={analysisData.summary}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
        marginBottom: 28,
      }}>
        {/* ===== Drivers & Impact ===== */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, color: '#fff' }}>
            Pollution Drivers
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
            {analysisData.aqiIncrease.reason}
          </p>

          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: 12 }}>
            Dominant Pollutants
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {analysisData.dominantPollutants.map((pol) => (
              <div key={pol.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{pol.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Limit: {pol.limit}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ef4444' }}>{pol.value}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{pol.percentage}% limit</div>
                  </div>
                  {getTrendIcon(pol.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Source Attribution ===== */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, color: '#fff' }}>
            Source Attribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {analysisData.sourceAttribution.map((source) => (
              <div key={source.source}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 6 }}>
                  <span style={{ fontWeight: 500 }}>{source.source}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{source.percentage}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${source.percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                    borderRadius: 3
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Action Plans Section ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Municipal Recommendations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(249, 115, 22, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}>
              🏢
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Municipal Recommendations
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Action items for local administrative authorities
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {analysisData.municipalRecommendations.map((rec, i) => (
              <RecommendationCard
                key={rec.id}
                title={rec.title}
                description={rec.description}
                priority={rec.priority}
                icon={rec.icon}
                impact={rec.impact}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Health Advisories List */}
        <HealthCard advisories={analysisData.healthAdvisory} />
      </div>
    </motion.div>
  );
}
