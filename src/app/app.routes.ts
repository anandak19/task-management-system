import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', title: "Task Manager - Login",
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: 'signup', title: "Signup",
    loadComponent: () =>
      import('./pages/signup-page/signup-page.component').then(
        (c) => c.SignupPageComponent
      ),
  },
  {
    path: 'profile', title: "Profile",
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
    path: 'dashboard', title: "Dashboard",
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
        path: 'create-task', title: "Create Task",
        loadComponent: () =>
          import('./pages/create-task-page/create-task-page.component').then(
            (c) => c.CreateTaskPageComponent
          ),
      },

      {
        path: 'task/:id', title: "Task Details",
        loadComponent: () =>
          import('./pages/task-details-page/task-details-page.component').then(
            (c) => c.TaskDetailsPageComponent
          ),
      },
    ],
  },
];
