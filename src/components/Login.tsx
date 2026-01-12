import { useState } from 'react';
import { Shield, User, Smartphone, KeyRound, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type UserRole = 'user' | 'admin';

export function Login({
  onLogin,
}: {
  onLogin: (role: UserRole) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo constants
  const DEMO_PHONE = '+6281234567890';
  const DEMO_OTP = '123456';
  
  const DEMO_ADMIN_PHONE = '+628999999999';
  const DEMO_ADMIN_OTP = '999999';

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Check for demo number first for instant feedback (sanitize input first)
    const cleanInput = phoneNumber.replace(/\s+/g, '');
    const cleanDemo = DEMO_PHONE.replace(/\s+/g, '');
    const cleanAdminDemo = DEMO_ADMIN_PHONE.replace(/\s+/g, '');
    
    if (cleanInput === cleanDemo || cleanInput === cleanAdminDemo) {
      setError('');
      setShowOtpInput(true);
      
      const otpCode = cleanInput === cleanAdminDemo ? DEMO_ADMIN_OTP : DEMO_OTP;
      
      // Simulate a mobile system notification
      toast.custom(() => (
        <div className="bg-white/90 backdrop-blur-xl w-full max-w-sm rounded-2xl shadow-2xl border border-white/20 p-4 flex items-start gap-4 animate-in slide-in-from-top-full duration-500">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Smartphone className="text-white w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="font-semibold text-gray-900">Messages</h3>
              <span className="text-xs text-gray-500">now</span>
            </div>
            <p className="text-sm text-gray-900 font-medium">Resilient360</p>
            <p className="text-sm text-gray-600">Your verification code is: <span className="font-bold text-black">{otpCode}</span></p>
          </div>
        </div>
      ), { duration: 5000, position: 'top-center' });
      
      setIsLoading(false);
      return;
    }

    // Simulate API call delay for non-demo numbers only
    setTimeout(() => {
      setIsLoading(false);
      
      if (!phoneNumber) {
        setError('Please enter a phone number');
        return;
      }

      // For non-demo numbers, we still show OTP input but won't give them the code
      setShowOtpInput(true);
      toast.success('OTP sent successfully!');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    
    const cleanInput = phoneNumber.replace(/\s+/g, '');
    const cleanDemo = DEMO_PHONE.replace(/\s+/g, '');
    const cleanAdminDemo = DEMO_ADMIN_PHONE.replace(/\s+/g, '');

    const isUserValid = selectedRole === 'user' && cleanInput === cleanDemo && otp === DEMO_OTP;
    const isAdminValid = selectedRole === 'admin' && cleanInput === cleanAdminDemo && otp === DEMO_ADMIN_OTP;

    if (isUserValid || isAdminValid) {
      onLogin(selectedRole);
    } else {
      setError('Invalid credentials for selected role.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-rose-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl border border-white/30">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-white text-4xl mb-2">Resilient360</h1>
          <p className="text-red-100">Disaster Response Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20">
          <p className="text-red-100 mb-6">
            {showOtpInput ? 'Enter verification code' : 'Log in with phone number'}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 backdrop-blur-xl border border-red-400/30 rounded-2xl p-3 mb-4 flex items-start gap-2">
              <AlertCircle size={20} className="text-red-200 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          {/* Role Selection */}
          {!showOtpInput && (
            <div className="mb-6">
              <label className="text-sm text-red-100 mb-3 block">Login as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all ${
                    selectedRole === 'user'
                      ? 'border-white bg-white/20 backdrop-blur-xl text-white shadow-lg'
                      : 'border-white/20 bg-white/5 backdrop-blur-xl text-red-100 hover:bg-white/10'
                  }`}
                >
                  <User size={20} />
                  <span>User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all ${
                    selectedRole === 'admin'
                      ? 'border-white bg-white/20 backdrop-blur-xl text-white shadow-lg'
                      : 'border-white/20 bg-white/5 backdrop-blur-xl text-red-100 hover:bg-white/10'
                  }`}
                >
                  <Shield size={20} />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          )}

          {!showOtpInput ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-sm text-red-100 mb-2 block">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-red-200/50 outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-red-600 px-6 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-sm text-red-100 mb-2 block">OTP Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full px-4 py-3 pl-12 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-red-200/50 outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-center tracking-widest text-xl transition-all"
                    autoFocus
                  />
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-red-200" size={20} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-red-600 px-6 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <span>Verify & Login</span>
                <ArrowRight size={20} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtpInput(false);
                  setOtp('');
                  setError('');
                }}
                className="w-full text-red-100 text-sm hover:text-white transition-colors"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 mt-4 text-white text-sm border border-white/20">
          <div className="mb-2 font-semibold flex items-center gap-2">
            <Smartphone size={16} />
            Demo Credentials:
          </div>
          <div className="space-y-2 text-red-100 font-mono text-xs">
            <div>
              <span className="text-white/70">User:</span> {DEMO_PHONE}
              <br/>
              <span className="text-white/70">OTP:</span> {DEMO_OTP}
            </div>
            <div className="pt-2 border-t border-white/10">
              <span className="text-white/70">Admin:</span> {DEMO_ADMIN_PHONE}
              <br/>
              <span className="text-white/70">OTP:</span> {DEMO_ADMIN_OTP}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}