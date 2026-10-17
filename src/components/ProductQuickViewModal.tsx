import React, { useState } from 'react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onShowToast?: (message: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onShowToast = () => {},
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [deliveryEta, setDeliveryEta] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length === 6) {
      setDeliveryEta('Express Air Courier: Delivery in 2-3 business days (Free Shipping)');
    } else {
      setDeliveryEta('Please enter a valid 6-digit PIN code.');
    }
  };

  const handleAdd = () => {
    setIsAdded(true);
    onAddToCart(product, selectedSize, quantity);
    onShowToast(`Added ${quantity}x ${product.name} (${selectedSize}) to your bag.`);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fff8f6] border border-[#ebdcd8] rounded-sm max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-[#251915] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-[#251915] transition-colors z-10"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Column */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] bg-[#fdeee9] rounded-sm overflow-hidden border border-[#ebdcd8]">
              <img
                src={product.imageUrl}
                alt={product.imageAlt}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              {product.discountBadge && (
                <span className="absolute top-3 left-3 bg-[#ff602a] text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                  {product.discountBadge}
                </span>
              )}
              {product.highlightBadge && (
                <span className="absolute top-3 right-3 bg-[#251915] text-[#fff8f6] font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                  {product.highlightBadge}
                </span>
              )}
            </div>
            <div className="p-3 bg-[#fdeee9] rounded-sm text-xs text-[#8f7166] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#ff602a]">verified</span>
              <span>100% Handloom Cotton • Jaipur Hand-Block • Pre-Shrunk</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8f7166] font-mono uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span>•</span>
                <span className="text-[#8a3300] font-bold">SKU: {product.sku}</span>
              </div>
              <h2 className="font-syne text-2xl font-bold text-[#251915] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#8f7166] mt-1">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#ff602a]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">
                      star
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-[#251915]">{product.rating}</span>
                <span className="text-xs text-[#8f7166]">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-mono text-2xl font-bold text-[#251915]">₹{product.price}</span>
                <span className="font-mono text-sm text-[#8f7166] line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ₹{product.originalPrice - product.price} (Inclusive of all taxes)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#584139] leading-relaxed border-t border-b border-[#ebdcd8] py-3">
              {product.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#251915]">
                  Select Size
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-[#ff602a] font-mono underline hover:text-[#8a3300]"
                >
                  Size Chart Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-mono font-bold rounded-sm border transition-all ${
                      selectedSize === s
                        ? 'border-[#ff602a] bg-[#ff602a] text-white shadow-sm'
                        : 'border-[#ebdcd8] bg-white text-[#251915] hover:border-[#251915]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Size guide popup */}
              {showSizeGuide && (
                <div className="mt-3 p-3 bg-[#fdeee9] border border-[#ebdcd8] rounded-sm text-xs animate-in fade-in">
                  <p className="font-bold text-[#251915] mb-1 font-mono uppercase text-[11px]">
                    Garment Measurements (Inches)
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-[11px] font-mono text-stone-600">
                    <div>
                      <strong>Size</strong>: XS/S/M/L/XL
                    </div>
                    <div>
                      <strong>Bust</strong>: 34/36/38/40/42
                    </div>
                    <div>
                      <strong>Waist</strong>: 28/30/32/34/36
                    </div>
                    <div>
                      <strong>Length</strong>: 44" all
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-[#ebdcd8] rounded-sm bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs hover:bg-[#fdeee9]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs hover:bg-[#fdeee9]"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isAdded}
                className="flex-1 py-3 bg-[#ff602a] hover:bg-[#8a3300] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <span className="material-symbols-outlined text-base">check</span>
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    Add to Bag • ₹{product.price * quantity}
                  </>
                )}
              </button>
            </div>

            {/* Pincode Estimator */}
            <div className="pt-3 border-t border-[#ebdcd8]">
              <form onSubmit={handleCheckPin} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Check delivery PIN code (e.g. 560038)"
                  className="flex-1 px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm bg-white font-mono focus:outline-[#ff602a]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-[#251915] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#251915] hover:text-white transition-colors rounded-sm"
                >
                  Verify
                </button>
              </form>
              {deliveryEta && (
                <p className="text-[11px] font-mono text-emerald-700 mt-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  {deliveryEta}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
