import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { MapLocation } from '../types';

interface MapCardProps {
  locations: MapLocation[];
}

/**
 * MapCard — Interactive Leaflet map with colored AQI markers
 * Uses dynamic import to avoid SSR issues with Leaflet
 */
export default function MapCard({ locations }: MapCardProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Import leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize map centered on New Delhi
        const map = L.map(mapRef.current, {
          zoomControl: false,
        }).setView([28.6139, 77.209], 12);

        // Dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '© CartoDB',
          maxZoom: 19,
        }).addTo(map);

        // Add zoom control to bottom-right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Add colored circle markers for each location
        locations.forEach((loc) => {
          const marker = L.circleMarker([loc.lat, loc.lng], {
            radius: 10,
            fillColor: loc.color,
            color: loc.color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4,
          }).addTo(map);

          // Custom popup
          marker.bindPopup(`
            <div style="font-family: Inter, sans-serif; min-width: 160px;">
              <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 8px; color: #f1f5f9;">${loc.name}</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #94a3b8; font-size: 0.8rem;">AQI</span>
                <span style="font-weight: 700; color: ${loc.color}; font-size: 0.9rem;">${loc.aqi}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #94a3b8; font-size: 0.8rem;">Pollutant</span>
                <span style="font-weight: 600; color: #f1f5f9; font-size: 0.8rem;">${loc.pollutant}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #94a3b8; font-size: 0.8rem;">Status</span>
                <span style="font-weight: 600; color: ${loc.color}; font-size: 0.8rem;">${loc.status}</span>
              </div>
            </div>
          `);

          // Animate marker with pulsing effect using CSS
          const markerEl = marker.getElement() as HTMLElement | undefined;
          if (markerEl) {
            markerEl.style.transition = 'all 0.3s ease';
            markerEl.addEventListener('mouseenter', () => {
              markerEl.style.transform = `${markerEl.style.transform || ''} scale(1.3)`;
            });
            markerEl.addEventListener('mouseleave', () => {
              markerEl.style.transform = markerEl.style.transform.replace('scale(1.3)', '');
            });
          }
        });

        mapInstanceRef.current = map;
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations]);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '24px', overflow: 'hidden' }}
    >
      <h3 style={{
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 16,
      }}>
        Interactive Pollution Map
      </h3>

      {/* Map Legend */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 12,
        flexWrap: 'wrap',
      }}>
        {[
          { color: '#22c55e', label: 'Good' },
          { color: '#eab308', label: 'Moderate' },
          { color: '#f97316', label: 'Poor' },
          { color: '#ef4444', label: 'Very Poor' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: item.color,
              boxShadow: `0 0 6px ${item.color}50`,
            }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: 400,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />
    </motion.div>
  );
}
