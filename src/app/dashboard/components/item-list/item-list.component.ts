import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

declare var $: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  selectedIndex: number;
  selectedItem: Item;

  constructor(public itemService: ItemService) {}

  ngOnInit() {}

  showEditModal(index: number, item: Item) {
    this.selectedIndex = index;
    this.selectedItem = item;

    console.log(index, item);

    // show the modal
    $('#editExpenseModal').modal('show');
  }

  editExpense(obj: { index: number; item: Item }) {
    const sub = this.itemService.update(obj.index, obj.item).subscribe(_ => {
      if (sub) {
        sub.unsubscribe();
      }
    });

    // close the modal
    $('#editExpenseModal').modal('hide');
  }

  delete(index: number, item: Item) {
    const sub = this.itemService.delete(index, item).subscribe(_ => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
