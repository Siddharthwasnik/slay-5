import React from 'react';

export type ScreenId =
  | 'campaign'
  | 'home'
  | 'collection'
  | 'search'
  | 'bag'
  | 'checkout'
  | 'account'
  | 'auth';

interface PrototypeBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  cartCount: number;
  onOpenCartDrawer: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const PrototypeBar: React.FC<PrototypeBarProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleMobileFrame,
  cartCount,
  onOpenCartDrawer,
  onOpenSearch,
  onOpenAuth,
}) => {
  const screens: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'campaign', label: 'Campaign Hero', icon: 'flare' },
    { id: 'home', label: 'Home Storefront', icon: 'storefront' },
    { id: 'collection', label: 'Kurtis Collection', icon: 'styler' },
    { id: 'search', label: 'Search Experience', icon: 'search' },
    { id: 'bag', label: 'Shopping Bag', icon: 'shopping_bag' },
    { id: 'checkout', label: 'Checkout & Simulator', icon: 'lock' },
    { id: 'account', label: 'Account & Tracking', icon: 'local_shipping' },
    { id: 'auth', label: 'Sign In / OTP', icon: 'passkey' },
  ];

  return (
    <aside
      aria-label="Screen Navigation Controller"
      className="sticky top-0 z-50 w-full bg-[#1d1c13] text-[#ffffff] border-b border-[#333127] shadow-lg px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs"
    >
      <div className="flex items-center gap-2">
        <span className="font-syne tracking-widest text-[#ff9876] font-extrabold uppercase text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-[#ff9876]">tune</span>
          SLAYVANA PROTOTYPE
        </span>
        <span className="hidden md:inline-block text-[#9c998b] text-[11px]">| Switch Screen:</span>
      </div>

      {/* Screen Selector Pills */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
        {screens.map((screen) => {
          const isActive = currentScreen === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => onSelectScreen(screen.id)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex items-center gap-1 font-semibold ${
                isActive
                  ? 'bg-[#ff9876] text-[#390c00] shadow-sm'
                  : 'bg-[#333127] text-[#e7e2d3] hover:bg-[#504441] hover:text-[#ffffff]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{screen.icon}</span>
              <span>{screen.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Access Utility Actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCartDrawer}
          className="px-2.5 py-1 rounded-full bg-[#98462a] text-white hover:bg-[#ff9876] hover:text-[#390c00] transition-colors flex items-center gap-1 font-medium text-[11px]"
          title="Open slide-over shopping bag drawer"
        >
          <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
          <span>Bag Drawer ({cartCount})</span>
        </button>

        {/* Search Modal Trigger */}
        <button
          onClick={onOpenSearch}
          className="px-2.5 py-1 rounded-full bg-[#333127] text-[#e7e2d3] hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          title="Open Search Modal"
        >
          <span className="material-symbols-outlined text-[14px]">search</span>
          <span className="hidden sm:inline">Search (⌘K)</span>
        </button>

        {/* Auth Modal Trigger */}
        <button
          onClick={onOpenAuth}
          className="px-2.5 py-1 rounded-full bg-[#333127] text-[#e7e2d3] hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          title="Sign in / Register modal"
        >
          <span className="material-symbols-outlined text-[14px]">person</span>
          <span className="hidden sm:inline">Portal</span>
        </button>

        {/* Mobile Shell Frame Toggle */}
        <button
          onClick={onToggleMobileFrame}
          className={`px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 text-[11px] font-semibold ${
            isMobileFrame
              ? 'bg-[#1e6b3a] text-white'
              : 'bg-[#333127] text-[#cbc6b8] hover:text-white'
          }`}
          title="Toggle Mobile viewport preview shell"
        >
          <span className="material-symbols-outlined text-[14px]">
            {isMobileFrame ? 'stay_current_portrait' : 'desktop_windows'}
          </span>
          <span className="hidden sm:inline">{isMobileFrame ? 'Mobile Frame: ON' : 'Responsive'}</span>
        </button>
      </div>
    </aside>
  );
};
