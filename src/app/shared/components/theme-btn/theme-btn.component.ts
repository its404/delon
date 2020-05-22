import { ChangeDetectionStrategy, Component, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '@core/app.service';

type SiteTheme = 'default' | 'dark' | 'compact';

@Component({
  selector: 'theme-btn',
  templateUrl: './theme-btn.component.html',
  host: {
    '[class.theme-btn]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBtnComponent implements OnInit {
  theme: SiteTheme = 'default';

  constructor(private appService: AppService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initTheme();
  }

  private initTheme(): void {
    const theme = (localStorage.getItem('site-theme') as SiteTheme) || 'default';
    this.onThemeChange(theme);
  }

  onThemeChange(theme: SiteTheme): void {
    this.theme = theme;
    this.appService.theme$.next(theme);
    this.renderer.setAttribute(document.body, 'data-theme', theme);
    const dom = document.getElementById('site-theme');
    if (dom) {
      dom.remove();
    }
    localStorage.removeItem('site-theme');
    if (theme !== 'default') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'site-theme';
      style.href = `assets/${theme}.css`;

      localStorage.setItem('site-theme', theme);
      document.body.append(style);
    }
  }
}
