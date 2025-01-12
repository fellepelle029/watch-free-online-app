import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/main/main.component').then(m => m.MainComponent),
    data: { title: 'Главная', animation: 'Main' }
  },
  {
    path: 'film/:movieId',
    loadComponent: () => import('./views/movie/movie.component').then(m => m.MovieComponent),
    data: { animation: 'Movie' }
  },
];
