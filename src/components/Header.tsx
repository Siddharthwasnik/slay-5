import React from 'react';
import { ScreenId } from './PrototypeBar';

interface HeaderProps {
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCartDrawer: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  currentScreen: ScreenId;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCartDrawer,
  onOpenSearch,
  onOpenAuth,
  currentScreen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="fixed top-8 left-0 w-full z-40 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_2px_10px_0px_rgba(123,49,22,0.08)] border-b border-[#ebe0dc]">
        {/* Top Announcement Bar */}
        <aside
          aria-label="Shipping Announcement"
          className="bg-[#fbe3dc] text-[#504441] px-4 py-1.5 text-center font-normal text-xs flex items-center justify-center gap-2 border-b border-[#ebdcca]"
        >
          <span className="material-symbols-outlined text-[15px] text-[#98462a]">local_shipping</span>
          <span className="tracking-wide">
            Complimentary shipping on orders above ₹999 • Easy 7-day doorstep exchanges
          </span>
          <span className="hidden sm:inline-block opacity-40">|</span>
          <span className="hidden sm:inline-block font-semibold text-[#98462a]">Code: SLAYROYAL</span>
        </aside>

        {/* Main Navigation Bar */}
        <div className="h-16 w-full px-4 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#2f150f] hover:bg-[#ffe9e3] transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-start text-left group focus:outline-none"
            >
              <span className="font-syne text-2xl font-black tracking-widest text-[#2f150f] uppercase group-hover:text-[#98462a] transition-colors">
                SLAYVANA
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#98462a] -mt-1 uppercase font-semibold">
                Couture India
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => onNavigate('collection')}
                className={`font-sans text-sm font-semibold transition-colors py-1 ${
                  currentScreen === 'collection'
                    ? 'text-[#98462a] border-b-2 border-[#98462a]'
                    : 'text-[#504441] hover:text-[#98462a]'
                }`}
              >
                Kurtis
              </button>
              <button
                onClick={() => onNavigate('collection')}
                className="font-sans text-sm font-semibold text-[#504441] hover:text-[#98462a] transition-colors py-1"
              >
                Co-ord Sets
              </button>
              <button
                onClick={() => onNavigate('collection')}
                className="font-sans text-sm font-semibold text-[#504441] hover:text-[#98462a] transition-colors py-1"
              >
                Twinning Duo
              </button>
              <button
                onClick={() => onNavigate('collection')}
                className="font-sans text-sm font-semibold text-[#504441] hover:text-[#98462a] transition-colors py-1 flex items-center gap-1"
              >
                <span>New Arrivals</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#98462a]"></span>
              </button>
              <button
                onClick={() => onNavigate('collection')}
                className="font-sans text-sm font-semibold text-[#504441] hover:text-[#98462a] transition-colors py-1"
              >
                Best Sellers
              </button>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Bar Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-[#fff1ed] text-[#251915] px-3.5 py-1.5 rounded-full h-10 w-36 sm:w-56 md:w-72 border border-[#ebe0dc] hover:bg-[#ffe9e3] transition-all text-left"
              type="button"
            >
              <span className="material-symbols-outlined text-[#837471] text-[18px]">search</span>
              <span className="text-xs text-[#504441] truncate flex-1">Search kurtis, fabrics...</span>
              <kbd className="hidden md:inline-block text-[10px] bg-[#ffffff] text-[#504441] px-1.5 py-0.5 rounded shadow-xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('collection')}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#2f150f] hover:bg-[#ffe9e3] transition-colors"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-[16px] px-1 rounded-full bg-[#98462a] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button (Triggers Drawer) */}
            <button
              onClick={onOpenCartDrawer}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#2f150f] hover:bg-[#ffe9e3] transition-colors"
              aria-label="Shopping Bag"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-[16px] px-1 rounded-full bg-[#ff9876] text-[#390c00] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Profile Icon */}
            <button
              onClick={() => onNavigate('account')}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2f150f] text-white hover:bg-[#98462a] transition-colors"
              aria-label="User Account"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#ffffff] border-t border-[#ebe0dc] px-4 py-4 shadow-xl flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#fff1ed] text-[#2f150f] font-semibold text-xs text-left flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#98462a]">home</span>
                <span>Home Storefront</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('collection');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#fff1ed] text-[#2f150f] font-semibold text-xs text-left flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#98462a]">checkroom</span>
                <span>Printed Kurtis</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('bag');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#fff1ed] text-[#2f150f] font-semibold text-xs text-left flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#98462a]">shopping_bag</span>
                <span>Bag ({cartCount})</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('checkout');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#fff1ed] text-[#2f150f] font-semibold text-xs text-left flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#98462a]">lock</span>
                <span>Checkout</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('account');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#fff1ed] text-[#2f150f] font-semibold text-xs text-left flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#98462a]">local_shipping</span>
                <span>Track Orders</span>
              </button>
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#fff1ed] text-[#2f150f] font-semibold text-xs text-left flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#98462a]">passkey</span>
                <span>Sign In / OTP</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to offset fixed prototype bar + header */}
      <div className="h-28" />
    </>
  );
};
