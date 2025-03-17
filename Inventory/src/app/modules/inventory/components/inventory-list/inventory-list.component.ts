import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventory: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;
  displayDialog: boolean = false;
  readonlyMode: boolean = false; // ✅ Controls whether the form is read-only

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.inventory$.subscribe(data => {
      this.inventory = data;
    });
  }

  openDialog(item: InventoryItem, readonly: boolean = false) {
    this.selectedItem = { ...item };
    this.readonlyMode = readonly;
    this.displayDialog = true;
  }
}
