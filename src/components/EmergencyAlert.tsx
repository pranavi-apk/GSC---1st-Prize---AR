import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { AlertTriangle, Bell, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";

// --- Types ---
interface EmergencyAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'flood' | 'earthquake' | 'tsunami';
}

interface SMSBannerProps {
  show: boolean;
  onDismiss: () => void;
  message: string;
  sender?: string;
}

// --- Emergency Modal Component ---
export function EmergencyModal({ open, onOpenChange, type = 'flood' }: EmergencyAlertProps) {
  const getAlertDetails = () => {
    switch (type) {
      case 'flood':
        return {
          title: "FLASH FLOOD WARNING",
          description: "Emergency Evacuation Order in effect for North Jakarta. Water levels rising rapidly. Move to higher ground immediately.",
          action: "I Understand - Evacuating",
          color: "bg-red-600"
        };
      case 'earthquake':
        return {
          title: "EARTHQUAKE DETECTED",
          description: "Significant seismic activity detected. Drop, Cover, and Hold On. Stay away from windows.",
          action: "I'm Safe",
          color: "bg-orange-600"
        };
      default: // tsunami
         return {
          title: "TSUNAMI WARNING",
          description: "Tsunami waves expected. Move to inland/high ground immediately. Do not wait for visual confirmation.",
          action: "Confirm Receipt",
          color: "bg-red-700"
        };
    }
  };

  const details = getAlertDetails();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white/90 backdrop-blur-2xl border-2 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.5)] max-w-[calc(100%-2rem)] sm:max-w-md mx-4 rounded-[2rem] p-0 overflow-hidden max-h-[90vh] flex flex-col">
         {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Close alert"
        >
          <X size={20} />
        </button>

         {/* Urgent Header */}
        <div className={`${details.color} p-6 flex flex-col items-center text-center animate-pulse`}>
          <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm">
             <AlertTriangle size={48} className="text-white" />
          </div>
          <AlertDialogTitle className="text-white text-xl sm:text-2xl font-black uppercase tracking-widest text-shadow-sm">
            {details.title}
          </AlertDialogTitle>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <AlertDialogDescription className="text-gray-900 text-base sm:text-lg font-medium text-center leading-relaxed">
            {details.description}
          </AlertDialogDescription>

          <div className="mt-6 bg-red-50 rounded-xl p-4 border border-red-100 flex items-start gap-3">
             <Bell className="text-red-600 shrink-0 mt-0.5" size={18} />
             <p className="text-sm text-red-800">
               <strong>Official Alert:</strong> Do not ignore. Local authorities have been dispatched. Use the app to find the nearest shelter.
             </p>
          </div>
        </div>

        <AlertDialogFooter className="p-6 pt-0 sm:justify-center">
          <AlertDialogAction 
            onClick={() => onOpenChange(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg transition-transform active:scale-95 uppercase tracking-wide"
          >
            {details.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// --- SMS Banner Component ---
export function SMSBanner({ show, onDismiss, message, sender = "Resilient360" }: SMSBannerProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-full duration-500 ease-out-back">
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-4 flex items-start gap-3 max-w-md mx-auto relative overflow-hidden">
        {/* Glassmorphism Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
        
        {/* Icon */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl w-10 h-10 flex items-center justify-center shrink-0 shadow-sm z-10">
          <MessageSquare size={20} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 z-10">
          <div className="flex items-center justify-between mb-0.5">
            <h4 className="font-semibold text-gray-900 text-sm">{sender}</h4>
            <span className="text-xs text-gray-500">now</span>
          </div>
          <p className="text-gray-700 text-sm leading-snug">{message}</p>
        </div>

        {/* Dismiss Button */}
        <button 
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 p-1 -mr-1 z-10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
