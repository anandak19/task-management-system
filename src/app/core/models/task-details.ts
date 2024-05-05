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
}

export interface updateTaskDetails {
    taskTitle: string | undefined;
    taskDescription: string | undefined;
    dueDate: string | undefined;
    priority: string | undefined;
    taskStatus: string | any;
}
