import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): boolean {
    // Simulación de login - en producción esto sería una llamada a API
    if (email && password) {
      const user: User = {
        id: 1,
        name: 'Juan Pérez',
        email: email,
        avatar: ''
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/tabs/inicio']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
