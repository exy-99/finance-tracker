import { Component, inject, computed } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class AnalyticsComponent {
  service = inject(TransactionService);

  readonly categoryBreakdown = computed(() => {
    const transactions = this.service.transaction();
    const breakdown: Record<string, { amount: number; count: number; type: 'income' | 'expense' }> = {};

    for (const t of transactions) {
      if (!breakdown[t.category]) {
        breakdown[t.category] = { amount: 0, count: 0, type: t.type };
      }
      breakdown[t.category].amount += t.amount;
      breakdown[t.category].count += 1;
    }

    return Object.entries(breakdown).map(([category, data]) => ({
      category,
      ...data,
    }));
  });

  readonly topCategory = computed(() => {
    const breakdown = this.categoryBreakdown();
    if (breakdown.length === 0) return null;
    return breakdown.reduce((max, current) => (current.amount > max.amount ? current : max));
  });
}
