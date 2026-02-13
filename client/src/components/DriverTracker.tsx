import { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup } from 'tomtom-map';
import 'tomtom-map/dist/map.css';

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
  const [map, setMap] = useState<Map | null>(null);
  const [driverPosition, setDriverPosition] = useState<DriverPosition | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Initialize TomTom map
  useEffect(() => {
    if (!mapRef.current) return;
    
    const newMap = new Map({
      key: process.env.TOMTOM_API_KEY,
      container: mapRef.current,
      center: [booking.pickup.lng, booking.pickup.lat],
      zoom: 13,
      style: 'main',
    });
    
    setMap(newMap);
    
    // Add pickup and destination markers
    new Marker()
      .setLngLat([booking.pickup.lng, booking.pickup.lat])
      .setPopup(new Popup().setHTML('<b>Point de prise en charge</b>'))
      .addTo(newMap);
      
    new Marker({ color: 'red' })
      .setLngLat([booking.destination.lng, booking.destination.lat])
      .setPopup(new Popup().setHTML('<b>Destination</b>'))
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
    map.getMarkers().forEach(marker => {
      if (marker.getElement()?.classList.contains('driver-marker')) {
        marker.remove();
      }
    });
    
    // Add new driver marker with rotation
    const markerElement = document.createElement('div');
    markerElement.className = 'driver-marker';
    markerElement.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" 
           fill="none" stroke="#4F46E5" stroke-width="2" 
           transform="rotate(${driverPosition.bearing})">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="3" fill="#4F46E5"/>
      </svg>
    `;
    
    new Marker({ element: markerElement })
      .setLngLat([driverPosition.lng, driverPosition.lat])
      .addTo(map);
    
    // Pan map to driver position
    map.panTo([driverPosition.lng, driverPosition.lat]);
    
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
