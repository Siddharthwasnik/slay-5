import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: {
    name: string;
    email: string;
    phone: string;
    avatarInitials: string;
    tier: string;
    coins: number;
    joined: string;
  }) => void;
}

type AuthMode = 'phone' | 'email';
type SimState = 'phone_input' | 'otp_sent' | 'invalid_otp' | 'success';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('phone');
  const [phoneNumber, setPhoneNumber] = useState('9845019283');
  const [email, setEmail] = useState('ananya.nair@example.com');
  const [otpDigits, setOtpDigits] = useState(['4', '8', '9', '2', '', '']);
  const [simState, setSimState] = useState<SimState>('phone_input');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      setSimState('otp_sent');
      setOtpDigits(['4', '8', '9', '2', '1', '0']);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP code.');
      return;
    }

    if (simState === 'invalid_otp' || entered === '000000') {
      setErrorMessage('Invalid OTP code. Please retry with the code received via SMS.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Ananya Nair',
        email: email || 'ananya.nair@example.com',
        phone: `+91 ${phoneNumber}`,
        avatarInitials: 'AN',
        tier: 'Slayvana Gold Circle',
        coins: 450,
        joined: 'November 2024',
      });
      onClose();
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess({
      name: 'Ananya Nair',
      email: 'ananya.nair@example.com',
      phone: '+91 98450 19283',
      avatarInitials: 'AN',
      tier: 'Slayvana Gold Circle',
      coins: 450,
      joined: 'November 2024',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fff8f6] border border-[#ebdcd8] rounded-sm max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-[#251915]">
        {/* Simulator Bar */}
        <div className="bg-[#251915] text-[#fff8f6] -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-3 rounded-t-sm mb-6 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdcd8]">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ff602a]">
            <span className="material-symbols-outlined text-sm">developer_mode</span>
            <span>Auth Test State</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setSimState('phone_input');
                setErrorMessage('');
              }}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded ${
                simState === 'phone_input' ? 'bg-[#ff602a] text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Phone Form
            </button>
            <button
              onClick={() => {
                setSimState('otp_sent');
                setOtpDigits(['4', '8', '9', '2', '1', '0']);
                setErrorMessage('');
              }}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded ${
                simState === 'otp_sent' ? 'bg-[#ff602a] text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              OTP Code
            </button>
            <button
              onClick={() => {
                setSimState('invalid_otp');
                setErrorMessage('Invalid verification code entered.');
              }}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded ${
                simState === 'invalid_otp' ? 'bg-red-600 text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Simulate Error
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors z-10"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff602a] font-bold">
            SLAYVANA • BESPOKE PRIVILEGE
          </span>
          <h2 className="font-syne text-2xl font-bold tracking-tight text-[#251915] mt-1">
            Sign In / Register
          </h2>
          <p className="text-xs text-[#8f7166] mt-2 max-w-xs mx-auto leading-relaxed">
            Access tracked dispatches, saved Jaipur sizes, and reserved seasonal previews.
          </p>
        </div>

        {/* Toggle Mode */}
        {simState === 'phone_input' && (
          <div className="flex border border-[#ebdcd8] rounded-sm p-1 bg-[#fdeee9] mb-6">
            <button
              type="button"
              onClick={() => setAuthMode('phone')}
              className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all font-semibold ${
                authMode === 'phone'
                  ? 'bg-white text-[#251915] shadow-xs'
                  : 'text-[#8f7166] hover:text-[#251915]'
              }`}
            >
              Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('email')}
              className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all font-semibold ${
                authMode === 'email'
                  ? 'bg-white text-[#251915] shadow-xs'
                  : 'text-[#8f7166] hover:text-[#251915]'
              }`}
            >
              Email Magic Link
            </button>
          </div>
        )}

        {/* STEP 1: Phone / Email Input Form */}
        {simState === 'phone_input' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {authMode === 'phone' ? (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8f7166] mb-1.5 font-bold">
                  Enter 10-Digit Mobile Number
                </label>
                <div className="flex rounded-sm border border-[#ebdcd8] bg-white focus-within:border-[#ff602a] overflow-hidden">
                  <span className="px-3 py-2.5 bg-[#fdeee9] border-r border-[#ebdcd8] text-xs font-mono font-bold text-[#251915] flex items-center gap-1">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9845019283"
                    className="flex-1 px-3 py-2 text-sm focus:outline-none font-mono"
                  />
                </div>
                <p className="text-[11px] text-[#8f7166] mt-1.5">
                  We'll send a 6-digit one-time verification password via SMS.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8f7166] mb-1.5 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya.nair@example.com"
                  className="w-full px-3 py-2.5 text-sm border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a] bg-white"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#ff602a] hover:bg-[#8a3300] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                  Sending Code...
                </>
              ) : (
                'Request Verification Code'
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="text-center">
              <span className="text-xs text-[#8f7166]">
                Code sent to <span className="font-mono font-bold text-[#251915]">+91 {phoneNumber}</span>
              </span>
              <button
                type="button"
                onClick={() => setSimState('phone_input')}
                className="text-[11px] text-[#ff602a] hover:underline ml-2"
              >
                Change
              </button>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-between gap-2 max-w-xs mx-auto">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    const copy = [...otpDigits];
                    copy[idx] = val;
                    setOtpDigits(copy);
                  }}
                  className="w-10 h-12 text-center text-lg font-mono font-bold border border-[#ebdcd8] bg-white rounded-sm focus:border-[#ff602a] focus:outline-none"
                />
              ))}
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-sm shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#251915] hover:bg-[#ff602a] text-[#fff8f6] font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                  Validating Passcode...
                </>
              ) : (
                'Verify & Enter Atelier'
              )}
            </button>

            <div className="text-center text-xs text-[#8f7166]">
              Didn't receive SMS?{' '}
              <button
                type="button"
                onClick={() => {
                  setOtpDigits(['4', '8', '9', '2', '1', '0']);
                  setErrorMessage('');
                }}
                className="text-[#ff602a] font-bold hover:underline"
              >
                Resend in 24s
              </button>
            </div>
          </form>
        )}

        {/* Quick Demo Bypass Button */}
        <div className="pt-5 mt-5 border-t border-[#ebdcd8] text-center space-y-3">
          <p className="text-[11px] text-[#8f7166] uppercase font-mono tracking-wider">
            Quick Reviewer Access
          </p>
          <button
            onClick={handleQuickDemoLogin}
            className="w-full py-2 bg-[#fdeee9] border border-[#ebdcd8] hover:border-[#251915] text-[#251915] font-mono text-[11px] uppercase tracking-wider font-bold rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm text-[#ff602a]">bolt</span>
            Instant Sign-in as Ananya Nair (Privilege Club)
          </button>
        </div>

        {/* Security Assurances */}
        <div className="mt-5 text-center text-[10px] text-[#8f7166] font-mono flex items-center justify-center gap-3">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-emerald-700">lock</span>
            256-Bit Encrypted
          </span>
          <span>•</span>
          <span>No spam guarantee</span>
        </div>
      </div>
    </div>
  );
};
