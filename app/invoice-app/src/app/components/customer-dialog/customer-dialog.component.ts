import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../api-client/model/customer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type CustomerDialogMode = 'create' | 'view' | 'edit';

@Component({
  standalone: true,
  selector: 'app-customer-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent {
  mode: CustomerDialogMode = 'create';
  form: any;
  readonlyMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode?: CustomerDialogMode; customer?: Customer }
  ) {
    // initialize form after fb is injected
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      mainNumber: [''],
      contactPerson: [''],
      street: [''],
      postalCode: [''],
      location: ['']
    });
    this.mode = data?.mode || 'create';
    if (data?.customer) {
      this.form.patchValue({
        name: data.customer.name || '',
        email: data.customer.email || '',
        mainNumber: data.customer.mainNumber || '',
        contactPerson: data.customer.contactPerson || '',
        street: data.customer.street || '',
        postalCode: data.customer.postalCode || '',
        location: data.customer.location || ''
      });
    }

    // use readonly inputs for view mode so fields don't get greyed-out
    this.readonlyMode = this.mode === 'view';
  }

  save() {
    if (this.mode === 'view') {
      this.dialogRef.close();
      return;
    }

    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const result: Customer = {
        id: this.data?.customer?.id,
        name: raw.name,
        email: raw.email,
        mainNumber: raw.mainNumber,
        contactPerson: raw.contactPerson,
        street: raw.street,
        postalCode: raw.postalCode,
        location: raw.location
      };
      this.dialogRef.close(result);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
