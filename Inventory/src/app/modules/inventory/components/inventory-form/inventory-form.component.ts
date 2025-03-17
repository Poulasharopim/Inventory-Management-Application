import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  @Input() item!: InventoryItem;
  @Input() readonly: boolean = false; // ✅ New input to control read-only mode
  @Output() close = new EventEmitter<void>();

  inventoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryForm = this.fb.group({
      name: [{ value: this.item.name, disabled: this.readonly }, Validators.required],
      category: [{ value: this.item.category, disabled: this.readonly }, Validators.required],
      stock: [{ value: this.item.stock, disabled: this.readonly }, [Validators.required, Validators.min(0)]]
    });
  }

  saveItem() {
    if (this.inventoryForm.valid) {
      const updatedItem: InventoryItem = {
        ...this.item,
        ...this.inventoryForm.value,
      };
      this.inventoryService.updateItem(updatedItem);
      this.close.emit();
    }
  }
}
