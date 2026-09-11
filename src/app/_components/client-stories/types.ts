export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
}

export interface ClientStory {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
  company: string;
  rating: number;
  isVerified?: boolean;
  metricBadge: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}

export interface ArcConnection {
  fromCityId: string;
  toCityId: string;
}

export interface ClientStoriesConfig {
  sectionTitle: string;
  subtitle: string;
  dotsColor?: string;
  dotDensity?: number;
  globeRadius?: number;
  glowRadius?: number;
  glowColor?: string;
  globeBgColor?: string;
  arcColor?: string;
  arcWidth?: number;
  arcHeight?: number;
  arcOpacity?: number;
  beaconRadius?: number;
  beaconGlowRadius?: number;
  beaconColor?: string;
  beaconActiveColor?: string;
  cities?: City[];
  stories: ClientStory[];
  arcs: ArcConnection[];
}
