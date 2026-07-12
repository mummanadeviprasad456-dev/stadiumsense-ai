import { Ticket, TransportMode, Incident, Announcement, SustainabilityMetrics } from '../types';

export const mockTicket: Ticket = {
  ticketId: 'FWC-2026-NYNJ-84920',
  holderName: 'Alex Morgan',
  match: 'Quarter Final: USA vs Argentina',
  gate: 'Gate C',
  zone: 'East Stand - Zone 3',
  seat: 'Section 124, Row 12, Seat 14',
  category: 'Category 1 Premium',
  scanned: false,
};

export const transportModes: TransportMode[] = [
  {
    id: 'metro',
    name: 'Metro Rapid Link (Line 6)',
    duration: 35,
    carbonFootprint: 0.2,
    cost: '$2.75',
    ecoRating: 5,
    accessibilitySupport: true,
  },
  {
    id: 'bus',
    name: 'FIFA Tournament Shuttle Bus',
    duration: 45,
    carbonFootprint: 0.5,
    cost: 'Free with Ticket',
    ecoRating: 4,
    accessibilitySupport: true,
  },
  {
    id: 'taxi',
    name: 'Rideshare / Eco-Taxi',
    duration: 30,
    carbonFootprint: 3.8,
    cost: '$35.00',
    ecoRating: 2,
    accessibilitySupport: true,
  },
  {
    id: 'walking',
    name: 'Walking & Wheelchair Trail (From Lot E)',
    duration: 15,
    carbonFootprint: 0.0,
    cost: 'Free',
    ecoRating: 5,
    accessibilitySupport: true,
  },
];

export const initialIncidents: Incident[] = [
  {
    id: 'inc-101',
    title: 'Spill near Food Court B',
    status: 'pending',
    location: 'Concourse level 2, Zone B',
    severity: 'low',
    timestamp: '17:15',
    reporter: 'Volunteer 402',
  },
  {
    id: 'inc-102',
    title: 'Elevator 4 Malfunction',
    status: 'dispatched',
    location: 'Gate C, East Elevator shaft',
    severity: 'high',
    timestamp: '17:02',
    reporter: 'Staff Operator 8',
  },
  {
    id: 'inc-103',
    title: 'Crowd surge block',
    status: 'resolved',
    location: 'Gate A Entry queues',
    severity: 'medium',
    timestamp: '16:45',
    reporter: 'Officer Jenkins',
  },
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Gate A Rerouting',
    text: 'Due to a high volume of arrivals, all fans entering Gate A are advised to use Gate B or C to minimize delay.',
    timestamp: '17:18',
    targetRole: 'all',
  },
  {
    id: 'ann-02',
    title: 'Security Shift Update',
    text: 'Third rotation starting at 18:00. Please check in with Zone Supervisors.',
    timestamp: '17:00',
    targetRole: 'staff',
  },
  {
    id: 'ann-03',
    title: 'Water Station Refill Request',
    text: 'Water Refill Stations at East zone 3 need restocking of compostable cups.',
    timestamp: '16:50',
    targetRole: 'volunteer',
  },
];

export const initialSustainabilityMetrics: SustainabilityMetrics = {
  waterSavedLitres: 145020,
  recyclingRate: 84.5,
  carbonSavedKg: 9840,
  digitalTicketRate: 98.2,
};

export const matchSchedule = [
  {
    time: '14:00',
    match: 'Group A: Mexico vs Canada',
    stadium: 'Estadio Azteca',
    status: 'Completed (2-1)',
  },
  {
    time: '18:00',
    match: 'Group B: USA vs Argentina',
    stadium: 'MetLife Stadium (Host)',
    status: 'Upcoming (18:00 Local)',
  },
  {
    time: '21:00',
    match: 'Group C: Brazil vs Spain',
    stadium: 'SoFi Stadium',
    status: 'Upcoming (21:00 Local)',
  },
];

export const lostAndFoundItems = [
  { id: 'lf-01', name: 'Black leather wallet', location: 'Gate D Seat Row 14', status: 'reported-lost', date: '2026-07-07' },
  { id: 'lf-02', name: 'iPhone 15 Pro Max with blue case', location: 'Washroom Zone B', status: 'found', date: '2026-07-07' },
  { id: 'lf-03', name: 'Argentina Scarf', location: 'Section 104 Row 4', status: 'found', date: '2026-07-07' },
];
