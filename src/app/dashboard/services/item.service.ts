import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Item } from '../models/item';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  ENDPOINT = 'expenses';

  items: Item[] = [];

  constructor(private http: HttpService) {}

  getItems(): Observable<Item[]> {
    return this.http.makeRequest('GET', this.ENDPOINT).pipe(
      map((resp: any) => resp.data as Item[]),
      tap(items => {
        this.items = items;
      }),
    );
  }

  /**
   * Add item to item list
   */
  add(item: Item): Observable<Item> {
    return this.http.makeRequest('POST', this.ENDPOINT, true, item).pipe(
      tap((newItem: Item) => {
        this.items = [newItem, ...this.items];
      }),
    );
  }

  /**
   * Update an item
   * @param index zero-based index of the item in the `items` array
   * @param updatedItem updated item
   */
  update(index: number, updatedItem: Item) {
    return this.http
      .makeRequest('PUT', `${this.ENDPOINT}/${updatedItem.id}`)
      .pipe(
        tap((item: Item) => {
          this.items[index] = item;
        }),
      );
  }

  /**
   * Remove item from the list
   * @param index zero based index of the `item` in the `items`
   */
  delete(index: number, item: Item) {
    return this.http.makeRequest('DELETE', `${this.ENDPOINT}/${item.id}`).pipe(
      tap(_ => {
        this.items.splice(index, 1);
      }),
    );
  }

  clear() {
    this.items = [];
  }
}
