import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gridapp';
  route = signal('/');

  activeRoute = computed(() => {
    return this.route();
  });

  routes = signal([
    {
      url: '/',
      label: 'Grid1',
    },
    {
      url: '/sorting',
      label: 'Grid2',
    },
    {
      url: '/filtering',
      label: 'Grid3',
    },
    {
      url: '/editing',
      label: 'Grid4',
    },
  ]);
  navigateTo(route: string) {
    this.route.set(route);
  }
}
