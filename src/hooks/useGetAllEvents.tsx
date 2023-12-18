import { useState } from "react"
import { getAllEvents } from "../services/Event"
import { CalendarEvent } from "../pages/Home"


export const useGetAllEvents = async () => {
    const [events, setEvents] = useState<CalendarEvent[]>([])

    await getAllEvents().then((list) => setEvents(list))

    return events
}