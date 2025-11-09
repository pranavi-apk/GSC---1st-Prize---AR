import { AlertTriangle, X } from "lucide-react";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";

interface EmergencyAlertProps {
  type: string;
  location: string;
  severity: "critical" | "high" | "medium";
  time: string;
  onDismiss?: () => void;
}

export function EmergencyAlert({ type, location, severity, time, onDismiss }: EmergencyAlertProps) {
  const severityColors = {
    critical: "bg-red-600 border-red-700",
    high: "bg-orange-600 border-orange-700",
    medium: "bg-yellow-600 border-yellow-700"
  };

  return (
    <div className={`${severityColors[severity]} border-2 rounded-lg p-4 text-white animate-pulse`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-white mb-1">PERINGATAN DARURAT - {type.toUpperCase()}</h3>
              <p className="text-white/90">{location}</p>
              <p className="text-white/80 text-sm mt-1">{time}</p>
            </div>
            {onDismiss && (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20 flex-shrink-0"
                onClick={onDismiss}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
