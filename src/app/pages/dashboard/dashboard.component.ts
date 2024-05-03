import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from '../../core/services/Users/current-user.service';
import { Router, RouterLink } from '@angular/router';
import { UserTaskManagementService } from '../../core/services/Tasks/user-task-management.service';
import { TaskDetails, completedTask } from '../../core/models/task-details';
import { CommonModule } from '@angular/common';
import { returnUserData } from '../../core/models/user-details';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // declarations ---------
  public currentUserData?: returnUserData;
  public taskList: TaskDetails[] = [];
  public completedTaskList: TaskDetails[] = [];
  public completedClass = 'dashboard__task-tiles-task-completed';




// constructor ---------
  constructor(
    private userService: CurrentUserService,
    private taskService: UserTaskManagementService
  ) {
    this.currentUserData = this.userService.getCurrentUser();
  }

  // functions start-------------------------
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

  // function to filter by task status
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

  // function to delete a task from task list 
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

  //function to complete a Task
  completedTaskClicked(taskId: string) {
    const selectedTask = this.taskList.find((task) => task.id === taskId);
    const task: completedTask = {
      id: taskId,
      taskStatus: "completed",
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

  // function to disply and render task by priority on pie chart 
  renderChart(high: number, medium: number, low: number) {
    let chart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ['high', 'medium', 'low'],
        datasets: [
          {
            label: 'Task count',
            data: [high, medium, low],
            backgroundColor: [
              'rgb(255, 44, 44)',
              'rgb(255, 113, 31)',
              'rgb(255, 188, 19)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }



    // functions end-------------------------





  // when OnInit
  ngOnInit(): void {
    this.displayTasks();
    this.renderChart(10, 11, 15);
  }

  // remove this after logout out feature is implemented
  ngOnDestroy(): void {
    // localStorage.clear();
  }
}
