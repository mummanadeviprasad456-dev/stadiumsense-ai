export type CrowdDensity = 'low' | 'medium' | 'high';

export type Language = 'en' | 'hi' | 'te' | 'es' | 'fr' | 'ar';

export type UserRole = 'fan' | 'staff' | 'organizer' | 'volunteer';

export interface GateStatus {
  id: string;
  name: string;
  status: 'open' | 'closed' | 'congested';
  density: CrowdDensity;
  waitTime: number; // in minutes
  recommendedRoute: string;
}

export interface Incident {
  id: string;
  title: string;
  status: 'pending' | 'resolved' | 'dispatched';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  reporter: string;
}

export interface Announcement {
  id: string;
  title: string;
  text: string;
  timestamp: string;
  targetRole: 'all' | 'staff' | 'volunteer';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface Ticket {
  ticketId: string;
  holderName: string;
  match: string;
  gate: string;
  zone: string;
  seat: string;
  category: string;
  scanned: boolean;
}

export interface TransportMode {
  id: string;
  name: string;
  duration: number; // in minutes
  carbonFootprint: number; // in kg CO2
  cost: string;
  ecoRating: number; // 1 to 5 stars
  accessibilitySupport: boolean;
}

export interface SustainabilityMetrics {
  waterSavedLitres: number;
  recyclingRate: number; // percentage
  carbonSavedKg: number;
  digitalTicketRate: number;
}
