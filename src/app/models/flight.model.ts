export type FlightStatus = 'on-time' | 'delayed' | 'boarding' | 'arrived' | 'cancelled' | 'scheduled';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  callsign: string;
  aircraftType: string;
  origin: { code: string; name: string; coordinates: Coordinates };
  destination: { code: string; name: string; coordinates: Coordinates };
  status: FlightStatus;
  estimatedDepartureTime: Date;
  estimatedArrivalTime: Date;
  actualDepartureTime?: Date;
  actualArrivalTime?: Date;
  currentPosition?: Coordinates;
  heading?: number;
  altitude?: number;
  speed?: number;
  delayMinutes?: number;
}

export interface FlightFilter {
  callsign?: string;
  status?: FlightStatus | null;
  originCode?: string | null;
  destinationCode?: string | null;
}