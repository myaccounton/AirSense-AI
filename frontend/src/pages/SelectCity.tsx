import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HiMagnifyingGlass, HiMapPin } from 'react-icons/hi2';
import LoadingScreen from '../components/LoadingScreen';

// Supported default popular cities
const POPULAR_CITIES = [
  'Delhi', 'Mumbai', 'Pune', 'Bengaluru',
  'Hyderabad', 'Ahmedabad', 'Jaipur',
  'Lucknow', 'Kolkata', 'Chennai'
];

export default function SelectCity() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/cities');
        // Our backend retrieves { success: true, data: [...] }
        if (data && data.success && Array.isArray(data.data)) {
          setCities(data.data);
        } else {
          setCities(POPULAR_CITIES);
        }
      } catch (err) {
        console.error('Failed to fetch cities from API, falling back to popular list:', err);
        setCities(POPULAR_CITIES);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCity = (city: string) => {
    // Save to localStorage for back-compatibility
    localStorage.setItem('selectedCity', city);
    navigate(`/dashboard/${city}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #0f172a 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 24px',
      color: 'var(--text-primary)'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        width: 320,
        height: 320,
        background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: 640,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20,
          padding: '40px 32px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            padding: 12,
            borderRadius: 12,
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            color: '#06b6d4',
            marginBottom: 16
          }}>
            <HiMapPin size={28} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>
            Select a City
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Choose a city to explore its environmental conditions.
          </p>
        </div>

        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 12,
          marginBottom: 32
        }}>
          <HiMagnifyingGlass size={20} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Type to search cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '1rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* City Results / Grid */}
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: 16 }}>
            Popular Cities
          </h3>
          
          {filteredCities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
              No cities match "{search}"
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: 12
            }}>
              {filteredCities.map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectCity(city)}
                  style={{
                    padding: '16px 12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 12,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'border 0.2s'
                  }}
                >
                  {city}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
