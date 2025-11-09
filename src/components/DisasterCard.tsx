import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, MapPin, Clock, Plane } from "lucide-react";

interface DisasterCardProps {
  type: string;
  location: string;
  peopleAffected: number;
  dronesDeployed: number;
  status: "active" | "monitoring" | "resolved";
  time: string;
  severity: "critical" | "high" | "medium";
}

export function DisasterCard({ 
  type, 
  location, 
  peopleAffected, 
  dronesDeployed, 
  status, 
  time,
  severity 
}: DisasterCardProps) {
  const severityColors = {
    critical: "bg-red-100 text-red-800 border-red-300",
    high: "bg-orange-100 text-orange-800 border-orange-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300"
  };

  const statusColors = {
    active: "bg-red-500",
    monitoring: "bg-yellow-500",
    resolved: "bg-green-500"
  };

  const statusText = {
    active: "Aktif",
    monitoring: "Pemantauan",
    resolved: "Teratasi"
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-slate-900 mb-1">{type}</h3>
          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3 h-3" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={severityColors[severity]}>
            {severity === "critical" ? "Kritis" : severity === "high" ? "Tinggi" : "Sedang"}
          </Badge>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
            <span className="text-xs text-slate-600">{statusText[status]}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Warga Terdampak</div>
            <div className="text-slate-900">{peopleAffected.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded">
            <Plane className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Drone Dikirim</div>
            <div className="text-slate-900">{dronesDeployed}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 text-xs text-slate-500">
        <Clock className="w-3 h-3" />
        <span>{time}</span>
      </div>
    </Card>
  );
}
