import React from 'react';
import { CartItem } from '../types';
import { ScreenId } from './PrototypeBar';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const festiveDiscount = items.length >= 2 ? 300 : 0;
  const estimatedTotal = Math.max(0, subtotal - festiveDiscount);
  const freeShippingThreshold = 999;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#ebe0dc]">
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-[#ebe0dc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-syne text-xl font-bold text-[#2f150f]" id="slide-over-title">
                Shopping Bag
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffe9e3] text-[#98462a] text-xs font-bold">
                ({totalItemCount} items)
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#504441] hover:bg-[#ffe9e3] transition-colors"
              aria-label="Close bag drawer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Ribbon */}
          <div className="bg-[#fff1ed] px-5 py-3 border-b border-[#ebe0dc]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#2f150f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#98462a]">local_shipping</span>
                {neededForFreeShipping > 0 ? (
                  <>
                    Add <strong className="text-[#98462a]">₹{neededForFreeShipping}</strong> more for Free Shipping
                  </>
                ) : (
                  <span className="text-[#1e6b3a]">🎉 You unlocked Complimentary Express Shipping!</span>
                )}
              </span>
              <span className="text-[11px] text-[#504441]">Threshold: ₹{freeShippingThreshold}</span>
            </div>

            {/* Progress bar line */}
            <div className="w-full h-2 rounded-full bg-[#ebe0dc] overflow-hidden">
              <div
                className="h-full bg-[#98462a] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#504441] mt-1">
              <span>₹{subtotal} spent</span>
              <span>Qualifies Pan-India</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center my-auto text-center py-10">
                <span className="material-symbols-outlined text-[48px] text-[#837471] mb-2">
                  shopping_bag
                </span>
                <p className="font-syne text-lg font-bold text-[#2f150f]">Your bag is currently empty</p>
                <p className="text-xs text-[#504441] mt-1 mb-4">
                  Discover our pure breathable cotton kurtis crafted for balmy days.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('collection');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#2f150f] text-white font-bold text-xs hover:bg-[#98462a]"
                >
                  Explore Kurtis
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-[#ebe0dc] last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#fff1ed] shrink-0 border border-[#ebe0dc]">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-xs text-[#2f150f] line-clamp-1">{item.name}</h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#837471] hover:text-[#b3261e] p-0.5"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#504441] mt-0.5">
                        <span>Size: <strong className="text-[#2f150f]">{item.size}</strong></span>
                        {item.color && (
                          <>
                            <span>•</span>
                            <span className="truncate">{item.color}</span>
                          </>
                        )}
                      </div>

                      {item.appliedDiscountNote && (
                        <span className="inline-block text-[10px] text-[#1e6b3a] font-semibold mt-0.5">
                          {item.appliedDiscountNote}
                        </span>
                      )}
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-[#ebe0dc] rounded-full bg-[#fff8f6] h-7 px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-[#2f150f] hover:bg-[#ffe9e3] rounded-full text-xs font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2f150f] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#2f150f] hover:bg-[#ffe9e3] rounded-full text-xs font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#98462a]">
                          ₹{item.price * item.quantity}
                        </span>
                        <span className="text-[11px] text-[#837471] line-through">
                          ₹{item.originalPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#ebe0dc] bg-[#fff8f6] flex flex-col gap-3">
              <div className="flex flex-col gap-1.5 text-xs text-[#504441]">
                <div className="flex items-center justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-[#2f150f]">₹{subtotal}</span>
                </div>

                {festiveDiscount > 0 && (
                  <div className="flex items-center justify-between text-[#1e6b3a] font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">local_offer</span>
                      <span>Festive Kurti Edit (Buy 2+ Offer)</span>
                    </span>
                    <span>-₹{festiveDiscount}.00</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between pt-2 border-t border-[#ebe0dc]">
                  <span className="font-syne text-base font-bold text-[#2f150f]">Estimated Total</span>
                  <span className="font-syne text-xl font-black text-[#98462a]">₹{estimatedTotal}</span>
                </div>
                <p className="text-[10px] text-[#837471] text-center mt-0.5">
                  Taxes &amp; pan-India courier calculated at checkout. Never any hidden fees.
                </p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => {
                  onClose();
                  onNavigate('checkout');
                }}
                className="w-full h-12 rounded-full bg-[#98462a] text-white hover:bg-[#2f150f] font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md active:scale-98"
              >
                <span>Proceed to Checkout • ₹{estimatedTotal}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('bag');
                }}
                className="text-center text-xs text-[#98462a] hover:underline font-semibold"
              >
                View Full Bag Page →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
