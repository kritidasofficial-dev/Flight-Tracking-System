import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit, OnChanges {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  @Input() flights: Flight[] | null = [];

  private map: L.Map | null = null;
  private markerClusterGroup: any = null;
  private routes: Map<string, L.Polyline> = new Map();
  private selectedFlightId: string | null = null;
  private weatherLayer: L.TileLayer | null = null;
  private showWeather = false;

  constructor(
    private flightService: FlightService,
    private weatherService: WeatherService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeMap();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights'] && this.map && this.flights) {
      this.updateMarkers();
    }
  }

  private initializeMap(): void {
    if (!this.mapContainer) {
      console.error('❌ mapContainer is null');
      return;
    }

    const container = this.mapContainer.nativeElement;

    try {
      // Create map
      this.map = L.map(container).setView([20, 0], 3);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Initialize marker cluster group
      this.markerClusterGroup = L.markerClusterGroup({
        maxClusterRadius: 80,
        iconCreateFunction: this.createClusterIcon.bind(this)
      });
      this.map.addLayer(this.markerClusterGroup);

      // Invalidate size
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 200);

      // Add flights
      if (this.flights && this.flights.length > 0) {
        this.updateMarkers();
      }

      // Add weather toggle control
      this.addWeatherControl();

    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  private updateMarkers(): void {
    if (!this.map || !this.flights) return;

    // Clear old markers
    if (this.markerClusterGroup) {
      this.markerClusterGroup.clearLayers();
    }

    // Add new markers
    this.flights.forEach(flight => {
      if (flight.currentPosition) {
        const pos = flight.currentPosition;
        const color = this.getStatusColor(flight.status);

        const marker = L.circleMarker([pos.lat, pos.lng], {
          radius: 8,
          fillColor: color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        })
          .bindPopup(`<strong>${flight.callsign}</strong><br>${flight.origin.code} → ${flight.destination.code}`)
          .addTo(this.markerClusterGroup);

        marker.on('click', () => this.selectFlight(flight));
      }
    });
  }

  private selectFlight(flight: Flight): void {
    if (!this.map) return;

    // Remove old route
    if (this.selectedFlightId && this.routes.has(this.selectedFlightId)) {
      this.routes.get(this.selectedFlightId)?.remove();
      this.routes.delete(this.selectedFlightId);
    }

    this.selectedFlightId = flight.id;

    // Draw new route
    const route = L.polyline(
      [
        [flight.origin.coordinates.lat, flight.origin.coordinates.lng],
        [flight.destination.coordinates.lat, flight.destination.coordinates.lng]
      ],
      { color: '#0077b6', weight: 3, opacity: 0.7, dashArray: '5, 5' }
    ).addTo(this.map);

    this.routes.set(flight.id, route);

    // Center map
    if (flight.currentPosition) {
      this.map.setView([flight.currentPosition.lat, flight.currentPosition.lng], 6);
    }

    this.flightService.selectFlight(flight);
  }

  private getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'on-time': '#06d6a0',
      'delayed': '#ffd166',
      'boarding': '#0077b6',
      'arrived': '#06d6a0',
      'cancelled': '#ef476f',
      'scheduled': '#bdc3c7'
    };
    return colors[status] || '#bdc3c7';
  }

  private createClusterIcon(cluster: any): any {
  const count = cluster.getChildCount();
  let color = '#0077b6';

  if (count > 100) {
    color = '#ef476f';
  } else if (count > 50) {
    color = '#ffd166';
  }

  const html = `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">${count}</div>`;

  return L.divIcon({
    html: html,
    className: 'marker-cluster',
    iconSize: [40, 40]
  });
}

  private addWeatherControl(): void {
    if (!this.map) return;

    const weatherControl = L.Control.extend({
      options: {
        position: 'topright'
      },
      onAdd: (map: L.Map) => {
        const container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
        const button = L.DomUtil.create('a', '', container);
        button.innerHTML = '🌦️';
        button.title = 'Toggle Weather';
        button.style.width = '36px';
        button.style.height = '36px';
        button.style.lineHeight = '36px';
        button.style.textAlign = 'center';
        button.style.cursor = 'pointer';
        button.style.fontSize = '18px';

        button.onclick = () => {
          this.toggleWeatherLayer();
          button.style.opacity = this.showWeather ? '1' : '0.5';
        };

        return container;
      }
    });

    new weatherControl().addTo(this.map);
  }

  private toggleWeatherLayer(): void {
    if (!this.map) return;

    this.showWeather = !this.showWeather;

    if (this.showWeather) {
      // Add weather layer (using OpenWeatherMap - requires API key)
      this.weatherLayer = L.tileLayer(
        'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHERMAP_KEY',
        {
          attribution: '© OpenWeatherMap',
          opacity: 0.5,
          maxZoom: 19
        }
      );
      this.weatherLayer.addTo(this.map);
    } else {
      if (this.weatherLayer) {
        this.map.removeLayer(this.weatherLayer);
      }
    }
  }
}