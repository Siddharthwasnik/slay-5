import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ScreenId } from './PrototypeBar';

interface HomeStorefrontProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const HomeStorefront: React.FC<HomeStorefrontProps> = ({
  onNavigate,
  onOpenQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);

  const newArrivals = PRODUCTS.slice(0, 4);
  const bestSellers = [
    PRODUCTS.find((p) => p.id === 'mastani-red')!,
    PRODUCTS.find((p) => p.id === 'nyra-mustard')!,
    PRODUCTS.find((p) => p.id === 'geet-sky-blue')!,
    PRODUCTS.find((p) => p.id === 'bandhan-maroon')!,
  ].filter(Boolean);

  const curatedCategories = [
    {
      title: 'Kurtis',
      sub: 'Daily Wear',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLzJsI-9fgFfslqQLjZgcGAHz0seS2Isb3RW4tZ5TedCprZR6PAoBFLiAwL-ynm9YSaxBH3s2sYQMqQzlo73MMeicnuseQipciXrsAKdZiZNkBJtbRLfkl_n6Km3-F-87qk8TEmp-RlMo2lNZpAkdnXQQF-8A0ein6LWPD4vIUhEAEz8C9q6EanuPtykUbZtRSpO00byuvP8EPQGbx0HaG4ux1NBaBnyPcfmMbsCQo5xZrWIQn7Q5w',
    },
    {
      title: 'Co-ord Sets',
      sub: 'Effortless',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6s5977Yh0-YVvH2_o9hEcLh19ux3JBmekGgKrmSdsU-pHiCPZRlIrkb_L78dqcJ-IQyLd11g5RuG-U3E7bO5W9T3bgl1y0GI8G-rbkjUr15hELNaHrdld0spDf0MpXMCkea4a35lqwIh9g9UL1iMZLcGIFkCvmr_FMKhhMtMQtNuDii4sxy3rhZcLos4F41PajOOWt4s_-O4UfCmuzLdFcE7-7LpjecXInqXZRHw9u9WV6fXq4Wsz',
    },
    {
      title: 'Twinning Duo',
      sub: 'Couples & Duos',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaVMGgl16Bv__o6LkaSA9BPpzIS2pN1zmhaVOouV6Wx_fik3YOAa69u942hdXVJGaQ0bYNqYXfRtY5cQaNY9X9R37RfbOISdtko5pH5lQcVMMLghgvMUebjoaOWDdezRImLXYuaFTJ6nTj5PBpkiq-hCftNj7jTP96bf0Ymr3GFt-4Qw8kziNVLqTf3GTfz404ikG7GvdlTVP9IkpAiCcH3iO480SVROYScL2dKpIRYYQLPSXSknTp',
    },
    {
      title: 'Best Sellers',
      sub: 'Top Rated',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpxn6ye_NCjcpTMBkQ3ybeSptMcShDztxEuh1m-9gueXbGngU21uEZSmJ3anGiS4H-NyLKRWn8mr6KZxU_SqK8Zhyn3UIvqHZEJ1jOnKY-Q-pQJDXbb54gVYZxcsPL44R4IqapLaKIXaZbAH-TdmKRWAHm9CHmbR9ezD3P72grfdWEp5Smy-9D-x-ba0w7j_x3O6f8dXYzRvnfu_cE8yWgrEq252ZUXFIrUwC1R7ojwD7kxR_WYmc',
    },
  ];

  const ugcPosts = [
    {
      user: '@tanya.malhotra',
      outfit: 'Trisha 3.0 Corset',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9XH57H420e85zydFhgNXEXgpK2HMsw1YZhXMALmY2h79Ed-_dbCSBgsGtGn4szT_GHftN7Hux9_JvYYbfmvNde93dTG7cLz_doGiZEbsPxihaSYk7VoWtsmSFR3EUZ04NY-Tj6wbQWfsXWV2yPtW_MDNb9KfNYxx2SR8cH_xfDFDaPnja68QzvpJ8Skr2xy3Y4EHY9iQawB6royFV0EaYSPBXlBGm8SveFawiwgxDkhwqB4CNX7Wu',
    },
    {
      user: '@rohit_and_priya',
      outfit: 'Duo Bandhan Couple Set',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZyH2IvrC2eGHJqigWA90p_-5XTdlLXU-3HO8xVwvQ_NolAOSoTKVbL6piOnb-KjtRb9DAMawOndVv7zLkKlX72mk8CqBG-EfCmsYZIwjave9LMfGYT6aJCSVvTt-ZJhdwtALWRu0yW5oRXVw-nOlzEgW6ZAIyeLevj6-hjjmabthekKUCTb9anIZ6VdLh9scgCyYCzPmGLvk3_lQF7MBEC5DbJJhAbv3XqTJVzhOheHmOa5jXHiI',
    },
    {
      user: '@avani_reads',
      outfit: 'Nyra Floral Dabu',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1HfpGDfpA8lNx9-n3tt3IvcAcNtCkQUv7TPCGnNnZOEh6iwOqlAKymEHMmaeZRnOUIZ3OroworNbZfg6sLigXegGUg6ylOH7DXgwxUksSarxyore_qECwlB0BuxCppF1jjozLuLTvK7hWU5tVu5iG4rS1AnQVeobGpEK9wGc12Wr7GGyhBEB3Pd-alnVsJbkrO5OAOr3GG7XpKr_8-nq1c06dmgXJfJM_wiMTL_87FBVkaynyyrHb',
    },
    {
      user: '@delhi_closet',
      outfit: 'Koyal Cotton Co-ord',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfCOCPl6DcriiGKvKwD1CdtSAJQfrLTvaaySHBK31nLNku7SzlkVfPmRGNXcBhZauqkd5ChQEeHJL0GAAJDeqrIqQF_FX5GWnnJ6iu5XBL_PsRuhrmsZeqAZlXZumrGhwcDH3BbsKADAf9Gh8cJ1dQMeEEnhxdWD2fm7YOZlukbUkMUSO8w5bhxh_eKnpx0eHpBJMO1_b7sVSDdaOxEb5lxt-k1fyeJobe9pEX9EdVb2QRuKFLCBb',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#fff8f6]">
      {/* 1. EDITORIAL HERO BLOCK */}
      <section className="px-4 lg:px-10 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Story (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fbe3dc] text-[#98462a] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#98462a]"></span>
              <span>SS/26 Natural Cottons Drop</span>
              <span className="text-[#504441]/50">•</span>
              <span className="text-[#504441]">Plate 01 // Muse</span>
            </div>

            <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black text-[#2f150f] tracking-tight leading-[1.08] mb-4">
              Everyday ethnic.<br />
              <span className="text-[#98462a] italic font-serif font-normal">Main-character</span> energy.
            </h1>

            <p className="text-base text-[#504441] leading-relaxed max-w-xl mb-6">
              Thoughtfully crafted cotton kurtis, breezy co-ord sets, and effortless twinning silhouettes made for your daily rhythm—from morning commute chai to sunset celebrations.
            </p>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('collection')}
                className="h-12 px-6 rounded-full bg-[#2f150f] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#98462a] shadow-md transition-all active:scale-95"
              >
                <span>Shop New Drops</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => onNavigate('campaign')}
                className="h-12 px-6 rounded-full bg-[#ffffff] text-[#2f150f] border border-[#ebdcca] font-semibold text-sm hover:bg-[#ffe9e3] transition-colors"
              >
                Explore Lookbook
              </button>
            </div>

            {/* Micro-metrics Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#ebe0dc] w-full max-w-lg">
              <div>
                <div className="text-2xl font-bold text-[#98462a]">100%</div>
                <div className="text-xs text-[#504441]">Pure Indian Cottons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2f150f]">4.9/5</div>
                <div className="text-xs text-[#504441]">42k+ Happy Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#98462a]">48hr</div>
                <div className="text-xs text-[#504441]">Express Dispatch</div>
              </div>
            </div>
          </div>

          {/* Right Visual Canvas (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-[#ffe9e3]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq1hGYEd8gBJCJDxCL2wMglb4Ru9sVLAgLQB5gttd2jRDVy9y_HWLpfTcf0Ln5cmuX0nSp98innsbCwlIZsJ53URg-hNQVNBewpd_eYfrb2IT2tvSw6M11WfC6N9CCwTQWiGQBXF1Dvpdl-S0Y6Da2X_oi4lRcWguEM_bzPeE60-icpbX5iTDr9y6m1s_1vaxoA4bN7tPosH2F5e1b0sEMLJei_dDN_aAiXB3FszSBz0JYwA1HcvDY"
                alt="Editorial lookbook photograph"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Pill Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-semibold text-[#2f150f]">
                <span className="w-2 h-2 rounded-full bg-[#98462a] animate-pulse"></span>
                <span>SS/26 Pure Breathable Cotton</span>
              </div>

              {/* Bottom Card */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-xs text-[#504441]">Featured Silhouette</div>
                  <div className="text-sm font-bold text-[#2f150f]">Trisha Corset Kurti in Rust Earth</div>
                </div>
                <span className="text-lg font-bold text-[#98462a]">₹799</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS ("FIND YOUR FIT") */}
      <section className="px-4 lg:px-10 py-10 bg-[#fff1ed]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#98462a]">
                Curated Collections
              </span>
              <h2 className="font-syne text-3xl font-extrabold text-[#2f150f] mt-1">
                Find Your Fit
              </h2>
            </div>
            <button
              onClick={() => onNavigate('collection')}
              className="text-xs font-bold text-[#98462a] flex items-center gap-1 hover:underline mt-2 sm:mt-0"
            >
              <span>Explore All Silhouettes</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {curatedCategories.map((cat, index) => (
              <div
                key={index}
                onClick={() => onNavigate('collection')}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#ffe9e3]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#2f150f] group-hover:text-[#98462a] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-[#504441]">{cat.sub}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#fff1ed] group-hover:bg-[#98462a] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[16px]">north_east</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS — 4-COLUMN RESPONSIVE GRID */}
      <section className="px-4 lg:px-10 py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fbe3dc] text-[#98462a] text-[11px] font-bold uppercase tracking-wider">
              Fresh Off Atelier
            </span>
            <h2 className="font-syne text-3xl font-extrabold text-[#2f150f] mt-1.5">
              New Arrivals
            </h2>
            <p className="text-xs text-[#504441] mt-0.5">Breezy silhouettes made for tropical ease</p>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="text-xs font-bold text-[#98462a] flex items-center gap-1 hover:underline mt-2 sm:mt-0"
          >
            <span>View All (24)</span>
            <span className="material-symbols-outlined text-[16px]">east</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl bg-white p-3 shadow-sm hover:shadow-xl transition-all border border-[#ebe0dc]"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#fff1ed]">
                  {product.discountBadge && (
                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#98462a] text-white text-[11px] font-bold shadow-xs">
                      {product.discountBadge}
                    </span>
                  )}

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#2f150f] hover:text-[#98462a] transition-transform active:scale-90"
                    aria-label="Wishlist"
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

                <div className="p-2 flex flex-col flex-1 justify-between mt-1">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#8a5a00] mb-0.5">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      <span className="font-bold text-[#2f150f]">{product.rating}</span>
                      <span className="text-[#504441]">({product.reviewsCount})</span>
                    </div>

                    <h3
                      onClick={() => onOpenQuickView(product)}
                      className="font-bold text-sm text-[#2f150f] line-clamp-1 group-hover:text-[#98462a] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#504441] truncate">{product.subtitle}</p>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-bold text-[#98462a]">₹{product.price}</span>
                      <span className="text-xs text-[#837471] line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-[#504441] mb-2">
                      <span>Sizes:</span>
                      <div className="flex items-center gap-1 font-semibold">
                        {product.sizes.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded bg-[#fff1ed]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="w-full h-10 rounded-full bg-[#2f150f] text-white hover:bg-[#98462a] font-semibold text-xs flex items-center justify-center gap-1 transition-colors active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Choose Options</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TRUST & CRAFT PILLARS */}
      <section className="px-4 lg:px-10 py-8 bg-[#fbe3dc]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ffe9e3] text-[#98462a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">eco</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#2f150f]">100% Pure Cotton</h4>
              <p className="text-[11px] text-[#504441] mt-0.5">Breathable weaves crafted for warm climates</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ffe9e3] text-[#98462a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">published_with_changes</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#2f150f]">7-Day Exchanges</h4>
              <p className="text-[11px] text-[#504441] mt-0.5">Doorstep reverse pickup &amp; size swap</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ffe9e3] text-[#98462a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">fingerprint</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#2f150f]">Artisanal Prints</h4>
              <p className="text-[11px] text-[#504441] mt-0.5">Authentic Jaipur &amp; Bagru handcraft motifs</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ffe9e3] text-[#98462a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#2f150f]">48hr Dispatch</h4>
              <p className="text-[11px] text-[#504441] mt-0.5">Express insured pan-India delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECONDARY EDITORIAL BANNER — "THE TWINNING EDIT" */}
      <section className="px-4 lg:px-10 py-10 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#482922] shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col items-start z-10">
              <span className="px-3 py-1 rounded-full bg-[#98462a] text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                Limited Festive Edition
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
                The Twinning Edit:<br />
                Double the Vibe
              </h2>
              <p className="text-sm text-[#ffdad3] leading-relaxed mb-6 max-w-md">
                Matching couple sets crafted from rich festive cottons. Celebrate intimate ceremonies and celebrations together starting at just ₹1,299 per pair.
              </p>
              <button
                onClick={() => onNavigate('collection')}
                className="h-11 px-6 rounded-full bg-[#ff9876] text-[#390c00] font-bold text-sm hover:bg-white transition-colors flex items-center gap-2 active:scale-95"
              >
                <span>Shop Duo Collection</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            <div className="lg:col-span-6 h-64 sm:h-96 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzc68AKnZ_TKt2jkv7BrZmaQb_RIoRv1iyZDloGjnBGUCCFajmKOuNrMUZbmoQi48ZfPumULIjvnYUl9xnK8nXsnMJj6PEau6Nt0MzFwIbW0qLfMtUrvzvOSp0AuXiFFSS13HSbUf2-1dgTwJ3deomP6VsBwZYkLZPkZhBd8MJUPBaQp8rISCCs8hKnDiiW71pcQ_h-05WtUJR-x4YPuC0u0c-ulobFM-EW81S-tEc_Ku1ch4cXCbP"
                alt="Twinning couple sets"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#482922] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="px-4 lg:px-10 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fbe3dc] text-[#98462a] text-[11px] font-bold uppercase tracking-wider">
              Customer Favorites
            </span>
            <h2 className="font-syne text-3xl font-extrabold text-[#2f150f] mt-1.5">
              Most-Loved Silhouettes
            </h2>
            <p className="text-xs text-[#504441] mt-0.5">Over 10,000+ orders across India</p>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="text-xs font-bold text-[#98462a] flex items-center gap-1 hover:underline mt-2 sm:mt-0"
          >
            <span>See All Best Sellers</span>
            <span className="material-symbols-outlined text-[16px]">east</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl bg-white p-3 shadow-sm hover:shadow-xl transition-all border border-[#ebe0dc]"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#fff1ed]">
                  {product.discountBadge && (
                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#98462a] text-white text-[11px] font-bold shadow-xs">
                      {product.discountBadge}
                    </span>
                  )}

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#2f150f] hover:text-[#98462a] transition-transform active:scale-90"
                    aria-label="Wishlist"
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

                <div className="p-2 flex flex-col flex-1 justify-between mt-1">
                  <div>
                    <h3
                      onClick={() => onOpenQuickView(product)}
                      className="font-bold text-sm text-[#2f150f] line-clamp-1 group-hover:text-[#98462a] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#504441] truncate">{product.fabric}</p>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-bold text-[#98462a]">₹{product.price}</span>
                      <span className="text-xs text-[#837471] line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="mt-3 w-full h-10 rounded-full bg-[#2f150f] text-white hover:bg-[#98462a] font-semibold text-xs flex items-center justify-center gap-1 transition-colors active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                    <span>Choose Options</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. SEEN ON YOU — INSTAGRAM LOOKBOOK CAROUSEL */}
      <section className="px-4 lg:px-10 py-10 bg-[#fff1ed]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#2f150f]">
                Seen On You
              </h2>
              <p className="text-xs text-[#98462a] font-semibold">
                #SlayInSlayvana • Tag us to get featured
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2f150f] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-3">
            {ugcPosts.map((post, index) => (
              <div
                key={index}
                className="w-48 shrink-0 flex flex-col bg-white rounded-2xl p-2.5 shadow-sm border border-[#ebe0dc]"
              >
                <div className="w-full h-60 rounded-xl overflow-hidden relative">
                  <img src={post.img} alt={post.user} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-full text-white text-[10px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">shopping_bag</span>
                    <span>Tap to shop</span>
                  </span>
                </div>
                <p className="text-xs font-bold text-[#2f150f] mt-2 truncate">{post.user}</p>
                <span className="text-[11px] text-[#504441] truncate">wearing {post.outfit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ATELIER VIP ACCESS & EMAIL CAPTURE */}
      <section className="px-4 lg:px-10 py-10 max-w-7xl mx-auto w-full">
        <div className="bg-[#fbe3dc] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="px-3 py-1 rounded-full bg-white text-[#98462a] text-[11px] font-bold uppercase tracking-wider">
              Atelier VIP Access
            </span>
            <h3 className="font-syne text-2xl sm:text-3xl font-black text-[#2f150f] mt-2">
              Get ₹200 off your first order
            </h3>
            <p className="text-xs text-[#504441] mt-1 leading-relaxed">
              Join 25,000+ women receiving weekly curated drops, private archive sales, and styling tips.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowPromoSuccess(true);
            }}
            className="w-full max-w-md flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 h-12 px-4 rounded-full bg-white text-[#2f150f] placeholder:text-[#837471] text-sm focus:outline-none focus:ring-2 focus:ring-[#98462a] shadow-xs"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-[#2f150f] text-white font-bold text-sm hover:bg-[#98462a] transition-colors shrink-0 active:scale-95 shadow-md"
              >
                Join Club
              </button>
            </div>
            {showPromoSuccess && (
              <p className="text-xs text-[#1e6b3a] font-semibold flex items-center gap-1 pl-2">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Welcome to the Atelier! Use code WELCOME200 at checkout.</span>
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
