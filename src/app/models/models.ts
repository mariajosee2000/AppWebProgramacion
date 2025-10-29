// models/restaurant.model.ts
export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  deliveryTime: string;
  deliveryFee: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isFavorite: boolean;
}

// models/category.model.ts
export interface Category {
  id: number;
  name: string;
  icon: string;
}

// models/cart-item.model.ts
export interface CartItem {
  id: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: number;
}

// models/order.model.ts
export interface Order {
  id: number;
  date: Date;
  restaurant: string;
  items: string;
  total: number;
  status: 'entregado' | 'en-camino' | 'pendiente' | 'cancelado';
}

// models/user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}
