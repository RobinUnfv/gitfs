import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashbord',
    loadComponent: () => import('./gifs/components/dashboard-page/dashboard-page'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/components/trending-page/trending-page'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/components/search-page/search-page'),
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'dashbord'
  }
];
