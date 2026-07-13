import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Controla qual formulário é exibido no card
  mode: 'login' | 'register' = 'login';

  // Campos de login
  username = '';
  password = '';
  lgpdAccepted = false;
  errorMessage = '';

  // Campos de cadastro
  regName = '';
  regEmail = '';
  regPassword = '';
  regConfirmPassword = '';
  regLgpdAccepted = false;
  regErrorMessage = '';
  regSuccessMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  switchMode(newMode: 'login' | 'register') {
    this.mode = newMode;
    this.errorMessage = '';
    this.regErrorMessage = '';
    this.regSuccessMessage = '';
  }

  onSubmit() {
    if (!this.lgpdAccepted) {
      this.errorMessage = 'Você precisa aceitar os termos da LGPD para prosseguir.';
      return;
    }

    if (this.authService.validateCredentials(this.username, this.password)) {
      this.authService.login(this.username);
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'E-mail ou senha incorretos.';
    }
  }

  onRegister() {
    this.regErrorMessage = '';
    this.regSuccessMessage = '';

    if (!this.regLgpdAccepted) {
      this.regErrorMessage = 'Você precisa aceitar os termos da LGPD para prosseguir.';
      return;
    }

    if (this.regPassword !== this.regConfirmPassword) {
      this.regErrorMessage = 'As senhas não coincidem.';
      return;
    }

    if (this.regPassword.length < 6) {
      this.regErrorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    const result = this.authService.register(this.regName, this.regEmail, this.regPassword);

    if (result.success) {
      this.regSuccessMessage = result.message;
      // Pré-preenche o formulário de login e volta para o modo login
      this.username = this.regEmail.trim();
      this.password = '';
      this.regName = '';
      this.regEmail = '';
      this.regPassword = '';
      this.regConfirmPassword = '';
      this.regLgpdAccepted = false;
      setTimeout(() => this.switchMode('login'), 1200);
    } else {
      this.regErrorMessage = result.message;
    }
  }
}
