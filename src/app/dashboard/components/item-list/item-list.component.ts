import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [
    { name: 'Organic GMO Seeds', expenseAmount: 1000 },
    { name: 'Labour', expenseAmount: 2000 },
    { name: 'Repairs and Maintenance', expenseAmount: 400 },
  ];

  constructor() {}

  ngOnInit() {}

  editItem(item: Item) {}
}
