import { TestBed } from '@angular/core/testing';

import { UsersManagementService } from './users-management.service';

describe('UsersManagementService', () => {
  let service: UsersManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
