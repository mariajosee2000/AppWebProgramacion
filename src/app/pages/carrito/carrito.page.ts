import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { CartItem } from '../../models/models';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CarritoPage implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  deliveryFee: number = 15000;
  total: number = 0;

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCart();
    this.dataService.cartItems$.subscribe(() => {
      this.loadCart();
    });
  }

  loadCart() {
    this.cartItems = this.dataService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.dataService.getCartTotal();
    this.total = this.subtotal + (this.cartItems.length > 0 ? this.deliveryFee : 0);
  }

  increaseQuantity(item: CartItem) {
    this.dataService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.dataService.updateQuantity(item.id, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.dataService.removeFromCart(item.id);
  }

  async checkout() {
    if (this.cartItems.length === 0) return;

    const alert = await this.alertController.create({
      header: 'Confirmar Pedido',
      message: `¿Deseas confirmar tu pedido por ${this.formatPrice(this.total)}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Crear orden
            const order = {
              id: Date.now(),
              date: new Date(),
              restaurant: 'Múltiples restaurantes',
              items: this.cartItems.map(i => `${i.productName} x${i.quantity}`).join(', '),
              total: this.total,
              status: 'pendiente' as const
            };
            
            this.dataService.addOrder(order);
            this.dataService.clearCart();
            
            this.presentToast('Pedido realizado con éxito');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  formatPrice(price: number): string {
    return '₲' + price.toLocaleString('es-PY');
  }

  getItemsCount(): number {
    return this.dataService.getCartItemsCount();
  }
}
