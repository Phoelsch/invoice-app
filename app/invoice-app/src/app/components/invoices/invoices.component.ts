
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DefaultService, Invoice } from '../../api-client';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  // ...existing code...
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['invoiceNumber', 'customer', 'invoiceDate', 'actions'];
  invoices: Invoice[] = [];
  dataSource = new MatTableDataSource<Invoice>([]);
  filterValue = '';

  constructor(private api: DefaultService) {}

  // API call to load invoices
  ngOnInit() {
    // MOCK: Dummy data for development
    const dummyInvoices: Invoice[] = [
      {
        id: 1,
        invoiceNumber: '2026-001',
        customer: { id: 1, name: 'Muster GmbH', email: 'info@muster.de', mainNumber: '12345', contactPerson: 'Herr Muster', street: 'Musterstraße 1', postalCode: '12345', location: 'Musterstadt' },
        description: 'Webentwicklung Dezember',
        invoiceDate: '2026-01-01',
        serviceDate: '2025-12-01',
        paymentDate: '2026-01-15',
        createDate: '2026-01-01',
        finalizedDate: '2026-01-02',
        items: []
      },
      {
        id: 2,
        invoiceNumber: '2026-002',
        customer: { id: 2, name: 'Beispiel AG', email: 'kontakt@beispiel.de', mainNumber: '67890', contactPerson: 'Frau Beispiel', street: 'Beispielweg 2', postalCode: '54321', location: 'Beispielstadt' },
        description: 'Beratung Januar',
        invoiceDate: '2026-01-02',
        serviceDate: '2026-01-01',
        paymentDate: '2026-01-20',
        createDate: '2026-01-02',
        finalizedDate: '2026-01-03',
        items: []
      }
    ];
    this.invoices = dummyInvoices;
    this.dataSource.data = dummyInvoices;
    // Paginator setup after view init
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (invoice: Invoice, filter: string) => {
      return (
        invoice.invoiceNumber?.toLowerCase().includes(filter) ||
        invoice.customer?.name?.toLowerCase().includes(filter) ||
        (invoice.invoiceDate ? invoice.invoiceDate.toLowerCase().includes(filter) : false)
      );
    };
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.filterValue = '';
    this.dataSource.filter = '';
  }

  // Action handlers (stubs)
  viewInvoice(invoice: Invoice) {}
  editInvoice(invoice: Invoice) {}
  deleteInvoice(invoice: Invoice) {}
  createInvoice() {}
}
