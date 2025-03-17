import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InventoryItem } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private inventorySubject = new BehaviorSubject<InventoryItem[]>([]);
  inventory$ = this.inventorySubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchInventory();
  }

  fetchInventory() {
    this.http.get<any[]>(this.apiUrl).pipe(
      map(products =>
        products.map(product => ({
          id: product.id,
          name: product.title,
          category: product.category,
          stock: Math.floor(Math.random() * 20), // Random stock quantity
          lastUpdated: new Date()
        }))
      )
    ).subscribe(data => this.inventorySubject.next(data));
  }

  updateItem(updatedItem: InventoryItem) {
    const updatedData = this.inventorySubject.value.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.inventorySubject.next(updatedData);
  }
}
