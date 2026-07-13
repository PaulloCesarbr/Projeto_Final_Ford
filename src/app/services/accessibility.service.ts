import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private isBrowser: boolean;
  private fontSizes = ['sm', 'md', 'lg', 'xl'];
  private currentFontSizeIndex = 1; // 'md'
  private isHighContrast = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const savedSize = localStorage.getItem('fontSize') || 'md';
      this.currentFontSizeIndex = this.fontSizes.indexOf(savedSize);
      if (this.currentFontSizeIndex === -1) this.currentFontSizeIndex = 1;
      
      this.isHighContrast = localStorage.getItem('highContrast') === 'true';
      this.applySettings();
    }
  }

  getFontSize(): string {
    return this.fontSizes[this.currentFontSizeIndex];
  }

  getHighContrast(): boolean {
    return this.isHighContrast;
  }

  increaseFont() {
    if (this.currentFontSizeIndex < this.fontSizes.length - 1) {
      this.currentFontSizeIndex++;
      this.applySettings();
    }
  }

  decreaseFont() {
    if (this.currentFontSizeIndex > 0) {
      this.currentFontSizeIndex--;
      this.applySettings();
    }
  }

  toggleHighContrast() {
    this.isHighContrast = !this.isHighContrast;
    this.applySettings();
  }

  private applySettings() {
    if (!this.isBrowser) return;

    const body = document.body;
    this.fontSizes.forEach(size => {
      body.classList.remove(`font-size-${size}`);
    });
    body.classList.add(`font-size-${this.fontSizes[this.currentFontSizeIndex]}`);
    localStorage.setItem('fontSize', this.fontSizes[this.currentFontSizeIndex]);

    if (this.isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(this.isHighContrast));
  }

  speak(text: string) {
    if (!this.isBrowser) return;
    window.speechSynthesis.cancel();
    
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (!this.isBrowser) return;
    window.speechSynthesis.cancel();
  }
}
