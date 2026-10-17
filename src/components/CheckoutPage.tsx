import React, { useState } from 'react';
import { CartItem } from '../types';
import { ScreenId } from './PrototypeBar';

interface CheckoutPageProps {
  items: CartItem[];
  onNavigate: (screen: ScreenId) => void;
  onClearCart?: () => void;
}

export type CheckoutStep = 1 | 2 | 3;
export type CheckoutSimMode =
  | 'default'
  | 'step1'
  | 'step3'
  | 'validation-error'
  | 'invalid-coupon'
  | 'processing'
  | 'payment-failed'
  | 'order-confirmed';

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ items, onNavigate, onClearCart }) => {
  // Stepper state
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(2); // Default Step 2: Shipping
  const [simMode, setSimMode] = useState<CheckoutSimMode>('default');

  // Form Fields
  const [email, setEmail] = useState('pooja.sharma@example.com');
  const [firstName, setFirstName] = useState('Pooja');
  const [lastName, setLastName] = useState('Sharma');
  const [address, setAddress] = useState('Flat 402, Lotus Pavilion, 12th Main, HAL 2nd Stage');
  const [landmark, setLandmark] = useState('Near Indiranagar Club');
  const [pinCode, setPinCode] = useState('560038');
  const [cityState, setCityState] = useState('Bengaluru, Karnataka');
  const [phone, setPhone] = useState('9876543210');
  const [dispatchCadence, setDispatchCadence] = useState<'standard' | 'express'>('standard');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('poojasharma@okhdfcbank');
  const [upiVerified, setUpiVerified] = useState(true);

  // Discount
  const [discountCode, setDiscountCode] = useState('FESTIVE300');
  const [discountApplied, setDiscountApplied] = useState(true);
  const [couponError, setCouponError] = useState(false);

  // Validation feedback
  const [hasErrors, setHasErrors] = useState(false);

  // Price computations
  const totalItemCount = items.reduce((sum, it) => sum + it.quantity, 0) || 4;
  const bagSubtotal = 3896;
  const multiBuySavings = discountApplied ? 600 : 0;
  const shippingFee = dispatchCadence === 'express' ? 99 : 0;
  const codFee = paymentMethod === 'cod' ? 50 : 0;
  const totalPayable = bagSubtotal - multiBuySavings + shippingFee + codFee;

  // Simulator controls
  const handleSimSwitch = (mode: CheckoutSimMode) => {
    setSimMode(mode);
    setHasErrors(false);
    setCouponError(false);

    if (mode === 'default') {
      setCurrentStep(2);
      setDiscountApplied(true);
    } else if (mode === 'step1') {
      setCurrentStep(1);
    } else if (mode === 'step3') {
      setCurrentStep(3);
    } else if (mode === 'validation-error') {
      setHasErrors(true);
      setCurrentStep(2);
      setPhone('');
    } else if (mode === 'invalid-coupon') {
      setCouponError(true);
      setDiscountApplied(false);
    } else if (mode === 'processing') {
      // triggers spinner
    } else if (mode === 'payment-failed') {
      // triggers modal
    } else if (mode === 'order-confirmed') {
      // triggers success screen
    }
  };

  const handleCompleteOrder = () => {
    if (simMode === 'payment-failed') {
      return;
    }
    setSimMode('processing');
    setTimeout(() => {
      setSimMode('order-confirmed');
      if (onClearCart) onClearCart();
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col bg-[#fff8f6] min-h-screen">
      {/* Slayvana Secure Checkout Top Header */}
      <header className="w-full bg-[#1d1c13] text-white px-4 lg:px-10 py-3 flex items-center justify-between border-b border-[#333127]">
        <div className="flex items-center gap-3">
          <span className="font-syne text-xl font-black tracking-widest uppercase text-white">
            SLAYVANA
          </span>
          <span className="text-[11px] text-[#ffdad3] uppercase tracking-wider font-semibold">
            SECURE CHECKOUT
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-[#333127] text-[#ff9876] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">lock</span>
            <span>256-BIT SSL</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffdad3] hover:text-white flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span className="hidden sm:inline">Concierge Help</span>
          </a>
          <button
            onClick={() => onNavigate('account')}
            className="w-7 h-7 rounded-full bg-[#2f150f] text-white flex items-center justify-center hover:bg-[#98462a]"
          >
            <span className="material-symbols-outlined text-[15px]">person</span>
          </button>
        </div>
      </header>

      {/* Interactive Live QA Simulator Bar (Matching Image 1) */}
      <aside
        aria-label="QA Simulator"
        className="w-full bg-[#2f150f] text-white px-4 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-2 shadow-sm text-xs"
      >
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#ffdad3]">
          <span className="material-symbols-outlined text-[16px] text-[#ff9876]">tune</span>
          <span>LIVE QA SIMULATOR</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'default', label: 'Default (Step 2: Shipping)' },
            { id: 'step1', label: 'Step 1: Contact' },
            { id: 'step3', label: 'Step 3: Payment' },
            { id: 'validation-error', label: 'Validation Errors' },
            { id: 'invalid-coupon', label: 'Invalid Coupon' },
            { id: 'processing', label: 'Processing' },
            { id: 'payment-failed', label: 'Payment Failed' },
            { id: 'order-confirmed', label: 'Order Confirmed' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleSimSwitch(mode.id as CheckoutSimMode)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                simMode === mode.id
                  ? 'bg-[#98462a] text-white shadow-sm'
                  : 'bg-[#482922] text-[#ffdad3] hover:bg-[#504441] hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Subheader & WhatsApp Helplines */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 pt-4 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#1e6b3a]">
          <span className="material-symbols-outlined text-[16px]">shield</span>
          <span>ENCRYPTED CHECKOUT • JAIPUR DIRECT</span>
        </div>
        <div className="text-[#504441]">
          <span>Need sizing or address help? </span>
          <strong className="text-[#98462a]">WhatsApp: +91 98765 43210</strong>
        </div>
      </div>

      {/* Main 2-Column Checkout Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-4 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Checkout Form Flow */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 3-Step Stepper Header */}
            <div className="flex items-center justify-between max-w-md mx-auto w-full py-2">
              {/* Step 1 */}
              <button
                onClick={() => setCurrentStep(1)}
                className="flex flex-col items-center gap-1 text-center group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                    currentStep > 1
                      ? 'bg-[#2f150f] text-white'
                      : currentStep === 1
                      ? 'bg-[#98462a] text-white'
                      : 'bg-[#ffe9e3] text-[#504441]'
                  }`}
                >
                  {currentStep > 1 ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    '1'
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    currentStep === 1 ? 'text-[#98462a]' : 'text-[#504441]'
                  }`}
                >
                  1. Contact
                </span>
              </button>

              <div className="flex-1 h-0.5 bg-[#ebe0dc] mx-3 max-w-[80px]" />

              {/* Step 2 */}
              <button
                onClick={() => setCurrentStep(2)}
                className="flex flex-col items-center gap-1 text-center group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                    currentStep === 2
                      ? 'bg-[#98462a] text-white'
                      : currentStep > 2
                      ? 'bg-[#2f150f] text-white'
                      : 'bg-[#ffe9e3] text-[#504441]'
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-xs font-bold ${
                    currentStep === 2 ? 'text-[#98462a]' : 'text-[#504441]'
                  }`}
                >
                  2. Delivery
                </span>
              </button>

              <div className="flex-1 h-0.5 bg-[#ebe0dc] mx-3 max-w-[80px]" />

              {/* Step 3 */}
              <button
                onClick={() => setCurrentStep(3)}
                className="flex flex-col items-center gap-1 text-center group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                    currentStep === 3
                      ? 'bg-[#98462a] text-white'
                      : 'bg-[#ffe9e3] text-[#504441]'
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-xs font-semibold ${
                    currentStep === 3 ? 'text-[#98462a]' : 'text-[#504441]'
                  }`}
                >
                  3. Payment
                </span>
              </button>
            </div>

            {/* Express 1-Click Checkout Section */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#ebe0dc] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2f150f]">
                  Express 1-Click Checkout
                </span>
                <span className="text-[11px] font-bold text-[#1e6b3a] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full">
                  Instant Order Protection
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => alert('Initiating Google Pay 1-Click Checkout...')}
                  className="h-11 rounded-2xl bg-[#fff8f6] border border-[#ebe0dc] hover:border-[#98462a] flex items-center justify-center gap-1 text-xs font-bold text-[#2f150f] transition-all shadow-2xs"
                >
                  <span className="text-[#4285F4] font-bold">G</span>
                  <span>Pay</span>
                </button>
                <button
                  onClick={() => alert('Initiating PhonePe 1-Click Checkout...')}
                  className="h-11 rounded-2xl bg-[#5f259f] hover:opacity-90 text-white flex items-center justify-center text-xs font-bold transition-all shadow-2xs"
                >
                  PhonePe
                </button>
                <button
                  onClick={() => alert('Initiating Paytm UPI 1-Click Checkout...')}
                  className="h-11 rounded-2xl bg-[#002e6e] hover:opacity-90 text-white flex items-center justify-center text-xs font-bold transition-all shadow-2xs"
                >
                  Paytm UPI
                </button>
                <button
                  onClick={() => alert('Opening dynamic UPI QR code...')}
                  className="h-11 rounded-2xl bg-[#fff8f6] border border-[#ebe0dc] hover:border-[#98462a] flex items-center justify-center gap-1.5 text-xs font-bold text-[#2f150f] transition-all shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                  <span>Scan QR</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#ebe0dc]"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-widest text-[#837471]">
                  or fill shipping particulars
                </span>
                <div className="flex-grow border-t border-[#ebe0dc]"></div>
              </div>
            </div>

            {/* SECTION 1: Contact Particulars */}
            <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-[#ebe0dc] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2f150f] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-syne text-lg font-bold text-[#2f150f]">Contact Particulars</h2>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#1e6b3a] font-semibold bg-[#e8f5e9] px-2.5 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">eco</span>
                  <span>Pooja Sharma (Returning Guest)</span>
                </div>
              </div>

              {/* Saved Address Pill Card */}
              <div className="p-3.5 rounded-2xl bg-[#fff1ed] border border-[#ebdcca] flex items-start gap-3">
                <input
                  type="radio"
                  name="saved-address"
                  defaultChecked
                  className="mt-1 accent-[#98462a]"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#2f150f]">Deliver to Primary Home (Default)</span>
                    <span className="px-2 py-0.5 rounded bg-[#fbe3dc] text-[#98462a] text-[10px] font-bold uppercase">
                      BENGALURU
                    </span>
                  </div>
                  <p className="text-[#504441] leading-relaxed">
                    Pooja Sharma • +91 98765 43210<br />
                    Flat 402, Lotus Pavilion, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka - 560038
                  </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#2f150f]">
                  Email Address or Phone for Updates *
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-sm text-[#2f150f] focus:outline-none focus:ring-2 focus:ring-[#98462a]"
                />
                <span className="text-[11px] text-[#504441]">
                  We will send automated Jaipur tracking updates via SMS &amp; WhatsApp
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#504441]">
                <input type="checkbox" defaultChecked className="accent-[#98462a] w-4 h-4 rounded" />
                <span>Receive order updates &amp; exclusive festive drop previews via WhatsApp &amp; SMS.</span>
              </label>
            </section>

            {/* SECTION 2: Delivery Details & Method */}
            <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-[#ebe0dc] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#98462a] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-syne text-lg font-bold text-[#2f150f]">Delivery Details &amp; Method</h2>
                </div>
                <span className="text-xs text-[#837471] font-semibold">Step 2 of 3</span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#504441]">Country / Region</label>
                  <div className="h-11 px-4 rounded-xl bg-[#fff1ed] border border-[#ebe0dc] flex items-center justify-between text-xs text-[#2f150f] font-semibold">
                    <span>India 🇮🇳</span>
                    <span className="material-symbols-outlined text-[16px] text-[#837471]">lock</span>
                  </div>
                </div>

                {/* First Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#504441]">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-sm text-[#2f150f] focus:outline-none focus:ring-2 focus:ring-[#98462a]"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#504441]">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-sm text-[#2f150f] focus:outline-none focus:ring-2 focus:ring-[#98462a]"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#504441]">
                    Flat / House No., Apartment, Street Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-sm text-[#2f150f] focus:outline-none focus:ring-2 focus:ring-[#98462a]"
                  />
                </div>

                {/* Landmark */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#504441]">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-sm text-[#2f150f] focus:outline-none focus:ring-2 focus:ring-[#98462a]"
                  />
                </div>

                {/* PIN Code with Auto-verified badge */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#504441]">PIN Code *</label>
                    <span className="text-[10px] text-[#1e6b3a] font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Auto-verified
                    </span>
                  </div>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-sm text-[#2f150f] font-mono focus:outline-none focus:ring-2 focus:ring-[#98462a]"
                  />
                </div>

                {/* City & State */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#504441]">City &amp; State *</label>
                  <input
                    type="text"
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#fff1ed] border border-[#ebe0dc] text-sm text-[#2f150f] font-medium focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#504441]">
                    Contact Phone for Delivery Executive *
                  </label>
                  <div
                    className={`flex items-center rounded-xl bg-[#fff8f6] border px-3 h-11 ${
                      hasErrors && !phone ? 'border-[#b3261e] ring-2 ring-[#b3261e]' : 'border-[#ebe0dc]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#504441] mr-2">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="flex-1 bg-transparent text-sm text-[#2f150f] outline-none"
                    />
                  </div>
                  {hasErrors && !phone && (
                    <span className="text-[11px] text-[#b3261e] font-semibold">
                      Please enter a valid 10-digit delivery phone number.
                    </span>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#504441] pt-1">
                <input type="checkbox" defaultChecked className="accent-[#98462a] w-4 h-4 rounded" />
                <span>Save this address in my Slayvana Atelier account for faster 1-tap checkout.</span>
              </label>

              {/* SELECT DISPATCH CADENCE */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-[#ebe0dc]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2f150f]">
                  Select Dispatch Cadence
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Standard Insured Courier */}
                  <div
                    onClick={() => setDispatchCadence('standard')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      dispatchCadence === 'standard'
                        ? 'border-[#98462a] bg-[#fff1ed] shadow-xs'
                        : 'border-[#ebe0dc] bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={dispatchCadence === 'standard'}
                          onChange={() => setDispatchCadence('standard')}
                          className="accent-[#98462a]"
                        />
                        <span className="font-bold text-xs text-[#2f150f]">Standard Insured Courier</span>
                      </div>
                      <span className="font-bold text-xs text-[#1e6b3a]">FREE</span>
                    </div>
                    <p className="text-[11px] text-[#504441] pl-5">2-4 Business Days • BlueDart Air Tracked</p>
                    <span className="inline-block self-start text-[10px] font-semibold text-[#1e6b3a] bg-[#e8f5e9] px-2 py-0.5 rounded-full ml-5">
                      Eligible on orders ₹999+
                    </span>
                  </div>

                  {/* Priority Air Express */}
                  <div
                    onClick={() => setDispatchCadence('express')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      dispatchCadence === 'express'
                        ? 'border-[#98462a] bg-[#fff1ed] shadow-xs'
                        : 'border-[#ebe0dc] bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={dispatchCadence === 'express'}
                          onChange={() => setDispatchCadence('express')}
                          className="accent-[#98462a]"
                        />
                        <span className="font-bold text-xs text-[#2f150f]">Jaipur Priority Air Express</span>
                      </div>
                      <span className="font-bold text-xs text-[#98462a]">₹99.00</span>
                    </div>
                    <p className="text-[11px] text-[#504441] pl-5">1-2 Business Days • Same-Day Flight Hand-off</p>
                    <span className="inline-block self-start text-[10px] font-semibold text-[#8a5a00] bg-[#fff8f6] px-2 py-0.5 rounded-full ml-5">
                      Guaranteed by Wednesday
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Payment Architecture */}
            <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-[#ebe0dc] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2f150f] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-syne text-lg font-bold text-[#2f150f]">Payment Architecture</h2>
                </div>
                <span className="flex items-center gap-1 text-xs text-[#1e6b3a] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>256-Bit SSL Encrypted</span>
                </span>
              </div>

              {/* Payment Methods Accordion List */}
              <div className="flex flex-col gap-3">
                {/* Method 1: UPI */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#98462a] bg-[#fff8f6] shadow-xs'
                      : 'border-[#ebe0dc] bg-white'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#98462a]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#2f150f]">
                            UPI (Google Pay, PhonePe, Paytm, QR)
                          </span>
                          <span className="px-2 py-0.2 bg-[#1e6b3a] text-white text-[9px] font-bold rounded-full uppercase">
                            FASTEST
                          </span>
                        </div>
                        <p className="text-[11px] text-[#504441] mt-0.5">
                          Instant payment &amp; prioritized Jaipur dispatch queue
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#1e6b3a]">₹0 Extra</span>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-[#ebe0dc] flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-[#504441]">Enter UPI / VPA</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="flex-1 h-10 px-3.5 rounded-xl bg-white border border-[#ebe0dc] text-xs font-mono text-[#2f150f]"
                        />
                        <button
                          onClick={() => setUpiVerified(true)}
                          className="h-10 px-4 rounded-xl bg-[#2f150f] text-white text-xs font-bold hover:bg-[#98462a]"
                        >
                          Verify
                        </button>
                      </div>
                      {upiVerified && (
                        <div className="flex items-center gap-1 text-[11px] text-[#1e6b3a] font-semibold">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          <span>Verified to: Pooja Sharma</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Method 2: Cards */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#98462a] bg-[#fff8f6] shadow-xs'
                      : 'border-[#ebe0dc] bg-white'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#98462a]"
                      />
                      <div>
                        <span className="font-bold text-xs text-[#2f150f]">Credit or Debit Card</span>
                        <p className="text-[11px] text-[#504441] mt-0.5">Visa, MasterCard, RuPay, American Express</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#837471] font-semibold">All Indian &amp; Int'l Cards</span>
                  </label>
                </div>

                {/* Method 3: Net Banking */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#98462a] bg-[#fff8f6] shadow-xs'
                      : 'border-[#ebe0dc] bg-white'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="accent-[#98462a]"
                      />
                      <div>
                        <span className="font-bold text-xs text-[#2f150f]">Net Banking</span>
                        <p className="text-[11px] text-[#504441] mt-0.5">HDFC, ICICI, SBI, Axis, Kotak &amp; 48 other banks</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#837471] text-[20px]">account_balance</span>
                  </label>
                </div>

                {/* Method 4: COD */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#98462a] bg-[#fff8f6] shadow-xs'
                      : 'border-[#ebe0dc] bg-white'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#98462a]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#2f150f]">Cash on Delivery (COD)</span>
                          <span className="px-2 py-0.2 bg-[#fff1ed] text-[#98462a] text-[9px] font-bold rounded-full">
                            Pin 560038 Eligible
                          </span>
                        </div>
                        <p className="text-[11px] text-[#504441] mt-0.5">
                          Pay via cash or UPI QR to delivery executive at your doorstep
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#8a5a00]">+₹50 COD Fee</span>
                  </label>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#504441] pt-1">
                <input type="checkbox" defaultChecked className="accent-[#98462a] w-4 h-4 rounded" />
                <span>Billing address matches shipping address (Indiranagar, Bengaluru).</span>
              </label>
            </section>

            {/* Complete Order Trigger */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCompleteOrder}
                className="w-full h-14 rounded-full bg-[#98462a] text-white hover:bg-[#2f150f] font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Complete Order • ₹{totalPayable.toLocaleString()}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              <p className="text-[11px] text-[#504441] text-center leading-relaxed max-w-lg mx-auto">
                By clicking "Complete Order", you authorize Slayvana to process your order under our{' '}
                <a href="#" className="underline text-[#98462a]">Terms of Service</a> and{' '}
                <a href="#" className="underline text-[#98462a]">Refund Policy</a>. 7-Day easy doorstep returns &amp; free size exchange guarantee included.
              </p>
            </div>
          </div>

          {/* Right Column (4 cols): Bag Overview & Pricing Card */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ebe0dc] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#ebe0dc] pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-syne text-lg font-bold text-[#2f150f]">Bag Overview</h3>
                  <span className="px-2 py-0.5 bg-[#2f150f] text-white text-[11px] font-bold rounded-full">
                    {totalItemCount} Items
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('bag')}
                  className="text-xs font-bold text-[#98462a] hover:underline"
                >
                  Edit Bag
                </button>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3.5 pb-2 border-b border-[#ebe0dc]">
                {/* Item 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-16 rounded-xl bg-[#fff1ed] overflow-hidden shrink-0 border border-[#ebe0dc]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtZMgQprXp7GhW0CU86lO1NqnNenBlNf2DzdwVpkJcfwnghw37nP7_NI3jtiaCZ04FcsPQnEb5yQ0lDSIKJ_X7BTvs0ePti6SfM7imsnfP0TBHSZhfXwoJd01-HpWxsEsgAlfi_lFoI33GvUk4n-s92LMQy-FTh2jN0c946rLflxdYXgfxg-C0qlFpNIIt3hFQkFwHX5UluGcSjz1KPn6jNhjR075IJEqJ2serkgrYPRQpEOIVArk6"
                      alt="Vani kurti"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#2f150f] truncate">Vani — Sleeveless Kurti</h4>
                    <span className="text-[11px] text-[#504441] block">Size: M • Black Artisanal Print</span>
                    <span className="text-[10px] text-[#1e6b3a] font-semibold">Save ₹100</span>
                  </div>
                  <span className="font-bold text-xs text-[#2f150f]">₹599.00</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-16 rounded-xl bg-[#fff1ed] overflow-hidden shrink-0 border border-[#ebe0dc]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXiCfEO-p_Bxeg-eMjqfzbSqyBOVQpODWU1USPvVITRI7_-Nqo_Lp0GbnaQwuDTWKc3fwLR2-nZdnRJupISzjBZAHzw6b-R9EmoyCXJUftkgtAz3kGqrsdb9GpircHrs4Z_6vJcWB3DUOUjZyTB99j546zZtcf2su1YU4HrgTBvFP_MzWPaiZ5eclLUXU8Pp2715eNaUCxNSnB01ZjoV7cNDINkQpFQzAt0p-LFfp0rEo2--0-sdQE"
                      alt="Trisha kurti"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#2f150f] truncate">Trisha 3.0 — Corset Kurti</h4>
                    <span className="text-[11px] text-[#504441] block">Size: S • Multi-wear Ivory Set (Qty: 2)</span>
                    <span className="text-[10px] text-[#1e6b3a] font-semibold">Festive Pair Offer</span>
                  </div>
                  <span className="font-bold text-xs text-[#2f150f]">₹1,598.00</span>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-16 rounded-xl bg-[#fff1ed] overflow-hidden shrink-0 border border-[#ebe0dc]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq7IzllUKLa-oHKlcLrFfOxXQmOQpKpljduqb7DB3STUr5_k7GGiQ5rBZq4vseD0dG7MUqWUs8o4KTlLzlhAAxSORZn3ADl2ghYpgsdNqY2EUuIwpEjbrETr1kiR2wT6XmAEELdw7a34BIS1Tv_WkOEPNqbqpfgHVuXu1YcJRD_loW8pbJQBMQxURBZXyEgHmxkASp0CUvbSomYQ0kCP5xw_CWIxeh_qy1Nrw-0zKHTzYjrycF4pLD"
                      alt="Mastani co-ord"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#2f150f] truncate">Mastani — Red Crush Co-ord</h4>
                    <span className="text-[11px] text-[#504441] block">Size: L • Deep Crimson Handloom</span>
                    <span className="text-[10px] text-[#1e6b3a] font-semibold">Save ₹650</span>
                  </div>
                  <span className="font-bold text-xs text-[#2f150f]">₹1,499.00</span>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-[#504441]">Gift Card or Discount Code</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-[#fff8f6] border border-[#ebe0dc] text-xs font-mono uppercase text-[#2f150f]"
                  />
                  <button
                    onClick={() => {
                      if (discountCode.trim().toUpperCase() === 'FESTIVE300') {
                        setDiscountApplied(true);
                        setCouponError(false);
                      } else {
                        setCouponError(true);
                      }
                    }}
                    className="h-10 px-4 rounded-xl bg-[#ffe9e3] hover:bg-[#fbe3dc] text-xs font-bold text-[#2f150f]"
                  >
                    Apply
                  </button>
                </div>

                {discountApplied && (
                  <div className="flex items-center justify-between text-xs text-[#1e6b3a] bg-[#e8f5e9] p-2.5 rounded-xl font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">sell</span>
                      <span>FESTIVE300 APPLIED (-₹600 Multi-buy discount)</span>
                    </span>
                    <button onClick={() => setDiscountApplied(false)} className="hover:text-[#b3261e]">
                      ×
                    </button>
                  </div>
                )}

                {couponError && (
                  <span className="text-xs text-[#b3261e] font-semibold">
                    Coupon code not recognized or minimum threshold not met.
                  </span>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="flex flex-col gap-2 text-xs text-[#504441] pt-2 border-t border-[#ebe0dc]">
                <div className="flex items-center justify-between">
                  <span>Bag Subtotal ({totalItemCount} items)</span>
                  <span className="font-bold text-[#2f150f]">₹{bagSubtotal.toLocaleString()}.00</span>
                </div>

                {discountApplied && (
                  <div className="flex items-center justify-between text-[#1e6b3a] font-semibold">
                    <span>Multi-Buy Festive Savings</span>
                    <span>-₹600.00</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Insured BlueDart Delivery</span>
                  <span className="font-bold text-[#1e6b3a] uppercase">FREE</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Estimated Taxes (12% GST Included)</span>
                  <span>₹353.14</span>
                </div>

                <p className="text-[10px] text-[#837471] text-center pt-1">
                  Zero hidden delivery surcharges or handling fees
                </p>
              </div>

              {/* Total Payable */}
              <div className="pt-3 border-t border-[#ebe0dc]">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-syne text-lg font-bold text-[#2f150f] block">Total Payable</span>
                    <span className="text-[10px] text-[#837471]">Inclusive of all duties &amp; express packaging</span>
                  </div>
                  <span className="font-syne text-2xl font-black text-[#98462a]">
                    ₹{totalPayable.toLocaleString()}.00
                  </span>
                </div>

                <div className="mt-2.5 p-2.5 rounded-xl bg-[#e8f5e9] text-[#1e6b3a] text-xs font-bold text-center flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">celebration</span>
                  <span>Celebration Offer: You saved ₹1,400.00 on this handcrafted order!</span>
                </div>
              </div>

              {/* Safety & Craft Highlights */}
              <div className="flex flex-col gap-2 pt-2 text-[11px] text-[#504441]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1e6b3a] text-[16px]">check_circle</span>
                  <span>100% Breathable artisanal Jaipur cotton &amp; pure weaves</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1e6b3a] text-[16px]">check_circle</span>
                  <span>Hassle-free 7-day doorstep size swap or complete refund</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1e6b3a] text-[16px]">check_circle</span>
                  <span>RBI compliant PCI-DSS 3.2 Tier-1 security architecture</span>
                </div>
              </div>
            </div>

            {/* Handcrafted in Sanganer card */}
            <div className="bg-[#fff1ed] p-4 rounded-3xl border border-[#ebe0dc] flex items-start gap-3">
              <span className="material-symbols-outlined text-[#98462a] text-[20px]">spa</span>
              <div className="text-xs">
                <span className="font-bold text-[#2f150f] block">Handcrafted in Sanganer, Jaipur</span>
                <span className="text-[#504441]">
                  Every Slayvana kurti is finished by master craftswomen. Your order supports authentic heritage textile preservation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ORDER CONFIRMED MODAL */}
      {simMode === 'order-confirmed' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-[#ebe0dc]">
            <div className="w-16 h-16 rounded-full bg-[#e8f5e9] text-[#1e6b3a] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1e6b3a]">
              Order Placed Successfully!
            </span>
            <h3 className="font-syne text-2xl font-black text-[#2f150f] mt-1">Order #SLV-90148 Confirmed</h3>
            <p className="text-xs text-[#504441] mt-2 leading-relaxed">
              Namaste Pooja! We've received your order of ₹{totalPayable.toLocaleString()}.00. Handloom master craftswomen in Jaipur are preparing your pieces for express dispatch.
            </p>

            <div className="bg-[#fff1ed] p-3 rounded-2xl text-left my-4 text-xs">
              <div className="flex justify-between py-1 border-b border-[#ebe0dc]">
                <span className="text-[#504441]">Tracking AWB:</span>
                <span className="font-mono font-bold text-[#98462a]">#BLUEDART-8829104</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebe0dc]">
                <span className="text-[#504441]">Estimated Delivery:</span>
                <span className="font-bold text-[#2f150f]">Thursday, 26 Feb 2026</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#504441]">Destination:</span>
                <span className="text-[#2f150f] truncate max-w-[200px]">Indiranagar, Bengaluru</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('account')}
                className="w-full h-11 rounded-full bg-[#2f150f] text-white hover:bg-[#98462a] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                <span>Track Shipment Journey</span>
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full h-11 rounded-full bg-[#ffe9e3] text-[#2f150f] hover:bg-[#fbe3dc] font-bold text-xs"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PAYMENT FAILED MODAL */}
      {simMode === 'payment-failed' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-[#ebe0dc]">
            <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#b3261e] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">error</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#b3261e]">
              Payment Authorization Failed
            </span>
            <h3 className="font-syne text-2xl font-black text-[#2f150f] mt-1">Transaction Declined by Bank</h3>
            <p className="text-xs text-[#504441] mt-2 leading-relaxed">
              Your bank was unable to complete authentication for ₹{totalPayable.toLocaleString()}.00. Your bag items have been reserved for 14 minutes.
            </p>

            <div className="flex flex-col gap-2 mt-5">
              <button
                onClick={() => setPaymentMethod('cod')}
                className="w-full h-11 rounded-full bg-[#2f150f] text-white font-bold text-xs"
              >
                Switch to Cash on Delivery (COD)
              </button>
              <button
                onClick={() => setSimMode('default')}
                className="w-full h-11 rounded-full bg-[#ffe9e3] text-[#2f150f] font-bold text-xs"
              >
                Try Another Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PROCESSING OVERLAY */}
      {simMode === 'processing' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl border border-[#ebe0dc]">
            <div className="w-12 h-12 border-4 border-[#ffe9e3] border-t-[#98462a] rounded-full animate-spin mx-auto mb-4" />
            <h3 className="font-syne text-lg font-bold text-[#2f150f]">Securing Jaipur Allocation...</h3>
            <p className="text-xs text-[#504441] mt-1">Connecting to 256-bit bank gateway</p>
          </div>
        </div>
      )}

      {/* Bottom Bank-Grade Security Bar */}
      <footer className="w-full bg-[#ffffff] border-t border-[#ebe0dc] py-6 px-4 lg:px-10 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#504441]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#1e6b3a]">verified_user</span>
            <div>
              <span className="font-bold text-[#2f150f] block">Bank-Grade Secure Transaction</span>
              <span className="text-[11px]">All card, UPI, and account credentials are end-to-end encrypted</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-semibold text-[11px] text-[#837471]">
            <span className="px-2 py-0.5 rounded bg-[#fff8f6]">UPI</span>
            <span className="px-2 py-0.5 rounded bg-[#fff8f6]">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-[#fff8f6]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-[#fff8f6]">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-[#fff8f6]">NetBanking</span>
            <span className="px-2 py-0.5 rounded bg-[#fff8f6]">COD Available</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-4 mt-4 border-t border-[#ebe0dc] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#837471]">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Refund Policy</a>
            <a href="#" className="hover:underline">Shipping Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
          <span>© 2026 Slayvana Luxury Apparel Pvt. Ltd. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};
