import { ResourceProps } from '@refinedev/core';

export const resources: Array<ResourceProps> = [
  {
    name: 'Dashboard',
    list: '/dashboard',
  },
  {
    name: 'Transactions',
    list: '/transactions',
    create: '/transactions/create',
    edit: '/transactions/edit/:id',
    show: '/transactions/show/:id',
  },
  {
    name: 'Categories',
    list: '/categories',
    create: '/categories/create',
    edit: '/categories/edit/:id',
    show: '/categories/show/:id',
  },
];
