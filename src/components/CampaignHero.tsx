import React, { useState, useEffect } from 'react';
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
      category: 'Kurtis',
    },
    {
      title: 'SLAYVANA',
      eyebrow: '“Modern silhouettes rooted in Indian textile legacies.”',
      tag: 'Festive Co-ord Edit',
      subtitle: 'Mastani Crushed Crimson Silk & Palazzo Duo',
      bgImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfecqc6l-DrAk1ZgmPjc5hU9YRHs3SgTRchMdONR2hNKj24PoLJEMfFuLGfyvOdZOh0BzXOMiUY1DEidfe7lg4VPCEydMtQMs586LvrcamNOyDKTrXm7wPzTOTl4aS4wsOqhLuTOmmOJ8ZlZt5iO1DwxSdMcJQvIpUbFSyXFWNFKcV2-MWAobF3Dn4AoaYLQk3i0F3ASUr7fDR3t1T8X8tkxNTmWLXejld-8VsIUuiBS_d4Tw0eULh',
      category: 'Co-ord Sets',
    },
    {
      title: 'SLAYVANA',
      eyebrow: '“Double the vibe. Handcrafted for togetherness.”',
      tag: 'The Twinning Edit',
      subtitle: 'Bandhan Couple Sets in Deep Maroon Handloom',
      bgImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBzc68AKnZ_TKt2jkv7BrZmaQb_RIoRv1iyZDloGjnBGUCCFajmKOuNrMUZbmoQi48ZfPumULIjvnYUl9xnK8nXsnMJj6PEau6Nt0MzFwIbW0qLfMtUrvzvOSp0AuXiFFSS13HSbUf2-1dgTwJ3deomP6VsBwZYkLZPkZhBd8MJUPBaQp8rISCCs8hKnDiiW71pcQ_h-05WtUJR-x4YPuC0u0c-ulobFM-EW81S-tEc_Ku1ch4cXCbP',
      category: 'Twinning Duo',
    },
  ];

  const current = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Optional subtle auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      aria-label="Slayvana Campaign Hero"
      className="relative w-full h-[calc(100vh-2rem)] min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#2f2420] text-[#2f2420] select-none"
    >
      {/* Background Media with Vignette Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={current.bgImage}
          alt={current.subtitle}
          className="w-full h-full object-cover object-center transition-all duration-700 select-none scale-[1.01]"
        />
        {/* Top gradient scrim for navigation contrast */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
        {/* Center soft vignette for typography legibility */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/45" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Floating Top Navigation Header */}
      <header className="relative z-30 w-full px-3 sm:px-8 pt-3 sm:pt-4 pb-2 flex flex-col gap-2.5">
        <div className="w-full flex items-center justify-between gap-3">
          {/* Left: Brand Logo & Quick Category Jump Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            {/* Top Brand Monogram & Name Pill */}
            <button
              onClick={() => onNavigate('home')}
              className="bg-white/95 backdrop-blur-md pl-3 pr-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/50 hover:bg-white active:scale-95 transition-all group"
              title="Slayvana Storefront Home"
            >
              <span className="font-syne font-black text-xs sm:text-sm tracking-tight text-[#251915]">
                SLAYVANA
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-[#ff602a] text-white rounded font-bold tracking-wider">
                JAIPUR
              </span>
            </button>

            {/* Storefront switch */}
            <button
              onClick={() => onNavigate('home')}
              className="hidden sm:inline-flex bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:bg-white hover:text-[#251915] border border-white/20 shadow-sm items-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">storefront</span>
              <span>Storefront</span>
            </button>

            {/* Curated Categories */}
            <button
              onClick={() => onNavigate('collection')}
              className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              New Drops
            </button>

            <button
              onClick={() => onNavigate('collection')}
              className="hidden md:inline-flex bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              Printed Kurtis
            </button>

            <button
              onClick={() => onNavigate('collection')}
              className="hidden lg:inline-flex bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2f2420] hover:bg-white shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              Co-ord Sets
            </button>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Hindi language artisanal badge */}
            <div
              className="bg-white/95 backdrop-blur-md px-2.5 h-8 rounded-full text-xs font-bold text-[#2f2420] shadow-sm flex items-center justify-center cursor-default select-none border border-white/40"
              title="स्लेवाना हस्तशिल्प जयपुर"
            >
              <span className="text-[11px] font-semibold">स्लेवाना</span>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('account')}
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-[#2f2420] shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff602a] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-[#2f2420] shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all"
              aria-label="Search"
              title="Search atelier collections"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>

            {/* Account */}
            <button
              onClick={onOpenAuth}
              className="bg-white/95 backdrop-blur-md w-8 h-8 rounded-full text-[#2f2420] shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all"
              aria-label="User Account"
              title="Privilege Club Sign In"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCartDrawer}
              className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#2f2420] shadow-md flex items-center gap-1.5 hover:bg-white active:scale-95 transition-all"
              title="Shopping Bag"
            >
              <span>Bag</span>
              <span className="text-[#2f2420]/30 font-normal">|</span>
              <span className="font-extrabold text-[#ff602a]">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Poetic Eyebrow Quotation */}
        <div className="text-center text-white font-script text-lg sm:text-2xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none mt-1">
          {current.eyebrow}
        </div>
      </header>

      {/* Monumental Centerpiece Wordmark (Fully Responsive, Never Cut Off) */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto px-4 sm:px-6 pointer-events-none">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="font-syne font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] tracking-tight text-white uppercase select-none drop-shadow-[0_8px_36px_rgba(0,0,0,0.9)] leading-none px-2 text-center">
            SLAYVANA
          </h1>

          {/* Subtitle & Drop Badge */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm tracking-widest uppercase font-semibold shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#ff9876] animate-pulse"></span>
              <span>{current.tag}</span>
              <span className="text-white/40">•</span>
              <span className="text-[#ffb59d]">JAIPUR ATELIER</span>
            </div>
          </div>

          <p className="mt-2 text-white/95 text-xs sm:text-sm md:text-base max-w-md text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] font-medium px-4">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Lower Third: Quick Category Buttons & Primary CTA */}
      <div className="relative z-20 w-full pb-6 sm:pb-8 flex flex-col items-center gap-3 sm:gap-4">
        {/* Curated Drop Links */}
        <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar px-4 justify-start sm:justify-center">
          <button
            onClick={() => onNavigate('collection')}
            className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#2f2420] shadow-md whitespace-nowrap hover:bg-white active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px] text-[#ff602a]">styler</span>
            <span>All Kurtis (16 Silhouettes)</span>
          </button>

          <button
            onClick={() => onNavigate('collection')}
            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#2f2420] shadow-md whitespace-nowrap hover:bg-white active:scale-95 transition-all"
          >
            Co-ord Sets (4 Edits)
          </button>

          <button
            onClick={() => onNavigate('collection')}
            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#2f2420] shadow-md whitespace-nowrap hover:bg-white active:scale-95 transition-all"
          >
            Twinning Sets
          </button>

          <button
            onClick={() => onNavigate('checkout')}
            className="bg-[#ff602a] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap hover:bg-[#8a3300] active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Express Checkout</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Big Action Button */}
        <button
          onClick={() => onNavigate('collection')}
          className="h-12 w-full max-w-xs bg-white text-[#2f2420] hover:bg-[#fff1ed] font-extrabold rounded-full shadow-2xl flex items-center justify-center gap-2 text-sm tracking-wide active:scale-95 transition-all select-none border border-white/80"
        >
          <span>Explore Artisanal Drops</span>
          <span className="material-symbols-outlined text-[18px]">east</span>
        </button>

        {/* Carousel Slide Indicators & Controls */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>

          <nav aria-label="Campaign Slides" className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${s.tag}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-7 bg-white shadow-md' : 'w-2 bg-white/45 hover:bg-white/80'
                }`}
              />
            ))}
          </nav>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
          >
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};
