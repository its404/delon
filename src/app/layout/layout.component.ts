import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <nz-back-top></nz-back-top>
    <theme-btn></theme-btn>
  `,
  host: {
    '[class.page-wrapper]': 'true',
  },
})
export class LayoutComponent {}
