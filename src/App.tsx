import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { DroneMap } from './components/DroneMap';
import { ImageRequest } from './components/ImageRequest';
import { AIAssistant } from './components/AIAssistant';
import { HelpCenter } from './components/HelpCenter';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import FloodPopup from './components/FloodPopup';
import { Home, Map, Camera, Bot, HelpCircle, Shield } from 'lucide-react';

type Tab = 'dashboard' | 'map' | 'request' | 'ai' | 'help' | 'admin';
type UserRole = 'user' | 'admin' | null;
type AuthView = 'login' | 'signup';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [showFloodPopup, setShowFloodPopup] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'user') {
      setActiveTab('dashboard');
      // Show flood popup after login for users only
      setShowFloodPopup(true);
    } else if (role === 'admin') {
      setActiveTab('admin');
    }
  };

  const handleSignup = (role: UserRole) => {
    setUserRole(role);
    if (role === 'user') {
      setActiveTab('dashboard');
      // Show flood popup after signup for users only
      setShowFloodPopup(true);
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
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-red-50 to-rose-100">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0 md:ml-64 md:flex md:justify-center">
        <div className="w-full max-w-5xl">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'map' && <DroneMap />}
        {activeTab === 'request' && <ImageRequest />}
        {activeTab === 'ai' && <AIAssistant />}
        {activeTab === 'help' && <HelpCenter />}
        {activeTab === 'admin' && <AdminDashboard />}
        </div>
      </div>

      {/* Bottom Navigation - Different for User vs Admin */}
      <nav className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:bottom-0 md:w-64 md:border-r md:border-t-0 bg-white/80 backdrop-blur-xl border-t md:border-t-0 border-red-200/50 px-2 py-2 md:py-4 shadow-2xl md:flex md:flex-col">
        <div className="flex items-center justify-around md:flex-col md:gap-2 md:items-stretch">
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
      
      {/* Flood Popup */}
      <FloodPopup 
        isOpen={showFloodPopup}
        onClose={() => setShowFloodPopup(false)}
      />
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
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 rounded-2xl transition-all flex-1 md:flex-none ${
        active
          ? 'text-red-600 bg-red-100/80 backdrop-blur-xl shadow-lg'
          : 'text-gray-600 hover:bg-red-50/50'
      }`}
    >
      {icon}
      <span className="text-xs md:text-sm">{label}</span>
    </button>
  );
}