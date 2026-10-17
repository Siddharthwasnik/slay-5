import React, { useState } from 'react';
import { PrototypeBar, ScreenId } from './components/PrototypeBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CampaignHero } from './components/CampaignHero';
import { HomeStorefront } from './components/HomeStorefront';
import { CollectionPage } from './components/CollectionPage';
import { SearchExperience } from './components/SearchExperience';
import { ShoppingBagPage } from './components/ShoppingBagPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPortal } from './components/AccountPortal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { INITIAL_CART_ITEMS } from './data/products';
import { CartItem, Product } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('campaign');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'trisha-3-0',
    'vani-black',
    'nyra-mustard',
    'mastani-red',
  ]);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [user, setUser] = useState({
    name: 'Ananya Nair',
    email: 'ananya.nair@example.com',
    phone: '+91 98450 19283',
    avatarInitials: 'AN',
    tier: 'Slayvana Gold Circle',
    coins: 450,
    joined: 'November 2024',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from shopping bag.');
  };

  const handleClearAll = () => {
    setCartItems([]);
    showToast('Shopping bag cleared.');
  };

  const handleAddToCart = (product: Product, size: string = 'M', quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}`,
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          imageUrl: product.imageUrl,
          size: size,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: quantity,
          sku: product.sku,
          fabricBadge: product.fabric,
        };
        return [newItem, ...prev];
      }
    });
    setIsCartDrawerOpen(true);
    showToast(`Added ${quantity}x ${product.name} (${size}) to bag.`);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Atelier Wishlist.');
        return [...prev, productId];
      }
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLoginSuccess = (newUser: typeof user) => {
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}! Privileges loaded.`);
  };

  const handleNavigate = (screen: ScreenId) => {
    if (screen === 'auth') {
      setIsAuthModalOpen(true);
    } else {
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#251915] flex flex-col font-sans selection:bg-[#ff602a] selection:text-white">
      {/* Top Prototype State Switcher & Frame Controller */}
      <PrototypeBar
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        cartCount={totalCartCount}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenSearch={() => handleNavigate('search')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main App Container */}
      <div
        className={`flex-1 flex flex-col mx-auto w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[420px] my-6 border-8 border-neutral-900 rounded-[40px] shadow-2xl overflow-hidden bg-[#fff8f6] min-h-[844px]'
            : 'w-full'
        }`}
      >
        {/* Global Header (Hidden on Campaign Hero for full-bleed cinematic focus) */}
        {currentScreen !== 'campaign' && (
          <Header
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            cartCount={totalCartCount}
            wishlistCount={wishlistIds.length}
            onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
            onOpenSearch={() => handleNavigate('search')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* Dynamic Screen Renderer */}
        <main className={`flex-1 ${currentScreen !== 'campaign' ? 'pt-24' : ''}`}>
          {currentScreen === 'campaign' && (
            <CampaignHero
              onNavigate={handleNavigate}
              cartCount={totalCartCount}
              wishlistCount={wishlistIds.length}
              onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
              onOpenSearch={() => handleNavigate('search')}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}

          {currentScreen === 'home' && (
            <HomeStorefront
              onNavigate={handleNavigate}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
          )}

          {currentScreen === 'collection' && (
            <CollectionPage
              onNavigate={handleNavigate}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
          )}

          {currentScreen === 'search' && (
            <SearchExperience
              onNavigate={handleNavigate}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onClose={() => handleNavigate('home')}
            />
          )}

          {currentScreen === 'bag' && (
            <ShoppingBagPage
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearAll={handleClearAll}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutPage
              items={cartItems}
              onNavigate={handleNavigate}
              onClearCart={() => setCartItems([])}
            />
          )}

          {currentScreen === 'account' && (
            <AccountPortal
              onNavigate={handleNavigate}
              onOpenQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
              onShowToast={showToast}
              user={user}
            />
          )}
        </main>

        {/* Global Footer (Visible on multi-page views, not on Campaign Hero) */}
        {currentScreen !== 'campaign' && <Footer onNavigate={handleNavigate} />}
      </div>

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onNavigate={(screen) => {
          setIsCartDrawerOpen(false);
          handleNavigate(screen);
        }}
      />

      {/* Privilege Club Sign-in / OTP Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Product Quick View & Measurement Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, size, qty) => handleAddToCart(prod, size, qty)}
        onShowToast={showToast}
      />

      {/* Floating Micro-Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#251915] text-[#fff8f6] border border-[#ff602a] px-4 py-3 rounded-sm shadow-2xl flex items-center gap-3 text-xs font-mono">
            <span className="material-symbols-outlined text-[#ff602a] text-base">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
