import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDetails, completedTask, updateTaskDetails } from '../../models/task-details';

@Injectable({
  providedIn: 'root'
})
export class UserTaskManagementService {
  private userTaskUrl = "http://localhost:3000/userTasks"

  constructor(private _http: HttpClient) { }

  addnewTask(taskDetails: TaskDetails): Observable<any>{
    return this._http.post(`${this.userTaskUrl}`, taskDetails);
  }

  getTask(): Observable<any>{
    return this._http.get(`${this.userTaskUrl}`);
  }

  // get task details with an id  
  getTaskDetails(taskId: string): Observable<any>{
    return this._http.get(`${this.userTaskUrl}/${taskId}`);
  }
  updateTaskDetails(taskId: string, taskDetails: updateTaskDetails): Observable<any>{
    return this._http.put(`${this.userTaskUrl}/${taskId}`, taskDetails);
  }

  deleteTask(taskId: string): Observable<any>{
    return this._http.delete(`${this.userTaskUrl}/${taskId}`);
  }

  updateCompleted(taskId: string, taskStatus: completedTask): Observable<any>{
    return this._http.patch(`${this.userTaskUrl}/${taskId}`, taskStatus)
  }

}
