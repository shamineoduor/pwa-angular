import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Item } from '../models/item';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  ENDPOINT = 'expenses';

  items: Item[] = [];

  constructor(private http: HttpService, private authService: AuthService) {}

  getItems(): Observable<Item[]> {
    return this.http.makeRequest('GET', this.ENDPOINT).pipe(
      map((resp: any) => resp.data as Item[]),
      tap(items => {
        this.items = items
          .filter(
            item => item.userId === this.authService.getCurrentUser().user.id,
          )
          .sort((a, b) => {
            if (a.id > b.id) {
              return -1;
            }
            if (a.id < b.id) {
              return 1;
            }

            return 0;
          });
      }),
    );
  }

  /**
   * Add item to item list
   */
  add(item: Item): Observable<Item> {
    return this.http
      .makeRequest('POST', this.ENDPOINT, true, item)
      .pipe(tap((_: Item) => {}));
  }

  /**
   * Update an item
   * @param index zero-based index of the item in the `items` array
   * @param updatedItem updated item
   */
  update(index: number, updatedItem: Item) {
    return this.http
      .makeRequest(
        'PUT',
        `${this.ENDPOINT}/${updatedItem.id}`,
        true,
        updatedItem,
      )
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

  getSum(): Observable<number> {
    let sum = 0;

    this.items.forEach(a => (sum += +a.expenseAmount));

    return of(sum);
  }

  clear() {
    this.items = [];
  }
}
