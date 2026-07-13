import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface RegisteredUser {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private loggedIn = false;
  private currentUser: string | null = null;
  private readonly USERS_KEY = 'registeredUsers';

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.currentUser = localStorage.getItem('currentUser');
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  login(username: string) {
    this.loggedIn = true;
    this.currentUser = username;
    if (this.isBrowser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', username);
    }
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
    }
  }

  private getRegisteredUsers(): RegisteredUser[] {
    if (!this.isBrowser) {
      return [];
    }
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveRegisteredUsers(users: RegisteredUser[]) {
    if (this.isBrowser) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }

  emailExists(email: string): boolean {
    const normalized = email.trim().toLowerCase();
    if (normalized === 'admin@email.com') {
      return true;
    }
    return this.getRegisteredUsers().some(u => u.email.toLowerCase() === normalized);
  }

  register(name: string, email: string, password: string): { success: boolean; message: string } {
    const normalized = email.trim().toLowerCase();

    if (this.emailExists(normalized)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const users = this.getRegisteredUsers();
    users.push({ name: name.trim(), email: normalized, password });
    this.saveRegisteredUsers(users);

    return { success: true, message: 'Cadastro realizado com sucesso! Você já pode entrar.' };
  }

  validateCredentials(email: string, password: string): boolean {
    const normalized = email.trim().toLowerCase();

    // Usuário administrador padrão, mantido por compatibilidade
    if (normalized === 'admin@email.com' && password === '123456') {
      return true;
    }

    const users = this.getRegisteredUsers();
    return users.some(u => u.email.toLowerCase() === normalized && u.password === password);
  }
}
