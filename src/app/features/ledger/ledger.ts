import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction, TypeOfTransaction } from '../../core/models/transaction.model';

type FilterType = 'all' | TypeOfTransaction;
@Component({
  selector: 'app-ledger',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './ledger.html',
  styleUrl: './ledger.scss',
})
export class Ledger {
  service = inject(TransactionService);

  readonly filterOption: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];
  readonly filter = signal<FilterType>('all');

  readonly filterTransactions = computed(() => {
    const all = this.service.transaction();
    const currentFilter = this.filter();

    if (currentFilter === 'all') return all;
    return all.filter((t) => t.type === currentFilter);
  });

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as FilterType;
    this.filter.set(value);
  }

  onDelete(id: string): void {
    this.service.deleteTransaction(id);
  }
}
