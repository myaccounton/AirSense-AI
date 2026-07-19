import { useState } from 'react';
import { motion } from 'framer-motion';
import { analysisService } from '../../services/analysisService';
import type { ScenarioPrediction } from '../../types';

interface Props {
  city: string;
}

const SCENARIOS = [
  "Reduce Traffic 20%",
  "Increase Rainfall",
  "Stop Construction",
  "Increase Wind Speed",
  "Reduce Industry Emissions"
];

export default function ScenarioSimulator({ city }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScenarioPrediction | null>(null);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const handleSimulate = async (scenario: string) => {
    setLoading(true);
    setActiveScenario(scenario);
    try {
      const res = await analysisService.simulateScenario(city, scenario);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{ padding: '24px', marginBottom: '24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '20px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          🕹️
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#fff' }}>Scenario Simulator</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Predict future AQI by simulating interventions</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
        {SCENARIOS.map(s => (
          <button
            key={s}
            onClick={() => handleSimulate(s)}
            disabled={loading}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${activeScenario === s ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)'}`,
              background: activeScenario === s ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeScenario === s ? '#fff' : 'var(--text-secondary)',
              cursor: loading ? 'wait' : 'pointer',
              fontSize: '0.85rem',
              fontWeight: activeScenario === s ? 600 : 400,
              transition: 'all 0.2s'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 10px auto' }}></div>
          Simulating atmospheric impact...
        </div>
      )}

      {!loading && result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Simulated Action: <span style={{ color: '#fff', fontWeight: 600 }}>{result.action}</span></span>
            <div style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
              Future AQI: {result.futureAQI}
            </div>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '4px' }}>Improvement</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{result.improvement}</div>
          </div>
          
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>AI Explanation</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{result.explanation}</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
