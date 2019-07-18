import { Component, OnInit } from '@angular/core';

import { Item } from './models/item';
import { ItemService } from './services/item.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public itemService: ItemService) {}

  ngOnInit() {}

  /**
   * Adds an item to the list
   * @param item to be added to the list
   */
  addExpense(obj: {item: Item, index: number}) {
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
}
