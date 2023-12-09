export interface Task {
    id: string,
    project_id?: string,
    due_at: Date,
    name: string,
    priority: number,
    description: string,
    is_done: boolean,
}