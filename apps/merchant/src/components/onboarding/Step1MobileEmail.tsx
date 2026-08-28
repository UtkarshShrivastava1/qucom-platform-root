import React, { useState } from 'react';
import { Phone, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { branding } from '../../lib/branding.js';
import { useOnboardingStore } from '../../stores/onboardingStore.js';

interface Step1MobileEmailProps {
  onContinue: () => void;
  onGoToLogin: () => void;
}

export const Step1MobileEmail: React.FC<Step1MobileEmailProps> = ({
  onContinue,
  onGoToLogin,
}) => {
  const { draft, updateStep } = useOnboardingStore();

  const [phone, setPhone] = useState(draft.step1?.mobileNumber || '');
  const [email, setEmail] = useState(draft.step1?.email || '');
  const [password, setPassword] = useState(draft.step1?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(draft.step1?.confirmPassword || '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendPhoneOtp = () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError(null);
    setPhoneOtpSent(true);
  };

  const handleSendEmailOtp = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setEmailOtpSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    updateStep(1, {
      fullName: 'Thoufiq Ahmed',
      mobileNumber: phone,
      email,
      password,
      confirmPassword,
    });

    onContinue();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
          1
        </div>
        <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          MOBILE & E-MAIL VERIFICATION
        </h2>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mobile Number */}
        <div className="relative">
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Phone className="w-4 h-4 text-slate-400" />
              <input
                type="tel"
                maxLength={10}
                placeholder="Enter Mobile Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleSendPhoneOtp}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 ml-2 whitespace-nowrap"
            >
              {phoneOtpSent ? 'OTP Sent ✓' : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* E-mail ID */}
        <div className="relative">
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="E-mail ID *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleSendEmailOtp}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 ml-2 whitespace-nowrap"
            >
              {emailOtpSent ? 'OTP Sent ✓' : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* Create Password */}
        <div className="relative">
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 ml-2"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400 hover:text-slate-600 ml-2"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 pt-2">
          By continuing, I agree to {branding.appName}'s{' '}
          <span className="font-semibold text-slate-800">Terms of Use</span> &{' '}
          <span className="font-semibold text-slate-800">Privacy Policy</span>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <span>Register & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Already a user */}
        <div className="pt-4 text-center">
          <span className="text-xs text-slate-500 block mb-2">Already a user?</span>
          <button
            type="button"
            onClick={onGoToLogin}
            className="w-full py-3 px-6 rounded-xl border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-all cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
