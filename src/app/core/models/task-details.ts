export interface TaskDetails {
    id: string;
    taskTitle: string;
    taskDescription: string;
    userName: string;
    dueDate: string;
    priority: string;
    taskStatus: string;
    isCompleted: boolean;
}

export interface completedTask{
    id: string;
    taskStatus: string;
    isCompleted: boolean;
}
