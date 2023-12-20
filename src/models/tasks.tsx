export interface Task {
    id: string,
    project_id?: number,
    due_at: string,
    title: string,
    priority: number,
    description: string,
    is_done: boolean,
}