import { Plane, MapPin, Activity } from "lucide-react";
import { Badge } from "./ui/badge";

interface Drone {
  id: string;
  position: { x: number; y: number };
  status: "active" | "responding" | "returning";
  assignment: string;
}

const mockDrones: Drone[] = [
  { id: "D-001", position: { x: 25, y: 30 }, status: "responding", assignment: "Banjir Jakarta Utara" },
  { id: "D-002", position: { x: 60, y: 45 }, status: "active", assignment: "Gempa Bandung" },
  { id: "D-003", position: { x: 40, y: 65 }, status: "responding", assignment: "Longsor Bogor" },
  { id: "D-004", position: { x: 75, y: 25 }, status: "active", assignment: "Banjir Bekasi" },
  { id: "D-005", position: { x: 50, y: 80 }, status: "returning", assignment: "Patroli Selesai" },
];

const disasterLocations = [
  { name: "Jakarta Utara", x: 30, y: 35, severity: "critical" },
  { name: "Bandung", x: 65, y: 50, severity: "high" },
  { name: "Bogor", x: 45, y: 70, severity: "medium" },
  { name: "Bekasi", x: 70, y: 30, severity: "high" },
];

export function DroneMap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "responding": return "text-red-500";
      case "active": return "text-green-500";
      case "returning": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-100 rounded-lg overflow-hidden" style={{ height: "400px" }}>
        {/* Map background with grid */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Region labels */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 text-slate-600 text-xs">Jawa Barat</div>
          <div className="absolute top-4 right-4 text-slate-600 text-xs">Jawa Tengah</div>
          <div className="absolute bottom-4 left-4 text-slate-600 text-xs">DKI Jakarta</div>
        </div>

        {/* Disaster locations */}
        {disasterLocations.map((location, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
          >
            <div className="relative">
              <div className={`w-8 h-8 ${getSeverityColor(location.severity)} rounded-full opacity-30 animate-ping absolute`}></div>
              <MapPin className={`w-6 h-6 ${getSeverityColor(location.severity)} relative z-10`} fill="currentColor" />
            </div>
            <div className="text-xs mt-1 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
              {location.name}
            </div>
          </div>
        ))}

        {/* Drones */}
        {mockDrones.map((drone) => (
          <div
            key={drone.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: `${drone.position.x}%`, top: `${drone.position.y}%` }}
          >
            <div className="relative group cursor-pointer">
              <Plane className={`w-5 h-5 ${getStatusColor(drone.status)} drop-shadow-lg`} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  <div>{drone.id}</div>
                  <div className="text-slate-300">{drone.assignment}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-500" />
          <span className="text-slate-600">Merespons</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-slate-600">Aktif/Siaga</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          <span className="text-slate-600">Kembali</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-slate-600">Lokasi Bencana</span>
        </div>
      </div>
    </div>
  );
}
