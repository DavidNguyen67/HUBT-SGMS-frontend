import { GENDER, STUDENT_PERFORMANCE } from '@common';

export interface ResponsePagination<T> {
  data: T[];
  total: number;
}

export interface User {
  id: string;
  insertedAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  insertedAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  user: User;
  income: boolean;
}

export interface Transaction {
  id: string;
  insertedAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  amount: number;
  description: string;
  transactionDate: string;
  category: Category;
}

export interface User {
  id: string;
  insertedAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean | null;
}

export interface Wallet {
  id: string;
  insertedAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  balance: number;
}
