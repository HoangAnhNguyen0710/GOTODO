export interface Task {
    id: string,
    project_id?: string,
    due_at: string,
    name: string,
    priority: number,
    description: string,
    is_done: boolean,
}