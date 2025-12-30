import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-breadcrumbs',
  imports: [CommonModule],
  template: `
    <nav class="breadcrumbs" aria-label="Breadcrumbs">
      <ol>
        <li *ngFor="let bc of breadcrumbs; let last = last">
          <a *ngIf="!last" [routerLink]="bc.url">{{ bc.label }}</a>
          <span *ngIf="last">{{ bc.label }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [
    `
    .breadcrumbs ol { list-style: none; padding: 0; margin: 0; display:flex; gap:8px; align-items:center; }
    .breadcrumbs li { color: rgba(0,0,0,0.7); font-size:14px; }
    .breadcrumbs a { color: var(--mat-sys-primary, #1976d2); text-decoration: none; }
    .breadcrumbs li::after { content: '/'; margin: 0 8px; color: #999; }
    .breadcrumbs li:last-child::after { content: ''; }
    `
  ]
})
export class BreadcrumbsComponent {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const crumbs = this.buildBreadcrumbs(this.route.root);
      // Ensure a leading Home breadcrumb (links to root) is present
      if (!crumbs.length || crumbs[0].label.toLowerCase() !== 'home') {
        crumbs.unshift({ label: 'Home', url: '/' });
      }
      this.breadcrumbs = crumbs;
    });
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<any> = []): Array<any> {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data && child.snapshot.data['title'] ? child.snapshot.data['title'] : routeURL;
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
