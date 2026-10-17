import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ScreenId } from './PrototypeBar';

interface SearchExperienceProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenQuickView: (product: Product) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export type SearchState = 'default' | 'empty' | 'loading' | 'no-results' | 'error' | 'long-query';

export const SearchExperience: React.FC<SearchExperienceProps> = ({
  onNavigate,
  onOpenQuickView,
  onClose,
  isModal = false,
}) => {
  const [activeState, setActiveState] = useState<SearchState>('default');
  const [query, setQuery] = useState('pure cotton kurti');
  const [recentTags, setRecentTags] = useState(['Corset Kurti', 'Mulmul Cotton Anarkali', 'Maroon Short Kurta']);
  const [isRetrying, setIsRetrying] = useState(false);

  const switchState = (newState: SearchState) => {
    setActiveState(newState);
    if (newState === 'default') {
      setQuery('pure cotton kurti');
    } else if (newState === 'empty') {
      setQuery('');
    } else if (newState === 'loading') {
      setQuery('cotton k...');
    } else if (newState === 'no-results') {
      setQuery('velvet lehenga');
    } else if (newState === 'error') {
      setQuery('pure cotton kurti');
    } else if (newState === 'long-query') {
      setQuery(
        'pure-cotton-handcrafted-jaipur-bagru-block-printed-corset-anarkali-suit-ensemble-with-zari-embroidered-organza-dupatta-and-tapered-trousers-in-maroon-and-ivory-festive-capsule-collection-2025-sku-slay-49281-in-stock'
      );
    }
  };

  const removeTag = (tagToRemove: string) => {
    setRecentTags(recentTags.filter((t) => t !== tagToRemove));
  };

  const clearAllHistory = () => {
    setRecentTags([]);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      switchState('default');
    }, 800);
  };

  const catalogResults = PRODUCTS.slice(0, 4);

  return (
    <div className={`w-full flex flex-col bg-[#fff8f6] ${isModal ? 'max-h-[90vh] overflow-y-auto' : 'min-h-screen'}`}>
      {/* Interactive State Simulator Controller Bar */}
      <aside
        aria-label="Search State Simulator"
        className="w-full bg-[#1d1c13] px-4 lg:px-10 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md z-30"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff9876] text-[18px]">tune</span>
          <span className="text-xs uppercase tracking-wider text-[#ffdad3] font-bold">
            Search State Simulator:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="tablist">
          {[
            { id: 'default', label: '1. Live Suggestions (Default)' },
            { id: 'empty', label: '2. Empty Query (Trending)' },
            { id: 'loading', label: '3. Typing / Loading' },
            { id: 'no-results', label: '4. No Results Found' },
            { id: 'error', label: '5. Network Error & Retry' },
            { id: 'long-query', label: '6. Extreme Long Query' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => switchState(st.id as SearchState)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeState === st.id
                  ? 'bg-[#ff9876] text-[#390c00] shadow-sm'
                  : 'bg-[#333127] text-white hover:bg-[#504441]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Search Container */}
      <section className="relative w-full px-4 lg:px-10 py-6 max-w-7xl mx-auto flex-1 flex flex-col">
        {/* Search Input Card */}
        <div className="w-full bg-white rounded-2xl shadow-md p-3 sm:p-4 border border-[#ebe0dc] mb-6">
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-[#ffe9e3] flex items-center justify-center text-[#98462a] shrink-0">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>

            <div className="flex-1 relative min-w-0">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value === '') {
                    setActiveState('empty');
                  } else {
                    setActiveState('default');
                  }
                }}
                placeholder="Search by fabric, silhouette, craft (e.g. Pure Cotton Kurti, Chanderi)..."
                className="w-full bg-transparent text-lg font-semibold text-[#2f150f] placeholder:text-[#837471] outline-none"
              />
            </div>

            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setActiveState('empty');
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#504441] hover:bg-[#ffe9e3] transition-colors"
                aria-label="Clear query"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}

            <div className="hidden sm:block w-px h-6 bg-[#ebe0dc]" />

            {isModal && onClose ? (
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-full bg-[#fff1ed] hover:bg-[#ffe9e3] text-xs font-bold text-[#2f150f] transition-all flex items-center gap-1"
              >
                <span>Close</span>
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            ) : (
              <button
                onClick={() => switchState('empty')}
                className="px-3 py-1.5 rounded-full bg-[#fff1ed] hover:bg-[#ffe9e3] text-xs font-semibold text-[#2f150f] transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">keyboard_return</span>
                <span>Esc</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= STATE 1: LIVE SUGGESTIONS (DEFAULT) ================= */}
        {activeState === 'default' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (5 cols): History, Suggestions, Trending */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Recent Searches */}
              <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#ebe0dc]">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#98462a] text-[18px]">history</span>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#504441]">
                      Recent Searches
                    </h2>
                  </div>
                  {recentTags.length > 0 && (
                    <button
                      onClick={clearAllHistory}
                      className="text-xs text-[#98462a] hover:underline"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {recentTags.length === 0 ? (
                    <span className="text-xs text-[#837471] italic">No recent searches saved.</span>
                  ) : (
                    recentTags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1.5 bg-[#ffe9e3] px-3 py-1 rounded-full text-xs font-medium text-[#2f150f]"
                      >
                        <span
                          className="cursor-pointer hover:text-[#98462a]"
                          onClick={() => {
                            setQuery(tag);
                            setActiveState('default');
                          }}
                        >
                          {tag}
                        </span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[#837471] hover:text-[#ba1a1a]"
                        >
                          <span className="material-symbols-outlined text-[13px]">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Instant Phrase Matches */}
              <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#ebe0dc]">
                <div className="flex items-center gap-1.5 pb-3">
                  <span className="material-symbols-outlined text-[#98462a] text-[18px]">manage_search</span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#504441]">
                    Instant Phrase Matches
                  </h2>
                </div>

                <div className="flex flex-col gap-1">
                  {[
                    { phrase: 'pure cotton kurti for women', count: '18 items' },
                    { phrase: 'pure cotton kurti pant set', count: '12 items' },
                    { phrase: 'pure cotton kurti sleeveless', count: '9 items' },
                    { phrase: 'pure cotton kurti short length', count: '5 items' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(item.phrase);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fff1ed] transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[#837471] group-hover:text-[#98462a] text-[18px]">
                          search
                        </span>
                        <span className="text-xs text-[#251915] truncate">
                          <strong className="text-[#98462a] font-bold">pure cotton kurti</strong>{' '}
                          {item.phrase.replace('pure cotton kurti', '')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#837471]">{item.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending In Handloom */}
              <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#ebe0dc]">
                <div className="flex items-center gap-1.5 pb-2">
                  <span className="material-symbols-outlined text-[#98462a] text-[18px]">trending_up</span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#504441]">
                    Trending In Handloom
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'Sleeveless Kurtis',
                    'Co-ord Sets',
                    'Twinning Duo',
                    'Bagru Block Print',
                    'Backless Kurtis',
                    'Festive Silk',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setQuery(cat);
                        setActiveState('default');
                      }}
                      className="px-3 py-1 rounded-full bg-[#ffe9e3] text-[#2f150f] hover:bg-[#2f150f] hover:text-white text-xs font-medium transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Verified Catalog Matches */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#ebe0dc]">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-syne text-xl font-bold text-[#2f150f]">Catalog Results</h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdad3] text-[#390c00] text-[11px] font-bold">
                      4 of 24
                    </span>
                  </div>
                  <span className="text-xs text-[#504441] hidden sm:inline">
                    Handcrafted in Sanganer &amp; Jaipur
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catalogResults.map((product) => (
                    <article
                      key={product.id}
                      className="bg-[#fff8f6] rounded-2xl p-3 flex flex-col justify-between border border-[#ebe0dc] hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#ffe9e3] shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.imageAlt}
                            className="w-full h-full object-cover"
                          />
                          {product.discountBadge && (
                            <span className="absolute top-1 left-1 bg-[#98462a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              {product.discountBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1 text-[10px] text-[#1e6b3a] font-bold uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1e6b3a]"></span>
                              <span>Pure Cotton</span>
                            </div>
                            <h3
                              onClick={() => onOpenQuickView(product)}
                              className="font-bold text-xs text-[#2f150f] line-clamp-1 mt-0.5 cursor-pointer hover:text-[#98462a]"
                            >
                              {product.name}
                            </h3>
                            <p className="text-[11px] text-[#504441] truncate">{product.subtitle}</p>
                          </div>

                          <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-sm font-bold text-[#98462a]">₹{product.price}</span>
                            <span className="text-xs text-[#837471] line-through">₹{product.originalPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Immediate Add to Bag CTA */}
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#ebe0dc]">
                        <button
                          onClick={() => onOpenQuickView(product)}
                          className="flex-1 h-9 bg-[#2f150f] text-white hover:bg-[#98462a] rounded-full text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
                          <span>Add to Bag</span>
                        </button>
                        <button
                          onClick={() => onOpenQuickView(product)}
                          className="w-9 h-9 rounded-full bg-[#ffe9e3] hover:bg-[#fbe3dc] text-[#2f150f] flex items-center justify-center transition-colors"
                          aria-label="View details"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Big Search Results CTA */}
                <div className="mt-5 pt-4 border-t border-[#ebe0dc] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('collection')}
                    className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#98462a] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#2f150f] transition-colors shadow-sm"
                  >
                    <span>View all 24 results for “{query || 'pure cotton kurti'}”</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-[#504441]">
                    <span className="material-symbols-outlined text-[#1e6b3a] text-[16px]">verified</span>
                    <span>All 4 verified in stock for same-day Jaipur dispatch</span>
                  </div>
                </div>
              </div>

              {/* Handloom Craft Guarantee Mini-Banner */}
              <div className="w-full bg-[#ffe9e3] p-4 rounded-2xl flex items-center gap-3 border border-[#ebe0dc]">
                <div className="w-10 h-10 rounded-full bg-[#fbe3dc] flex items-center justify-center text-[#98462a] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">eco</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#2f150f]">Conscious Natural Fibers</h4>
                  <p className="text-xs text-[#504441]">
                    All Slayvana cotton kurtis use AZO-free botanical dyes &amp; certified pure staple cotton.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STATE 2: EMPTY QUERY (TRENDING & EDITORIAL) ================= */}
        {activeState === 'empty' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#ebe0dc]">
                <h3 className="font-syne text-xl font-bold text-[#2f150f] mb-1">Welcome Back</h3>
                <p className="text-xs text-[#504441] mb-4">Your recent search terms and favorite silhouetted cuts.</p>

                <div className="flex flex-col gap-2">
                  {['Organza Tissue Sarees', 'Mulmul Cotton Anarkali', 'Corset Kurti'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        setActiveState('default');
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#fff1ed] hover:bg-[#ffe9e3] text-xs font-semibold text-[#2f150f] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#98462a] text-[16px]">history</span>
                        <span>{term}</span>
                      </span>
                      <span className="material-symbols-outlined text-[14px]">north_east</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#ebe0dc]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#504441] block mb-3">
                  Popular Filters
                </span>
                <div className="flex flex-col gap-2 text-xs text-[#2f150f]">
                  <button
                    onClick={() => onNavigate('collection')}
                    className="flex items-center justify-between py-1 hover:text-[#98462a] text-left"
                  >
                    <span>Festive kurtis under ₹999</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => onNavigate('collection')}
                    className="flex items-center justify-between py-1 hover:text-[#98462a] text-left"
                  >
                    <span>New Handloom Dabu Drop</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => onNavigate('collection')}
                    className="flex items-center justify-between py-1 hover:text-[#98462a] text-left"
                  >
                    <span>Ready-to-ship sizes XS to 3XL</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Curations for Discovery */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-xs border border-[#ebe0dc]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#98462a]">The Atelier Edit</span>
                  <h2 className="font-syne text-2xl font-bold text-[#2f150f]">Discover Signature Silhouettes</h2>
                </div>
                <span className="text-xs text-[#504441]">Winter-Spring Handcraft 2026</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => {
                    setQuery('Jaipur Blockprints');
                    setActiveState('default');
                  }}
                  className="rounded-2xl overflow-hidden bg-[#fff1ed] flex flex-col group cursor-pointer border border-[#ebe0dc]"
                >
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsoqRC2gL2QfJDECSiS1rnoYG2-lIYQecVn9ryLAVR_FGvy6-CPB9RwCEIm5FShro2-d_eviQ-IZnK4G10bA-W5fkbhWwhY2ALp0S1Ys4qsrOsVeftg4hhqXPuZreHg7_L6ouZzwRkNEVNCjnaQ78Ia1nuxk6HJgUwJtviCMvILxZ0n_bo6M0AVHsU_vJPmujCcqWoAvwO6Lmd0bzksEr-x4S57sAeJmc64LuQL42UNwBbRR9ZrLs-"
                      alt="Jaipur Blockprints"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h4 className="font-bold text-xs text-[#2f150f]">Jaipur Blockprints</h4>
                    <p className="text-[11px] text-[#504441]">Natural dyes, Bagru traditions.</p>
                    <span className="text-[11px] font-bold text-[#98462a] mt-1 flex items-center gap-1">
                      Explore (34) <span className="material-symbols-outlined text-[14px]">east</span>
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setQuery('Sculpted Pre-Draped Sarees');
                    setActiveState('default');
                  }}
                  className="rounded-2xl overflow-hidden bg-[#fff1ed] flex flex-col group cursor-pointer border border-[#ebe0dc]"
                >
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2C5U2nVc3xi9zsO2SQGeoStR8kdUoCo35IoVyKWv9nX3Y5v7dQ23UT_QLPj_PvCF7i8gwfBCtf4HJR0aMBnqmiIUur5ai0Bsrb4e2bv8oBoaK6hQ4rk0_OETgBu6ErwW7qSYgh6BquRiwUv8homJumjlCgk3B6pLSeMZa_HabFBmFAmazXt82T2hX1qNXJsQXWiAJN4y9oWmr__3GqeQMBs3CeDxOUfhilK4V4lym33yZbSIHrFHH"
                      alt="Sculpted Drapes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h4 className="font-bold text-xs text-[#2f150f]">Sculpted Drapes</h4>
                    <p className="text-[11px] text-[#504441]">Zip-and-go 60-second celebration.</p>
                    <span className="text-[11px] font-bold text-[#98462a] mt-1 flex items-center gap-1">
                      Explore (19) <span className="material-symbols-outlined text-[14px]">east</span>
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setQuery('Everyday Linen Kurtas');
                    setActiveState('default');
                  }}
                  className="rounded-2xl overflow-hidden bg-[#fff1ed] flex flex-col group cursor-pointer border border-[#ebe0dc]"
                >
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXj99qVSDUY1QopZAQh6bxyL4od8dyFEM23lx2ML-ewKrVQAH6AXrF0ox45Bu9ZpnT10b6QkxNVur3q6VLUFCyQfPY08rKF1pJOLRamqQYT0joBq7IPsb5zia_NPNc6nDUpzjKC38xzrnN5oOjJNApW52gZCl-sCAwCHm0O1T1eeibdgtryE_9hkE0Uyun97JqDfF6Qt3cO6dcG3JnMst3R1ruo69BP3AotJ-sBWta6xjdXAAEAuwi"
                      alt="Everyday Linen"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h4 className="font-bold text-xs text-[#2f150f]">Everyday Linen</h4>
                    <p className="text-[11px] text-[#504441]">Featherweight comfort for workdays.</p>
                    <span className="text-[11px] font-bold text-[#98462a] mt-1 flex items-center gap-1">
                      Explore (28) <span className="material-symbols-outlined text-[14px]">east</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STATE 3: TYPING / LOADING (SKELETONS) ================= */}
        {activeState === 'loading' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-pulse">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#ebe0dc]">
                <div className="h-4 w-32 bg-[#ffe9e3] rounded-full mb-3" />
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-[#ffe9e3] rounded-full" />
                  <div className="h-8 w-32 bg-[#ffe9e3] rounded-full" />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#ebe0dc] flex flex-col gap-3">
                <div className="h-4 w-40 bg-[#ffe9e3] rounded-full" />
                <div className="h-9 w-full bg-[#ffe9e3] rounded-xl" />
                <div className="h-9 w-full bg-[#ffe9e3] rounded-xl" />
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-xs border border-[#ebe0dc]">
              <div className="flex items-center justify-between pb-4">
                <div className="h-6 w-44 bg-[#ffe9e3] rounded-full" />
                <div className="h-4 w-24 bg-[#ffe9e3] rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#fff1ed] rounded-xl p-3 flex flex-col gap-3">
                  <div className="aspect-[4/5] bg-[#ffe9e3] rounded-xl" />
                  <div className="h-4 bg-[#ffe9e3] rounded w-3/4" />
                  <div className="h-8 bg-[#ffe9e3] rounded-full" />
                </div>
                <div className="bg-[#fff1ed] rounded-xl p-3 flex flex-col gap-3">
                  <div className="aspect-[4/5] bg-[#ffe9e3] rounded-xl" />
                  <div className="h-4 bg-[#ffe9e3] rounded w-3/4" />
                  <div className="h-8 bg-[#ffe9e3] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STATE 4: NO RESULTS FOUND ================= */}
        {activeState === 'no-results' && (
          <div className="w-full bg-white rounded-3xl p-8 sm:p-12 shadow-sm text-center flex flex-col items-center justify-center max-w-2xl mx-auto border border-[#ebe0dc]">
            <div className="w-16 h-16 rounded-full bg-[#ffe9e3] flex items-center justify-center text-[#98462a] mb-4">
              <span className="material-symbols-outlined text-[36px]">find_in_page</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#98462a]">Zero Catalog Hits</span>
            <h2 className="font-syne text-2xl font-bold text-[#2f150f] mt-1">
              No matches found for <span className="italic text-[#98462a]">“velvet lehenga”</span>
            </h2>
            <p className="text-xs text-[#504441] max-w-md mt-2 leading-relaxed">
              We couldn't find an exact match in our current ready-to-ship curations. Our artisans regularly update collections every Thursday.
            </p>

            <div className="w-full max-w-md bg-[#fff1ed] rounded-2xl p-4 mt-5 text-left border border-[#ebe0dc]">
              <h3 className="font-bold text-xs text-[#2f150f] mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#98462a]">lightbulb</span>
                <span>Search Suggestions</span>
              </h3>
              <ul className="text-xs text-[#504441] flex flex-col gap-1 list-disc pl-4">
                <li>Check for spelling errors (e.g. try 'Kurti' instead of 'Kurtti').</li>
                <li>Try general terms like 'Silk', 'Cotton', 'Anarkali', or 'Saree'.</li>
                <li>Clear applied filters to browse our broader bespoke vault.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setQuery('pure cotton kurti');
                  setActiveState('default');
                }}
                className="h-11 px-6 rounded-full bg-[#2f150f] text-white font-bold text-xs hover:bg-[#98462a] transition-colors"
              >
                Browse All Kurtis
              </button>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveState('empty');
                }}
                className="h-11 px-6 rounded-full bg-[#ffe9e3] text-[#2f150f] hover:bg-[#fbe3dc] font-bold text-xs transition-colors"
              >
                Clear Search Filter
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE 5: NETWORK ERROR & RETRY ================= */}
        {activeState === 'error' && (
          <div className="w-full bg-white rounded-3xl p-8 sm:p-12 shadow-sm text-center flex flex-col items-center justify-center max-w-xl mx-auto border border-[#ebe0dc]">
            <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#b3261e] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">cloud_off</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#b3261e]">
              Connection Interrupted
            </span>
            <h2 className="font-syne text-2xl font-bold text-[#2f150f] mt-1">
              Search connection interrupted
            </h2>
            <p className="text-xs text-[#504441] max-w-md mt-2">
              We encountered a momentary timeout while fetching Jaipur inventory metrics. Please verify your connection or try again.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="h-11 px-6 rounded-full bg-[#2f150f] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#98462a] transition-colors shadow-sm disabled:opacity-75"
              >
                <span className={`material-symbols-outlined text-[18px] ${isRetrying ? 'animate-spin' : ''}`}>
                  refresh
                </span>
                <span>{isRetrying ? 'Reconnecting...' : 'Retry Search'}</span>
              </button>
              <button
                onClick={() => switchState('default')}
                className="h-11 px-6 rounded-full bg-[#ffe9e3] text-[#2f150f] font-bold text-xs hover:bg-[#fbe3dc] transition-colors"
              >
                Use Offline Cache
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE 6: EXTREME LONG QUERY RESILIENCE ================= */}
        {activeState === 'long-query' && (
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#ebe0dc] flex flex-col gap-5">
            <div className="bg-[#fbe3dc] p-4 rounded-2xl flex items-start gap-3">
              <span className="material-symbols-outlined text-[#98462a] text-[22px]">shield</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs text-[#2f150f]">Long String Resilience Check</h3>
                <p className="text-xs text-[#504441]">
                  The query below contains 228 unbroken characters. Container bounds, word breaking, and button wrapping remain intact with zero overflow.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-[#fff8f6] p-4 rounded-2xl border border-[#ebe0dc] flex flex-col gap-3">
                <span className="text-xs font-bold text-[#504441] uppercase">Current Unbroken Input:</span>
                <div className="bg-[#ffe9e3] p-3 rounded-xl break-all text-xs font-mono text-[#2f150f]">
                  {query}
                </div>
                <div className="flex items-center justify-between text-xs text-[#504441]">
                  <span>String length: {query.length} chars</span>
                  <span className="text-[#1e6b3a] font-bold">Containers bounded: OK</span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#fff8f6] p-4 rounded-2xl border border-[#ebe0dc] flex flex-col justify-between">
                <div>
                  <h4 className="font-syne text-lg font-bold text-[#2f150f]">Closest Stemmed Match (1)</h4>
                  <p className="text-xs text-[#504441] mt-1">
                    Parsed intent: <strong className="text-[#98462a] font-bold">Pure Cotton Jaipur Bagru Suit</strong>
                  </p>
                  <div className="mt-4 flex gap-3 bg-white p-3 rounded-xl border border-[#ebe0dc]">
                    <div className="w-16 h-20 rounded-xl bg-[#ffe9e3] overflow-hidden shrink-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZBIrMEeQurcgA2IxBYoaMKwwQTioTkBmGrPbZJP-kvLCLdUkQWCUnm61_mGJjrVwVnW2eUjUh6rz-ruiZGtaNyVcgADvEN4OlGVLrLvV_yKN-8fmluQH79ZOyiEWlvH3Xie_yMLZ3CzcyIRj1GDtVmJetUO0m09PByCg-E6x8WTpRnUxST_WR-mrkbKegCoYEnCDmrRl2u1YcyTwSDxp5C1eqxlGVH2zdiq_iyRtHsjm0j_csbf9c"
                        alt="Bagru Suit"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase text-[#98462a]">Closest Match</span>
                      <h5 className="font-bold text-xs text-[#2f150f] truncate">
                        Bagru Pure Cotton Festive Kurta Set
                      </h5>
                      <span className="text-sm font-bold text-[#98462a]">₹1,299</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => switchState('default')}
                    className="px-5 py-2 rounded-full bg-[#98462a] text-white font-bold text-xs hover:bg-[#2f150f] transition-colors"
                  >
                    Return to Standard Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Navigation Shortcuts Bar */}
        <footer
          aria-label="Keyboard Shortcuts"
          className="mt-6 w-full bg-white rounded-full px-5 py-2.5 shadow-xs border border-[#ebe0dc] flex flex-wrap items-center justify-between gap-3 text-xs text-[#504441]"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-[#ffe9e3] text-[#2f150f] text-[11px] px-1.5 py-0.5 rounded font-mono">↑</kbd>
              <kbd className="bg-[#ffe9e3] text-[#2f150f] text-[11px] px-1.5 py-0.5 rounded font-mono">↓</kbd>
              <span>to navigate</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="bg-[#ffe9e3] text-[#2f150f] text-[11px] px-1.5 py-0.5 rounded font-mono">Enter</kbd>
              <span>to select</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="bg-[#ffe9e3] text-[#2f150f] text-[11px] px-1.5 py-0.5 rounded font-mono">Esc</kbd>
              <span>to close</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#98462a] font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Instant Catalog Indexing Enabled</span>
          </div>
        </footer>
      </section>
    </div>
  );
};
