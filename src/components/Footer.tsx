import React from 'react';
import { ScreenId } from './PrototypeBar';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#2f150f] text-[#ffffff] pt-12 pb-8 border-t border-[#482922]">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#482922]">
          {/* Brand Philosophy */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="font-syne text-2xl font-black tracking-widest uppercase text-white">
                SLAYVANA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#ff9876] uppercase font-semibold">
                Couture India • Sanganer &amp; Jaipur
              </span>
            </div>
            <p className="text-sm text-[#bb8f85] leading-relaxed max-w-sm">
              Reinventing traditional Indian heritage through modern tailored silhouettes, conscious handlooms, and architectural drapes designed for global celebrations.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#ffdad3]">
              <span className="w-2 h-2 rounded-full bg-[#1e6b3a]"></span>
              <span>100% Certified Handcrafted Authenticity</span>
            </div>
          </div>

          {/* Shop Collections */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-semibold text-sm tracking-wider uppercase text-[#ffdad3]">
              Shop Collections
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#bb8f85]">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors text-left"
                >
                  Printed Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors text-left"
                >
                  Everyday Co-ords
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors text-left"
                >
                  Twinning Duo Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors text-left"
                >
                  New Summer Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors text-left"
                >
                  Signature Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-semibold text-sm tracking-wider uppercase text-[#ffdad3]">
              Customer Care
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#bb8f85]">
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-white transition-colors text-left"
                >
                  Track Orders (BlueDart)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-white transition-colors text-left"
                >
                  7-Day Doorstep Swaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-white transition-colors text-left"
                >
                  Bespoke Fit Atelier
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Handloom Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  WhatsApp Concierge (+91 800 242 8899)
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-semibold text-sm tracking-wider uppercase text-[#ffdad3]">
              The Slayvana Gazette
            </span>
            <p className="text-sm text-[#bb8f85]">
              Receive private previews of limited seasonal handloom drops, trunk shows, and ₹200 off your first purchase.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 h-11 px-4 rounded-full bg-[#482922] text-white placeholder:text-[#bb8f85] text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9876]"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-full bg-[#ffffff] text-[#2f150f] font-semibold text-sm hover:bg-[#ffdad3] transition-colors shrink-0"
              >
                Join
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#1e6b3a] bg-[#ffffff] px-3 py-1 rounded-full font-semibold flex items-center gap-1 w-fit">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Welcome! Code WELCOME200 sent to your inbox.</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Trust & Legal Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#bb8f85]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Slayvana Apparel Collective Pvt Ltd. All rights reserved. GST Registered.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#ff9876]">Consciously Handcrafted in Jaipur, India</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#1e6b3a]">lock</span>
              <span>256-bit SSL Encrypted</span>
            </span>
            <span>•</span>
            <span>UPI, RuPay, Visa, NetBanking, COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
