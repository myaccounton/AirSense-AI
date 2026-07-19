import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import LoadingScreen from '../components/LoadingScreen';
import SectionTitle from '../components/SectionTitle';
import { formatDate } from '../utils';
import { HiDocumentArrowDown, HiPrinter, HiDocumentText } from 'react-icons/hi2';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Import our new AI Decision Support components to reuse in the report
import ExecutiveBriefCard from '../components/dashboard/ExecutiveBriefCard';
import ConfidenceCard from '../components/dashboard/ConfidenceCard';
import RootCauseCard from '../components/dashboard/RootCauseCard';
import RecommendationImpactCard from '../components/dashboard/RecommendationImpactCard';
import PredictionTimeline from '../components/dashboard/PredictionTimeline';
import CitizenRiskCard from '../components/dashboard/CitizenRiskCard';

/**
 * Reports Page — Professional AI decision support report preview
 */
export default function Reports() {
  const { city } = useParams();
  const { reportData, loading, error } = useMockData(city);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

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

  const handleDownloadPDF = async () => {
    if (!reportData || !page1Ref.current || !page2Ref.current || !page3Ref.current) return;
    
    try {
      setDownloading(true);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const pages = [page1Ref.current, page2Ref.current, page3Ref.current];

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0b1121'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (i > 0) pdf.addPage();
        
        // Fill the page background with the dark theme color
        pdf.setFillColor(11, 17, 33); // #0b1121
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      }
      
      const fileName = `AirSense_Report_${reportData.city.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Failed to generate PDF', err);
      alert('Failed to generate PDF. Please try printing instead.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SectionTitle
        title="AI Intervention Report"
        subtitle={`Compiled intelligence brief for ${currentCityName}`}
        badge="Auto-Generated"
      />

      {!reportData || !reportData.executiveSummary ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '80px 24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20, textAlign: 'center', backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            display: 'inline-flex', padding: 16, borderRadius: 16, background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', marginBottom: 20
          }}>
            <HiDocumentText size={32} />
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>
            Generate AI Analysis First
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 450 }}>
            Please navigate to the Dashboard and query the Groq orchestrator to compile the decision support report.
          </p>
        </div>
      ) : (
        <>
          {/* Action Buttons Container (Outside of PDF content) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 20 }}>
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, cursor: downloading ? 'wait' : 'pointer', opacity: downloading ? 0.7 : 1 }}
              onClick={handleDownloadPDF}
              disabled={downloading}
            >
              <HiDocumentArrowDown size={18} /> {downloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              className="btn-secondary"
              style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => window.print()}
            >
              <HiPrinter size={18} /> Print
            </button>
          </div>

          {/* Report Content to capture for PDF */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', background: 'var(--bg-main)', borderRadius: '12px' }}>
            
            {/* PAGE 1 */}
            <div ref={page1Ref} style={{ padding: '20px', background: '#0b1121' }}>
              <div className="glass-card" style={{ padding: '28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Report ID</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent-cyan)', marginBottom: 12 }}>
                      {reportData.reportId}
                    </div>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>City</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reportData.city}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Region</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reportData.state || reportData.region || "India"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Generated</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{formatDate(reportData.generatedAt)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Model</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Groq Llama 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '10px 0 0 0', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  1. Executive Overview
                </h2>
                <ExecutiveBriefCard data={reportData.executiveSummary} />

                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '20px 0 0 0', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  2. Data Reliability & Confidence
                </h2>
                <ConfidenceCard data={reportData.confidence} />
              </div>
            </div>

            {/* PAGE 2 */}
            <div ref={page2Ref} style={{ padding: '20px', background: '#0b1121' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '10px 0 0 0', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  3. Etiology (Root Cause)
                </h2>
                <RootCauseCard causes={reportData.rootCauseAnalysis} />

                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '20px 0 0 0', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  4. Short-term Progression
                </h2>
                <PredictionTimeline timeline={reportData.predictionTimeline} />
              </div>
            </div>

            {/* PAGE 3 */}
            <div ref={page3Ref} style={{ padding: '20px', background: '#0b1121' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '10px 0 0 0', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  5. Proposed Interventions
                </h2>
                <RecommendationImpactCard recs={reportData.recommendations} />

                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '20px 0 0 0', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  6. Citizen Protection Directives
                </h2>
                <CitizenRiskCard advisories={reportData.citizenAdvice} />
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
