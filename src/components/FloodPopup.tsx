import React, { useEffect, useState } from 'react';

interface FloodPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloodPopup: React.FC<FloodPopupProps> = ({ isOpen, onClose }) => {
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    if (isOpen && !hasBeenShown) {
      setHasBeenShown(true);
    }
  }, [isOpen, hasBeenShown]);

  if (!isOpen || !hasBeenShown) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          aria-label="Close popup"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-800"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        
        {/* Image */}
        <div className="w-full h-auto">
          <img 
            src="/flood.png" 
            alt="Flood Alert" 
            className="w-full h-auto object-contain max-h-[80vh]"
          />
        </div>
        
        {/* Close Button at bottom as well */}
        <div className="p-4 bg-gray-50 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloodPopup;