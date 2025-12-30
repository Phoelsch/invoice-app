import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    BreadcrumbsComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isHandset$: Observable<boolean>;
  navItems: Array<{ path: string; title: string; icon?: string }> = [];

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 599px)']).pipe(
      map(result => result.matches)
    );
  }

  ngOnInit(): void {
    // Build nav items from router configuration. Expect routes to provide `data: { title: string, icon?: string }`.
    this.navItems = this.router.config
      .filter(r => !!r.path && !!r.data && !!(r.data as any).title)
      .map(r => ({ path: r.path as string, title: (r.data as any).title as string, icon: (r.data as any).icon })) as any;
  }

  async onNavItemClick(drawer: any): Promise<void> {
    const handset = await firstValueFrom(this.isHandset$);
    if (handset) {
      drawer.close();
    }
  }

}
