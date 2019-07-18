import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [DashboardComponent, ItemListComponent],
  imports: [CommonModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}
