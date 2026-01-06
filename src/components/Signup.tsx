import { useState } from 'react';
import { Shield, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

type UserRole = 'user' | 'admin';

export function Signup({
  onSignup,
  onSwitchToLogin,
}: {
  onSignup: (role: UserRole) => void;
  onSwitchToLogin: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    // Simulate signup
    onSignup(selectedRole);
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

        {/* Signup Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20">
          <h2 className="text-white text-2xl mb-2">Create Account</h2>
          <p className="text-red-100 mb-6">Join our emergency response network</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 backdrop-blur-xl border border-red-400/30 rounded-2xl p-3 mb-4 flex items-start gap-2">
              <AlertCircle size={20} className="text-red-200 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm text-red-100 mb-3 block">Sign up as</label>
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
            {selectedRole === 'admin' && (
              <div className="mt-2 bg-orange-900/30 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-2 flex items-start gap-2">
                <AlertCircle size={16} className="text-orange-200 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-100">
                  Admin accounts require verification by authorities
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm text-red-100 mb-2 block">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-red-200/50 outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30"
              />
            </div>

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
                  placeholder="Create a password"
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
              <p className="text-xs text-red-200 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-red-100 mb-2 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-red-200/50 outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-200 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-white/50"
              />
              <label htmlFor="terms" className="text-sm text-red-100">
                I agree to the{' '}
                <button type="button" className="text-white hover:text-red-100">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-white hover:text-red-100">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-white text-red-600 px-6 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-red-100">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-white hover:text-red-100"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 mt-4 text-white text-sm border border-white/20">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <p className="text-red-100">
              Your safety is our priority. All accounts are verified to ensure secure emergency response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}