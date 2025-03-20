import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @ViewChild('inventoryTable') inventoryTable: any;
  inventory: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;
  displayDialog: boolean = false;
  readonlyMode: boolean = false;
  newItem: InventoryItem = {id: 0, name: '', category: '', stock: 0, lastUpdated: new Date()};
  searchValue: string = '';


  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.inventory$.subscribe((data) => {
      this.inventory = data;
    });
  }
  filterGlobal($event: Event, stringVal: string) {
    debugger
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
}
