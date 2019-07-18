import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, ItemListComponent, ItemFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
