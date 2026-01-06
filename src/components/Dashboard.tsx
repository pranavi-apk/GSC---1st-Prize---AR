import { Bell, AlertTriangle, Users, Plane, AlertCircle, Package, MapPin, X } from 'lucide-react';
import { useState } from 'react';

export function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-full bg-gradient-to-br from-red-50 to-rose-100">
      {/* Top App Bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Resilient360</h1>
            <p className="text-sm text-gray-600">Protect Your Family</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-red-100/80 backdrop-blur-xl flex items-center justify-center border border-red-200/50">
              <Bell size={24} className="text-red-600" />
            </div>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
              3
            </span>
          </div>
        </div>
      </header>

      {/* Emergency Alert Banner */}
      {showAlert && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-4 relative shadow-xl animate-pulse">
          <button
            onClick={() => setShowAlert(false)}
            className="absolute top-3 right-3 text-white hover:bg-red-800/50 rounded-xl p-1 backdrop-blur-xl"
          >
            <X size={20} />
          </button>
          <div className="flex items-start gap-3 pr-8">
            <AlertTriangle size={24} className="flex-shrink-0 mt-1 animate-bounce" />
            <div>
              <div className="text-sm uppercase tracking-wide">Emergency Alert – Flash Flood</div>
              <div className="mt-1">North Jakarta – Evacuate to higher ground immediately</div>
              <div className="text-sm text-red-100 mt-2">2 hours ago</div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* Live Statistics */}
        <section>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">Live Statistics</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Users size={24} />}
              label="Affected People"
              value="12,847"
              bgColor="bg-red-500/90"
              iconColor="text-white"
            />
            <StatCard
              icon={<Plane size={24} />}
              label="Active Drones"
              value="43"
              bgColor="bg-rose-500/90"
              iconColor="text-white"
            />
            <StatCard
              icon={<AlertCircle size={24} />}
              label="Active Disasters"
              value="8"
              bgColor="bg-orange-500/90"
              iconColor="text-white"
            />
            <StatCard
              icon={<Package size={24} />}
              label="Aid Delivered"
              value="2,341"
              bgColor="bg-green-500/90"
              iconColor="text-white"
            />
          </div>
        </section>

        {/* Recent Disasters */}
        <section>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">Recent Disasters</h2>
          <div className="space-y-3">
            <DisasterCard
              type="Flash Flood"
              location="Sumatera Utara"
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
          <button className="w-full mt-3 bg-white/80 backdrop-blur-xl border border-red-200/50 text-red-600 px-6 py-3 rounded-2xl hover:bg-red-50 transition-all shadow-sm font-semibold">
            View More
          </button>
        </section>

        {/* Field Stories */}
        <section>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">Field Stories</h2>
          <div className="space-y-3">
            <StoryCard
              title="SAR Team Evacuates 45 Families"
              location="North Jakarta"
              time="1 hour ago"
            />
            <StoryCard
              title="Medical Supplies Delivered to Remote Village"
              location="Bogor"
              time="3 hours ago"
            />
          </div>
          <button className="w-full mt-3 bg-white/80 backdrop-blur-xl border border-red-200/50 text-red-600 px-6 py-3 rounded-2xl hover:bg-red-50 transition-all shadow-sm font-semibold">
            View More
          </button>
        </section>
      </div>

      {/* Emergency CTA - Bottom */}
      <div className="px-4 py-4 mt-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-4 shadow-2xl backdrop-blur-xl border border-red-400/30">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={24} />
            <div>
              <div>Need Help?</div>
              <div className="text-sm text-red-100">Team ready 24/7</div>
            </div>
          </div>
          <button className="w-full bg-white text-red-600 px-4 py-3 rounded-2xl hover:bg-red-50 transition-all shadow-lg">
            Contact Emergency
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bgColor,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
}) {
  return (
    <div className={`${bgColor} backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/20`}>
      <div className={`${iconColor} mb-2`}>{icon}</div>
      <div className="text-2xl text-white mb-1">{value}</div>
      <div className="text-sm text-white/90">{label}</div>
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

function StoryCard({
  title,
  location,
  time,
}: {
  title: string;
  location: string;
  time: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg border border-red-200/50">
      <div className="bg-gradient-to-br from-red-100 to-rose-200 h-40 flex items-center justify-center text-gray-400">
        Field Image
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            {location}
          </div>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}