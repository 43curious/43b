/**
 * Query specifications for transactions and categories.
 * This pattern centralizes data fetching logic.
 */

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export const transactionSpecs = {
  list: {
    key: 'transactions:list',
    fetcher: async () => {
      console.log('[API] Fetching transactions...');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return [
        { id: '1', amount: -50.25, category: 'Food', date: '2024-04-19', description: 'Grocery Store' },
        { id: '2', amount: -12.00, category: 'Transport', date: '2024-04-18', description: 'Bus pass' },
        { id: '3', amount: 2500.00, category: 'Salary', date: '2024-04-01', description: 'Monthly Salary' },
      ] as Transaction[];
    }
  },
  detail: (id: string) => ({
    key: `transaction:${id}`,
    fetcher: async () => {
      console.log(`[API] Fetching transaction ${id}...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, amount: -50.25, category: 'Food', date: '2024-04-19', description: 'Grocery Store' } as Transaction;
    }
  })
};

export const categorySpecs = {
  list: {
    key: 'categories:list',
    fetcher: async () => {
      console.log('[API] Fetching categories...');
      await new Promise(resolve => setTimeout(resolve, 400));
      return ['Food', 'Transport', 'Utilities', 'Entertainment', 'Salary'];
    }
  }
};
