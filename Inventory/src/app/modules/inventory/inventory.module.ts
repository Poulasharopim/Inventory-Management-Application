import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

@NgModule({
  declarations: [InventoryListComponent, InventoryFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TableModule, BrowserAnimationsModule ,ButtonModule, DialogModule, InputTextModule, InputNumberModule],
  exports: [InventoryListComponent, InventoryFormComponent]
})
export class InventoryModule {}
