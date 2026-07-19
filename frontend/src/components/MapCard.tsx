import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { MapLocation } from '../types';

interface MapCardProps {
  locations: MapLocation[];
}

/**
 * MapCard — Interactive Leaflet map showing AQI markers, hotspots, and risk zone boundaries
 */
export default function MapCard({ locations }: MapCardProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Cleanup map container only on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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

      if (mapRef.current) {
        const centerLat = locations[0]?.lat || 28.6139;
        const centerLng = locations[0]?.lng || 77.209;

        if (!mapInstanceRef.current) {
          // Initialize map centered on current location
          const map = L.map(mapRef.current, {
            zoomControl: false,
          }).setView([centerLat, centerLng], 12);

          // Dark tile layer
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© CartoDB',
            maxZoom: 19,
          }).addTo(map);

          // Add zoom control to bottom-right
          L.control.zoom({ position: 'bottomright' }).addTo(map);
          mapInstanceRef.current = map;
        } else {
          // Pan/zoom map view dynamically to new city location coordinates
          mapInstanceRef.current.setView([centerLat, centerLng], 12);

          // Remove previous markers/layers
          mapInstanceRef.current.eachLayer((layer) => {
            if (layer instanceof L.CircleMarker || layer instanceof L.Circle) {
              mapInstanceRef.current?.removeLayer(layer);
            }
          });
        }

        const mapInstance = mapInstanceRef.current!;

        // Add overlays for each location
        locations.forEach((loc) => {
          // 1. Draw Risk Zone (Larger boundary circle)
          const riskColor = 
            loc.riskZone.toLowerCase() === 'high' ? '#ef4444' : 
            loc.riskZone.toLowerCase() === 'medium' ? '#f97316' : '#22c55e';
          
          const riskZoneCircle = L.circle([loc.lat, loc.lng], {
            radius: 1200, // 1.2km radius boundary
            color: riskColor,
            weight: 1.5,
            fillColor: riskColor,
            fillOpacity: 0.12,
            dashArray: '5, 5'
          }).addTo(mapInstance);

          riskZoneCircle.bindTooltip(`Risk Level: ${loc.riskZone}`, { sticky: true });

          // 2. Draw AQI Center Marker
          const aqiMarker = L.circleMarker([loc.lat, loc.lng], {
            radius: 10,
            fillColor: loc.color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(mapInstance);

          aqiMarker.bindPopup(`
            <div style="font-family: Inter, sans-serif; min-width: 170px;">
              <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 8px; color: #f1f5f9;">${loc.name}</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #94a3b8; font-size: 0.8rem;">AQI</span>
                <span style="font-weight: 700; color: ${loc.color}; font-size: 0.9rem;">${loc.aqi} (${loc.status})</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #94a3b8; font-size: 0.8rem;">Risk Assessment</span>
                <span style="font-weight: 600; color: ${riskColor}; font-size: 0.8rem;">${loc.riskZone} Risk</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #94a3b8; font-size: 0.8rem;">Local Hotspot</span>
                <span style="font-weight: 600; color: #a855f7; font-size: 0.8rem;">${loc.hotspot}</span>
              </div>
            </div>
          `);

          // 3. Draw Hotspot Marker (if present)
          if (loc.hotspot && loc.hotspot.toLowerCase() !== 'none' && loc.hotspot !== 'FALSE') {
            // Hotspot coordinates offset slightly to be distinct
            const hotspotMarker = L.circleMarker([loc.lat + 0.003, loc.lng - 0.003], {
              radius: 6,
              fillColor: '#a855f7', // Purple indicator for hotspots
              color: '#fff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.9,
            }).addTo(mapInstance);

            hotspotMarker.bindTooltip(`Hotspot: ${loc.hotspot}`, { permanent: false });
          }
        });
      }
    });
  }, [locations]);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '24px', overflow: 'hidden', marginTop: '24px' }}
    >
      <h3 style={{
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 16,
      }}>
        Interactive AQI & Environmental Risk Map
      </h3>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: 20,
        marginBottom: 16,
        flexWrap: 'wrap',
        fontSize: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#a855f7' }} />
          <span style={{ color: 'var(--text-muted)' }}>Hotspot Indicator</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px dashed #ef4444', background: 'rgba(239, 68, 68, 0.12)' }} />
          <span style={{ color: 'var(--text-muted)' }}>High Risk Boundary</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px dashed #f97316', background: 'rgba(249, 117, 22, 0.12)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Medium Risk Boundary</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px dashed #22c55e', background: 'rgba(34, 197, 94, 0.12)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Low Risk Boundary</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24', border: '1.5px solid #fff' }} />
          <span style={{ color: 'var(--text-muted)' }}>AQI Center</span>
        </div>
      </div>

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
