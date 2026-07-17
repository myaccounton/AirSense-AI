import { motion } from 'framer-motion';
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

/**
 * Dashboard Page — Main analytics dashboard with all data visualizations
 */
export default function Dashboard() {
  const { aqiData, weatherData, analysisData, loading } = useMockData();

  if (loading || !aqiData || !weatherData || !analysisData) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle
        title="Air Quality Dashboard"
        subtitle="Real-time monitoring and analytics for New Delhi"
        badge="Live"
      />

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
          score={analysisData.riskLevel.score}
          level={analysisData.riskLevel.level}
          description={analysisData.riskLevel.description}
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

      {/* ===== Map Section ===== */}
      <MapCard locations={aqiData.mapLocations} />
    </motion.div>
  );
}
