import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserManagementService } from '../../shared/services/user/current-user-management.service';
import { TaskManagementService } from '../../shared/services/tasks/task-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss',
})
export class CreateTaskPageComponent {
  // declarations
  newTask!: FormGroup;
  isTaskSubmited = false;
  public myClass = 'create-task__is-invalid';
  faBack = faArrowLeft;

  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskManagementService,
    private _route: Router,
    private location: Location,
    private currentUser: CurrentUserManagementService
  ) {}

  ngOnInit(): void {
    // initialValue for date
    let initialValue = new Date();

    // form
    this.newTask = this._fb.group({
      taskTitle: ['', [Validators.required, Validators.maxLength(60)]],
      taskDescription: ['', [Validators.required]],
      dueDate: [
        initialValue,
        [Validators.required, this.dateChangedValidator(initialValue)],
      ],
      priority: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]],
    });
  }

  // navigate back
  goBackClicked() {
    this.location.back();
  }

  // check if the date input is changed or not
  dateChangedValidator(initialValue: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = control.value;
      const isChanged = currentDate.getTime() !== initialValue.getTime();
      return isChanged ? null : { dateNotChanged: true };
    };
  }

  // to add new task
  addTask() {
    this.isTaskSubmited = true;
    if (this.newTask.valid) {
      this._taskService.addnewTask(this.newTask.value).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Task added successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          this._route.navigateByUrl('dashboard');
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add task. Please try again later.',
            confirmButtonColor: '#3d5653',
          });
        }
      );
    }
  }
}
