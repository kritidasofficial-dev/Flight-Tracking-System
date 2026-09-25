export interface Airport {
  code: string;
  name: string;
  city?: string;
  country?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}