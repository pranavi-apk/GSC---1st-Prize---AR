import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DroneMap } from './components/DroneMap';
import { ImageRequest } from './components/ImageRequest';
import { AIAssistant } from './components/AIAssistant';
import { HelpCenter } from './components/HelpCenter';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home, Map, Camera, Bot, HelpCircle, Shield } from 'lucide-react';

type Tab = 'dashboard' | 'map' | 'request' | 'ai' | 'help' | 'admin';
type UserRole = 'user' | 'admin' | null;
type AuthView = 'login' | 'signup';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [authView, setAuthView] = useState<AuthView>('login');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'user') {
      setActiveTab('dashboard');
    } else if (role === 'admin') {
      setActiveTab('admin');
    }
  };

  const handleSignup = (role: UserRole) => {
    setUserRole(role);
    if (role === 'user') {
      setActiveTab('dashboard');
    } else if (role === 'admin') {
      setActiveTab('admin');
    }
  };

  // Show auth screens if user is not logged in
  if (!userRole) {
    if (authView === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthView('signup')}
        />
      );
    } else {
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-red-50 to-rose-100 max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'map' && <DroneMap />}
        {activeTab === 'request' && <ImageRequest />}
        {activeTab === 'ai' && <AIAssistant />}
        {activeTab === 'help' && <HelpCenter />}
        {activeTab === 'admin' && <AdminDashboard />}
      </div>

      {/* Bottom Navigation - Different for User vs Admin */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-red-200/50 px-2 py-2 shadow-2xl">
        <div className="flex items-center justify-around">
          {userRole === 'user' && (
            <>
              <NavButton
                icon={<Home size={20} />}
                label="Dashboard"
                active={activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
              />
              <NavButton
                icon={<Map size={20} />}
                label="Map"
                active={activeTab === 'map'}
                onClick={() => setActiveTab('map')}
              />
              <NavButton
                icon={<Camera size={20} />}
                label="Request"
                active={activeTab === 'request'}
                onClick={() => setActiveTab('request')}
              />
              <NavButton
                icon={<Bot size={20} />}
                label="AI Assist"
                active={activeTab === 'ai'}
                onClick={() => setActiveTab('ai')}
              />
              <NavButton
                icon={<HelpCircle size={20} />}
                label="Help"
                active={activeTab === 'help'}
                onClick={() => setActiveTab('help')}
              />
            </>
          )}
          {userRole === 'admin' && (
            <>
              <NavButton
                icon={<Shield size={20} />}
                label="Admin"
                active={activeTab === 'admin'}
                onClick={() => setActiveTab('admin')}
              />
              <NavButton
                icon={<Map size={20} />}
                label="Map"
                active={activeTab === 'map'}
                onClick={() => setActiveTab('map')}
              />
              <NavButton
                icon={<HelpCircle size={20} />}
                label="Help"
                active={activeTab === 'help'}
                onClick={() => setActiveTab('help')}
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all flex-1 ${
        active
          ? 'text-red-600 bg-red-100/80 backdrop-blur-xl shadow-lg'
          : 'text-gray-600 hover:bg-red-50/50'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}