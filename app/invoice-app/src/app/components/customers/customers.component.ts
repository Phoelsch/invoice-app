import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DefaultService } from '../../api-client/api/default.service';

import { Customer } from '../../api-client';

@Component({
  standalone: true,
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    CustomerDialogComponent,
    ConfirmDialogComponent,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class CustomersComponent implements AfterViewInit {
  constructor(private dialog: MatDialog, private api: DefaultService, private snackBar: MatSnackBar) {}
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Customer>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.filterPredicate = (data: Customer, filter: string) =>
      data.name.toLowerCase().includes(filter);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clearFilter(input?: HTMLInputElement) {
    if (input) input.value = '';
    this.dataSource.filter = '';
  }

  openCustomerDialog(mode: 'create' | 'view' | 'edit' = 'create', customer?: any) {
    const ref = this.dialog.open(CustomerDialogComponent, {
      data: { mode, customer },
      width: '520px'
    });

    ref.afterClosed().subscribe(result => {
      if (result && mode === 'create') {
        this.api.createCustomer(result).subscribe({
          next: created => {
            const data = this.dataSource.data.slice();
            data.unshift(created);
            this.dataSource.data = data;
            this.snackBar.open('Kunde erstellt', 'Schließen', { duration: 3000 });
          },
          error: () => this.snackBar.open('Fehler beim Erstellen', 'Schließen', { duration: 4000 })
        });
      } else if (result && mode === 'edit') {
        if (!result.id) return;
        this.api.updateCustomer(result.id, result).subscribe({
          next: updated => {
            const idx = this.dataSource.data.findIndex(c => c.id === updated.id);
            if (idx > -1) {
              const data = this.dataSource.data.slice();
              data[idx] = updated;
              this.dataSource.data = data;
            }
            this.snackBar.open('Kunde aktualisiert', 'Schließen', { duration: 3000 });
          },
          error: () => this.snackBar.open('Fehler beim Aktualisieren', 'Schließen', { duration: 4000 })
        });
      }
    });
  }

  deleteCustomer(id?: number) {
    if (!id) return;
    // use Material confirm dialog instead of browser confirm()
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Kunde löschen',
        message: 'Möchten Sie den Kunden wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
        confirmText: 'Löschen',
        cancelText: 'Abbrechen'
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.api.deleteCustomer(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
          this.snackBar.open('Kunde gelöscht', 'Schließen', { duration: 3000 });
        },
        error: () => this.snackBar.open('Fehler beim Löschen', 'Schließen', { duration: 4000 })
      });
    });
  }

  private loadCustomers() {
    this.api.getAllCustomers().subscribe({
      next: list => {
        this.dataSource.data = list || [];
      },
      error: () => this.snackBar.open('Fehler beim Laden der Kunden', 'Schließen', { duration: 4000 })
    });
  }

}
