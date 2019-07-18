import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  itemFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.itemFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      expenseAmmount: ['', [Validators.required, Validators.min(0.0)]],
    });
  }

  addExpense() {}
}
