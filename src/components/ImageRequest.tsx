import { useState, useRef } from 'react';
import { Camera, MapPin, Check, X, AlertCircle, Plane, Upload, ArrowLeft } from 'lucide-react';

type RequestStep = 'capture' | 'details' | 'review';
type RequestStatus = 'pending' | 'approved' | 'rejected' | null;

export function ImageRequest() {
  const [step, setStep] = useState<RequestStep>('capture');
  const [image, setImage] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [location, setLocation] = useState('North Jakarta, Indonesia');
  const [description, setDescription] = useState('');
  const [aidNeeded, setAidNeeded] = useState<string[]>([]);
  const [otherAid, setOtherAid] = useState('');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(null);

  const startCamera = async () => {
    setIsLive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
      alert('Could not access camera. Please check permissions.');
      setIsLive(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        
        // Stop the camera stream
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        
        setIsLive(false);
        setStep('details');
      }
    }
  };

  const stopCamera = () => {
    setIsLive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setStep('details');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setStep('review');
    // Simulate verification process
    setTimeout(() => {
      setRequestStatus('pending');
    }, 500);
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('capture');
    } else if (step === 'review') {
      setStep('details');
    }
  };

  const toggleAid = (aid: string) => {
    setAidNeeded((prev) =>
      prev.includes(aid) ? prev.filter((a) => a !== aid) : [...prev, aid]
    );
  };

  const resetRequest = () => {
    setStep('capture');
    setImage(null);
    setDescription('');
    setAidNeeded([]);
    setOtherAid('');
    setRequestStatus(null);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-red-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 sticky top-0 z-10 shadow-lg">
        <h1 className="text-gray-900">Image Request</h1>
        <p className="text-sm text-gray-600">Submit verified aid request</p>
      </header>

      <div className="p-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <StepIndicator number={1} active={step === 'capture'} completed={step !== 'capture'} />
          <div className="w-8 h-0.5 bg-red-300"></div>
          <StepIndicator number={2} active={step === 'details'} completed={step === 'review'} />
          <div className="w-8 h-0.5 bg-red-300"></div>
          <StepIndicator number={3} active={step === 'review'} completed={false} />
        </div>

        {/* Step 1: Capture Image */}
        {step === 'capture' && (
          <div className="space-y-4">
            {isLive && (
              <button
                onClick={stopCamera}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors mb-2"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
            <div className="bg-black rounded-3xl border-2 border-dashed border-red-300 overflow-hidden shadow-lg relative h-96">
              {isLive ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-400 bg-white">
                  <Camera size={64} className="text-red-400" />
                  <p className="text-gray-600 text-center px-4">
                    Take a photo of the current situation
                  </p>
                </div>
              )}
            </div>

            {/* Shutter Button - Positioned below camera preview */}
            {isLive && (
              <div className="flex justify-center items-center -mt-2">
                <button 
                  onClick={takePhoto}
                  className="group relative flex items-center justify-center p-2"
                  aria-label="Take Photo"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-90 shadow-2xl bg-red-600">
                    <div className="w-16 h-16 bg-white rounded-full group-hover:bg-red-50" />
                  </div>
                </button>
              </div>
            )}

            {/* Hidden canvas used for capturing the image */}
            <canvas ref={canvasRef} className="hidden" style={{ display: 'none' }} aria-hidden="true" />

            {!isLive && (
              <div className="flex flex-col gap-3">
                <button
                  onClick={startCamera}
                  className="w-full bg-red-600 text-white px-6 py-4 rounded-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-md active:scale-[0.98] font-semibold"
                >
                  <Camera size={22} />
                  Open Camera
                </button>

                <label className="w-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <div className="w-full bg-white border border-red-200 text-red-600 px-6 py-4 rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-[0.98] font-semibold">
                    <Upload size={22} />
                    Upload File
                  </div>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Request Details */}
        {step === 'details' && (
          <div className="space-y-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors mb-2"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            {/* Image Preview */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-red-200/50 shadow-lg">
              <div className="h-48 bg-gradient-to-br from-red-100 to-rose-200 flex items-center justify-center text-gray-400">
                {image && image !== 'captured' ? (
                  <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={48} />
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
              <label className="text-sm text-gray-600 mb-2 block">Location</label>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-red-600" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Situation Description */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
              <label className="text-sm text-gray-600 mb-2 block">Situation Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is happening..."
                rows={4}
                className="w-full bg-transparent outline-none text-gray-900 resize-none placeholder:text-gray-400"
              />
            </div>

            {/* Aid Needed */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
              <label className="text-sm text-gray-600 mb-3 block">Aid Needed</label>
              <div className="flex flex-wrap gap-2">
                <AidChip
                  label="Food"
                  selected={aidNeeded.includes('Food')}
                  onClick={() => toggleAid('Food')}
                />
                <AidChip
                  label="Water"
                  selected={aidNeeded.includes('Water')}
                  onClick={() => toggleAid('Water')}
                />
                <AidChip
                  label="Medicine"
                  selected={aidNeeded.includes('Medicine')}
                  onClick={() => toggleAid('Medicine')}
                />
                <AidChip
                  label="Evacuation"
                  selected={aidNeeded.includes('Evacuation')}
                  onClick={() => toggleAid('Evacuation')}
                />
                <AidChip
                  label="Medical Assistance"
                  selected={aidNeeded.includes('Medical Assistance')}
                  onClick={() => toggleAid('Medical Assistance')}
                />
                <AidChip
                  label="Other"
                  selected={aidNeeded.includes('Other')}
                  onClick={() => toggleAid('Other')}
                />
              </div>
              {aidNeeded.includes('Other') && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={otherAid}
                    onChange={(e) => setOtherAid(e.target.value)}
                    placeholder="Specify other aid needed..."
                    className="w-full bg-white/80 border border-red-300 rounded-xl px-4 py-2 text-gray-900 placeholder:text-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-3xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
            >
              Continue to Review
            </button>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 'review' && (
          <div className="space-y-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors mb-2"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            {/* Image Preview */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-red-200/50 shadow-lg">
              <div className="h-48 bg-gradient-to-br from-red-100 to-rose-200 flex items-center justify-center text-gray-400">
                {image && image !== 'captured' ? (
                  <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={48} />
                )}
              </div>
            </div>

            {/* Details Summary */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 space-y-3 shadow-lg">
              <div>
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="text-gray-900">{location}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Description</div>
                <div className="text-gray-900">{description || 'No description provided'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Aid Needed</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {aidNeeded.map((aid) => (
                    <span key={aid} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm shadow-sm">
                      {aid === 'Other' && otherAid ? `Other: ${otherAid}` : aid}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Display */}
            {requestStatus === null && (
              <div className="bg-red-50/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-900">
                    Your request will be verified by our response team
                  </p>
                </div>
              </div>
            )}

            {requestStatus === 'pending' && (
              <div className="bg-yellow-50/80 backdrop-blur-xl rounded-3xl p-4 border border-yellow-200/50 shadow-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-yellow-900 mb-1">Pending Verification</div>
                    <p className="text-sm text-yellow-800">
                      Your request is being reviewed by our team
                    </p>
                  </div>
                </div>
              </div>
            )}

            {requestStatus === 'approved' && (
              <div className="bg-green-50/80 backdrop-blur-xl rounded-3xl p-4 border border-green-200/50 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-green-900 mb-1">Approved – Drone Dispatched</div>
                    <p className="text-sm text-green-800">
                      Relief drone is on its way to your location
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-700">
                      <Plane size={16} />
                      ETA: 15 minutes
                    </div>
                  </div>
                </div>
              </div>
            )}

            {requestStatus === 'rejected' && (
              <div className="bg-red-50/80 backdrop-blur-xl rounded-3xl p-4 border border-red-200/50 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <X size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-red-900 mb-1">Request Not Approved</div>
                    <p className="text-sm text-red-800">
                      Unable to verify location. Please ensure your GPS is enabled and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {requestStatus === null ? (
              <button
                onClick={() => setRequestStatus('pending')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-3xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
              >
                Submit Request
              </button>
            ) : (
              <button
                onClick={resetRequest}
                className="w-full bg-gray-600 text-white px-6 py-4 rounded-3xl hover:bg-gray-700 transition-all shadow-lg"
              >
                Submit New Request
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  active,
  completed,
}: {
  number: number;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg ${
        active
          ? 'bg-red-600 text-white'
          : completed
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 text-gray-600'
      }`}
    >
      {completed ? <Check size={16} /> : number}
    </div>
  );
}

function AidChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all shadow-sm ${
        selected
          ? 'bg-red-600 text-white shadow-lg'
          : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-red-50 border border-red-200/50'
      }`}
    >
      {label}
    </button>
  );
}