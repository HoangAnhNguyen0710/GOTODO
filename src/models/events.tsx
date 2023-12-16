export default interface Event {
    id: string,
    project_id?: string,
    started_at: string,
    ended_at: string,
    title: string,
    priority: 0 | 1 | 2,
    description: string,
    location?: string,
}