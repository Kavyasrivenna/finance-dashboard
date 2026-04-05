import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, UserRole } from '../types';
import { mockTransactions } from '../utils/mockData';

interface FinanceState {
  transactions: Transaction[];
  userRole: UserRole;
  darkMode: boolean;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updated: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setUserRole: (role: UserRole) => void;
  toggleDarkMode: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      userRole: 'Admin',
      darkMode: false,

      addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: generateId() }, ...state.transactions]
      })),

      updateTransaction: (id, updated) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...t, ...updated } : t
        )
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      setUserRole: (role) => set({ userRole: role }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'finance-dashboard-storage',
    }
  )
);
