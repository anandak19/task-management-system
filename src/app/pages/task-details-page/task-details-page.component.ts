import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTaskManagementService } from '../../core/services/Tasks/user-task-management.service';
import { updateTaskDetails } from '../../core/models/task-details';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-details-page',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './task-details-page.component.html',
  styleUrl: './task-details-page.component.scss',
})
export class TaskDetailsPageComponent {
  taskId!: string;
  selectedTask?: updateTaskDetails;
  isUpdating?: boolean;
  public updatedTaskDetails?: updateTaskDetails;

  public newTitle?: string;
  public newDescription?: string;
  public newDueDate?: string;
  public newPriority?: string;
  public newStatus?: String;
  faBack = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: UserTaskManagementService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskDetails(this.taskId).subscribe(
      (response) => {
        this.selectedTask = {
          taskTitle: response.taskTitle,
          taskDescription: response.taskDescription,
          dueDate: response.dueDate,
          priority: response.priority,
          taskStatus: response.taskStatus,
        };
        this.newTitle = response.taskTitle;
        this.newDescription = response.taskDescription;
        this.newDueDate = response.dueDate;
        this.newPriority = response.priority;
        this.newStatus = response.taskStatus;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }

  goBackClicked() {
    this.location.back();
  }

  onTaskTitleChange(title: string): void {
    this.newTitle = title;
  }
  onDescriptionChange(description: string): void {
    this.newDescription = description;
  }
  onDueDateChange(dueDate: string): void {
    this.newDueDate = dueDate;
  }
  onPriorityChange(priority: string): void {
    this.newPriority = priority;
  }
  onStatusChange(status: string): void {
    this.newStatus = status;
  }

  // function when the update buton is clicked
  updateButtonClicked() {
    if (this.isUpdating) {
      this.isUpdating = !this.isUpdating;

      this.updatedTaskDetails = {
        taskTitle: this.newTitle,
        taskDescription: this.newDescription,
        dueDate: this.newDueDate,
        priority: this.newPriority,
        taskStatus: this.newStatus,
      };

      this.taskService
        .updateTaskDetails(this.taskId, this.updatedTaskDetails)
        .subscribe(
          (response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your task has been updated',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
    } else {
      this.isUpdating = !this.isUpdating;
    }
  }

  // to delete the task completely and navigate back
  deleteButtonClicked() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(this.taskId).subscribe(
          () => {
            // Success case
            Swal.fire({
              title: 'Deleted!',
              text: 'Your task has been deleted.',
              icon: 'success',
            });
            this.goBackClicked();
          },
          (error) => {
            // Error case
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
      }
    });
  }


}
