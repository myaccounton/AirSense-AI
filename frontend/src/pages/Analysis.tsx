import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import SectionTitle from '../components/SectionTitle';
import ExecutiveBriefCard from '../components/dashboard/ExecutiveBriefCard';
import ConfidenceCard from '../components/dashboard/ConfidenceCard';
import RootCauseCard from '../components/dashboard/RootCauseCard';
import ScenarioSimulator from '../components/dashboard/ScenarioSimulator';
import RecommendationImpactCard from '../components/dashboard/RecommendationImpactCard';
import PredictionTimeline from '../components/dashboard/PredictionTimeline';
import CitizenRiskCard from '../components/dashboard/CitizenRiskCard';
import AITransparencyCard from '../components/dashboard/AITransparencyCard';
import { HiCpuChip } from 'react-icons/hi2';

/**
 * Analysis Page — AI-powered decision support platform
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
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', color: 'var(--text-primary)', padding: '24px', textAlign: 'center'
      }}>
        <h2 style={{ color: '#ef4444', marginBottom: 12, fontWeight: 600 }}>API Error</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 450 }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none',
            borderRadius: 8, color: '#fff', fontWeight: 600, cursor: 'pointer'
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const currentCityName = city || 'Delhi';

  if (!analysisData) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <SectionTitle
          title="AI Decision Support Platform"
          subtitle={`Advanced analytics for ${currentCityName}`}
          badge="AI Engine"
        />

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '80px 32px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20, textAlign: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            display: 'inline-flex', padding: 16, borderRadius: 16, background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)', color: '#8b5cf6', marginBottom: 20
          }}>
            <HiCpuChip size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>
            Analysis Not Generated
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 450, marginBottom: 28 }}>
            Query the Groq orchestrator to generate full decision support analytics and actionable intervention plans.
          </p>
          <button
            onClick={analyzeWithAI} disabled={generatingAI}
            style={{
              padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none',
              borderRadius: 8, color: '#fff', fontWeight: 600, cursor: generatingAI ? 'not-allowed' : 'pointer',
              opacity: generatingAI ? 0.75 : 1, boxShadow: 'var(--shadow-glow-cyan)'
            }}
          >
            {generatingAI ? 'Generating Full AI Support Dashboard...' : 'Initialize AI Orchestrator'}
          </button>
        </div>
      </motion.div>
    );
  }

  // Ensure all data structures exist before rendering to prevent UI crashes if backend hasn't updated yet
  if (!analysisData.executiveSummary || !analysisData.rootCauseAnalysis) {
    return <LoadingScreen />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SectionTitle
        title="AI Decision Support Platform"
        subtitle={`Advanced analytics and intervention planning for ${currentCityName}`}
        badge="Groq Powered"
      />

      <div style={{ marginBottom: 28 }}>
        <ExecutiveBriefCard data={analysisData.executiveSummary} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginBottom: 28 }}>
        <RootCauseCard causes={analysisData.rootCauseAnalysis} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ConfidenceCard data={analysisData.confidence} />
          <PredictionTimeline timeline={analysisData.predictionTimeline} />
        </div>
      </div>

      <ScenarioSimulator city={currentCityName} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 28 }}>
        <RecommendationImpactCard recs={analysisData.recommendations} />
        <CitizenRiskCard advisories={analysisData.citizenAdvice} />
      </div>

      <AITransparencyCard />
    </motion.div>
  );
}
