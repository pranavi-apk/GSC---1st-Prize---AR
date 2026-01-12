import { Bell, AlertTriangle, Users, Plane, AlertCircle, Package, MapPin, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { EmergencyModal, SMSBanner } from './EmergencyAlert';

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [showAlert, setShowAlert] = useState(true);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [page, setPage] = useState(0);

  const pageSize = 3;

  const notifications = [
    {
      id: '1',
      title: 'Flash Flood Update',
      message: 'Water levels rising in North Jakarta. Avoid low-lying roads.',
      time: '12 min ago',
      severity: 'critical',
    },
    {
      id: '2',
      title: 'Shelter Capacity',
      message: 'Kelapa Gading shelter at 70% capacity. Alternative: Sunter Hall.',
      time: '35 min ago',
      severity: 'info',
    },
    {
      id: '3',
      title: 'Power Restoration',
      message: 'Utility crews dispatched to Pluit. Expect restoration in 3 hours.',
      time: '1 hr ago',
      severity: 'info',
    },
    {
      id: '4',
      title: 'Road Closure',
      message: 'Jalan Merdeka closed due to debris. Use alternate routes.',
      time: '2 hr ago',
      severity: 'info',
    },
    {
      id: '5',
      title: 'Medical Camp',
      message: 'Mobile clinic set up at Kelapa Gading Stadium for first aid.',
      time: '3 hr ago',
      severity: 'info',
    },
  ];

  const unreadCount = notifications.length;
  const totalPages = Math.ceil(unreadCount / pageSize) || 1;
  const pagedNotifications = notifications.slice(page * pageSize, (page + 1) * pageSize);

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => {
      const next = !prev;
      if (next) setPage(0);
      return next;
    });
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-red-50 to-rose-100 relative">
      <EmergencyModal open={showEmergencyModal} onOpenChange={setShowEmergencyModal} type="tsunami" />
      <SMSBanner 
        show={showSMS} 
        onDismiss={() => setShowSMS(false)} 
        message="EMERGENCY ALERT: Tsunami detected in your area. EVACUATE NOW to higher ground. This is not a drill." 
      />

      {/* Top App Bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Resilient360</h1>
            <p className="text-sm text-gray-600">Protect Your Family</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLogout}
              className="w-12 h-12 rounded-2xl bg-red-100/80 backdrop-blur-xl flex items-center justify-center border border-red-200/50 hover:bg-red-200/60 transition-colors shadow-sm"
              aria-label="Logout"
            >
              <LogOut size={24} className="text-red-600 ml-1" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={handleToggleNotifications}
                className="w-12 h-12 rounded-2xl bg-red-100/80 backdrop-blur-xl flex items-center justify-center border border-red-200/50 hover:bg-red-200/60 transition-colors shadow-sm"
                aria-label="Notifications"
              >
                <Bell size={24} className="text-red-600" />
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {unreadCount}
                </span>
              )}

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-red-200/80 rounded-2xl shadow-2xl z-20 overflow-hidden">
                  <div className="px-4 py-3 border-b border-red-100/80 flex items-center justify-between bg-gradient-to-r from-red-50 to-rose-50">
                    <div>
                      <p className="text-sm text-gray-700">Notifications</p>
                      <p className="text-xs text-gray-500">Latest alerts in your area</p>
                    </div>
                    <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200/70">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto bg-white">
                    {pagedNotifications.map((n, idx) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 hover:bg-red-50/70 transition-colors ${
                          idx < pagedNotifications.length - 1 ? 'border-b border-red-200' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full ${n.severity === 'critical' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-900 font-medium">{n.title}</div>
                            <div className="text-sm text-gray-600 leading-snug mt-1">{n.message}</div>
                            <div className="text-xs text-gray-500 mt-2">{n.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-2 border-t border-red-100 bg-white">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                          page === 0
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'text-red-600 border-red-200 hover:bg-red-50'
                        }`}
                      >
                        Prev
                      </button>
                      <span className="text-xs text-gray-600">
                        Page {page + 1} of {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                        className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                          page >= totalPages - 1
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'text-red-600 border-red-200 hover:bg-red-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Alert Banner */}
      {showAlert && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-4 relative shadow-xl animate-pulse md:mx-auto md:max-w-5xl md:mt-4 md:rounded-2xl">
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

      <div className="p-4 space-y-6 md:mx-auto md:max-w-5xl md:py-6">
        {/* Live Statistics */}
        <section>
          <h2 className="text-gray-900 font-semibold text-lg mb-3">Live Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          <div className="grid grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StoryCard
              title="SAR Team Evacuates 45 Families"
              location="North Jakarta"
              time="1 hour ago"
              imageUrl="/images/sar_evacuation.png"
            />
            <StoryCard
              title="Medical Supplies Delivered to Remote Village"
              location="Bogor"
              time="3 hours ago"
              imageUrl="/images/medical_delivery.png"
            />
          </div>
          <button className="w-full mt-3 bg-white/80 backdrop-blur-xl border border-red-200/50 text-red-600 px-6 py-3 rounded-2xl hover:bg-red-50 transition-all shadow-sm font-semibold">
            View More
          </button>
        </section>
      </div>

      {/* Emergency CTA - Bottom */}
      <div className="px-4 py-4 mt-6 md:mx-auto md:max-w-5xl md:pb-6">
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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-red-200/50 aspect-[4/3] flex flex-col justify-between">
      <div className="flex flex-col h-full justify-between space-y-3">
        <div className="flex items-start justify-between">
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

        <div className="flex items-center gap-4 text-sm text-gray-700">
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
    </div>
  );
}

function StoryCard({
  title,
  location,
  time,
  imageUrl,
}: {
  title: string;
  location: string;
  time: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg border border-red-200/50 group cursor-pointer hover:shadow-xl transition-all">
      <div className="h-40 relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 mb-2 font-medium group-hover:text-red-600 transition-colors">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-red-500" />
            {location}
          </div>
          <span className="text-xs">{time}</span>
        </div>
      </div>
    </div>
  );
}