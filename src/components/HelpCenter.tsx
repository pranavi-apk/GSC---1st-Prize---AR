import { Phone, ChevronDown, ChevronUp, AlertTriangle, Droplets, Heart, Home, Zap } from 'lucide-react';
import { useState } from 'react';

type GuidelineItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string[];
};

const GUIDELINES: GuidelineItem[] = [
  {
    id: '1',
    icon: <Droplets size={24} />,
    title: 'During a Flood',
    content: [
      'Move to higher ground immediately',
      'Avoid walking through moving water',
      'Stay away from power lines and electrical equipment',
      'Do not drive through flooded areas',
      'Listen to emergency broadcasts for updates',
    ],
  },
  {
    id: '2',
    icon: <AlertTriangle size={24} />,
    title: 'During an Earthquake',
    content: [
      'Drop, Cover, and Hold On',
      'Stay indoors until shaking stops',
      'Stay away from windows and heavy objects',
      'If outdoors, move to an open area',
      'After shaking stops, check for injuries and damage',
    ],
  },
  {
    id: '3',
    icon: <Heart size={24} />,
    title: 'First Aid Basics',
    content: [
      'Stop bleeding with direct pressure',
      'Clean wounds with clean water',
      'Cover wounds with sterile bandages',
      'For severe injuries, seek immediate help',
      'Keep emergency contact numbers accessible',
    ],
  },
  {
    id: '4',
    icon: <Home size={24} />,
    title: 'Emergency Preparedness',
    content: [
      'Keep emergency kit with food, water, and medicine',
      'Have flashlight and batteries ready',
      'Know your evacuation routes',
      'Keep important documents in waterproof container',
      'Establish family communication plan',
    ],
  },
  {
    id: '5',
    icon: <Zap size={24} />,
    title: 'Power Outages',
    content: [
      'Turn off electrical appliances',
      'Keep refrigerator and freezer doors closed',
      'Use flashlights, not candles when possible',
      'Conserve phone battery',
      'Stay away from downed power lines',
    ],
  },
];

export function HelpCenter() {
  return (
    <div className="min-h-full bg-gradient-to-br from-red-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 sticky top-0 z-10 shadow-lg">
        <h1 className="text-gray-900">Help Center</h1>
        <p className="text-sm text-gray-600">Emergency support & safety guides</p>
      </header>

      <div className="p-4 space-y-6">
        {/* Emergency Call Card */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-6 shadow-2xl border border-red-400/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <Phone size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-white">Emergency Hotline</h2>
              <p className="text-sm text-red-100">Available 24/7</p>
            </div>
          </div>
          <a
            href="tel:112"
            className="block w-full bg-white text-red-600 text-center px-6 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-lg"
          >
            Call 112 Now
          </a>
        </div>

        {/* Safety Guidelines */}
        <section>
          <h2 className="text-gray-900 mb-3">Safety Guidelines</h2>
          <div className="space-y-3">
            {GUIDELINES.map((guideline) => (
              <GuidelineCard key={guideline.id} guideline={guideline} />
            ))}
          </div>
        </section>

        {/* Preparedness Tips */}
        <section>
          <h2 className="text-gray-900 mb-3">Preparedness Tips</h2>
          <div className="space-y-3">
            <TipCard
              title="Build an Emergency Kit"
              description="Prepare a kit with essentials: water, non-perishable food, first aid supplies, flashlight, batteries, and important documents."
            />
            <TipCard
              title="Know Your Evacuation Routes"
              description="Familiarize yourself with multiple evacuation routes from your home, workplace, and school."
            />
            <TipCard
              title="Create a Communication Plan"
              description="Establish a family meeting point and ensure everyone knows emergency contact numbers."
            />
            <TipCard
              title="Stay Informed"
              description="Download the Resilient360 app and enable notifications for real-time disaster alerts in your area."
            />
          </div>
        </section>

        {/* Contact Support */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
          <h3 className="text-gray-900 mb-2">Need More Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Our support team is here to assist you with any questions or concerns.
          </p>
          <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

function GuidelineCard({ guideline }: { guideline: GuidelineItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-red-200/50 overflow-hidden shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-red-600">{guideline.icon}</div>
          <h3 className="text-gray-900">{guideline.title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-gray-400" />
        ) : (
          <ChevronDown size={20} className="text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-red-100">
          <ul className="space-y-2 mt-3">
            {guideline.content.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-600 flex-shrink-0 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}