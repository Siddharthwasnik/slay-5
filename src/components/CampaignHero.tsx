import React, { useState } from 'react';
import { ScreenId } from './PrototypeBar';

interface CampaignHeroProps {
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCartDrawer: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const CampaignHero: React.FC<CampaignHeroProps> = ({
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCartDrawer,
  onOpenSearch,
  onOpenAuth,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'SLAYVANA',
      eyebrow: '“Everyday ethnic. Main-character energy.”',
      tag: 'SS/26 Natural Cottons Drop',
      subtitle: 'Trisha 3.0 Corset Kurti in Rust Earth & Ivory Artisanal Weave',
      bgImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDVWB53lRtctMNe2HOToTiBqIjX-deLJZVd2rNbmdOetKTmBRKz-Ibomk8_ngAb_krQCLLa4HCJzBW_lBFAFBZS8FiQxNtq8Ls2pIN5gjLkqf2HtHTc13xSpzd537qHe7TUOTXOsZkkTDMOJbzJ_RcDbpUpxaDOJBGZ3owk7ojto1hfBKRL80lOjxS-UIygJQWqXfPDFurGbCfGjMh50ti3nYHOMnOsElVmUtNbpB7NXRRPHMcO-qEm',
    },
    {
      title: 'SLAYVANA',
      eyebrow: '“Modern silhouettes rooted in Indian textile legacies.”',
      tag: 'Festive Co-ord Edit',
      subtitle: 'Mastani Crushed Crimson Silk & Palazzo Duo',
      bgImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfecqc6l-DrAk1ZgmPjc5hU9YRHs3SgTRchMdONR2hNKj24PoLJEMfFuLGfyvOdZOh0BzXOMiUY1DEidfe7lg4VPCEydMtQMs586LvrcamNOyDKTrXm7wPzTOTl4aS4wsOqhLuTOmmOJ8ZlZt5iO1DwxSdMcJQvIpUbFSyXFWNFKcV2-MWAobF3Dn4AoaYLQk3i0F3ASUr7fDR3t1T8X8tkxNTmWLXejld-8VsIUuiBS_d4Tw0eULh',
    },
    {
      title: 'SLAYVANA',
      eyebrow: '“Double the vibe. Handcrafted for togetherness.”',
      tag: 'The Twinning Edit',
      subtitle: 'Bandhan Couple Sets in Deep Maroon Handloom',
      bgImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBzc68AKnZ_TKt2jkv7BrZmaQb_RIoRv1iyZDloGjnBGUCCFajmKOuNrMUZbmoQi48ZfPumULIjvnYUl9xnK8nXsnMJj6PEau6Nt0MzFwIbW0qLfMtUrvzvOSp0AuXiFFSS13HSbUf2-1dgTwJ3deomP6VsBwZYkLZPkZhBd8MJUPBaQp8rISCCs8hKnDiiW71pcQ_h-05WtUJR-x4YPuC0u0c-ulobFM-EW81S-tEc_Ku1ch4cXCbP',
    },
  ];

  const current = slides[activeSlide];

  return (
    <section
      aria-label="Slayvana Campaign Hero"
      className="relative w-full h-[calc(100vh-2rem)] min-h-[620px] flex flex-col justify-between overflow-hidden bg-[#2f2420] text-[#2f2420] select-none"
    >
      {/* Background Media with Vignette Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={current.bgImage}
          alt="Campaign Hero Lookbook"
          className="w-full h-full object-cover object-center transition-all duration-700 select-none"
        />
        {/* Top gradient scrim for utility contrast */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
        {/* Soft bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
      </div>

      {/* Floating Top Navigation Header */}
      <header className="relative z-30 w-full px-4 sm:px-8 pt-4 pb-2 flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          {/* Left Category Quick Access Pills */}
          <div className="flex items-center gap-1.5 flex-wrap max-w-[60%]">
            <button
              onClick={() => onNavigate('home')}
              className="bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-[#2f2420] hover:bg-white shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span className="hidden sm:inline">Storefront</span>
            </button>

            <button
              onClick={() => onNavigate('collection')}
              className="bg-white/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              New Arrivals
            </button>

            <button
              onClick={() => onNavigate('collection')}
              className="hidden md:inline-flex bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              Kurtis
            </button>

            <button
              onClick={() => onNavigate('collection')}
              className="hidden lg:inline-flex bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              Co-ord Sets
            </button>

            <button
              onClick={() => onNavigate('collection')}
              className="hidden lg:inline-flex bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#98462a]"></span>
              <span>Best Sellers</span>
            </button>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Hindi language badge */}
            <span
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-xs font-bold text-[#2f2420] shadow-sm flex items-center justify-center cursor-default select-none"
              title="स्लेवाना - जयपुर"
            >
              स्ले
            </span>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('collection')}
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-[#2f2420] shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all relative"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#98462a] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-[#2f2420] shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>

            {/* Account */}
            <button
              onClick={onOpenAuth}
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-[#2f2420] shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all"
              aria-label="User Account"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCartDrawer}
              className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#2f2420] shadow-sm flex items-center gap-1.5 hover:bg-white active:scale-95 transition-all"
            >
              <span>Bag</span>
              <span className="text-[#2f2420]/30 font-normal">|</span>
              <span className="font-extrabold text-[#98462a]">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Poetic Eyebrow Quotation */}
        <div className="text-center text-white/95 font-script text-base sm:text-xl tracking-wider drop-shadow-md select-none mt-1">
          {current.eyebrow}
        </div>
      </header>

      {/* Monumental Centerpiece Wordmark */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto px-4 pointer-events-none">
        <h1 className="font-syne font-black text-[14vw] sm:text-[13vw] lg:text-[14vw] leading-[0.88] tracking-tighter text-white select-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] text-center w-full uppercase">
          {current.title}
        </h1>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs tracking-widest uppercase font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#ff9876] animate-pulse"></span>
          <span>{current.tag}</span>
        </div>
      </div>

      {/* Lower Third: Primary CTA & Carousel Indicators */}
      <div className="relative z-20 w-full pb-8 flex flex-col items-center gap-4">
        {/* Secondary Category Pills */}
        <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar px-4 justify-start sm:justify-center">
          <button
            onClick={() => onNavigate('collection')}
            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#2f2420] shadow-md whitespace-nowrap hover:bg-white active:scale-95 transition-all"
          >
            All Kurtis (16 Designs)
          </button>
          <button
            onClick={() => onNavigate('collection')}
            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#2f2420] shadow-md whitespace-nowrap hover:bg-white active:scale-95 transition-all"
          >
            Co-ord Sets (4)
          </button>
          <button
            onClick={() => onNavigate('collection')}
            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#2f2420] shadow-md whitespace-nowrap hover:bg-white active:scale-95 transition-all"
          >
            Twinning Couple Sets
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="bg-[#ff9876] backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#390c00] shadow-md whitespace-nowrap hover:bg-[#ffb59d] active:scale-95 transition-all"
          >
            Quick 1-Click Checkout →
          </button>
        </div>

        {/* Big Action Button */}
        <button
          onClick={() => onNavigate('collection')}
          className="h-12 w-full max-w-xs bg-white text-[#2f2420] hover:bg-[#fff1ed] font-extrabold rounded-full shadow-2xl flex items-center justify-center gap-2 text-sm tracking-wide active:scale-95 transition-all select-none"
        >
          <span>Shop New Arrivals</span>
          <span className="material-symbols-outlined text-[18px]">east</span>
        </button>

        {/* Carousel Slide Indicators */}
        <nav aria-label="Campaign Slides" className="flex items-center gap-2 pt-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                activeSlide === idx ? 'w-6 bg-white shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </nav>
      </div>
    </section>
  );
};
