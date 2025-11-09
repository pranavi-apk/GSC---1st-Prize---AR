import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Login } from "./components/Login";
import { UserMenu } from "./components/UserMenu";
import { EmergencyAlert } from "./components/EmergencyAlert";
import { DroneMap } from "./components/DroneMap";
import { DisasterCard } from "./components/DisasterCard";
import { StatCard } from "./components/StatCard";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Chatbot } from "./components/Chatbot";
import { ImageRequest } from "./components/ImageRequest";
import { 
  AlertTriangle, 
  Users, 
  Plane, 
  Heart,
  Phone,
  Bell,
  Shield,
  Home,
  MapIcon,
  LifeBuoy,
  Languages,
  Type,
  Bot,
  Camera
} from "lucide-react";

type ViewType = "home" | "map" | "help" | "chatbot" | "image-request";

interface User {
  name: string;
  email: string;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);
  
  // Language and accessibility states
  const [fontSize, setFontSize] = useState("normal"); // normal, large, extra-large
  const [showSettings, setShowSettings] = useState(false);

  const handleLogin = (phone: string, password: string) => {
    // Mock authentication - in real app, validate with backend
    setIsAuthenticated(true);
    setUser({
      name: phone,
      email: `${phone}@siagabencana.id`
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView("home");
    setShowEmergencyAlert(true);
  };

  // Change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Language options for Indonesian regional languages
  const languageOptions = [
    { code: "id", name: "Bahasa Indonesia" },
    { code: "jv", name: "Bahasa Jawa" },
    { code: "su", name: "Bahasa Sunda" },
    { code: "ban", name: "Bahasa Bali" }
  ];

  // Font size options
  const fontSizeOptions = [
    { value: "normal", label: t("normal") },
    { value: "large", label: t("large") },
    { value: "extra-large", label: t("extra_large") }
  ];

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const activeDisasters = [
    {
      type: "Banjir Bandang",
      location: "Jakarta Utara, DKI Jakarta",
      peopleAffected: 2500,
      dronesDeployed: 4,
      status: "active" as const,
      time: "2 jam yang lalu",
      severity: "critical" as const
    },
    {
      type: "Gempa Bumi 6.2 SR",
      location: "Bandung, Jawa Barat",
      peopleAffected: 5200,
      dronesDeployed: 8,
      status: "active" as const,
      time: "5 jam yang lalu",
      severity: "high" as const
    },
    {
      type: "Tanah Longsor",
      location: "Bogor, Jawa Barat",
      peopleAffected: 850,
      dronesDeployed: 3,
      status: "monitoring" as const,
      time: "8 jam yang lalu",
      severity: "medium" as const
    },
    {
      type: "Banjir",
      location: "Bekasi, Jawa Barat",
      peopleAffected: 1200,
      dronesDeployed: 2,
      status: "monitoring" as const,
      time: "12 jam yang lalu",
      severity: "high" as const
    }
  ];

  const emergencyContacts = [
    { name: t("national_disaster_agency"), number: "117" },
    { name: t("ambulance_medical"), number: "118 / 119" },
    { name: t("fire_department"), number: "113" },
    { name: t("police"), number: "110" },
    { name: t("national_search_rescue"), number: "115" }
  ];

  return (
    // Apply font size class based on setting
    <div className={`min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative ${
      fontSize === "large" ? "text-lg" : 
      fontSize === "extra-large" ? "text-xl" : "text-base"
    }`}>
      {/* Mobile App Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">{t("app_name")}</h1>
              <p className="text-xs text-white/80">{t("protect_your_family")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Languages className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
            {user && (
              <UserMenu
                userName={user.name}
                userEmail={user.email}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              {/* Language Selection */}
              <div>
                <label className="text-white text-sm flex items-center gap-1 mb-1">
                  <Languages className="w-4 h-4" />
                  {t("language")}
                </label>
                <select 
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="w-full p-2 rounded bg-white/90 text-slate-900 text-sm"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Font Size Selection */}
              <div>
                <label className="text-white text-sm flex items-center gap-1 mb-1">
                  <Type className="w-4 h-4" />
                  {t("font_size")}
                </label>
                <select 
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full p-2 rounded bg-white/90 text-slate-900 text-sm"
                >
                  {fontSizeOptions.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area with Bottom Padding for Nav */}
      <main className="flex-1 overflow-y-auto pb-20">
        {/* Home View */}
        {currentView === "home" && (
          <div className="p-4 space-y-4">
            {/* Emergency Alert */}
            {showEmergencyAlert && (
              <EmergencyAlert
                type="Banjir Bandang"
                location="Jakarta Utara - Segera evakuasi ke tempat yang lebih tinggi"
                severity="critical"
                time="2 jam yang lalu"
                onDismiss={() => setShowEmergencyAlert(false)}
              />
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                title={t("affected_people")}
                value="9,750"
                icon={Users}
                iconColor="text-blue-600"
                iconBg="bg-blue-100"
              />
              <StatCard
                title={t("active_drones")}
                value="17"
                icon={Plane}
                iconColor="text-green-600"
                iconBg="bg-green-100"
              />
              <StatCard
                title={t("active_disasters")}
                value="4"
                icon={AlertTriangle}
                iconColor="text-red-600"
                iconBg="bg-red-100"
              />
              <StatCard
                title={t("aid_delivered")}
                value="245"
                icon={Heart}
                iconColor="text-purple-600"
                iconBg="bg-purple-100"
              />
            </div>

            {/* Disaster Updates */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-slate-900">{t("recent_disasters")}</h2>
                <Button variant="ghost" size="sm" className="text-red-600">
                  {t("view_all")}
                </Button>
              </div>
              <div className="space-y-3">
                {activeDisasters.slice(0, 2).map((disaster, idx) => (
                  <div key={idx}>
                    <DisasterCard 
                      type={disaster.type}
                      location={disaster.location}
                      peopleAffected={disaster.peopleAffected}
                      dronesDeployed={disaster.dronesDeployed}
                      status={disaster.status}
                      time={disaster.time}
                      severity={disaster.severity}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* People Stories */}
            <div>
              <h3 className="text-slate-900 mb-3">{t("stories")}</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1734445558870-72ee57ee3930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNjdWUlMjB0ZWFtJTIwaGVscGluZ3xlbnwxfHx8fDE3NjI2NTM1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tim penyelamat"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-slate-900 mb-1">Tim SAR Evakuasi 45 Keluarga</p>
                    <p className="text-xs text-slate-600">Jakarta Utara • 2 jam lalu</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1638401607292-ba5ca538031e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjByZXNwb25zZXxlbnwxfHx8fDE3NjI2NTM1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Drone bantuan"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-slate-900 mb-1">Drone Kirim Obat Darurat</p>
                    <p className="text-xs text-slate-600">Bandung • 5 jam lalu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Help Card */}
            <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-600 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-900 mb-0">{t("need_help")}</h3>
                  <p className="text-xs text-red-700">{t("emergency_team")}</p>
                </div>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                {t("contact_emergency")}
              </Button>
            </Card>
          </div>
        )}

        {/* Map View */}
        {currentView === "map" && (
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-slate-900 mb-1">{t("real_time_drone_map")}</h2>
              <p className="text-sm text-slate-600 mb-4">
                {t("monitoring_drones")}
              </p>
            </div>
            
            <Card className="p-4">
              <DroneMap />
            </Card>

            <div>
              <h3 className="text-slate-900 mb-3">{t("all_active_disasters")}</h3>
              <div className="space-y-3">
                {activeDisasters.map((disaster, idx) => (
                  <div key={idx}>
                    <DisasterCard 
                      type={disaster.type}
                      location={disaster.location}
                      peopleAffected={disaster.peopleAffected}
                      dronesDeployed={disaster.dronesDeployed}
                      status={disaster.status}
                      time={disaster.time}
                      severity={disaster.severity}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chatbot View */}
        {currentView === "chatbot" && (
          <div className="h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <Bot className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{t("ai_assistant")}</h3>
                  <p className="text-xs text-slate-500">{t("online")}</p>
                </div>
              </div>
            </div>
            <Chatbot />
          </div>
        )}

        {/* Image Request View */}
        {currentView === "image-request" && (
          <div className="h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <Camera className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-medium text-slate-900">{t("image_request")}</h3>
              </div>
            </div>
            <ImageRequest />
          </div>
        )}

        {/* Help View */}
        {currentView === "help" && (
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-slate-900 mb-1">{t("help_center")}</h2>
              <p className="text-sm text-slate-600 mb-4">
                {t("emergency_contacts")} dan {t("safety_guidelines").toLowerCase()}
              </p>
            </div>

            {/* Emergency Contacts */}
            <Card className="p-4">
              <h3 className="text-slate-900 mb-3">{t("emergency_contacts")}</h3>
              <div className="space-y-2">
                {emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="bg-red-100 p-2 rounded flex-shrink-0">
                        <Phone className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-900 truncate">{contact.name}</p>
                        <p className="text-slate-600">{contact.number}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="flex-shrink-0 ml-2">
                      {t("call")}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Safety Guidelines */}
            <div>
              <h3 className="text-slate-900 mb-3">{t("safety_guidelines")}</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="text-blue-900 mb-2">🌊 {t("during_flood")}</h4>
                  <ul className="text-sm text-blue-800 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{t("flood_move_higher")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{t("flood_turn_off")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{t("flood_avoid_walking")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{t("flood_save_documents")}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <h4 className="text-orange-900 mb-2">🏔️ {t("during_earthquake")}</h4>
                  <ul className="text-sm text-orange-800 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <span>{t("earthquake_protect_head")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <span>{t("earthquake_away_windows")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <span>{t("earthquake_no_elevator")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <span>{t("earthquake_open_area")}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h4 className="text-green-900 mb-2">⛰️ {t("during_landslide")}</h4>
                  <ul className="text-sm text-green-800 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{t("landslide_leave_immediately")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{t("landslide_watch_cracks")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{t("landslide_listen_unusual")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{t("landslide_dont_return")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Emergency Button */}
            <Card className="p-5 bg-gradient-to-br from-red-600 to-red-700 border-0">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white mb-2">{t("emergency_question")}</h3>
                <p className="text-sm text-white/90 mb-4">
                  {t("request_help")}
                </p>
                <Button className="w-full bg-white text-red-600 hover:bg-white/90">
                  {t("request_help")}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentView("home")}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              currentView === "home"
                ? "bg-red-50 text-red-600"
                : "text-slate-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">{t("home")}</span>
          </button>
          <button
            onClick={() => setCurrentView("map")}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              currentView === "map"
                ? "bg-red-50 text-red-600"
                : "text-slate-500"
            }`}
          >
            <MapIcon className="w-5 h-5" />
            <span className="text-xs">{t("map")}</span>
          </button>
          <button
            onClick={() => setCurrentView("chatbot")}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              currentView === "chatbot"
                ? "bg-red-50 text-red-600"
                : "text-slate-500"
            }`}
          >
            <Bot className="w-5 h-5" />
            <span className="text-xs">{t("chatbot")}</span>
          </button>
          <button
            onClick={() => setCurrentView("image-request")}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              currentView === "image-request"
                ? "bg-red-50 text-red-600"
                : "text-slate-500"
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">{t("image_request")}</span>
          </button>
          <button
            onClick={() => setCurrentView("help")}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              currentView === "help"
                ? "bg-red-50 text-red-600"
                : "text-slate-500"
            }`}
          >
            <LifeBuoy className="w-5 h-5" />
            <span className="text-xs">{t("help")}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}