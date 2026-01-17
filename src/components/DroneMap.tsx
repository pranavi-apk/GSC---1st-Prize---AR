import { Plane, MapPin, Users, Activity } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ... (icons remain equal)

// Custom icons
const disasterIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI5IiBmaWxsPSIjREMyNjI2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const droneIconResponding = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw1IDE2aDE0TDEyIDJ6IiBmaWxsPSIjRUE1NzBCIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const droneIconActive = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw1IDE2aDE0TDEyIDJ6IiBmaWxsPSIjMTZBMzRBIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const droneIconReturning = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw1IDE2aDE0TDEyIDJ6IiBmaWxsPSIjMjU2M0VCIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Data for markers
const disasters = [
  { lat: -6.1751, lng: 106.8249, title: 'North Jakarta', severity: 'Critical' },
  { lat: -6.2349, lng: 106.9896, title: 'Bekasi', severity: 'High' },
  { lat: -6.6049, lng: 106.7892, title: 'Bogor', severity: 'Critical' },
];

const drones = [
  { lat: -6.16, lng: 106.78, status: 'responding', id: 1 },
  { lat: -6.22, lng: 106.92, status: 'active', id: 2 },
  { lat: -6.40, lng: 106.88, status: 'returning', id: 3 },
  { lat: -6.28, lng: 106.82, status: 'active', id: 4 },
  { lat: -6.35, lng: 107.05, status: 'responding', id: 5 },
  { lat: -6.52, lng: 106.95, status: 'returning', id: 6 },
];

export function DroneMap() {
  const [activeDisasters, setDisasters] = useState(disasters);
  const [activeDrones, setDrones] = useState(drones);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate Real-time Govt Data Stream
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Simulate new Govt Alert (BNPB)
      const newAlertChance = Math.random();
      if (newAlertChance > 0.7) {
        const newDisaster = {
          lat: -6.2 + (Math.random() - 0.5) * 0.1,
          lng: 106.8 + (Math.random() - 0.5) * 0.1,
          title: `New Alert: Zone-${Math.floor(Math.random() * 100)}`,
          severity: 'Critical'
        };
        
        setDisasters(prev => [...prev.slice(-4), newDisaster]); // Keep last 5

        // 2. Auto-Dispatch Drone to new location
        const newDrone = {
          lat: newDisaster.lat,
          lng: newDisaster.lng,
          status: 'responding',
          id: Date.now()
        };
        setDrones(prev => [...prev, newDrone]);
        setLastUpdate(new Date());
      }
    }, 3000); // Check for "new data" every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getDroneIcon = (status: string) => {
    switch (status) {
      case 'responding':
        return droneIconResponding;
      case 'active':
        return droneIconActive;
      case 'returning':
        return droneIconReturning;
      default:
        return droneIconActive;
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-red-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 sticky top-0 z-10 shadow-lg">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-gray-900">Real-Time Drone Map</h1>
                <p className="text-sm text-gray-600">Monitor relief drones assisting people</p>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-red-100">
                <Activity size={14} className="text-green-600 animate-pulse" />
                <span className="text-xs text-gray-600">Live BNPB Uplink: Active</span>
            </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Map Area */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-red-200/50 overflow-hidden shadow-lg">
          <MapContainer
            center={[-6.2, 106.8]}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
            className="rounded-3xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Disaster Markers */}
            {activeDisasters.map((disaster) => (
              <Marker key={disaster.title} position={[disaster.lat, disaster.lng]} icon={disasterIcon}>
                <Popup>
                  <div className="text-sm">
                    <strong>{disaster.title}</strong>
                    <br />
                    Severity: {disaster.severity}
                  </div>
                </Popup>
              </Marker>
            ))}
            {/* Drone Markers */}
            {activeDrones.map((drone) => (
              <Marker
                key={drone.id}
                position={[drone.lat, drone.lng]}
                icon={getDroneIcon(drone.status)}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>Drone {drone.id}</strong>
                    <br />
                    Status: {drone.status}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="p-4 bg-gradient-to-br from-red-50/80 to-rose-100/80 backdrop-blur-xl border-t border-red-200/50">
            <div className="text-sm text-gray-900 mb-2">Legend</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full shadow-lg"></div>
                <span className="text-sm text-gray-700">Disaster Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane size={16} className="text-orange-600" />
                <span className="text-sm text-gray-700">Responding</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane size={16} className="text-green-600" />
                <span className="text-sm text-gray-700">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane size={16} className="text-blue-600" />
                <span className="text-sm text-gray-700">Returning</span>
              </div>
            </div>
          </div>
        </div>

        {/* All Active Disasters */}
        <section>
          <h2 className="text-gray-900 mb-3">All Active Disasters</h2>
          <div className="space-y-3">
            <DisasterCard
              type="Flash Flood"
              location="North Jakarta"
              severity="Critical"
              status="Active"
              affected="8,234"
              drones="18"
              time="2 hours ago"
            />
            <DisasterCard
              type="Earthquake"
              location="Bekasi"
              severity="High"
              status="Active"
              affected="3,612"
              drones="12"
              time="5 hours ago"
            />
            <DisasterCard
              type="Landslide"
              location="Bogor"
              severity="Critical"
              status="Active"
              affected="1,001"
              drones="8"
              time="8 hours ago"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function DisasterCard({
  type,
  location,
  severity,
  status,
  affected,
  drones,
  time,
}: {
  type: string;
  location: string;
  severity: string;
  status: string;
  affected: string;
  drones: string;
  time: string;
}) {
  const severityColor = severity === 'Critical' ? 'bg-red-600' : 'bg-orange-600';

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-red-200/50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-gray-900">{type}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <MapPin size={14} />
            {location}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`${severityColor} text-white text-xs px-3 py-1 rounded-full shadow-lg`}>
            {severity}
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full shadow-sm">
            {status}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Users size={16} />
          {affected} affected
        </div>
        <div className="flex items-center gap-2">
          <Plane size={16} />
          {drones} drones
        </div>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
}