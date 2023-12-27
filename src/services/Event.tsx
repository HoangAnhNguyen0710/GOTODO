import { firestore } from "../config/firebase";
import Event from "../models/events";
import { CalendarEvent } from "../pages/Home";
import { BACKGROUND_COLOR, BORDER_COLOR } from "../const/color";

// create event
export async function createEvent(event: Event) {
  const newData = await firestore.collection("Events").add(event);
  return await firestore
    .collection("Events")
    .doc(newData.id)
    .update({ ...event, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
}

// get by name
export async function getEventsByName(name: string) {
  const data = await firestore
    .collection("Events")
    .where("name", ">=", name)
    .where("name", "<=", name + "\uf8ff")
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

// get theo project
export async function getEventsByProjectId(id: string) {
  const data = await firestore
    .collection("Events")
    .where("project_id", "==", id)
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

//get by doc id cho no unique
export async function getTaskByDocId(docId: string) {
  const data = await firestore.collection("Events").doc(docId).get();
  return data.data();
}

// get events theo 1 khoang thoi gian nao do bat ki
export async function getEvents(StartDay: Date, EndDay?: Date) {
  const start = new Date(StartDay);
  start.setHours(0, 0, 0);

  const query = firestore
    .collection("Events")
    .where("started_at", ">=", start.toISOString());

  let data;
  if (EndDay) {
    const end = new Date(EndDay);
    end.setHours(23, 59, 59);
    data = await query.where("ended_at", "<=", end).get();
  } else data = await query.get();
  const dataList = data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
  const convertedList = convertEventToCalendarEvents(dataList as Array<Event>);
  return convertedList;
}

// get events theo 1 khoang thoi gian nao do bat ki
export async function getAllEvents(eventFilter: Array<string>) {
  if (eventFilter.length == 0) {
    eventFilter = ["-1"];
  }
  return await firestore
    .collection("Events")
    .where("project_id", "in", eventFilter);
  //   .get();
  // const dataList = data.docs.map((item) => ({
  //   ...item.data(),
  //   // docId: item.id,
  // }));

  // const convertedList = convertToCalendarEvents(dataList as Array<Event>)
  // return convertedList
}

// update event
export async function updateTask(docId: string | undefined, event: Event) {
  const updatedData = await firestore.collection("Events").doc(docId);

  updatedData
    .update(event)
    .then(() => {
      console.log("Update event successfully!");
    })
    .catch((error) => {
      console.error("Update event failed!", error);
    });
}

const color = ["#44f2e1", "#f0f72f", "#f7902f", "#eb4034"];

export function convertEventToCalendarEvents(events: Array<Event>) {
  const convertedList: Array<CalendarEvent> = [];

  events.map((value) => {
    const convertedData: CalendarEvent = {
      id: value.id,
      calendarId: value.project_id ? value.project_id : "",
      title: value.title,
      category: "time",
      start: value.started_at,
      end: value.ended_at,
      location: value.location,
      body: value.description,
      raw: {
        priority: value.priority,
        reminders: value.reminders,
      },
      backgroundColor: BACKGROUND_COLOR[Number(value.priority)],
      borderColor: BORDER_COLOR[Number(value.priority)],
      state: "state here",
    };

    convertedList.push(convertedData);
  });

  return convertedList;
}
