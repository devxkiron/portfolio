import type { ClientStoriesConfig } from './types';

export const clientStoriesConfig: ClientStoriesConfig = {
  sectionTitle: 'CLIENT STORIES',
  subtitle:
    'Trusted by high-growth startups and global enterprises. Real production systems generating exponential ROI across every continent.',
  dotsColor: '#5cf629ff', // Custom dot color (accepts 6-char or 8-char hex)
  dotDensity: 350, // Dot resolution/density (higher = more dots & detail)
  globeRadius: .9, // 3D Globe base radius/size (e.g. 1.2 to 1.6)
  glowRadius: .8, // Atmosphere outer glow radius multiplier (e.g. 1.05 to 1.30)
  glowColor: '#5cf629', // Atmosphere rim glow color (e.g. '#5cf629' or '#38ef7d')
  globeBgColor: '#04080579', // Solid dark globe core background color
  arcColor: '#2f842bff', // Connection line color (e.g. '#5cf629', '#00f0ff', '#34d399')
  arcWidth: 0.002, // Connection line width/thickness (e.g. 0.002 to 0.015)
  arcHeight: 0.45, // Connection line altitude/height factor (e.g. 0.2 to 0.8)
  arcOpacity: 0.4, // Connection line opacity (0.1 to 1.0)
  beaconRadius: 0.010, // City center pin radius (e.g. 0.012 to 0.035 - smaller = more compact)
  beaconGlowRadius: 0.025, // City outer ripple ring/glow radius (e.g. 0.025 to 0.070)
  beaconColor: '#f8ff91ff', // Inactive city pin & glow ring color (Hex)
  beaconActiveColor: '#f18257ff', // Active selected city pin & glow ring color (Hex)
  stories: [
    {
      id: 'story-sf',
      cityId: 'sf',
      cityName: 'San Francisco',
      country: 'USA',
      flag: '🇺🇸',
      lat: 37.7749,
      lon: -122.4194,
      company: 'SizzleKick',
      rating: 5.0,
      isVerified: true,
      metricBadge: '+64% ROAS',
      quote:
        '"Goodspeed\'s ability to think about how to do things in a better and more intelligent way is impressive. They transformed our product speed and automated our revenue pipeline."',
      authorName: 'Andrew Heath',
      authorRole: 'Founder & CEO',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-ny',
      cityId: 'ny',
      cityName: 'New York',
      country: 'USA',
      flag: '🇺🇸',
      lat: 40.7128,
      lon: -74.006,
      company: 'Apex Capital',
      rating: 5.0,
      isVerified: true,
      metricBadge: '3.4x Pipeline Velocity',
      quote:
        '"Autonomous agent dispatch eliminated our 4-hour sales lead triage latency down to 45 seconds flat. Revolutionary for our enterprise deal flow and booking rate."',
      authorName: 'Marcus Vance',
      authorRole: 'Managing Director',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-london',
      cityId: 'london',
      cityName: 'London',
      country: 'UK',
      flag: '🇬🇧',
      lat: 51.5074,
      lon: -0.1278,
      company: 'Kinetic AI',
      rating: 5.0,
      isVerified: true,
      metricBadge: '$840k Annual Savings',
      quote:
        '"The self-healing architecture and Pinecone vector RAG automation replaced our entire legacy manual reconciliation department with 100% zero-loss reliability."',
      authorName: 'Elena Rostova',
      authorRole: 'Chief Operating Officer',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-tokyo',
      cityId: 'tokyo',
      cityName: 'Tokyo',
      country: 'Japan',
      flag: '🇯🇵',
      lat: 35.6762,
      lon: 139.6503,
      company: 'Mirai Tech',
      rating: 5.0,
      isVerified: true,
      metricBadge: '99.98% Automation Rate',
      quote:
        '"Seamless cross-tool synchronization between HubSpot, Stripe, and Postgres allowed us to scale to 50k active users without hiring additional operational staff."',
      authorName: 'Kenji Takahashi',
      authorRole: 'Head of Engineering',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-dhaka',
      cityId: 'dhaka',
      cityName: 'Dhaka',
      country: 'Bangladesh',
      flag: '🇧🇩',
      lat: 23.8103,
      lon: 90.4125,
      company: 'Bengal Logic',
      rating: 5.0,
      isVerified: true,
      metricBadge: '+140% Pipeline Velocity',
      quote:
        '"The automated microservices pipeline and real-time distributed architecture revolutionized our transactional throughput across South Asia without any operational friction."',
      authorName: 'Tanvir Ahmed',
      authorRole: 'Chief Technology Officer',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-sydney',
      cityId: 'sydney',
      cityName: 'Sydney',
      country: 'Australia',
      flag: '🇦🇺',
      lat: -33.8688,
      lon: 151.2093,
      company: 'Horizon Cloud',
      rating: 5.0,
      isVerified: true,
      metricBadge: '12x Faster Deployments',
      quote:
        '"Zero downtime deployment automation with instant Slack telemetry gave our engineering team total peace of mind and cut critical incident response by 90%."',
      authorName: 'Chloe Davies',
      authorRole: 'VP of Product',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-dubai',
      cityId: 'dubai',
      cityName: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      lat: 25.2048,
      lon: 55.2708,
      company: 'Oasis Ventures',
      rating: 5.0,
      isVerified: true,
      metricBadge: '+128% Deal Conversion',
      quote:
        '"High-intent ML scoring and automated executive dossier generation turned cold inbound form leads into high-ticket signed contracts within 48 hours."',
      authorName: 'Tariq Al-Mansoor',
      authorRole: 'Managing Partner',
      authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-zurich',
      cityId: 'zurich',
      cityName: 'Zurich',
      country: 'Switzerland',
      flag: '🇨🇭',
      lat: 47.3769,
      lon: 8.5417,
      company: 'Alpine Ledger',
      rating: 5.0,
      isVerified: true,
      metricBadge: 'Zero-Delta Auditing',
      quote:
        '"Strict double-entry financial reconciliation running autonomously every 15 minutes gave our board complete audit peace of mind with mathematically zero variance."',
      authorName: 'Beatrix Müller',
      authorRole: 'Chief Financial Officer',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'story-singapore',
      cityId: 'singapore',
      cityName: 'Singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      lat: 1.3521,
      lon: 103.8198,
      company: 'Nexus Logistics',
      rating: 5.0,
      isVerified: true,
      metricBadge: '85,000+ Hours Saved',
      quote:
        '"They mapped our complex multi-country logistics database into an autonomous Python engine. Truly state-of-the-art engineering."',
      authorName: 'Wei Chen',
      authorRole: 'Co-Founder & CTO',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    },
  ],
  arcs: [
    { fromCityId: 'sf', toCityId: 'tokyo' },
    { fromCityId: 'sf', toCityId: 'sydney' },
    { fromCityId: 'sf', toCityId: 'london' },
    { fromCityId: 'sf', toCityId: 'ny' },
    { fromCityId: 'london', toCityId: 'zurich' },
    { fromCityId: 'london', toCityId: 'dubai' },
    { fromCityId: 'dubai', toCityId: 'dhaka' },
    { fromCityId: 'dhaka', toCityId: 'singapore' },
    { fromCityId: 'singapore', toCityId: 'tokyo' },
    { fromCityId: 'singapore', toCityId: 'sydney' },
  ],
};
