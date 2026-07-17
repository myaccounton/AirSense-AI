import { motion } from 'framer-motion';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import SectionTitle from '../components/SectionTitle';
import AIAnalysisCard from '../components/AIAnalysisCard';
import RecommendationCard from '../components/RecommendationCard';
import HealthCard from '../components/HealthCard';
import StatusBadge from '../components/StatusBadge';
import { getPriorityColor } from '../utils';
import { HiArrowTrendingUp, HiArrowTrendingDown, HiMinus } from 'react-icons/hi2';

/**
 * Analysis Page — AI-powered pollution analysis and recommendations
 */
export default function Analysis() {
  const { analysisData, loading } = useMockData();

  if (loading || !analysisData) {
    return <LoadingScreen />;
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return <HiArrowTrendingUp size={14} color="#ef4444" />;
    if (trend === 'falling') return <HiArrowTrendingDown size={14} color="#22c55e" />;
    return <HiMinus size={14} color="#eab308" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        title="AI Pollution Analysis"
        subtitle="Deep learning–powered insights into current air quality conditions"
        badge="AI Engine"
      />

      {/* ===== AI Summary ===== */}
      <div style={{ marginBottom: 28 }}>
        <AIAnalysisCard
          title="Overall AI Summary"
          content={analysisData.summary}
        />
      </div>

      {/* ===== Why AQI Increased ===== */}
      <div style={{ marginBottom: 28 }}>
        <AIAnalysisCard
          title="Why AQI Increased"
          content={analysisData.aqiIncrease.reason}
          confidence={analysisData.aqiIncrease.confidence}
        />
      </div>

      {/* ===== Dominant Pollutants ===== */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          🧪 Dominant Pollutants
        </h3>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {analysisData.dominantPollutants.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      minWidth: 50,
                    }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {p.value} / {p.limit} (WHO limit)
                    </span>
                    {getTrendIcon(p.trend)}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {p.percentage}%
                  </span>
                </div>
                <div style={{
                  height: 8,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    style={{
                      height: '100%',
                      borderRadius: 999,
                      background: p.percentage > 70
                        ? 'linear-gradient(90deg, #ef4444, #f97316)'
                        : p.percentage > 40
                          ? 'linear-gradient(90deg, #eab308, #f97316)'
                          : 'linear-gradient(90deg, #22c55e, #06b6d4)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Source Attribution ===== */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          🏭 Source Attribution
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}>
          {analysisData.sourceAttribution.map((source, i) => (
            <motion.div
              key={source.source}
              className="glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '20px',
                textAlign: 'center',
                cursor: 'default',
              }}
            >
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8,
              }}>
                {source.percentage}%
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {source.source}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== Risk Level ===== */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          ⚠️ Risk Assessment
        </h3>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `${getPriorityColor(analysisData.riskLevel.level)}15`,
            border: `2px solid ${getPriorityColor(analysisData.riskLevel.level)}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: getPriorityColor(analysisData.riskLevel.level),
            }}>
              {analysisData.riskLevel.score}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Risk Level</h4>
              <StatusBadge label={analysisData.riskLevel.level} color={getPriorityColor(analysisData.riskLevel.level)} />
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {analysisData.riskLevel.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ===== Municipal Recommendations ===== */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          🏛️ Municipal Recommendations
        </h3>
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
      </div>

      {/* ===== Health Advisory ===== */}
      <HealthCard advisories={analysisData.healthAdvisory} />
    </motion.div>
  );
}
