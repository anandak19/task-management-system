import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskDetails, completedTask } from '../../core/models/task-details';
import { CommonModule } from '@angular/common';
import { returnUserData } from '../../core/models/user-details';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare, faCircle, faCircleCheck, faPlus, faSortDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserManagementService } from '../../shared/services/user/current-user-management.service';
import { TaskManagementService } from '../../shared/services/tasks/task-management.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // declarations ---------
  public currentUserData?: returnUserData;
  public taskList: TaskDetails[] = [];
  public completedClass = 'dashboard__task-tiles-task-completed';
  public chartInstance: Chart | any;

  faTrash = faTrash
  faNotCheck = faCircle;
  faChecked = faCircleCheck;
  faSort = faSortDown;
  faPlus= faPlus;
  faOpen = faArrowUpRightFromSquare;

  // constructor ---------
  constructor(
    private userService: CurrentUserManagementService,
    private taskService: TaskManagementService
  ) {
    this.currentUserData = this.userService.getCurrentUser();
  }

  // when OnInit
  ngOnInit(): void {
    this.renderDashboardData();
  }

// ---------functions start-------

  // to display all tasks
  displayTasks() {
    this.taskService.getTask().subscribe(
      (response) => {
        this.taskList = response;
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: "#3d5653",
        });
      }
    );
  }
  // functions to disply and render task by priority on pie chart
  displayChart() {
    let highPriorityTasks = this.taskList.filter(
      (task) => task.priority === 'high'
    ).length;
    let mediumPriorityTasks = this.taskList.filter(
      (task) => task.priority === 'medium'
    ).length;
    let lowPriorityTasks = this.taskList.filter(
      (task) => task.priority === 'low'
    ).length;
    this.renderChart(highPriorityTasks, mediumPriorityTasks, lowPriorityTasks);
  }
  renderChart(high: number, medium: number, low: number) {
    Chart.register(...registerables);

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart("piechart", {
      type: 'pie',
      data: {
        labels: ['High Priority', 'Medium Priority', 'Low Priority'],
        datasets: [{
          label: 'Task count',
          data: [high, medium, low],
          backgroundColor: ['#9e6f02', '#ca9c30', '#d2c08f'],
          borderColor: ['#9e6f02', '#ca9c30', '#d2c08f'],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
    });
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#3d5653",
          });
        }
      );
    }
  }

  // function to delete a task from task list
  deleteTaskClicked(taskId: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3d5653",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(taskId).subscribe(
          () => {
            // Success case
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            this.renderDashboardData();
          },
          (error) => {
            // Error case
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              confirmButtonColor: "#3d5653",
            });
          }
        );

      }
    });




  }

  //function to mark a task as completed
  completedTaskClicked(taskId: string) {
    const task: completedTask = {
      id: taskId,
      taskStatus: 'completed',
    };
    this.taskService.updateCompleted(taskId, task).subscribe(
      () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully completed the task",
          showConfirmButton: false,
          timer: 2000
        });
        this.renderDashboardData();
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: "#3d5653",
        });
      }
    );
  }

  // to display all tasks and pie chart 
  renderDashboardData() {
    this.displayTasks();
    setTimeout(() => {
      this.displayChart();
    }, 800);
  }

// ---------functions end-------
}
