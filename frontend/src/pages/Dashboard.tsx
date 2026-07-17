import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import AQICard from '../components/AQICard';
import WeatherCard from '../components/WeatherCard';
import PollutantCard from '../components/PollutantCard';
import TrendChart from '../components/TrendChart';
import ForecastCard from '../components/ForecastCard';
import RiskMeter from '../components/RiskMeter';
import SectionTitle from '../components/SectionTitle';

/**
 * Dashboard Page — Main analytics dashboard with parameterized city resolution
 */
export default function Dashboard() {
  const { city } = useParams();
  const {
    aqiData,
    weatherData,
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

  // Only block on basic environmental stats (DO NOT block on analysisData)
  if (loading || !aqiData || !weatherData) {
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
        title="Air Quality Dashboard"
        subtitle={`Real-time monitoring and analytics for ${currentCityName}`}
        badge="Live"
      />

      {/* AI Analysis Trigger Banner */}
      <div style={{
        padding: '20px 24px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: 16,
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>AI Engine Insights</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {analysisData ? 'AI Analysis generated successfully.' : 'Click Analyze with AI to generate intelligent insights.'}
          </p>
        </div>
        <button
          onClick={analyzeWithAI}
          disabled={generatingAI || !!analysisData}
          style={{
            padding: '10px 20px',
            background: analysisData ? 'rgba(34, 197, 94, 0.15)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            border: analysisData ? '1px solid rgba(34, 197, 94, 0.3)' : 'none',
            borderRadius: 8,
            color: analysisData ? '#22c55e' : '#fff',
            fontWeight: 600,
            cursor: generatingAI || analysisData ? 'not-allowed' : 'pointer',
            opacity: generatingAI ? 0.7 : 1,
            boxShadow: analysisData ? 'none' : 'var(--shadow-glow-cyan)'
          }}
        >
          {generatingAI ? 'Generating AI Analysis...' : analysisData ? 'Analysis Generated ✓' : 'Analyze with AI'}
        </button>
      </div>

      {/* ===== Top Cards Row ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        marginBottom: 24,
      }}>
        <AQICard
          aqi={aqiData.current.aqi}
          category={aqiData.current.category}
          dominantPollutant={aqiData.current.dominantPollutant}
          lastUpdated={aqiData.current.lastUpdated}
        />
        <WeatherCard weather={weatherData.current} />
        <PollutantCard pollutants={aqiData.current.pollutants} />
      </div>

      {/* ===== Risk + Forecast Row ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        marginBottom: 24,
      }}>
        <RiskMeter
          score={analysisData ? analysisData.riskLevel.score : 0}
          level={analysisData ? analysisData.riskLevel.level : 'Unknown'}
          description={analysisData ? analysisData.riskLevel.description : 'Click Analyze with AI to estimate current risk exposure.'}
        />
        <ForecastCard forecast={aqiData.forecast} />
      </div>

      {/* ===== Charts Section ===== */}
      <div style={{ marginBottom: 24 }}>
        <SectionTitle title="Trend Analysis" subtitle="7-day pollutant trends" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 20,
        }}>
          <TrendChart title="AQI Trend" data={aqiData.trends.aqi} color="#3b82f6" unit="AQI" />
          <TrendChart title="PM2.5 Trend" data={aqiData.trends.pm25} color="#ef4444" unit="µg/m³" />
          <TrendChart title="PM10 Trend" data={aqiData.trends.pm10} color="#f97316" unit="µg/m³" />
          <TrendChart title="NO₂ Trend" data={aqiData.trends.no2} color="#eab308" unit="ppb" />
        </div>
      </div>
    </motion.div>
  );
}
