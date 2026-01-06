import { useState } from 'react';
import { Users, Plane, AlertCircle, Package, Check, X, Battery, MapPin } from 'lucide-react';

type AdminView = 'overview' | 'requests' | 'drones' | 'disasters';

type ImageRequest = {
  id: string;
  user: string;
  location: string;
  description: string;
  aidNeeded: string[];
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
};

const MOCK_REQUESTS: ImageRequest[] = [
  {
    id: '1',
    user: 'Ahmad R.',
    location: 'North Jakarta, Jl. Gatot Subroto 45',
    description: 'Severe flooding, water level rising. Family trapped on second floor.',
    aidNeeded: ['Evacuation', 'Food', 'Water'],
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '2',
    user: 'Siti M.',
    location: 'Bekasi, Jl. Ahmad Yani 12',
    description: 'Earthquake damage, injured person needs medical attention.',
    aidNeeded: ['Medical Assistance', 'Medicine'],
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '3',
    user: 'Budi S.',
    location: 'Bogor, Jl. Raya Pajajaran 88',
    description: 'Landslide blocked road access. No food or clean water available.',
    aidNeeded: ['Food', 'Water', 'Evacuation'],
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    status: 'pending',
  },
];

export function AdminDashboard() {
  const [view, setView] = useState<AdminView>('overview');
  const [requests, setRequests] = useState<ImageRequest[]>(MOCK_REQUESTS);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'approved' as const } : req))
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'rejected' as const } : req))
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-red-50 to-rose-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-4 sticky top-0 z-10 shadow-2xl">
        <h1 className="text-white">Admin Dashboard</h1>
        <p className="text-sm text-red-100">Operational Control Center</p>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-2 sticky top-[72px] z-10 shadow-lg overflow-visible">
        <div className="flex gap-2 overflow-x-auto overflow-y-visible">
          <TabButton
            label="Overview"
            active={view === 'overview'}
            onClick={() => setView('overview')}
          />
          <TabButton
            label="Requests"
            active={view === 'requests'}
            onClick={() => setView('requests')}
            badge={requests.filter((r) => r.status === 'pending').length}
          />
          <TabButton
            label="Drones"
            active={view === 'drones'}
            onClick={() => setView('drones')}
          />
          <TabButton
            label="Disasters"
            active={view === 'disasters'}
            onClick={() => setView('disasters')}
          />
        </div>
      </div>

      <div className="p-4">
        {/* Overview */}
        {view === 'overview' && (
          <div className="space-y-4">
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

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
              <h3 className="text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <ActivityItem
                  action="Drone DR-043 deployed"
                  location="North Jakarta"
                  time="5 min ago"
                />
                <ActivityItem
                  action="Image request approved"
                  location="Bekasi"
                  time="12 min ago"
                />
                <ActivityItem
                  action="New disaster reported"
                  location="Bogor"
                  time="28 min ago"
                />
              </div>
            </div>
          </div>
        )}

        {/* Image Request Verification */}
        {view === 'requests' && (
          <div className="space-y-4">
            <div className="bg-red-50/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
              <p className="text-sm text-red-900">
                {requests.filter((r) => r.status === 'pending').length} pending requests
                require verification
              </p>
            </div>

            {requests.map((request) => (
              <div key={request.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
                {/* Image Preview */}
                <div className="bg-gradient-to-br from-red-100 to-rose-200 h-40 rounded-2xl mb-3 flex items-center justify-center text-gray-400">
                  Request Image
                </div>

                {/* Request Details */}
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Submitted by</div>
                    <div className="text-gray-900">{request.user}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Location</div>
                    <div className="flex items-start gap-2 text-gray-900">
                      <MapPin size={16} className="flex-shrink-0 mt-1 text-red-600" />
                      <span>{request.location}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Description</div>
                    <div className="text-gray-900">{request.description}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Aid Needed</div>
                    <div className="flex flex-wrap gap-2">
                      {request.aidNeeded.map((aid) => (
                        <span
                          key={aid}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm shadow-sm"
                        >
                          {aid}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    {request.timestamp.toLocaleString()}
                  </div>

                  {/* Status / Actions */}
                  {request.status === 'pending' && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Check size={20} />
                        Approve & Dispatch
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <X size={20} />
                        Reject
                      </button>
                    </div>
                  )}

                  {request.status === 'approved' && (
                    <div className="bg-green-50/80 backdrop-blur-xl text-green-900 px-4 py-3 rounded-2xl text-center shadow-sm">
                      ✓ Approved - Drone Dispatched
                    </div>
                  )}

                  {request.status === 'rejected' && (
                    <div className="bg-red-50/80 backdrop-blur-xl text-red-900 px-4 py-3 rounded-2xl text-center shadow-sm">
                      ✗ Rejected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drone Management */}
        {view === 'drones' && (
          <div className="space-y-3">
            <DroneCard
              id="DR-043"
              status="Active"
              battery={78}
              payload="Medical Supplies"
              location="En route to North Jakarta"
            />
            <DroneCard
              id="DR-028"
              status="Responding"
              battery={92}
              payload="Food & Water"
              location="Departing base"
            />
            <DroneCard
              id="DR-015"
              status="Returning"
              battery={34}
              payload="Empty"
              location="Returning to base"
            />
            <DroneCard
              id="DR-056"
              status="Active"
              battery={65}
              payload="Evacuation Kit"
              location="Hovering at Bekasi"
            />
          </div>
        )}

        {/* Disaster Management */}
        {view === 'disasters' && (
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-3xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg">
              + Create New Disaster Alert
            </button>

            <DisasterManagementCard
              type="Flash Flood"
              location="North Jakarta"
              severity="Critical"
              status="Active"
              affected="8,234"
              drones="18"
            />
            <DisasterManagementCard
              type="Earthquake"
              location="Bekasi"
              severity="High"
              status="Active"
              affected="3,612"
              drones="12"
            />
            <DisasterManagementCard
              type="Landslide"
              location="Bogor"
              severity="Critical"
              status="Active"
              affected="1,001"
              drones="8"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-2xl text-sm whitespace-nowrap relative transition-all shadow-sm ${
        active
          ? 'bg-red-600 text-white shadow-lg'
          : 'bg-white/60 backdrop-blur-xl text-gray-700 hover:bg-red-50 border border-red-200/50'
      }`}
    >
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
          {badge}
        </span>
      )}
    </button>
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

function ActivityItem({
  action,
  location,
  time,
}: {
  action: string;
  location: string;
  time: string;
}) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-red-100 last:border-0">
      <div>
        <div className="text-sm text-gray-900">{action}</div>
        <div className="text-xs text-gray-600">{location}</div>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
}

function DroneCard({
  id,
  status,
  battery,
  payload,
  location,
}: {
  id: string;
  status: string;
  battery: number;
  payload: string;
  location: string;
}) {
  const statusColor =
    status === 'Active'
      ? 'bg-green-100 text-green-700'
      : status === 'Responding'
      ? 'bg-orange-100 text-orange-700'
      : 'bg-blue-100 text-blue-700';

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Plane size={24} className="text-red-600" />
          <div>
            <h3 className="text-gray-900">{id}</h3>
            <div className="text-sm text-gray-600">{location}</div>
          </div>
        </div>
        <span className={`${statusColor} text-xs px-3 py-1 rounded-full shadow-sm`}>{status}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Battery</span>
          <div className="flex items-center gap-2">
            <Battery size={16} className="text-gray-600" />
            <span className="text-gray-900">{battery}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Payload</span>
          <span className="text-gray-900">{payload}</span>
        </div>
      </div>
    </div>
  );
}

function DisasterManagementCard({
  type,
  location,
  severity,
  status,
  affected,
  drones,
}: {
  type: string;
  location: string;
  severity: string;
  status: string;
  affected: string;
  drones: string;
}) {
  const severityColor = severity === 'Critical' ? 'bg-red-600' : 'bg-orange-600';

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-gray-900">{type}</h3>
          <div className="text-sm text-gray-600 mt-1">{location}</div>
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

      <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
        <div className="flex items-center gap-2">
          <Users size={16} />
          {affected} affected
        </div>
        <div className="flex items-center gap-2">
          <Plane size={16} />
          {drones} drones
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all text-sm shadow-lg">
          Update
        </button>
        <button className="flex-1 bg-gray-100/80 backdrop-blur-xl text-gray-700 px-4 py-2 rounded-2xl hover:bg-gray-200 transition-all text-sm border border-gray-300/50">
          Deactivate
        </button>
      </div>
    </div>
  );
}