import React, { useState } from 'react';
import { ORDERS, SAVED_ADDRESSES, PRODUCTS } from '../data/products';
import { Order, Address, Product } from '../types';
import { ScreenId } from './PrototypeBar';

interface AccountPortalProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product, size: string) => void;
  onShowToast?: (message: string) => void;
  user?: {
    name: string;
    email: string;
    phone: string;
    avatarInitials: string;
    tier: string;
    coins: number;
    joined: string;
  };
}

type TabType = 'orders' | 'addresses' | 'wishlist' | 'rewards' | 'profile';
type OrderStateSim = 'active_dispatch' | 'empty_orders' | 'multi_orders';

export const AccountPortal: React.FC<AccountPortalProps> = ({
  onNavigate,
  onOpenQuickView,
  onAddToCart,
  onShowToast = () => {},
  user = {
    name: 'Ananya Nair',
    email: 'ananya.nair@example.com',
    phone: '+91 98450 19283',
    avatarInitials: 'AN',
    tier: 'Slayvana Gold Circle',
    coins: 450,
    joined: 'November 2024',
  },
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [orderSimulator, setOrderSimulator] = useState<OrderStateSim>('active_dispatch');
  const [addresses, setAddresses] = useState<Address[]>(SAVED_ADDRESSES);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>(ORDERS[0]);
  const [showLiveMapModal, setShowLiveMapModal] = useState(false);
  
  // Profile form state
  const [profileName, setProfileName] = useState(user.name);
  const [profilePhone, setProfilePhone] = useState(user.phone);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [usualSize, setUsualSize] = useState('Medium (M)');
  const [favFabric, setFavFabric] = useState('Pure Jaipur Handloom Cotton');
  const [heightPref, setHeightPref] = useState('Calf-length (44 inches)');

  // New address form state
  const [newAddrType, setNewAddrType] = useState<'Home' | 'Work / Studio'>('Home');
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrArea, setNewAddrArea] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Bengaluru');
  const [newAddrState, setNewAddrState] = useState('Karnataka');
  const [newAddrPin, setNewAddrPin] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');

  const displayOrders = React.useMemo(() => {
    if (orderSimulator === 'empty_orders') return [];
    if (orderSimulator === 'multi_orders') return ORDERS;
    return [ORDERS[0]]; // active dispatch
  }, [orderSimulator]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Profile preferences updated successfully.');
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrPin) {
      alert('Please fill in street address and PIN code');
      return;
    }
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      type: newAddrType,
      name: newAddrName || profileName,
      street: newAddrStreet,
      area: newAddrArea || 'Near Main Road',
      city: newAddrCity,
      state: newAddrState,
      pinCode: newAddrPin,
      phone: newAddrPhone || profilePhone,
      isDefault: addresses.length === 0,
      hubBadge: 'Bluedart 48h Hub Verified',
    };
    setAddresses([newAddr, ...addresses]);
    setIsAddingAddress(false);
    setNewAddrStreet('');
    setNewAddrPin('');
    onShowToast('New delivery address added.');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    onShowToast('Default shipping address updated.');
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.length <= 1) {
      alert('You must keep at least one saved address.');
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== id));
    onShowToast('Address removed.');
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#251915]">
      {/* State Simulator Bar */}
      <div className="bg-[#251915] text-[#fff8f6] py-2 px-4 border-b border-[#ebdcd8] text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#ff602a]">tune</span>
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold text-[#ff602a]">
              Screen State Simulator
            </span>
            <span className="hidden sm:inline text-white/50">| Customer Account & Dispatch Tracker</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-white/60 text-[11px]">Orders Scenario:</span>
            <button
              onClick={() => {
                setOrderSimulator('active_dispatch');
                setActiveTab('orders');
              }}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-all ${
                orderSimulator === 'active_dispatch'
                  ? 'bg-[#ff602a] text-white font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              1. Active In-Transit
            </button>
            <button
              onClick={() => {
                setOrderSimulator('multi_orders');
                setActiveTab('orders');
              }}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-all ${
                orderSimulator === 'multi_orders'
                  ? 'bg-[#ff602a] text-white font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              2. Full Order History
            </button>
            <button
              onClick={() => {
                setOrderSimulator('empty_orders');
                setActiveTab('orders');
              }}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-all ${
                orderSimulator === 'empty_orders'
                  ? 'bg-[#ff602a] text-white font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              3. Empty State
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-[#8f7166] uppercase tracking-wider">
          <button onClick={() => onNavigate('home')} className="hover:text-[#ff602a]">
            Home
          </button>
          <span>/</span>
          <span className="text-[#251915] font-semibold">My Account & Orders</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Profile Banner */}
        <div className="bg-[#fdeee9] border border-[#ebdcd8] p-6 sm:p-8 rounded-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff602a] text-[#fff8f6] flex items-center justify-center font-syne text-2xl sm:text-3xl font-bold shadow-md ring-4 ring-white">
              {user.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-[#251915]">
                  {profileName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2.5 py-0.5 bg-[#251915] text-[#ff602a] font-bold tracking-wider rounded-full">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-[#8f7166] mt-1">
                {profileEmail} • {profilePhone} • Member since {user.joined}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1 font-semibold text-[#8a3300]">
                  <span className="material-symbols-outlined text-sm text-[#ff602a]">stars</span>
                  {user.coins} Craft Coins (Value: ₹{user.coins})
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[#8f7166]">Free Priority Air Shipping Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 border border-[#251915] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#251915] hover:text-[#fff8f6] transition-colors rounded-sm"
            >
              Edit Atelier Profile
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="p-2 border border-[#ebdcd8] hover:border-[#251915] transition-colors rounded-sm text-[#8f7166] hover:text-[#251915]"
              title="Storefront"
            >
              <span className="material-symbols-outlined text-lg">storefront</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Tabs & Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#fff8f6] border border-[#ebdcd8] p-3 rounded-sm space-y-1 sticky top-24">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#251915] text-[#fff8f6] shadow-sm'
                    : 'text-[#584139] hover:bg-[#fdeee9] hover:text-[#251915]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  Orders & Tracking
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === 'orders' ? 'bg-[#ff602a] text-white' : 'bg-[#ebdcd8] text-[#584139]'
                  }`}
                >
                  {displayOrders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-[#251915] text-[#fff8f6] shadow-sm'
                    : 'text-[#584139] hover:bg-[#fdeee9] hover:text-[#251915]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base">home_pin</span>
                  Saved Addresses
                </span>
                <span className="text-[10px] text-stone-400">({addresses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm transition-all ${
                  activeTab === 'wishlist'
                    ? 'bg-[#251915] text-[#fff8f6] shadow-sm'
                    : 'text-[#584139] hover:bg-[#fdeee9] hover:text-[#251915]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base">favorite</span>
                  Wishlist & Bookmarks
                </span>
                <span className="text-[10px] text-stone-400">4</span>
              </button>

              <button
                onClick={() => setActiveTab('rewards')}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm transition-all ${
                  activeTab === 'rewards'
                    ? 'bg-[#251915] text-[#fff8f6] shadow-sm'
                    : 'text-[#584139] hover:bg-[#fdeee9] hover:text-[#251915]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base">loyalty</span>
                  Craft Rewards
                </span>
                <span className="text-[10px] text-[#ff602a] font-bold">₹{user.coins}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#251915] text-[#fff8f6] shadow-sm'
                    : 'text-[#584139] hover:bg-[#fdeee9] hover:text-[#251915]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base">tune</span>
                  Fit & Sizing Preferences
                </span>
              </button>

              <div className="pt-4 mt-4 border-t border-[#ebdcd8]">
                <div className="p-3 bg-[#fdeee9] rounded-sm text-[11px] text-[#584139]">
                  <p className="font-bold flex items-center gap-1.5 text-[#251915]">
                    <span className="material-symbols-outlined text-sm text-[#ff602a]">support_agent</span>
                    Atelier Concierge
                  </p>
                  <p className="mt-1 text-[#8f7166]">
                    Direct WhatsApp styling assistance & bespoke fitting inquiries:
                  </p>
                  <p className="font-mono text-[#ff602a] font-bold mt-1.5">+91 91024 88200</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* TAB 1: ORDERS & TRACKING */}
            {activeTab === 'orders' && (
              <div>
                {displayOrders.length === 0 ? (
                  <div className="bg-[#fff8f6] border border-[#ebdcd8] p-12 text-center rounded-sm">
                    <span className="material-symbols-outlined text-5xl text-[#8f7166]/60 mb-3">
                      inventory_2
                    </span>
                    <h3 className="font-syne text-xl font-bold text-[#251915]">No Active Orders</h3>
                    <p className="text-xs text-[#8f7166] max-w-md mx-auto mt-2 leading-relaxed">
                      You do not have any pending dispatches at this moment. Explore our latest handloom cotton drops, corset kurtis, and curated festive sets.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        onClick={() => onNavigate('collection')}
                        className="px-6 py-3 bg-[#ff602a] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#8a3300] transition-colors rounded-sm shadow-sm"
                      >
                        Explore Printed Kurtis
                      </button>
                      <button
                        onClick={() => setOrderSimulator('active_dispatch')}
                        className="px-4 py-3 border border-[#251915] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#251915] hover:text-white transition-colors rounded-sm"
                      >
                        Simulate Active Order
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {displayOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-[#fff8f6] border border-[#ebdcd8] rounded-sm overflow-hidden shadow-sm"
                      >
                        {/* Order Header bar */}
                        <div className="bg-[#fdeee9] border-b border-[#ebdcd8] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-syne text-lg font-bold text-[#251915]">
                                Order {order.orderNumber}
                              </span>
                              <span
                                className={`text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                                  order.status === 'In Transit'
                                    ? 'bg-[#ff602a] text-white animate-pulse'
                                    : 'bg-[#251915] text-[#fff8f6]'
                                }`}
                              >
                                {order.statusBadge}
                              </span>
                            </div>
                            <p className="text-xs text-[#8f7166] mt-1">
                              Placed on {order.placedDate} • Paid via {order.paymentMethod} • Total: ₹
                              {order.totalAmount}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onShowToast(`Invoice for ${order.orderNumber} downloaded.`)}
                              className="px-3 py-1.5 border border-[#ebdcd8] bg-white text-xs font-mono uppercase tracking-wider hover:border-[#251915] rounded-sm flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-sm">download</span>
                              Invoice PDF
                            </button>
                            <button
                              onClick={() => setShowLiveMapModal(true)}
                              className="px-3.5 py-1.5 bg-[#251915] text-[#fff8f6] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#ff602a] transition-colors rounded-sm flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-sm">location_on</span>
                              Live Courier Route
                            </button>
                          </div>
                        </div>

                        {/* Dispatch Tracking Progress Line */}
                        <div className="p-6 bg-[#fffaf8] border-b border-[#ebdcd8]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                            <div>
                              <p className="text-[11px] font-mono uppercase tracking-wider text-[#ff602a] font-bold">
                                Courier: {order.courierName} • AWB Tracking {order.awbNumber}
                              </p>
                              <p className="text-sm font-bold text-[#251915] mt-0.5">
                                Estimated Handover: {order.expectedDelivery}
                              </p>
                            </div>
                            <div className="text-xs text-[#8f7166] sm:text-right">
                              <p>Last Location Scan: {order.currentLocation}</p>
                              <p className="text-[11px] font-mono text-stone-400">Timestamp: {order.lastScanTime}</p>
                            </div>
                          </div>

                          {/* Stepper Timeline */}
                          <div className="relative pt-2 pb-4">
                            <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-[#ebdcd8]">
                              <div
                                className="h-full bg-[#ff602a] transition-all duration-700"
                                style={{
                                  width: `${Math.min(100, (order.timelineStep / 5) * 100)}%`,
                                }}
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                              {[
                                { step: 1, label: 'Order Confirmed', time: '18 Oct 09:30 AM', icon: 'receipt_long' },
                                { step: 2, label: 'Quality Pressed', time: '18 Oct 02:15 PM', icon: 'iron' },
                                { step: 3, label: 'Air Express Bagged', time: '19 Oct 06:00 AM', icon: 'flight_takeoff' },
                                { step: 4, label: 'Out for Delivery', time: 'Today 08:30 AM', icon: 'local_shipping' },
                                { step: 5, label: 'Doorstep Delivered', time: 'Expected 7:00 PM', icon: 'task_alt' },
                              ].map((item) => {
                                const isPassed = item.step < order.timelineStep;
                                const isCurrent = item.step === order.timelineStep;
                                return (
                                  <div key={item.step} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                                    <div
                                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-all ${
                                        isCurrent
                                          ? 'bg-[#ff602a] text-white ring-4 ring-[#ff602a]/20 scale-110 shadow'
                                          : isPassed
                                          ? 'bg-[#251915] text-white'
                                          : 'bg-[#ebdcd8] text-stone-400'
                                      }`}
                                    >
                                      <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                    </div>
                                    <div>
                                      <p
                                        className={`text-xs font-semibold ${
                                          isCurrent ? 'text-[#ff602a]' : isPassed ? 'text-[#251915]' : 'text-stone-400'
                                        }`}
                                      >
                                        {item.label}
                                      </p>
                                      <p className="text-[10px] text-stone-500 font-mono">{item.time}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="p-6 divide-y divide-[#ebdcd8]">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-16 h-20 object-cover object-top rounded-sm border border-[#ebdcd8]"
                                />
                                <div>
                                  <h4 className="font-syne font-bold text-sm text-[#251915]">{item.name}</h4>
                                  <p className="text-xs text-[#8f7166] mt-0.5">
                                    Size: {item.size} • Fabric: {item.fabric} • Qty: {item.quantity}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="font-mono text-xs font-bold text-[#251915]">
                                      ₹{item.price}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#fdeee9] text-[#8a3300] font-bold rounded">
                                      {item.status}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex sm:flex-col items-end gap-2">
                                <button
                                  onClick={() => {
                                    const matched = PRODUCTS.find((p) => p.name.includes(item.name.slice(0, 8)));
                                    if (matched && onAddToCart) {
                                      onAddToCart(matched, item.size || 'M');
                                      onShowToast(`Added another ${item.name} to bag.`);
                                    } else {
                                      onShowToast('Item re-added to your bag.');
                                    }
                                  }}
                                  className="px-3.5 py-1.5 border border-[#251915] text-[11px] font-mono uppercase tracking-wider hover:bg-[#251915] hover:text-[#fff8f6] transition-colors rounded-sm"
                                >
                                  Buy Again
                                </button>
                                <button
                                  onClick={() =>
                                    onShowToast(
                                      `7-day exchange window is open for ${item.name}. Concierge notified.`
                                    )
                                  }
                                  className="text-xs text-[#8f7166] hover:text-[#ff602a] underline decoration-stone-300"
                                >
                                  Exchange / Return
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-syne text-xl font-bold text-[#251915]">Saved Delivery Locations</h3>
                    <p className="text-xs text-[#8f7166] mt-0.5">
                      Fast-track your artisan deliveries across India.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="px-4 py-2 bg-[#ff602a] text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#8a3300] transition-colors rounded-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add New Address
                  </button>
                </div>

                {/* Add Address Form Modal / Inline */}
                {isAddingAddress && (
                  <form
                    onSubmit={handleSaveNewAddress}
                    className="bg-[#fdeee9] border border-[#ebdcd8] p-6 rounded-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-syne font-bold text-sm text-[#251915]">
                        Add New Atelier Address
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="text-stone-400 hover:text-[#251915]"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                        <input
                          type="radio"
                          name="addrType"
                          checked={newAddrType === 'Home'}
                          onChange={() => setNewAddrType('Home')}
                          className="accent-[#ff602a]"
                        />
                        Home Address
                      </label>
                      <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                        <input
                          type="radio"
                          name="addrType"
                          checked={newAddrType === 'Work / Studio'}
                          onChange={() => setNewAddrType('Work / Studio')}
                          className="accent-[#ff602a]"
                        />
                        Work / Studio
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={newAddrName}
                          onChange={(e) => setNewAddrName(e.target.value)}
                          placeholder="e.g. Ananya Nair"
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={newAddrPhone}
                          onChange={(e) => setNewAddrPhone(e.target.value)}
                          placeholder="+91 98450 19283"
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          Flat, Suite, Building & Street *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddrStreet}
                          onChange={(e) => setNewAddrStreet(e.target.value)}
                          placeholder="e.g. Penthouse 402, Magnolia Residency, 12th Main"
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          Locality / Area
                        </label>
                        <input
                          type="text"
                          value={newAddrArea}
                          onChange={(e) => setNewAddrArea(e.target.value)}
                          placeholder="Indiranagar Stage 2"
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          6-Digit PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newAddrPin}
                          onChange={(e) => setNewAddrPin(e.target.value)}
                          placeholder="560038"
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={newAddrState}
                          onChange={(e) => setNewAddrState(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-[#ebdcd8] bg-white rounded-sm focus:outline-[#ff602a]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 border border-[#ebdcd8] bg-white text-xs font-mono uppercase tracking-wider rounded-sm hover:border-[#251915]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#ff602a] text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#8a3300] transition-colors rounded-sm shadow"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Address Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-6 border rounded-sm relative flex flex-col justify-between transition-all ${
                        addr.isDefault
                          ? 'border-[#ff602a] bg-[#fffaf8] shadow-sm'
                          : 'border-[#ebdcd8] bg-white hover:border-[#8f7166]'
                      }`}
                    >
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#ff602a] text-white font-bold rounded">
                          Default Shipping
                        </span>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-sm text-[#ff602a]">
                            {addr.type === 'Home' ? 'home' : 'apartment'}
                          </span>
                          <span className="font-mono text-xs uppercase font-bold text-[#251915]">
                            {addr.type}
                          </span>
                        </div>
                        <h4 className="font-syne font-bold text-base text-[#251915]">{addr.name}</h4>
                        <p className="text-xs text-[#584139] mt-2 leading-relaxed">
                          {addr.street}, {addr.area}
                          <br />
                          {addr.city}, {addr.state} – <span className="font-mono font-bold">{addr.pinCode}</span>
                        </p>
                        <p className="text-xs text-[#8f7166] mt-2 font-mono">Mobile: {addr.phone}</p>
                        {addr.hubBadge && (
                          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8a3300] bg-[#fdeee9] px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            {addr.hubBadge}
                          </div>
                        )}
                      </div>

                      <div className="pt-5 mt-5 border-t border-[#ebdcd8] flex items-center justify-between text-xs">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="font-mono uppercase text-[#ff602a] hover:underline font-bold"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-stone-400">Primary</span>
                        )}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              onShowToast('Address is editable. Changes will reflect on next order.')
                            }
                            className="text-[#8f7166] hover:text-[#251915]"
                          >
                            Edit
                          </button>
                          <span className="text-stone-300">|</span>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-syne text-xl font-bold text-[#251915]">Saved Atelier Pieces</h3>
                    <p className="text-xs text-[#8f7166] mt-0.5">
                      Your saved silhouettes reserved for 30 days.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('collection')}
                    className="text-xs font-mono uppercase tracking-wider text-[#ff602a] font-bold hover:underline"
                  >
                    View All Collections →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white border border-[#ebdcd8] rounded-sm overflow-hidden group hover:border-[#ff602a] transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] bg-[#fdeee9] overflow-hidden">
                        <img
                          src={prod.imageUrl}
                          alt={prod.imageAlt}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2 py-0.5 bg-[#251915] text-[#fff8f6] font-bold rounded">
                          {prod.discountBadge || 'LIMITED'}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-syne font-bold text-sm text-[#251915] line-clamp-1">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-[#8f7166] mt-0.5 line-clamp-1">{prod.subtitle}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-mono text-sm font-bold text-[#251915]">₹{prod.price}</span>
                            <span className="font-mono text-xs text-[#8f7166] line-through">
                              ₹{prod.originalPrice}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#ebdcd8] flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (onAddToCart) onAddToCart(prod, 'M');
                              onShowToast(`Moved ${prod.name} to Shopping Bag!`);
                            }}
                            className="flex-1 py-2 bg-[#ff602a] text-white text-[11px] font-mono uppercase tracking-wider font-bold hover:bg-[#8a3300] transition-colors rounded-sm text-center"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => onShowToast(`Removed ${prod.name} from wishlist.`)}
                            className="p-2 border border-[#ebdcd8] hover:border-red-500 text-stone-400 hover:text-red-500 rounded-sm"
                            title="Remove"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: REWARDS */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div className="bg-[#251915] text-[#fff8f6] p-8 rounded-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-[#ff602a] font-bold tracking-widest">
                        Handloom Privilege Program
                      </p>
                      <h3 className="font-syne text-3xl font-bold mt-1 text-white">450 Craft Coins</h3>
                      <p className="text-xs text-stone-300 mt-2 max-w-md">
                        Each coin is worth ₹1 off any purchase. Redeem up to 20% of your total order at checkout or gift handcrafted accessories.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('collection')}
                      className="px-6 py-3 bg-[#ff602a] text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-white hover:text-[#251915] transition-colors rounded-sm"
                    >
                      Redeem on SS/26 Drop
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 bg-white border border-[#ebdcd8] rounded-sm">
                    <span className="material-symbols-outlined text-2xl text-[#ff602a]">recycling</span>
                    <h4 className="font-syne font-bold text-sm text-[#251915] mt-2">Cotton Circularity</h4>
                    <p className="text-xs text-[#8f7166] mt-1">
                      Return worn Slayvana garments for 200 Craft Coins and artisan zero-waste recycling.
                    </p>
                  </div>
                  <div className="p-5 bg-white border border-[#ebdcd8] rounded-sm">
                    <span className="material-symbols-outlined text-2xl text-[#ff602a]">cake</span>
                    <h4 className="font-syne font-bold text-sm text-[#251915] mt-2">Birthday Surprise</h4>
                    <p className="text-xs text-[#8f7166] mt-1">
                      Enjoy 20% off couture and a complimentary block-printed cotton stole during your birthday month.
                    </p>
                  </div>
                  <div className="p-5 bg-white border border-[#ebdcd8] rounded-sm">
                    <span className="material-symbols-outlined text-2xl text-[#ff602a]">diamond</span>
                    <h4 className="font-syne font-bold text-sm text-[#251915] mt-2">Atelier Priority</h4>
                    <p className="text-xs text-[#8f7166] mt-1">
                      48-hour early preview access to limited edition seasonal drops before public releases.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE & SIZING */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="bg-white border border-[#ebdcd8] p-8 rounded-sm space-y-6">
                <div>
                  <h3 className="font-syne text-xl font-bold text-[#251915]">
                    Atelier Profile & Sizing Preferences
                  </h3>
                  <p className="text-xs text-[#8f7166] mt-0.5">
                    Help our Jaipur tailoring team recommend ideal silhouettes and drape lengths.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                      Phone (OTP Verified)
                    </label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                      Usual Kurti Size
                    </label>
                    <select
                      value={usualSize}
                      onChange={(e) => setUsualSize(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a]"
                    >
                      <option>Extra Small (XS - Bust 34")</option>
                      <option>Small (S - Bust 36")</option>
                      <option>Medium (M - Bust 38")</option>
                      <option>Large (L - Bust 40")</option>
                      <option>Extra Large (XL - Bust 42")</option>
                      <option>Double XL (XXL - Bust 44")</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                      Preferred Fabric Feel
                    </label>
                    <select
                      value={favFabric}
                      onChange={(e) => setFavFabric(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a]"
                    >
                      <option>Pure Jaipur Handloom Cotton</option>
                      <option>Soft Mulmul / Muslin</option>
                      <option>Textured Crushed Handloom</option>
                      <option>Fine 60s Cambric Cotton</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8f7166] mb-1">
                      Preferred Kurti Length
                    </label>
                    <select
                      value={heightPref}
                      onChange={(e) => setHeightPref(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ebdcd8] rounded-sm focus:outline-[#ff602a]"
                    >
                      <option>Short Tunic (32 inches)</option>
                      <option>Knee-length (40 inches)</option>
                      <option>Calf-length (44 inches)</option>
                      <option>Ankle-length Maxi (48 inches)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#ebdcd8] flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#251915] text-[#fff8f6] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#ff602a] transition-colors rounded-sm shadow"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Live Map Modal (Simulated Courier Journey) */}
      {showLiveMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fff8f6] border border-[#ebdcd8] rounded-sm max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebdcd8] pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#ff602a] font-bold">
                  BlueDart Express Air Cargo
                </span>
                <h3 className="font-syne text-lg font-bold text-[#251915]">
                  Live Transit: Order #SLV-89214
                </h3>
              </div>
              <button
                onClick={() => setShowLiveMapModal(false)}
                className="text-stone-400 hover:text-[#251915]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Stylized Visual Map Route */}
            <div className="bg-[#251915] text-white p-6 rounded-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-[#ff602a] mb-6">
                <span>JAIPUR ATELIER (JAI)</span>
                <span className="animate-pulse">✈ AIR TRANSIT IN PROGRESS</span>
                <span>BENGALURU HUB (BLR)</span>
              </div>

              {/* Progress Line */}
              <div className="h-1 bg-white/20 relative my-4 rounded-full">
                <div className="h-full bg-[#ff602a] w-3/4 rounded-full" />
                <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#ff602a] rounded-full ring-4 ring-white animate-ping" />
                <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#ff602a] rounded-full ring-2 ring-white" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-stone-400 text-[10px] uppercase font-mono">Current Vehicle</p>
                  <p className="font-bold text-white">BlueDart Flight BD-402 / Van KA-03-F-8812</p>
                </div>
                <div>
                  <p className="text-stone-400 text-[10px] uppercase font-mono">Assigned Rider</p>
                  <p className="font-bold text-white">Manoj Kumar (+91 94821 00412)</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8f7166] leading-relaxed">
              Your parcel is out for delivery with verification code <span className="font-mono font-bold text-[#251915]">OTP: 4892</span>. Keep this handy at doorstep handover.
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowLiveMapModal(false)}
                className="px-5 py-2 bg-[#251915] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-sm hover:bg-[#ff602a]"
              >
                Close Tracking View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
