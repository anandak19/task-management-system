import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTaskManagementService } from '../../core/services/Tasks/user-task-management.service';
import { TaskDetails, updateTaskDetails } from '../../core/models/task-details';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { SrvRecord } from 'dns';

@Component({
  selector: 'app-task-details-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: UserTaskManagementService,
    private location: Location
  ) {}

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
    this.isUpdating = !this.isUpdating;
    
    this.updatedTaskDetails = {
      taskTitle: this.newTitle,
      taskDescription: this.newDescription,
      dueDate: this.newDueDate,
      priority: this.newPriority,
      taskStatus: this.newStatus,
    };
    // console.log(this.updatedTaskDetails);
    // console.log(this.taskId);

    this.taskService
      .updateTaskDetails(this.taskId, this.updatedTaskDetails)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
          // toast error message
          // Handle any errors that occur during the HTTP request
        }
      );
  }
  // to delete the task completely and navigate back 
  deleteButtonClicked(){
    this.taskService.deleteTask(this.taskId ).subscribe(
      () => {
        // Success case
        console.log('Task deleted successfully');
        this.goBackClicked()
        // perform any additional actions after successful deletion
      },
      (error) => {
        // Error case
        console.error('Error deleting task:', error);
        // display an error message or perform other error handling actions
      }
    );
  }

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
        console.error('Error:', error);
        // toast error message
        // Handle any errors that occur during the HTTP request
      }
    );
  }
}
