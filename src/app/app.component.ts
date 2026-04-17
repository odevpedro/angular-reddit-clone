import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="loading-bar" [class.active]="loading"></div>
    <app-header />
    <router-outlet />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loading = false;

  private router = inject(Router);
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.init();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.loading = true;
      if (event instanceof NavigationEnd || event instanceof NavigationError) this.loading = false;
    });
  }
}
