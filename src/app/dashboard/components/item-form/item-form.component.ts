import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit, OnChanges {
  @Input() item: Item;
  @Input() index: number;

  @Output() formSubmit = new EventEmitter();

  itemFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && changes.item.currentValue) {
      this.item = changes.item.currentValue;
    }

    if (changes.index) {
      this.index = changes.index.currentValue;
    }

    this.initForm();
  }

  private initForm() {
    this.itemFormGroup = this.formBuilder.group({
      name: [(this.item && this.item.name) || '', Validators.required],
      description: [(this.item && this.item.description) || ''],
      expenseAmount: [
        (this.item && this.item.expenseAmount) || '',
        [Validators.required, Validators.min(0.0)],
      ],
    });
  }

  /**
   * Form submit handler
   * Emits the form value
   */
  onSubmit() {
    const item = { ...this.itemFormGroup.value } as Item;
    this.formSubmit.emit({ item, index: this.index });

    this.itemFormGroup.reset();
  }
}
