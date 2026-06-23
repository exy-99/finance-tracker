import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction, TypeOfTransaction } from '../../core/models/transaction.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  service = inject(TransactionService);
  fb = inject(FormBuilder);

  transactionTypes: TypeOfTransaction[] = ['income', 'expense'];

  form = this.fb.group({
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    category: ['', [Validators.required, Validators.maxLength(50)]],
    type: ['' as TypeOfTransaction | '', Validators.required],
    date: ['', Validators.required],
    description: ['', Validators.maxLength(200)],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();

    this.service.addTransaction({
      amount: raw.amount!,
      category: raw.category!,
      type: raw.type! as TypeOfTransaction,
      date: new Date(raw.date!),
      description: raw.description || undefined,
    });

    this.form.reset();
  }

  get amount() { return this.form.get('amount')!; }
  get category() { return this.form.get('category')!; }
  get type() { return this.form.get('type')!; }
  get date() { return this.form.get('date')!; }
  get description() { return this.form.get('description')!; }
}
