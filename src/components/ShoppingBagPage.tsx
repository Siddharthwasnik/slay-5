import React, { useState } from 'react';
import { CartItem } from '../types';
import { ScreenId } from './PrototypeBar';

interface ShoppingBagPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ShoppingBagPage: React.FC<ShoppingBagPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onNavigate,
}) => {
  const [promoCode, setPromoCode] = useState('FESTIVE300');
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoAccordionOpen, setPromoAccordionOpen] = useState(true);
  const [simulatorState, setSimulatorState] = useState<string>('default');

  // Total Calculations
  const totalUnits = items.reduce((acc, it) => acc + it.quantity, 0);
  const bagSubtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const festiveDiscount = items.length >= 2 ? 600 : 0;
  const promoDiscount = promoApplied ? 300 : 0;
  const totalSavings = (items.length >= 2 ? 800 : 0) + (promoApplied ? 600 : 0);
  const estimatedTax = (bagSubtotal * 0.12).toFixed(2);
  const finalPayable = Math.max(0, bagSubtotal - festiveDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FESTIVE300' || promoCode.trim().toUpperCase() === 'SLAY200') {
      setPromoApplied(true);
    } else {
      alert('Invalid coupon code. Try FESTIVE300 or SLAY200.');
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fff8f6]">
      {/* Interactive State Simulator Bar */}
      <aside
        aria-label="Interactive State Simulator"
        className="w-full bg-[#1d1c13] px-4 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-3 shadow-md text-xs text-white"
      >
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#ffdad3]">
          <span className="material-symbols-outlined text-[16px] text-[#ff9876]">tune</span>
          <span>Interactive State Simulator:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'default', label: 'Default (3 Items)' },
            { id: 'empty', label: 'Empty Bag' },
            { id: 'max-limit', label: 'Max Limit (5x)' },
            { id: 'sold-out', label: 'Sold Out Alert' },
            { id: 'price-updated', label: 'Price Updated' },
            { id: 'network-error', label: 'Network Error' },
            { id: 'lock', label: 'Lock / Updating' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSimulatorState(st.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                simulatorState === st.id
                  ? 'bg-[#ff9876] text-[#390c00] shadow-sm'
                  : 'bg-[#333127] text-white hover:bg-[#504441]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Bag Page Content */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-6 flex flex-col gap-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[#504441]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#98462a]">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#837471]">chevron_right</span>
          <span className="font-bold text-[#251915]">Shopping Bag</span>
        </nav>

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#98462a]">
              Artisanal Bagru &amp; Handcrafted Pret
            </span>
            <h1 className="font-syne text-3xl font-extrabold text-[#2f150f] mt-0.5">
              Your Shopping Bag ({items.length} Items)
            </h1>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#ffe9e3] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#98462a] border border-[#ebdcca] w-fit">
            <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
            <span>Items reserved for 14:55</span>
          </div>
        </div>

        {/* Express Shipping Unlocked Progress Banner */}
        <div className="bg-[#fff1ed] p-4 rounded-2xl border border-[#ebe0dc] flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#2f150f] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#1e6b3a]">local_shipping</span>
              <span>Express Shipping Unlocked!</span>
            </span>
            <span className="text-[#1e6b3a] font-bold">100% Qualified</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#ebe0dc] overflow-hidden">
            <div className="h-full bg-[#1e6b3a] w-full" />
          </div>
          <p className="text-[11px] text-[#504441]">
            Congratulations! You've qualified for complimentary artisan courier packing &amp; doorstep dispatch across India on orders above ₹999.
          </p>
        </div>

        {/* Alert States for Simulator */}
        {simulatorState === 'sold-out' && (
          <div className="bg-[#ffdad6] text-[#93000a] p-3.5 rounded-2xl flex items-center gap-2 text-xs font-semibold">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            <span>Attention: One of your selected pieces has limited stock. We recommend completing order now.</span>
          </div>
        )}

        {simulatorState === 'network-error' && (
          <div className="bg-[#ffdad6] text-[#93000a] p-3.5 rounded-2xl flex items-center justify-between gap-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">wifi_off</span>
              <span>Inventory synchronization paused. Working with cached cart pricing.</span>
            </div>
            <button
              onClick={() => setSimulatorState('default')}
              className="px-3 py-1 rounded-full bg-white text-[#93000a] font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* 2-Column Bag Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Bag Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {simulatorState === 'empty' || items.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#ebe0dc] flex flex-col items-center">
                <span className="material-symbols-outlined text-[48px] text-[#837471] mb-2">shopping_bag</span>
                <h3 className="font-syne text-xl font-bold text-[#2f150f]">Your shopping bag is empty</h3>
                <p className="text-xs text-[#504441] mt-1 mb-6 max-w-sm">
                  Explore our handcrafted breathable cotton collection and find your main-character ethnic energy.
                </p>
                <button
                  onClick={() => onNavigate('collection')}
                  className="px-6 py-3 rounded-full bg-[#2f150f] text-white font-bold text-xs hover:bg-[#98462a]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#ebe0dc] flex flex-col sm:flex-row gap-4 justify-between"
                >
                  <div className="flex gap-4">
                    {/* Media Thumbnail */}
                    <div className="relative w-24 sm:w-28 h-32 sm:h-36 rounded-xl overflow-hidden bg-[#fff1ed] shrink-0 border border-[#ebe0dc]">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      {item.id === 'cart-item-1' && (
                        <span className="absolute top-1.5 left-1.5 bg-[#98462a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          14% OFF
                        </span>
                      )}
                      {item.id === 'cart-item-2' && (
                        <span className="absolute top-1.5 left-1.5 bg-[#98462a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          33% OFF
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h2 className="font-bold text-sm text-[#2f150f] leading-snug">{item.name}</h2>
                        <div className="text-xs text-[#504441] mt-1 flex flex-col gap-0.5">
                          <span>
                            Color: <strong className="text-[#251915]">{item.color || 'Onyx Block'}</strong> • Size:{' '}
                            <strong className="text-[#251915]">{item.size}</strong>
                          </span>
                          <span className="text-[11px] text-[#837471]">
                            SKU: {item.sku} | {item.fabricBadge}
                          </span>
                        </div>

                        {item.id === 'cart-item-3' && (
                          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8a5a00] bg-[#ffe9e3] px-2 py-0.5 rounded-full mt-1.5">
                            <span className="material-symbols-outlined text-[13px]">warning</span>
                            <span>Low Stock: 2 units remaining</span>
                          </div>
                        )}
                      </div>

                      {/* Stepper & Actions */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#504441]">Qty:</span>
                          <div className="inline-flex items-center border border-[#ebe0dc] rounded-full bg-[#fff8f6] h-8 px-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center text-[#2f150f] hover:bg-[#ffe9e3] rounded-full font-bold text-xs"
                              aria-label="Decrease"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-[#2f150f]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#2f150f] hover:bg-[#ffe9e3] rounded-full font-bold text-xs"
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => alert(`Saved ${item.name} for later.`)}
                          className="text-xs text-[#504441] hover:text-[#98462a] flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">bookmark</span>
                          <span className="hidden sm:inline">Save for Later</span>
                        </button>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-[#504441] hover:text-[#b3261e] flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="flex sm:flex-col sm:items-end justify-between items-baseline pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ebe0dc]">
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#98462a]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-xs text-[#837471] line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                    {item.appliedDiscountNote && (
                      <span className="text-[11px] text-[#1e6b3a] font-semibold sm:mt-1">
                        {item.appliedDiscountNote}
                      </span>
                    )}
                  </div>
                </article>
              ))
            )}

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigate('collection')}
                className="text-xs font-bold text-[#2f150f] hover:text-[#98462a] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Continue Shopping</span>
              </button>

              {items.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-[#837471] hover:text-[#b3261e] underline"
                >
                  Clear All Items
                </button>
              )}
            </div>

            {/* Slayvana Craft Promise Banner */}
            <div className="mt-4 bg-[#fff1ed] p-5 rounded-3xl border border-[#ebe0dc] flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#98462a]">
                The Slayvana Craft Promise
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#98462a] text-[20px]">eco</span>
                  <div>
                    <h4 className="font-bold text-xs text-[#2f150f]">100% Pure Indian Cotton</h4>
                    <p className="text-[11px] text-[#504441]">Breathable handloom weaves crafted by generational artisans.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#98462a] text-[20px]">verified</span>
                  <div>
                    <h4 className="font-bold text-xs text-[#2f150f]">7-Day Doorstep Swaps</h4>
                    <p className="text-[11px] text-[#504441]">Hassle-free reverse pick-up and instant exchange across 18,000 pin codes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#98462a] text-[20px]">palette</span>
                  <div>
                    <h4 className="font-bold text-xs text-[#2f150f]">Direct Jaipur Bagru</h4>
                    <p className="text-[11px] text-[#504441]">Authentic vegetable block-printing straight from Bagru &amp; Sanganer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Order Summary */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ebe0dc] flex flex-col gap-4">
              <div className="flex items-baseline justify-between border-b border-[#ebe0dc] pb-3">
                <h3 className="font-syne text-xl font-bold text-[#2f150f]">Order Summary</h3>
                <span className="text-xs text-[#837471] font-medium">Pret &amp; Couture</span>
              </div>

              <div className="flex flex-col gap-2 text-xs text-[#504441]">
                <div className="flex items-center justify-between">
                  <span>Bag Subtotal ({totalUnits} units)</span>
                  <span className="font-bold text-[#251915]">₹{bagSubtotal.toLocaleString()}</span>
                </div>

                {festiveDiscount > 0 && (
                  <div className="flex items-center justify-between text-[#1e6b3a] font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">loyalty</span>
                      <span>Festive Offer (Buy 2+ Kurtis)</span>
                    </span>
                    <span>-₹{festiveDiscount}.00</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#1e6b3a] uppercase">FREE</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>Estimated GST (12%)</span>
                    <span className="material-symbols-outlined text-[13px] text-[#837471]" title="Taxes included">
                      info
                    </span>
                  </span>
                  <span>₹{estimatedTax}</span>
                </div>

                <p className="text-[10px] text-[#837471] text-center bg-[#fff8f6] py-1 rounded-lg">
                  All catalog prices are inclusive of central &amp; state taxes.
                </p>
              </div>

              <div className="pt-2 border-t border-[#ebe0dc]">
                <div className="flex items-baseline justify-between">
                  <span className="font-syne text-lg font-bold text-[#2f150f]">Estimated Total</span>
                  <span className="font-syne text-2xl font-black text-[#98462a]">
                    ₹{finalPayable.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1.5 p-2 rounded-xl bg-[#e8f5e9] text-[#1e6b3a] text-xs font-bold text-center">
                  🎉 Celebration Offer: You saved ₹{totalSavings}.00 today!
                </div>
              </div>

              {/* Promo Code Accordion */}
              <div className="border border-[#ebe0dc] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setPromoAccordionOpen(!promoAccordionOpen)}
                  className="w-full p-3 bg-[#fff8f6] text-xs font-bold text-[#2f150f] flex items-center justify-between text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#98462a]">redeem</span>
                    <span>Have a Promo Code or Gift Card?</span>
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    {promoAccordionOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {promoAccordionOpen && (
                  <div className="p-3 bg-white flex flex-col gap-2">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="e.g. FESTIVE300"
                        className="flex-1 h-9 px-3 rounded-full bg-[#fff8f6] border border-[#ebe0dc] text-xs text-[#2f150f] font-mono uppercase"
                      />
                      <button
                        type="submit"
                        className="h-9 px-4 rounded-full bg-[#fbe3dc] text-[#98462a] hover:bg-[#ffe9e3] text-xs font-bold"
                      >
                        Apply
                      </button>
                    </form>

                    {promoApplied && (
                      <div className="flex items-center justify-between text-[11px] text-[#1e6b3a] bg-[#e8f5e9] px-2.5 py-1 rounded-lg">
                        <span>🏷️ FESTIVE300 APPLIED (-₹300 Multi-buy discount)</span>
                        <button
                          onClick={() => setPromoApplied(false)}
                          className="hover:text-[#b3261e]"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full h-12 rounded-full bg-[#98462a] text-white hover:bg-[#2f150f] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              {/* Trust Badges */}
              <div className="flex flex-col gap-2 pt-2 text-[11px] text-[#504441] border-t border-[#ebe0dc]">
                <div className="flex items-center justify-center gap-1.5 text-center font-bold">
                  <span className="material-symbols-outlined text-[16px] text-[#1e6b3a]">verified_user</span>
                  <span>100% ENCRYPTED &amp; AUTHENTICATED PAYMENT</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#837471] font-semibold">
                  <span className="px-2 py-0.5 bg-[#fff1ed] rounded">UPI</span>
                  <span className="px-2 py-0.5 bg-[#fff1ed] rounded">GPay</span>
                  <span className="px-2 py-0.5 bg-[#fff1ed] rounded">PhonePe</span>
                  <span className="px-2 py-0.5 bg-[#fff1ed] rounded">Cards / NetBanking</span>
                  <span className="px-2 py-0.5 bg-[#fff1ed] rounded">COD</span>
                </div>
              </div>
            </div>

            {/* Concierge Help Callout */}
            <div className="bg-[#fff1ed] p-4 rounded-2xl border border-[#ebe0dc] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#98462a] text-[24px]">support_agent</span>
              <div className="text-xs">
                <span className="font-bold text-[#2f150f] block">Need Sizing or Styling Advice?</span>
                <span className="text-[#504441]">
                  Our Jaipur couture draping concierges are available via WhatsApp 10am–8pm.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
