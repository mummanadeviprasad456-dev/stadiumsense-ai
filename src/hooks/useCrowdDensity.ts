'use client';
import { useState, useCallback, useMemo } from 'react';
import { CrowdDensity, GateStatus } from '../types';

/**
 * useCrowdDensity — Simulates crowd density across gates.
 * Provides waiting time estimates, rerouting recommendations, and heatmap colors.
 */
export function useCrowdDensity() {
  const [density, setDensity] = useState<CrowdDensity>('medium');

  const gateData: Record<CrowdDensity, GateStatus[]> = useMemo(() => ({
    low: [
      { id: 'A', name: 'Gate A (North)', status: 'open', density: 'low', waitTime: 2, recommendedRoute: 'Use Gate A – Clear entry.' },
      { id: 'B', name: 'Gate B (East)', status: 'open', density: 'low', waitTime: 1, recommendedRoute: 'Use Gate B – Fastest route.' },
      { id: 'C', name: 'Gate C (South)', status: 'open', density: 'low', waitTime: 3, recommendedRoute: 'Use Gate C – Standard entry.' },
      { id: 'D', name: 'Gate D (West)', status: 'open', density: 'low', waitTime: 2, recommendedRoute: 'Use Gate D – Open access.' },
      { id: 'E', name: 'Gate E (VIP)', status: 'open', density: 'low', waitTime: 0, recommendedRoute: 'VIP Gate E – Priority access.' },
    ],
    medium: [
      { id: 'A', name: 'Gate A (North)', status: 'congested', density: 'medium', waitTime: 12, recommendedRoute: 'Moderate wait. Consider Gate B.' },
      { id: 'B', name: 'Gate B (East)', status: 'open', density: 'low', waitTime: 5, recommendedRoute: 'Gate B is clear – Recommended.' },
      { id: 'C', name: 'Gate C (South)', status: 'open', density: 'medium', waitTime: 8, recommendedRoute: 'Gate C has medium traffic.' },
      { id: 'D', name: 'Gate D (West)', status: 'congested', density: 'medium', waitTime: 14, recommendedRoute: 'Reroute via Gate E or B.' },
      { id: 'E', name: 'Gate E (VIP)', status: 'open', density: 'low', waitTime: 1, recommendedRoute: 'VIP Gate E – Priority entry.' },
    ],
    high: [
      { id: 'A', name: 'Gate A (North)', status: 'congested', density: 'high', waitTime: 28, recommendedRoute: '⚠️ Avoid Gate A. Reroute to Gate C.' },
      { id: 'B', name: 'Gate B (East)', status: 'congested', density: 'high', waitTime: 22, recommendedRoute: '⚠️ High delay. Try Gate C or E.' },
      { id: 'C', name: 'Gate C (South)', status: 'open', density: 'medium', waitTime: 10, recommendedRoute: '✅ Best option under high density.' },
      { id: 'D', name: 'Gate D (West)', status: 'closed', density: 'high', waitTime: 35, recommendedRoute: '🚫 Gate D temporarily closed. Use Gate C.' },
      { id: 'E', name: 'Gate E (VIP)', status: 'open', density: 'low', waitTime: 2, recommendedRoute: 'VIP Gate E open – Priority access.' },
    ],
  }), []);

  const gates = useMemo(() => gateData[density], [density, gateData]);

  const heatmapColor = useCallback((d: CrowdDensity): string => {
    if (d === 'low') return '#22c55e';    // green-500
    if (d === 'medium') return '#f59e0b'; // amber-500
    return '#ef4444';                      // red-500
  }, []);

  const zoneDensity: Record<string, CrowdDensity> = useMemo(() => {
    const zoneMap: Record<CrowdDensity, Record<string, CrowdDensity>> = {
      low: { north: 'low', east: 'low', south: 'low', west: 'low', vip: 'low', field: 'low' },
      medium: { north: 'medium', east: 'low', south: 'medium', west: 'high', vip: 'low', field: 'medium' },
      high: { north: 'high', east: 'high', south: 'medium', west: 'high', vip: 'low', field: 'high' },
    };
    return zoneMap[density];
  }, [density]);

  const aiRerouting = useMemo(() => {
    if (density === 'high') {
      return '🔴 AI Alert: High crowd density detected. Gates A, B, D are congested. AI recommends routing all fans to Gate C and VIP Gate E. Estimated wait reduction: 18 minutes.';
    }
    if (density === 'medium') {
      return '🟡 AI Notice: Moderate congestion at Gates A and D. AI recommends Gates B and E for faster entry. Estimated wait: 5–8 minutes.';
    }
    return '🟢 AI Status: Crowd density is low. All gates are open with minimal wait times. Enjoy smooth entry!';
  }, [density]);

  const totalVisitors = useMemo(() => {
    if (density === 'low') return '28,400';
    if (density === 'medium') return '54,200';
    return '82,500';
  }, [density]);

  return { density, setDensity, gates, heatmapColor, zoneDensity, aiRerouting, totalVisitors };
}
