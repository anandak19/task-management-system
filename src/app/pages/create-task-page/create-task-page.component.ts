import { CommonModule } from '@angular/common';
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
import { UserTaskManagementService } from '../../core/services/Tasks/user-task-management.service';

@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss',
})
export class CreateTaskPageComponent {
  constructor(
    private _fb: FormBuilder, private _taskService: UserTaskManagementService, private _route: Router,
  ) // private currentUser: CurrentUserService
  {}

  newTask!: FormGroup;
  isTaskSubmited = false;
  public myClass = 'create-task__is-invalid';

  ngOnInit(): void {
    const initialValue = new Date();

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

  dateChangedValidator(initialValue: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = control.value;
      const isChanged = currentDate.getTime() !== initialValue.getTime();
      return isChanged ? null : { dateNotChanged: true };
    };
  }

  addTask() {
    this.isTaskSubmited = true;
    if (this.newTask.valid) {
      this._taskService.addnewTask(this.newTask.value).subscribe(
        (response) => {
          // this._route.navigateByUrl('');
          // correct path 
          this._route.navigateByUrl('dashboard');
          // add a sucessfull add task toaster message here ------------
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

      // Proceed with adding the task
    } else {
      console.log('not valid');

      // Handle invalid form submission
      // Maybe display error messages or take other actions
    }
  }
}
