import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit, OnChanges {
  @Input() item!: InventoryItem;
  @Input() readonly: boolean = false;
  @Output() close = new EventEmitter<void>();

  inventoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && !changes['item'].firstChange) {
      this.initializeForm();
    }
    if (changes['readonly'] && !changes['readonly'].firstChange) {
      this.setReadonlyState();
    }
  }

  private initializeForm() {
    if (this.item.id === 0) {
      this.inventoryForm = this.fb.group({
        name: ['', Validators.required],
        category: ['', Validators.required],
        stock: [0, [Validators.required, Validators.min(0)]]
      });
    } else {
      this.inventoryForm = this.fb.group({
        name: [this.item.name, Validators.required],
        category: [this.item.category, Validators.required],
        stock: [this.item.stock, [Validators.required, Validators.min(0)]]
      });
    }
    this.setReadonlyState();
  }

  private setReadonlyState() {
    if (this.readonly) {
      this.inventoryForm.disable();
    } else {
      this.inventoryForm.enable();
    }
  }

  saveItem() {
    if (this.inventoryForm.valid) {
      const updatedItem: InventoryItem = {
        ...this.item,
        ...this.inventoryForm.value,
      };
      if (this.item.id === 0) {
        updatedItem.id = Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
        this.inventoryService.addItem(updatedItem);
        this.close.emit();
      } else {
        this.inventoryService.updateItem(updatedItem);
        this.close.emit();
      }
    }
  }
}
