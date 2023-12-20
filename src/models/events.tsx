export default interface Event {
    id: string,
    project_id?: number,
    started_at: string,
    ended_at: string,
    title: string,
    priority: number,
    description: string,
    location?: string,
}