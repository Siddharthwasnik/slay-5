export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Kurtis' | 'Co-ord Sets' | 'Twinning Duo' | 'Best Sellers' | 'Sleeveless';
  price: number;
  originalPrice: number;
  discountBadge?: string;
  highlightBadge?: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  imageAlt: string;
  sizes: string[];
  fabric: string;
  sleeveStyle: 'Sleeveless' | 'Full Sleeves' | '3/4 Sleeves' | 'Short Sleeves' | 'Bell Sleeves';
  palette: 'Rust / Terracotta' | 'Mustard' | 'Black & White' | 'Indigo' | 'Pink' | 'Sky Blue' | 'Maroon' | 'Natural Ivory';
  inStock: boolean;
  lowStockCount?: number;
  description: string;
  sku: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  imageUrl: string;
  size: string;
  color?: string;
  price: number;
  originalPrice: number;
  quantity: number;
  sku: string;
  fabricBadge?: string;
  appliedDiscountNote?: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work / Studio';
  name: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  isDefault: boolean;
  hubBadge?: string;
}

export interface OrderItem {
  name: string;
  size: string;
  fabric: string;
  quantity: number;
  price: number;
  imageUrl: string;
  status: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  paymentMethod: string;
  totalAmount: number;
  status: 'In Transit' | 'Delivered' | 'Confirmed' | 'Processing';
  statusBadge: string;
  expectedDelivery: string;
  awbNumber: string;
  courierName: string;
  currentLocation: string;
  lastScanTime: string;
  items: OrderItem[];
  timelineStep: number; // 1 to 5
}
