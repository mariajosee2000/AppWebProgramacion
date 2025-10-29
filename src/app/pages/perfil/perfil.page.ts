import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PerfilPage implements OnInit {
  user: User | null = null;

  menuItems = [
    { icon: 'create-outline', label: 'Editar Perfil', route: '/edit-profile' },
    { icon: 'location-outline', label: 'Direcciones', route: '/addresses' },
    { icon: 'card-outline', label: 'Métodos de Pago', route: '/payment-methods' },
    { icon: 'star-outline', label: 'Favoritos', route: '/favorites' },
    { icon: 'settings-outline', label: 'Configuración', route: '/settings' },
    { icon: 'help-circle-outline', label: 'Ayuda', route: '/help' }
  ];

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
  }

  getUserInitial(): string {
    return this.user?.name?.charAt(0).toUpperCase() || 'U';
  }
}
