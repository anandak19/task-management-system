import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserManagementService } from '../services/Users/user-management.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const currentUser = inject(UserManagementService)
  const router = inject(Router)

  if (currentUser.isUserAuthenticated()) {
    return true; 
  } else {
    router.navigate(['']);
    return false;
  }
  
};
