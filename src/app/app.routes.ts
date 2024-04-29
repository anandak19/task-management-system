import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';

export const routes: Routes = [
  {
    // path: '',
    path: 'nil',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup-page/signup-page.component').then(
        (c) => c.SignupPageComponent
      ),
  },

  {
    // path: 'dashboard',
    path: '',
    // canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'create-task',
        // path: '',
        loadComponent: () =>
          import('./pages/create-task-page/create-task-page.component').then(
            (c) => c.CreateTaskPageComponent
          ),
      },
    ],
  },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./pages/create-task-page/create-task-page.component').then(
  //       (c) => c.CreateTaskPageComponent
  //     ),
  // },
];
