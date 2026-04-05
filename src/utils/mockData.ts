import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'Income', description: 'October Salary' },
  { id: '2', date: '2023-10-02T12:30:00Z', amount: 50, category: 'Food', type: 'Expense', description: 'Lunch at Cafe' },
  { id: '3', date: '2023-10-05T09:15:00Z', amount: 120, category: 'Utilities', type: 'Expense', description: 'Electric Bill' },
  { id: '4', date: '2023-10-10T18:45:00Z', amount: 200, category: 'Travel', type: 'Expense', description: 'Train Ticket' },
  { id: '5', date: '2023-10-15T14:20:00Z', amount: 15, category: 'Entertainment', type: 'Expense', description: 'Movie Streaming' },
  { id: '6', date: '2023-10-18T10:00:00Z', amount: 300, category: 'Freelance', type: 'Income', description: 'Design Work' },
  { id: '7', date: '2023-10-20T20:00:00Z', amount: 80, category: 'Food', type: 'Expense', description: 'Groceries' },
  { id: '8', date: '2023-10-25T11:30:00Z', amount: 60, category: 'Shopping', type: 'Expense', description: 'Shoes' },
  { id: '9', date: '2023-10-28T09:00:00Z', amount: 1500, category: 'Housing', type: 'Expense', description: 'Rent' },
  { id: '10', date: '2023-11-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'Income', description: 'November Salary' },
  { id: '11', date: '2023-11-03T13:40:00Z', amount: 45, category: 'Food', type: 'Expense', description: 'Dinner' },
  { id: '12', date: '2023-11-08T16:20:00Z', amount: 250, category: 'Travel', type: 'Expense', description: 'Flight to NY' },
  { id: '13', date: '2023-11-12T10:15:00Z', amount: 90, category: 'Utilities', type: 'Expense', description: 'Internet Bill' },
  { id: '14', date: '2023-11-15T08:30:00Z', amount: 20, category: 'Food', type: 'Expense', description: 'Coffee runs' },
];
