import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from '../../core/services/Users/current-user.service';
import { Router, RouterLink } from '@angular/router';
import { UserTaskManagementService } from '../../core/services/Tasks/user-task-management.service';
import { TaskDetails, completedTask } from '../../core/models/task-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // declarations ---------
  currentUser: any;
  public taskList: TaskDetails[] = [];
  public completedTaskList: TaskDetails[] = [];
  public completedClass = 'dashboard__task-tiles-task-completed';




// constructor ---------
  constructor(
    private userService: CurrentUserService,
    private taskService: UserTaskManagementService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  // functions ------------
  // to display all tasks 
  displayTasks() {
    this.taskService.getTask().subscribe(
      (response) => {
        this.taskList = response;
      },
      (error) => {
        console.error('Error:', error);
        // toast error message
        // Handle any errors that occur during the HTTP request
      }
    );
  }

  // function to filter
  selectItem(filterItem: string): void {
    if (filterItem === 'alltasks') {
      this.displayTasks();
    } else {
      this.taskService.getTask().subscribe(
        (response) => {
          this.taskList = response.filter((task: { taskStatus: string }) => {
            return task.taskStatus === filterItem;
          });
        },
        (error) => {
          console.error('Error:', error);
          // Handle any errors that occur during the HTTP request
        }
      );
    }
  }

  deleteTaskClicked(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // Success case
        this.displayTasks();
        console.log('Task deleted successfully');
        // perform any additional actions after successful deletion
      },
      (error) => {
        // Error case
        console.error('Error deleting task:', error);
        // display an error message or perform other error handling actions
      }
    );
  }

  // completedTask
  completedTaskClicked(taskId: string) {
    const selectedTask = this.taskList.find((task) => task.id === taskId);
    const task: completedTask = {
      id: taskId,
      taskStatus: "completed",
      isCompleted: true
  };
  this.taskService.updateCompleted(taskId, task).subscribe(
    (response) => {
      console.log(response);
      // toast a completed message ----------------
      this.displayTasks()
      
    },
    (error) => {
      console.error('Error:', error);
      // toast error message------------------
      // Handle any errors that occur during the HTTP request
    }
  )

    
  }



  // when OnInit
  ngOnInit(): void {
    this.displayTasks();
  }

  // remove this after logout out feature is implemented
  ngOnDestroy(): void {
    localStorage.clear();
  }
}
