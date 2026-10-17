import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ScreenId } from './PrototypeBar';

interface CollectionPageProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onNavigate,
  onOpenQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Filter States
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedSleeve, setSelectedSleeve] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('bestselling');

  // UI State Simulation (Standard Grid, Loading Skeletons, Empty Search State)
  const [uiState, setUiState] = useState<'normal' | 'loading' | 'empty'>('normal');

  // Active Dropdown Toggles
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }
    if (selectedSleeve) {
      result = result.filter((p) => p.sleeveStyle === selectedSleeve);
    }
    if (selectedFabric) {
      result = result.filter((p) => p.fabric.toLowerCase().includes(selectedFabric.toLowerCase()));
    }
    if (selectedPalette) {
      result = result.filter((p) => p.palette === selectedPalette);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.reverse();
    } else if (sortBy === 'bestselling') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedSize, selectedSleeve, selectedFabric, selectedPalette, sortBy]);

  const activeFiltersCount = [selectedSize, selectedSleeve, selectedFabric, selectedPalette].filter(Boolean).length;

  const handleClearAll = () => {
    setSelectedSize(null);
    setSelectedSleeve(null);
    setSelectedFabric(null);
    setSelectedPalette(null);
    setUiState('normal');
  };

  return (
    <div className="w-full flex flex-col bg-[#fff8f6]">
      {/* Real-time Inventory Synchronised Notification Banner */}
      <aside
        aria-label="Stock Status"
        className="w-full bg-[#fbe3dc] text-[#504441] px-4 lg:px-10 py-1.5 flex items-center justify-between border-b border-[#ebdcca]"
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#1e6b3a]">check_circle</span>
          <span>
            Stock synchronised: Real-time inventory updated 2 minutes ago. Doorstep trial active for pin codes in India.
          </span>
        </div>
        <button
          onClick={() => {}}
          className="text-xs text-[#837471] hover:text-[#251915]"
          aria-label="Close banner"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </aside>

      {/* Main Collection Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 pt-6 pb-16 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#504441]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#98462a]">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#837471]">chevron_right</span>
          <button onClick={() => onNavigate('collection')} className="hover:text-[#98462a]">
            Collections
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#837471]">chevron_right</span>
          <span className="font-bold text-[#251915]">Printed Kurtis</span>
        </nav>

        {/* Collection Masthead / Hero Header */}
        <header className="flex flex-col gap-2 max-w-4xl">
          <div className="inline-flex items-center gap-1.5 w-fit bg-[#f5ded7] px-3 py-0.5 rounded-full text-[#98462a] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">spa</span>
            <span>Handprinted Heritage • SS/26 Drop</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-syne text-4xl lg:text-5xl font-black text-[#2f150f] tracking-tight">
              Printed Kurtis
            </h1>
            <span className="text-xs font-bold text-[#98462a] bg-[#ffe9e3] px-3 py-1 rounded-full">
              Pure Breathable Cotton • {PRODUCTS.length} Designs Loaded
            </span>
          </div>

          <p className="text-base text-[#504441] leading-relaxed">
            Breathable natural cotton kurtis infused with authentic block prints, flared silhouettes, and effortless day-to-sunset comfort. Designed thoughtfully for modern Indian silhouettes and balmy seasons.
          </p>

          {/* Editorial Highlight Strip */}
          <div className="mt-2 bg-[#fff1ed] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#504441] border border-[#ebe0dc]">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[#98462a] text-[18px]">eco</span>
              <span>100% Breathable Malmal &amp; Cambric Cotton</span>
            </div>
            <div className="hidden sm:block text-[#d5c3bf]">•</div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[#98462a] text-[18px]">texture</span>
              <span>Jaipur &amp; Bagru Mud-Resist Motifs</span>
            </div>
            <div className="hidden sm:block text-[#d5c3bf]">•</div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[#98462a] text-[18px]">checkroom</span>
              <span>Pre-Shrunk Indian Tailored Fit</span>
            </div>
          </div>
        </header>

        {/* Filter & Sort Utility Bar */}
        <section
          aria-label="Filters and Sorting"
          className="flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-xs border border-[#ebe0dc]"
        >
          {/* Top Row: Dropdowns & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Size Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'size' ? null : 'size')}
                  className={`h-10 px-4 rounded-full text-xs font-bold flex items-center gap-1 transition-colors border ${
                    selectedSize
                      ? 'bg-[#2f150f] text-white border-[#2f150f]'
                      : 'bg-[#fff8f6] text-[#251915] border-[#ebe0dc] hover:bg-[#ffe9e3]'
                  }`}
                >
                  <span>Size {selectedSize ? `(${selectedSize})` : ''}</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                {openFilter === 'size' && (
                  <div className="absolute top-12 left-0 z-30 w-44 bg-white rounded-xl shadow-xl border border-[#ebe0dc] p-2 flex flex-col gap-1">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          setSelectedSize(selectedSize === sz ? null : sz);
                          setOpenFilter(null);
                        }}
                        className={`px-3 py-1.5 text-xs text-left rounded-lg transition-colors flex items-center justify-between ${
                          selectedSize === sz ? 'bg-[#ff9876] text-[#390c00] font-bold' : 'hover:bg-[#fff1ed]'
                        }`}
                      >
                        <span>Size {sz}</span>
                        {selectedSize === sz && <span className="material-symbols-outlined text-[14px]">check</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sleeve Style Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'sleeve' ? null : 'sleeve')}
                  className={`h-10 px-4 rounded-full text-xs font-bold flex items-center gap-1 transition-colors border ${
                    selectedSleeve
                      ? 'bg-[#2f150f] text-white border-[#2f150f]'
                      : 'bg-[#fff8f6] text-[#251915] border-[#ebe0dc] hover:bg-[#ffe9e3]'
                  }`}
                >
                  <span>Sleeve {selectedSleeve ? `(${selectedSleeve})` : ''}</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                {openFilter === 'sleeve' && (
                  <div className="absolute top-12 left-0 z-30 w-48 bg-white rounded-xl shadow-xl border border-[#ebe0dc] p-2 flex flex-col gap-1">
                    {['Sleeveless', 'Full Sleeves', '3/4 Sleeves', 'Bell Sleeves'].map((slv) => (
                      <button
                        key={slv}
                        onClick={() => {
                          setSelectedSleeve(selectedSleeve === slv ? null : slv);
                          setOpenFilter(null);
                        }}
                        className={`px-3 py-1.5 text-xs text-left rounded-lg transition-colors flex items-center justify-between ${
                          selectedSleeve === slv ? 'bg-[#ff9876] text-[#390c00] font-bold' : 'hover:bg-[#fff1ed]'
                        }`}
                      >
                        <span>{slv}</span>
                        {selectedSleeve === slv && <span className="material-symbols-outlined text-[14px]">check</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Palette / Color Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'palette' ? null : 'palette')}
                  className={`h-10 px-4 rounded-full text-xs font-bold flex items-center gap-1 transition-colors border ${
                    selectedPalette
                      ? 'bg-[#2f150f] text-white border-[#2f150f]'
                      : 'bg-[#fff8f6] text-[#251915] border-[#ebe0dc] hover:bg-[#ffe9e3]'
                  }`}
                >
                  <span>Color {selectedPalette ? `(${selectedPalette})` : ''}</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                {openFilter === 'palette' && (
                  <div className="absolute top-12 left-0 z-30 w-48 bg-white rounded-xl shadow-xl border border-[#ebe0dc] p-2 flex flex-col gap-1">
                    {['Rust / Terracotta', 'Mustard', 'Black & White', 'Indigo', 'Pink', 'Sky Blue', 'Maroon'].map(
                      (clr) => (
                        <button
                          key={clr}
                          onClick={() => {
                            setSelectedPalette(selectedPalette === clr ? null : clr);
                            setOpenFilter(null);
                          }}
                          className={`px-3 py-1.5 text-xs text-left rounded-lg transition-colors flex items-center justify-between ${
                            selectedPalette === clr
                              ? 'bg-[#ff9876] text-[#390c00] font-bold'
                              : 'hover:bg-[#fff1ed]'
                          }`}
                        >
                          <span>{clr}</span>
                          {selectedPalette === clr && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Fabric Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === 'fabric' ? null : 'fabric')}
                  className={`h-10 px-4 rounded-full text-xs font-bold flex items-center gap-1 transition-colors border ${
                    selectedFabric
                      ? 'bg-[#2f150f] text-white border-[#2f150f]'
                      : 'bg-[#fff8f6] text-[#251915] border-[#ebe0dc] hover:bg-[#ffe9e3]'
                  }`}
                >
                  <span>Fabric {selectedFabric ? `(${selectedFabric})` : ''}</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                {openFilter === 'fabric' && (
                  <div className="absolute top-12 left-0 z-30 w-48 bg-white rounded-xl shadow-xl border border-[#ebe0dc] p-2 flex flex-col gap-1">
                    {['Cotton', 'Mulmul', 'Cambric', 'Mud-Resist', 'Crushed'].map((fab) => (
                      <button
                        key={fab}
                        onClick={() => {
                          setSelectedFabric(selectedFabric === fab ? null : fab);
                          setOpenFilter(null);
                        }}
                        className={`px-3 py-1.5 text-xs text-left rounded-lg transition-colors flex items-center justify-between ${
                          selectedFabric === fab
                            ? 'bg-[#ff9876] text-[#390c00] font-bold'
                            : 'hover:bg-[#fff1ed]'
                        }`}
                      >
                        <span>{fab}</span>
                        {selectedFabric === fab && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs text-[#504441] whitespace-nowrap hidden sm:inline">
                Showing <strong className="text-[#251915] font-bold">{filteredProducts.length}</strong> of 24 Designs
              </span>

              <div className="flex items-center bg-[#fff8f6] rounded-full px-3 h-10 border border-[#ebe0dc]">
                <span className="text-xs text-[#504441] mr-1 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#2f150f] focus:outline-none cursor-pointer pr-2"
                >
                  <option value="bestselling">Best Selling</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Drops</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ebe0dc]">
              <span className="text-[11px] text-[#837471] font-bold uppercase tracking-wider">Active:</span>

              {selectedSize && (
                <span className="inline-flex items-center gap-1.5 bg-[#2f150f] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  <span>Size: {selectedSize}</span>
                  <button onClick={() => setSelectedSize(null)} aria-label="Remove Size filter">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              {selectedSleeve && (
                <span className="inline-flex items-center gap-1.5 bg-[#2f150f] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  <span>Sleeve: {selectedSleeve}</span>
                  <button onClick={() => setSelectedSleeve(null)} aria-label="Remove Sleeve filter">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              {selectedPalette && (
                <span className="inline-flex items-center gap-1.5 bg-[#2f150f] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  <span>Color: {selectedPalette}</span>
                  <button onClick={() => setSelectedPalette(null)} aria-label="Remove Color filter">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              {selectedFabric && (
                <span className="inline-flex items-center gap-1.5 bg-[#2f150f] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  <span>Fabric: {selectedFabric}</span>
                  <button onClick={() => setSelectedFabric(null)} aria-label="Remove Fabric filter">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              <button
                onClick={handleClearAll}
                className="text-xs text-[#98462a] underline underline-offset-4 hover:text-[#2f150f] font-semibold ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* 4. PRODUCT GRID (Standard 4-Column Layout) */}
        {uiState === 'normal' && filteredProducts.length > 0 && (
          <main aria-label="Collection products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isSoldOut = !product.inStock;

              return (
                <article
                  key={product.id}
                  className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-[#ebe0dc] ${
                    isSoldOut ? 'opacity-90' : ''
                  }`}
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#fff1ed]">
                    {product.discountBadge && (
                      <span className="absolute top-3 left-3 z-10 bg-[#98462a] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        {product.discountBadge}
                      </span>
                    )}

                    {isSoldOut && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <span className="bg-black/85 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          Restocking Next Week
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-[#2f150f] hover:text-[#98462a] flex items-center justify-center transition-transform active:scale-90"
                      aria-label="Save to Wishlist"
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isWishlisted ? 'text-[#98462a]' : ''
                        }`}
                      >
                        favorite
                      </span>
                    </button>

                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => onOpenQuickView(product)}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-[#504441] truncate">{product.subtitle}</span>
                      <h2
                        onClick={() => onOpenQuickView(product)}
                        className="font-bold text-sm text-[#2f150f] line-clamp-2 cursor-pointer group-hover:text-[#98462a] transition-colors"
                        title={product.name}
                      >
                        {product.name}
                      </h2>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-bold text-[#98462a]">₹{product.price}</span>
                        <span className="text-xs text-[#837471] line-through">₹{product.originalPrice}</span>
                        <span className="text-xs text-[#1e6b3a] font-semibold ml-auto">
                          Save ₹{product.originalPrice - product.price}
                        </span>
                      </div>

                      {/* Size Pills */}
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-[#504441]">
                        {product.sizes.map((sz) => (
                          <span
                            key={sz}
                            className={`px-1.5 py-0.5 rounded font-semibold ${
                              sz === 'M' ? 'bg-[#ffe9e3] text-[#2f150f] font-bold' : 'bg-[#fff8f6]'
                            }`}
                          >
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    {isSoldOut ? (
                      <button
                        onClick={() => alert(`We will notify you when ${product.name} is restocked!`)}
                        className="w-full h-11 rounded-full bg-[#fbe3dc] text-[#504441] hover:bg-[#ffe9e3] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">notifications</span>
                        <span>Notify When Restocked</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenQuickView(product)}
                        className="w-full h-11 rounded-full bg-[#2f150f] text-white hover:bg-[#98462a] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-98 shadow-sm"
                      >
                        <span>Choose Options</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </main>
        )}

        {/* LOADING SKELETONS VIEW */}
        {uiState === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col bg-white rounded-2xl overflow-hidden p-3 gap-3 border border-[#ebe0dc]">
                <div className="aspect-[4/5] bg-[#ffe9e3] rounded-xl"></div>
                <div className="h-4 bg-[#ffe9e3] rounded w-3/4"></div>
                <div className="h-4 bg-[#ffe9e3] rounded w-1/2"></div>
                <div className="h-10 bg-[#ffe9e3] rounded-full mt-2"></div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE VIEW */}
        {(uiState === 'empty' || filteredProducts.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-[#ebe0dc]">
            <div className="w-16 h-16 rounded-full bg-[#ffe9e3] flex items-center justify-center text-[#98462a] mb-4">
              <span className="material-symbols-outlined text-[32px]">filter_alt_off</span>
            </div>
            <h3 className="font-syne text-2xl font-bold text-[#2f150f] mb-1">
              No kurtis match your current filters
            </h3>
            <p className="text-sm text-[#504441] max-w-md mb-6">
              We couldn't find any designs combining your specific size, sleeve, and fabric selection. Try resetting filters to explore our artisanal catalogue.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleClearAll}
                className="h-11 px-6 rounded-full bg-[#2f150f] text-white font-bold text-xs hover:bg-[#98462a] transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="h-11 px-6 rounded-full bg-[#fff1ed] text-[#2f150f] font-bold text-xs hover:bg-[#ffe9e3] transition-colors"
              >
                View Best Sellers
              </button>
            </div>
          </div>
        )}

        {/* 5. STOREFRONT RESILIENCE & UI STATES TOOLSTRIP (Matching Screenshot Demo) */}
        <section
          aria-labelledby="ui-states-heading"
          className="mt-6 flex flex-col gap-3 bg-[#fff1ed] p-4 sm:p-6 rounded-2xl border border-[#ebe0dc]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-[#2f150f]" id="ui-states-heading">
                Storefront Resilience &amp; UI States
              </h3>
              <p className="text-xs text-[#504441]">
                Interactive demo switches to verify zero layout shift, skeleton states, and empty fallbacks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUiState('normal')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  uiState === 'normal'
                    ? 'bg-[#2f150f] text-white shadow-sm'
                    : 'bg-white text-[#2f150f] hover:bg-[#ffe9e3]'
                }`}
              >
                Standard Grid
              </button>
              <button
                onClick={() => setUiState('loading')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  uiState === 'loading'
                    ? 'bg-[#2f150f] text-white shadow-sm'
                    : 'bg-white text-[#2f150f] hover:bg-[#ffe9e3]'
                }`}
              >
                Loading Skeletons
              </button>
              <button
                onClick={() => setUiState('empty')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  uiState === 'empty'
                    ? 'bg-[#2f150f] text-white shadow-sm'
                    : 'bg-white text-[#2f150f] hover:bg-[#ffe9e3]'
                }`}
              >
                Empty Search State
              </button>
            </div>
          </div>
        </section>

        {/* 6. PAGINATION & LOAD MORE */}
        <nav aria-label="Pagination" className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="h-10 px-3.5 rounded-full bg-[#ffe9e3] text-[#837471] text-xs font-semibold flex items-center gap-1 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <span className="w-10 h-10 rounded-full bg-[#2f150f] text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <button className="w-10 h-10 rounded-full bg-white text-[#2f150f] hover:bg-[#ffe9e3] text-xs font-bold flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-full bg-white text-[#2f150f] hover:bg-[#ffe9e3] text-xs font-bold flex items-center justify-center transition-colors">
              3
            </button>
            <button className="h-10 px-3.5 rounded-full bg-white text-[#2f150f] hover:bg-[#ffe9e3] text-xs font-semibold flex items-center gap-1 transition-colors">
              <span>Next</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <button
            onClick={() => alert('Loaded 8 more artisanal kurtis from Jaipur atelier.')}
            className="h-11 px-6 rounded-full bg-[#fbe3dc] text-[#98462a] hover:bg-[#ffe9e3] font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Load More Kurtis (8 Remaining)</span>
          </button>
        </nav>

        {/* 7. VALUE PROMISE / HERITAGE EDITORIAL BANNER */}
        <aside
          aria-label="Brand Highlights"
          className="w-full bg-[#fbe3dc] rounded-2xl p-6 flex flex-wrap items-center justify-around gap-6 text-[#2f150f] border border-[#ebdcca]"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#98462a]">palette</span>
            <div>
              <span className="font-bold text-sm block">Handcrafted Artisanal Weaves</span>
              <span className="text-xs text-[#504441]">Naturally dyed organic yarns crafted in Rajasthan</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-[#d5c3bf]" />
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#98462a]">straighten</span>
            <div>
              <span className="font-bold text-sm block">Tailored Silhouette Precision</span>
              <span className="text-xs text-[#504441]">True to standard Indian bust and hip measurements</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-[#d5c3bf]" />
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#98462a]">published_with_changes</span>
            <div>
              <span className="font-bold text-sm block">Easy 7-Day Doorstep Exchange</span>
              <span className="text-xs text-[#504441]">Zero-hassle pickup across 18,000+ Indian pincodes</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
