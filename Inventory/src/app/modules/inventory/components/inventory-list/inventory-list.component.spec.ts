import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListComponent } from './inventory-list.component';
import { InventoryService } from '../../services/inventory.service';
import { of } from 'rxjs';
import { InventoryItem } from '../../models/inventory.model';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let inventoryService: InventoryService;

  const mockInventory: InventoryItem[] = [
    {
      id: 1,
      name: 'Item 1',
      category: 'Category A',
      stock: 3,
      lastUpdated: new Date(),
    },
    {
      id: 2,
      name: 'Item 2',
      category: 'Category B',
      stock: 7,
      lastUpdated: new Date(),
    },
    {
      id: 3,
      name: 'Item 3',
      category: 'Category A',
      stock: 1,
      lastUpdated: new Date(),
    },
    {
      id: 4,
      name: 'Item 4',
      category: 'Category C',
      stock: 10,
      lastUpdated: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryListComponent],
      imports: [
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputNumberModule,
        TooltipModule,
        DropdownModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            inventory$: of(mockInventory),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter items by low stock', () => {
    component.selectedStockStatus = 'low';
    component.filterByStockStatus();
    expect(component.filteredInventory.length).toBe(2);
    expect(component.filteredInventory.every((item) => item.stock < 5)).toBe(
      true
    );
  });

  it('should filter items by in stock', () => {
    component.selectedStockStatus = 'in';
    component.filterByStockStatus();
    expect(component.filteredInventory.length).toBe(2);
    expect(component.filteredInventory.every((item) => item.stock >= 5)).toBe(
      true
    );
  });

  it('should show all items when no stock status is selected', () => {
    component.selectedStockStatus = null;
    component.filterByStockStatus();
    expect(component.filteredInventory.length).toBe(4);
    expect(component.filteredInventory).toEqual(mockInventory);
  });
});
