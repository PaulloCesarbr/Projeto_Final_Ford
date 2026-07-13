import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  username: string | null = '';
  private carouselInstance: any = null;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.username = this.authService.getCurrentUser();
    }
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Initialize Bootstrap carousel programmatically after the view renders
    setTimeout(() => {
      const carouselEl = document.getElementById('recipeCarousel');
      if (carouselEl && typeof bootstrap !== 'undefined') {
        this.carouselInstance = new bootstrap.Carousel(carouselEl, {
          interval: 5000,
          ride: 'carousel',
          wrap: true,
          pause: 'hover'
        });
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.carouselInstance) {
      this.carouselInstance.dispose();
      this.carouselInstance = null;
    }
  }
}
