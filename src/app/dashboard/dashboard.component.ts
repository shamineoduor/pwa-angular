import { Component, OnInit, OnDestroy } from '@angular/core';

import { Item } from './models/item';
import { ItemService } from './services/item.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  itemsSub: Subscription;

  constructor(public itemService: ItemService) {}

  ngOnInit() {
    this.itemsSub = this.itemService.getItems().subscribe();
  }

  /**
   * Adds an item to the list
   * @param item to be added to the list
   */
  addExpense(obj: { item: Item; index: number }) {
    this.itemService.add(obj.item);

    // close the modal
    $('#addExpenseModal').modal('hide');
  }

  /**
   * clear all items from the list
   */
  clearAll() {
    this.itemService.clear();
  }

  ngOnDestroy() {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
  }
}
