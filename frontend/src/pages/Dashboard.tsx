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
import MapCard from '../components/MapCard';
import SectionTitle from '../components/SectionTitle';
import { BarChart, Bar, Cell, PieChart, Pie, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  // 1. Weekly AQI Forecast mapping
  const weeklyAQIData = weatherData.forecast.map((item) => ({
    day: item.day,
    aqi: item.aqi || 100,
  }));

  // 2. Pollutant Distribution mapping
  const pollutantDistributionData = [
    { name: 'PM2.5', value: aqiData.current.pollutants.pm25, fill: '#ef4444' },
    { name: 'PM10', value: aqiData.current.pollutants.pm10, fill: '#f97316' },
    { name: 'NO2', value: aqiData.current.pollutants.no2, fill: '#eab308' },
    { name: 'CO', value: aqiData.current.pollutants.co, fill: '#3b82f6' },
    { name: 'SO2', value: aqiData.current.pollutants.so2, fill: '#06b6d4' },
    { name: 'O3', value: aqiData.current.pollutants.o3, fill: '#10b981' },
  ];

  // 3. Source Attribution mapping (falls back to defaults if AI analysis isn't loaded yet)
  const defaultAttribution = [
    { name: 'Traffic', value: 50, fill: '#3b82f6' },
    { name: 'Construction', value: 30, fill: '#f97316' },
    { name: 'Industry', value: 20, fill: '#ef4444' },
  ];
  const attributionData = analysisData
    ? analysisData.sourceAttribution.map((source) => ({
        name: source.source,
        value: source.percentage,
        fill: source.source.toLowerCase().includes('traffic') ? '#3b82f6' :
              source.source.toLowerCase().includes('construction') ? '#f97316' : '#ef4444'
      }))
    : defaultAttribution;

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
        <SectionTitle title="Advanced Analytics & Trends" subtitle="Detailed pollution indicators and forecasting" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 20,
        }}>
          {/* AQI Trend (Line) */}
          <TrendChart title="AQI Trend" data={aqiData.trends.aqi} color="#3b82f6" unit="AQI" />

          {/* Weekly AQI Forecast (Bar) */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '24px' }}
          >
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              Weekly AQI Forecast
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyAQIData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(8px)' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{payload[0].value} AQI</p>
                    </div>
                  );
                }} />
                <Bar dataKey="aqi" radius={[4, 4, 0, 0]}>
                  {weeklyAQIData.map((entry, index) => {
                    const color = entry.aqi > 300 ? '#ef4444' : entry.aqi > 200 ? '#f97316' : '#eab308';
                    return <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pollutant Distribution (Bar) */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '24px' }}
          >
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              Pollutant Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pollutantDistributionData} layout="vertical" margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(8px)' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{payload[0].value} {label === 'CO' ? 'mg/m³' : 'µg/m³'}</p>
                    </div>
                  );
                }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {pollutantDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pollution Sources (Pie) */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '24px' }}
          >
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Primary Pollution Sources
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={attributionData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(8px)' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{payload[0].name}</p>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{payload[0].value}% Contribution</p>
                    </div>
                  );
                }} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 11, fill: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* ===== Map Section ===== */}
      <MapCard locations={aqiData.mapLocations} />
    </motion.div>
  );
}
