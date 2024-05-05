import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UsersManagementService } from '../../shared/services/user/users-management.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const currentUser = inject(UsersManagementService)
  const router = inject(Router)

  if (currentUser.isUserAuthenticated()) {
    return true; 
  } else {
    router.navigate(['']);
    return false;
  }
  
};
