import { useState } from 'react';
import { Shield, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

type UserRole = 'user' | 'admin';

export function Login({
  onLogin,
  onSwitchToSignup,
}: {
  onLogin: (role: UserRole) => void;
  onSwitchToSignup: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const openFullscreen = () => {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Trigger full screen on login
    openFullscreen();

    // Simulate login
    onLogin(selectedRole);
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
          <h2 className="text-white text-2xl mb-2">Welcome Back</h2>
          <p className="text-red-100 mb-6">Sign in to continue</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 backdrop-blur-xl border border-red-400/30 rounded-2xl p-3 mb-4 flex items-start gap-2">
              <AlertCircle size={20} className="text-red-200 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          {/* Role Selection */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm text-red-100 mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-red-200/50 outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-red-100 mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-red-200/50 outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-200 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-white hover:text-red-100"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-white text-red-600 px-6 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-red-100">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-white hover:text-red-100"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 mt-4 text-white text-sm border border-white/20">
          <div className="mb-2">Demo Credentials:</div>
          <div className="space-y-1 text-red-100">
            <div>User: user@demo.com / password123</div>
            <div>Admin: admin@demo.com / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}