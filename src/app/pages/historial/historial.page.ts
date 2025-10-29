import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HistorialPage implements OnInit {
  orders: Order[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadOrders();
  }

  ionViewWillEnter() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.dataService.getOrders();
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  formatPrice(price: number): string {
    return '₲' + price.toLocaleString('es-PY');
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'entregado': return 'success';
      case 'en-camino': return 'warning';
      case 'pendiente': return 'warning';
      case 'cancelado': return 'danger';
      default: return 'medium';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'entregado': return 'Entregado';
      case 'en-camino': return 'En camino';
      case 'pendiente': return 'Pendiente';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  }
}
