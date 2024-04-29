import { TestBed } from '@angular/core/testing';

import { UserTaskManagementService } from './user-task-management.service';

describe('UserTaskManagementService', () => {
  let service: UserTaskManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTaskManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
