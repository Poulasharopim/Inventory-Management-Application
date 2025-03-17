import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './modules/inventory/components/inventory-list/inventory-list.component';

const routes: Routes = [
  { path: '', component: InventoryListComponent }, // Default route
  { path: '**', redirectTo: '' } // Redirect any unknown routes to the main page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
