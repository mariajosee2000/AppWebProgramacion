import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    const success = this.authService.login(this.email, this.password);
    if (!success) {
      this.errorMessage = 'Credenciales inválidas';
    }
  }
}
