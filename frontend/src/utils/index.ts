import type { AQICategory } from '../types';

/**
 * Returns the color associated with an AQI category
 */
export function getAQIColor(category: AQICategory | string): string {
  switch (category) {
    case 'Good': return '#22c55e';
    case 'Moderate': return '#eab308';
    case 'Poor': return '#f97316';
    case 'Very Poor': return '#ef4444';
    case 'Severe': return '#a855f7';
    default: return '#64748b';
  }
}

/**
 * Returns the AQI category for a given AQI value
 */
export function getAQICategory(aqi: number): AQICategory {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 200) return 'Poor';
  if (aqi <= 300) return 'Very Poor';
  return 'Severe';
}

/**
 * Returns the background gradient for an AQI category
 */
export function getAQIGradient(category: AQICategory | string): string {
  switch (category) {
    case 'Good': return 'linear-gradient(135deg, #22c55e, #10b981)';
    case 'Moderate': return 'linear-gradient(135deg, #eab308, #f59e0b)';
    case 'Poor': return 'linear-gradient(135deg, #f97316, #ea580c)';
    case 'Very Poor': return 'linear-gradient(135deg, #ef4444, #dc2626)';
    case 'Severe': return 'linear-gradient(135deg, #a855f7, #9333ea)';
    default: return 'linear-gradient(135deg, #64748b, #475569)';
  }
}

/**
 * Format date to locale string
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Priority badge color
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'Critical': return '#ef4444';
    case 'High': return '#f97316';
    case 'Medium': return '#eab308';
    case 'Low': return '#22c55e';
    default: return '#64748b';
  }
}
