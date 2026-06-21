import { signal, Injectable, computed } from "@angular/core";
import { Transaction } from "../models/transaction.model";

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
    private readonly _transactions = signal<Transaction[]>([
    {
      id: '1',
      amount: 2500,
      category: 'Salary',
      type: 'income',
      date: new Date('2024-06-01'),
      description: 'Monthly paycheck'
    },
    {
      id: '2',
      amount: 85.50,
      category: 'Groceries',
      type: 'expense',
      date: new Date('2024-06-03'),
      description: 'Weekly shop'
    },
    {
      id: '3',
      amount: 120,
      category: 'Freelance',
      type: 'income',
      date: new Date('2024-06-05'),
      description: 'Logo design gig'
    }
    ]);

    //publically readonly acccess
    readonly transaction = this._transactions.asReadonly();

    //computed value
    readonly totalIncome = computed(() =>
      this._transactions()
        .filter((t): t is Transaction => t.type === 'income')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
      );

        readonly totalExpense = computed(() =>
      this._transactions()
        .filter((t): t is Transaction => t.type === 'expense')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
      );

      readonly balance = computed(() => this.totalIncome() - this.totalExpense());

      //method to add a transaction
      addTransaction(data: Omit<Transaction, 'id'>): void {
        const newTransaction: Transaction = {
          ...data,
          id:crypto.randomUUID()
        };
        this._transactions.update(current => [...current, newTransaction]);
      }
      //method to delete a transaction
      deleteTransaction(id: string): void {
        this._transactions.update(current => current.filter(t => t.id !== id));
      }
  }
