import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Customer>(customers);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

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

  // expose raw customers as well
  customers = customers;
}

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Musterfirma GmbH',
    email: 'info@musterfirma.de',
    contactPerson: 'Max Mustermann',
    street: 'Musterstraße 1',
    postalCode: '12345',
    location: 'Musterstadt',
    mainNumber: '+49 30 1234567'
  },
  {
    id: 2,
    name: 'Beispielfirma AG',
    email: 'kontakt@beispielfirma.de',
    contactPerson: 'Anna Beispiel',
    street: 'Beispielweg 2',
    postalCode: '54321',
    location: 'Beispielstadt',
    mainNumber: '+49 40 7654321'
  },
  {
    id: 3,
    name: 'Schneider & Söhne KG',
    email: 'office@schneider-soehne.de',
    contactPerson: 'Thomas Schneider',
    street: 'Industriestraße 15',
    postalCode: '70173',
    location: 'Stuttgart',
    mainNumber: '+49 711 998877'
  },
  {
    id: 4,
    name: 'IT Solutions Müller',
    email: 'support@mueller-it.de',
    contactPerson: 'Laura Müller',
    street: 'Techpark 3',
    postalCode: '80331',
    location: 'München',
    mainNumber: '+49 89 112233'
  },
  {
    id: 5,
    name: 'Kreativwerkstatt Weber',
    email: 'kontakt@weber-kreativ.de',
    contactPerson: 'Daniel Weber',
    street: 'Ateliergasse 7',
    postalCode: '50667',
    location: 'Köln',
    mainNumber: '+49 221 445566'
  },
  {
    id: 6,
    name: 'Bauunternehmen Fischer GmbH',
    email: 'info@fischer-bau.de',
    contactPerson: 'Peter Fischer',
    street: 'Baustraße 22',
    postalCode: '90402',
    location: 'Nürnberg',
    mainNumber: '+49 911 778899'
  },
  {
    id: 7,
    name: 'Handelshaus König',
    email: 'service@koenig-handel.de',
    contactPerson: 'Sabine König',
    street: 'Marktplatz 5',
    postalCode: '28195',
    location: 'Bremen',
    mainNumber: '+49 421 334455'
  },
  {
    id: 8,
    name: 'Logistikzentrum Braun',
    email: 'logistik@braun-transporte.de',
    contactPerson: 'Michael Braun',
    street: 'Hafenstraße 18',
    postalCode: '20457',
    location: 'Hamburg',
    mainNumber: '+49 40 998877'
  },
  {
    id: 9,
    name: 'Medienagentur Hoffmann',
    email: 'hello@hoffmann-media.de',
    contactPerson: 'Julia Hoffmann',
    street: 'Medienallee 9',
    postalCode: '10115',
    location: 'Berlin',
    mainNumber: '+49 30 556677'
  },
  {
    id: 10,
    name: 'Consulting Partner Richter',
    email: 'beratung@richter-consulting.de',
    contactPerson: 'Stefan Richter',
    street: 'Businesspark 12',
    postalCode: '60311',
    location: 'Frankfurt am Main',
    mainNumber: '+49 69 223344'
  }
];
