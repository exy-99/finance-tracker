import { Routes } from '@angular/router';

export const routes: Routes = [
  {
path : '',
redirectTo : 'dashboard',
pathMatch : 'full'
},
{
  path : 'dashboard',
  loadComponent :() => import ('./features/dashboard/dashboard')
  .then(m => m.Dashboard)
},
{
    path: 'ledger',
    loadComponent: () => import('./features/ledger/ledger')
      .then(m => m.Ledger)
  }

];
