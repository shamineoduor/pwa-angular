import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items: Item[] = [];

  constructor() {
    this.getItems();
  }

  private persist() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  private getItems() {
    const items = localStorage.getItem('items');

    if (items) {
      this.items = JSON.parse(items);
    }
  }

  /**
   * Add item to item list
   */
  add(item: Item) {
    this.items = [item, ...this.items];
    this.persist();
  }

  /**
   * Update an item
   * @param index zero-based index of the item in the `items` array
   * @param updatedItem updated item
   */
  update(index: number, updatedItem: Item) {
    this.items.splice(index, 1, updatedItem);
    this.persist();
  }

  /**
   * Remove item from the list
   * @param index zero based index of the `item` in the `items`
   */
  delete(index: number) {
    this.items.splice(index, 1);
    this.persist();
  }

  clear() {
    this.items = [];
    this.persist();
  }
}
