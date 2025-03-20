import { Component, OnInit, ViewChild} from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @ViewChild('inventoryTable') inventoryTable!: Table;
  inventory: InventoryItem[] = [];
  filteredInventory: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;
  displayDialog: boolean = false;
  readonlyMode: boolean = false;
  newItem: InventoryItem = {id: 0, name: '', category: '', stock: 0, lastUpdated: new Date()};
  searchValue: string = '';
  stockStatusOptions: any[] = [
    { label: 'All', value: null },
    { label: 'Low Stock', value: 'low' },
    { label: 'In Stock', value: 'in' }
  ];
  selectedStockStatus: string | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.inventory$.subscribe((data) => {
      this.inventory = data;
      this.filteredInventory = [...this.inventory];
    });
  }
  filterGlobal($event: Event, stringVal: string) {
    let searchTextValue = ($event.target as HTMLInputElement).value
    this.inventoryTable.filterGlobal(searchTextValue, stringVal);
  }
  openDialog(item: InventoryItem, readonly: boolean = false) {
    if (item.id === 0) {
      this.selectedItem = { ...this.newItem };
    } else {
      this.selectedItem = item;
    }
    this.readonlyMode = readonly;
    this.displayDialog = true;
  }
  filterByStockStatus() {
    if (this.selectedStockStatus) {
      this.filteredInventory = this.inventory.filter(item => this.getStockStatus(item.stock) === this.selectedStockStatus);
    } else {
      this.filteredInventory = [...this.inventory]; // Reset to all items
    }
  }

  getStockStatus(stock: number): string {
    return stock < 5 ? 'low' : 'in';
  }
}
