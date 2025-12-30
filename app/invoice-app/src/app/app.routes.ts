import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'Dashboard', icon: 'dashboard' }
    },
    {
        path: 'customers',
        loadComponent: () => import('./components/customers.component').then(m => m.CustomersComponent),
        data: { title: 'Kunden', icon: 'people' }
    },
    {
        path: 'invoices',
        loadComponent: () => import('./components/invoices.component').then(m => m.InvoicesComponent),
        data: { title: 'Rechnungen', icon: 'receipt_long' }
    }
];
