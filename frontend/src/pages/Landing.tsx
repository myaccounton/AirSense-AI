import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiChartBar, HiCpuChip, HiShieldCheck, HiDocumentText, HiBolt, HiHeart } from 'react-icons/hi2';
import { WiDayCloudyGusts } from 'react-icons/wi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ===== Feature data =====
const features = [
  { icon: <HiChartBar size={24} />, title: 'Live AQI Monitoring', description: 'Real-time air quality tracking across multiple city zones with color-coded severity mapping.', color: '#22c55e' },
  { icon: <WiDayCloudyGusts size={28} />, title: 'Weather Intelligence', description: 'Integrated meteorological data correlating weather patterns with pollution dispersion.', color: '#3b82f6' },
  { icon: <HiCpuChip size={24} />, title: 'AI Pollution Analysis', description: 'Deep learning models identify root causes, attribute sources, and predict AQI trends.', color: '#8b5cf6' },
  { icon: <HiShieldCheck size={24} />, title: 'Municipal Recommendations', description: 'Actionable intelligence for city authorities to implement targeted pollution control.', color: '#f97316' },
  { icon: <HiHeart size={24} />, title: 'Citizen Health Advisory', description: 'Personalized health alerts for vulnerable groups based on real-time exposure risk.', color: '#ef4444' },
  { icon: <HiDocumentText size={24} />, title: 'AI Report Generation', description: 'Comprehensive daily reports with forecasts, analysis, and recommended actions.', color: '#06b6d4' },
];

// ===== Timeline steps =====
const timeline = [
  { step: '01', label: 'Live AQI', desc: 'Real-time monitoring sensors collect air quality data', color: '#22c55e' },
  { step: '02', label: 'Weather', desc: 'Meteorological conditions are analyzed for impact', color: '#3b82f6' },
  { step: '03', label: 'AI Analysis', desc: 'Machine learning models process and correlate data', color: '#8b5cf6' },
  { step: '04', label: 'Recommendations', desc: 'Targeted actions generated for city authorities', color: '#f97316' },
  { step: '05', label: 'Health Advisory', desc: 'Personalized alerts dispatched to citizens', color: '#ef4444' },
  { step: '06', label: 'Reports', desc: 'Comprehensive reports generated automatically', color: '#06b6d4' },
];

/**
 * Landing Page — Premium hero with animated background
 */
export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background gradient */}
        <div className="animate-gradient" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0a0e1a 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #0a0e1a 100%)',
          backgroundSize: '400% 400%',
          zIndex: 0,
        }} />

        {/* Floating blurred circles */}
        <motion.div
          className="animate-float"
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />
        <motion.div
          className="animate-float-delayed"
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '40%',
            right: '30%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
            filter: 'blur(50px)',
            zIndex: 1,
          }}
        />

        {/* Particle dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30 - Math.random() * 30, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: 'absolute',
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
              borderRadius: '50%',
              background: ['#06b6d4', '#3b82f6', '#8b5cf6', '#22c55e'][Math.floor(Math.random() * 4)],
              zIndex: 1,
            }}
          />
        ))}

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              marginBottom: 24,
            }}
          >
            <HiBolt size={14} color="#06b6d4" />
            <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 500 }}>
              Powered by Advanced AI
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="gradient-text">AI-Powered</span>
            {' '}Urban Air Quality{' '}
            <span className="gradient-text">Intelligence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 620,
              margin: '0 auto 36px',
            }}
          >
            Helping Smart Cities monitor, predict and improve air quality using AI-powered environmental intelligence.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/select-city" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore Dashboard <HiArrowRight size={16} />
            </Link>
            <Link to="/select-city" className="btn-secondary" style={{ textDecoration: 'none' }}>
              View Reports
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              marginTop: 60,
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '9+', label: 'Monitoring Zones' },
              { value: '6', label: 'Pollutants Tracked' },
              { value: '24/7', label: 'AI Analysis' },
              { value: '87%', label: 'Prediction Accuracy' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <span style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--accent-cyan)',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Features
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
              Intelligence at Every Level
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
              A comprehensive platform combining real-time monitoring, AI analysis, and actionable recommendations.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '28px',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  marginBottom: 16,
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — TIMELINE ===== */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <span style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--accent-green)',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              How It Works
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
              From Data to Action
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
              Our AI pipeline transforms raw environmental data into actionable intelligence in real-time.
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            maxWidth: 600,
            margin: '0 auto',
          }}>
            {timeline.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
              >
                <div className="glass-card" style={{
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  width: '100%',
                  cursor: 'default',
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: item.color,
                    flexShrink: 0,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>

                {/* Connector Line */}
                {i < timeline.length - 1 && (
                  <div style={{
                    width: 2,
                    height: 32,
                    background: `linear-gradient(180deg, ${item.color}40, ${timeline[i + 1].color}40)`,
                    borderRadius: 999,
                  }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container-max" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '60px 40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 400,
              height: 200,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))',
              filter: 'blur(60px)',
            }} />

            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12, position: 'relative' }}>
              Ready to breathe smarter?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.6, position: 'relative' }}>
              Explore our live dashboard and see AI-powered air quality intelligence in action.
            </p>
            <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none', position: 'relative' }}>
              Get Started <HiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
