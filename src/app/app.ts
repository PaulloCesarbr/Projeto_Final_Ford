import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AccessibilityService } from './services/accessibility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    public authService: AuthService,
    public accessibilityService: AccessibilityService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicialização geral, se necessário
  }

  logout() {
    this.authService.logout();
    this.accessibilityService.stopSpeaking();
    this.router.navigate(['/login']);
  }
}
