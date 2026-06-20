export type TypeOfTransaction = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: TypeOfTransaction;
  date: Date;
  description?: string;
}
