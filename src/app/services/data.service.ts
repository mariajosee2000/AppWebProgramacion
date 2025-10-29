import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurant, Category, CartItem, Order } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Datos mock de categorías
  private categories: Category[] = [
    { id: 1, name: 'Todos', icon: '📋' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Burger', icon: '🍔' },
    { id: 4, name: 'Sushi', icon: '🍣' },
    { id: 5, name: 'Pasta', icon: '🍝' },
    { id: 6, name: 'Postres', icon: '🍰' }
  ];

  // Datos mock de restaurantes
  private restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Pizzería Napoli',
      cuisine: 'Italiana',
      deliveryTime: '25-35 min',
      deliveryFee: 22000,
      rating: 4.8,
      reviewsCount: 120,
      image: '🍕',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Burger House',
      cuisine: 'Americana',
      deliveryTime: '20-30 min',
      deliveryFee: 15000,
      rating: 4.6,
      reviewsCount: 89,
      image: '🍔',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Sushi Master',
      cuisine: 'Japonesa',
      deliveryTime: '30-40 min',
      deliveryFee: 25000,
      rating: 4.9,
      reviewsCount: 200,
      image: '🍣',
      isFavorite: true
    },
    {
      id: 4,
      name: 'Pasta Italiana',
      cuisine: 'Italiana',
      deliveryTime: '25-35 min',
      deliveryFee: 20000,
      rating: 4.7,
      reviewsCount: 150,
      image: '🍝',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Dulce Tentación',
      cuisine: 'Postres',
      deliveryTime: '15-25 min',
      deliveryFee: 10000,
      rating: 4.9,
      reviewsCount: 300,
      image: '🍰',
      isFavorite: false
    }
  ];

  // Carrito de compras
  private cartItems: CartItem[] = [
    {
      id: 1,
      productName: 'Pizza Napolitana',
      description: 'Grande, masa fina',
      price: 45000,
      quantity: 2,
      image: '🍕',
      restaurantId: 1
    },
    {
      id: 2,
      productName: 'Burger Clásica',
      description: 'Con queso y papas',
      price: 35000,
      quantity: 1,
      image: '🍔',
      restaurantId: 2
    }
  ];

  // Historial de pedidos
  private orders: Order[] = [
    {
      id: 1,
      date: new Date('2025-10-24T14:30:00'),
      restaurant: 'Pizzería Napoli',
      items: 'Pizza Margherita x2, Coca Cola x1',
      total: 85000,
      status: 'entregado'
    },
    {
      id: 2,
      date: new Date('2025-10-22T19:15:00'),
      restaurant: 'Burger House',
      items: 'Burger Clásica x1, Papas Grandes x1',
      total: 55000,
      status: 'entregado'
    },
    {
      id: 3,
      date: new Date('2025-10-20T13:00:00'),
      restaurant: 'Sushi Master',
      items: 'Roll Philadelphia x2, Roll California x1',
      total: 120000,
      status: 'en-camino'
    },
    {
      id: 4,
      date: new Date('2025-10-18T20:45:00'),
      restaurant: 'Pasta Italiana',
      items: 'Lasagna x1, Tiramisú x1',
      total: 65000,
      status: 'entregado'
    }
  ];

  // BehaviorSubjects para reactive data
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private restaurantsSubject = new BehaviorSubject<Restaurant[]>(this.restaurants);
  public restaurants$ = this.restaurantsSubject.asObservable();

  constructor() { }

  // === CATEGORIES ===
  getCategories(): Category[] {
    return this.categories;
  }

  // === RESTAURANTS ===
  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  getRestaurantsByCategory(categoryName: string): Restaurant[] {
    if (categoryName === 'Todos') {
      return this.restaurants;
    }
    return this.restaurants.filter(r => r.cuisine.toLowerCase().includes(categoryName.toLowerCase()));
  }

  toggleFavorite(restaurantId: number): void {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.isFavorite = !restaurant.isFavorite;
      this.restaurantsSubject.next([...this.restaurants]);
    }
  }

  searchRestaurants(query: string): Restaurant[] {
    if (!query.trim()) {
      return this.restaurants;
    }
    const lowerQuery = query.toLowerCase();
    return this.restaurants.filter(r => 
      r.name.toLowerCase().includes(lowerQuery) || 
      r.cuisine.toLowerCase().includes(lowerQuery)
    );
  }

  // === CART ===
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter(i => i.id !== itemId);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        this.cartItemsSubject.next([...this.cartItems]);
      }
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // === ORDERS ===
  getOrders(): Order[] {
    return this.orders.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  addOrder(order: Order): void {
    this.orders.unshift(order);
  }
}
