import { TestBed } from '@angular/core/testing';

import { CurrentUserManagementService } from './current-user-management.service';

describe('CurrentUserManagementService', () => {
  let service: CurrentUserManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
