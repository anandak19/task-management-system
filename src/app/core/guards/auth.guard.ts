import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../services/Users/current-user.service';
import { UserManagementService } from '../services/Users/user-management.service';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(UserManagementService)
  const router = inject(Router)

  if (currentUser.isUserAuthenticated()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false;
  }
  
};
