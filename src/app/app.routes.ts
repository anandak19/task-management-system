import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
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
    path: 'profile',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/user-profile/user-profile.component').then(
            (c) => c.UserProfileComponent
          ),
      },
    ],
  },

  {
    path: 'dashboard',
    // path: '',
    canActivateChild: [authGuard],
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
        loadComponent: () =>
          import('./pages/create-task-page/create-task-page.component').then(
            (c) => c.CreateTaskPageComponent
          ),
      },

      {
        path: 'task/:id',
        loadComponent: () =>
          import('./pages/task-details-page/task-details-page.component').then(
            (c) => c.TaskDetailsPageComponent
          ),
      },
    ],
  },
];
