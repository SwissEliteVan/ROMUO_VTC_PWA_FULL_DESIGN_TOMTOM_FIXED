import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type DriverPosition = {
  lat: number;
  lng: number;
  bearing: number;
};

type Booking = {
  id: string;
  pickup: { lat: number; lng: number };
  destination: { lat: number; lng: number };
};

interface DriverTrackerProps {
  booking: Booking;
}

export default function DriverTracker({ booking }: DriverTrackerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [driverPosition, setDriverPosition] = useState<DriverPosition | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [driverMarker, setDriverMarker] = useState<L.Marker | null>(null);
  
  // Initialize TomTom map
  useEffect(() => {
    if (!mapRef.current) return;
    
    const newMap = L.map(mapRef.current).setView(
      [booking.pickup.lat, booking.pickup.lng],
      13
    );
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);
    
    setMap(newMap);
    
    // Add pickup and destination markers
    const pickupMarker = L.marker([booking.pickup.lat, booking.pickup.lng])
      .bindPopup('<b>Point de prise en charge</b>')
      .addTo(newMap);
    
    const destinationMarker = L.marker([booking.destination.lat, booking.destination.lng],
      { icon: L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-red.png' }) }
    ).bindPopup('<b>Destination</b>')
     .addTo(newMap);
    
    return () => {
      newMap.remove();
    };
  }, [booking]);
  
  // Connect to WebSocket for real-time updates
  useEffect(() => {
    const ws = new WebSocket(`wss://${window.location.host}/api/maps/tracking`);
    
    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({ bookingId: booking.id }));
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'position') {
        setDriverPosition({
          lat: data.lat,
          lng: data.lng,
          bearing: data.bearing
        });
      }
    };
    
    ws.onclose = () => {
      setIsConnected(false);
    };
    
    return () => {
      ws.close();
    };
  }, [booking.id]);
  
  // Update driver marker on position change
  useEffect(() => {
    if (!map || !driverPosition) return;
    
    // Remove existing driver marker
    if (driverMarker) {
      map.removeLayer(driverMarker);
    }
    
    // Add new driver marker with rotation
    const driverIcon = L.divIcon({
      className: 'driver-marker',
      html: `
        <svg width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="#4F46E5" stroke-width="2"
             style="transform: rotate(${driverPosition.bearing}deg);">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="3" fill="#4F46E5"/>
        </svg>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    
    const newDriverMarker = L.marker([driverPosition.lat, driverPosition.lng], { icon: driverIcon })
      .addTo(map);
    setDriverMarker(newDriverMarker);
    
    // Pan map to driver position
    map.panTo([driverPosition.lat, driverPosition.lng]);
    
  }, [driverPosition, map]);
  
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
      
      <div className="absolute top-4 right-4 bg-obsidian-800 text-obsidian-50 px-4 py-2 rounded-lg">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          {isConnected ? 'Connecté au chauffeur' : 'Connexion en cours...'}
        </div>
      </div>
    </div>
  );
}
