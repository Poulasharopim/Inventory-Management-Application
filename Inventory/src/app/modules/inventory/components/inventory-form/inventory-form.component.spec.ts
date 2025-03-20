import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFormComponent } from './inventory-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';
import { of } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InventoryFormComponent', () => {
  let component: InventoryFormComponent;
  let fixture: ComponentFixture<InventoryFormComponent>;
  let inventoryService: InventoryService;
  const mockInventory: InventoryItem[] = [
    {
      id: 1,
      name: 'Item 1',
      category: 'Category A',
      stock: 3,
      lastUpdated: new Date(),
    },
  ];
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [InventoryFormComponent],
      imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            inventory$: of(mockInventory),
            addItem: jasmine.createSpy('addItem'),
            updateItem: jasmine.createSpy('updateItem'),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(InventoryFormComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form with empty values for new item', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    expect(component.inventoryForm.get('name')?.value).toBe('');
    expect(component.inventoryForm.get('category')?.value).toBe('');
    expect(component.inventoryForm.get('stock')?.value).toBe(0);
  });

  it('should initialize form with item values for existing item', () => {
    component.item = { id: 1, name: 'Test Item', category: 'Test Category', stock: 5, lastUpdated: new Date() };
    component.ngOnInit();
    expect(component.inventoryForm.get('name')?.value).toBe('Test Item');
    expect(component.inventoryForm.get('category')?.value).toBe('Test Category');
    expect(component.inventoryForm.get('stock')?.value).toBe(5);
  });

  it('should mark name as invalid when empty', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.get('name')?.setValue('');
    expect(component.inventoryForm.get('name')?.invalid).toBe(true);
  });

  it('should mark category as invalid when empty', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.get('category')?.setValue('');
    expect(component.inventoryForm.get('category')?.invalid).toBe(true);
  });

  it('should mark stock as invalid when negative', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.get('stock')?.setValue(-1);
    expect(component.inventoryForm.get('stock')?.invalid).toBe(true);
  });

  it('should mark stock as valid when non-negative', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.get('stock')?.setValue(5);
    expect(component.inventoryForm.get('stock')?.valid).toBe(true);
  });

  it('should disable form when readonly is true', () => {
    component.item = { id: 1, name: 'Test Item', category: 'Test Category', stock: 5, lastUpdated: new Date() };
    component.readonly = true;
    component.ngOnChanges({ readonly: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false } });
    expect(component.inventoryForm.disabled).toBe(true);
  });

  it('should enable form when readonly is false', () => {
    component.item = { id: 1, name: 'Test Item', category: 'Test Category', stock: 5, lastUpdated: new Date() };
    component.readonly = false;
    component.ngOnChanges({ readonly: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } });
    expect(component.inventoryForm.enabled).toBe(true);
  });

  it('should call addItem when saving a new item', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.setValue({ name: 'New Item', category: 'New Category', stock: 10 });
    component.saveItem();
    expect(inventoryService.addItem).toHaveBeenCalled();
  });

  it('should call updateItem when saving an existing item', () => {
    component.item = { id: 1, name: 'Test Item', category: 'Test Category', stock: 5, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.setValue({ name: 'Updated Item', category: 'Updated Category', stock: 15 });
    component.saveItem();
    expect(inventoryService.updateItem).toHaveBeenCalled();
  });

  it('should not call addItem or updateItem when form is invalid', () => {
    component.item = { id: 0, name: '', category: '', stock: 0, lastUpdated: new Date() };
    component.ngOnInit();
    component.inventoryForm.setValue({ name: '', category: '', stock: -1 });
    component.saveItem();
    expect(inventoryService.addItem).not.toHaveBeenCalled();
    expect(inventoryService.updateItem).not.toHaveBeenCalled();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.close.emit();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
