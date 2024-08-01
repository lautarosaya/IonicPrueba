import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./customers/customers.page').then((m) => m.CustomersPage),
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./customer/customer.page').then((m) => m.CustomerPage),
  },
];
