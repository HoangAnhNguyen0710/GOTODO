export interface Event {
    id: string,
    project_id?: string,
    started_at: Date,
    ended_at: Date,
    title: string,
    priority: number,
    description: string,
    location?: string,
}