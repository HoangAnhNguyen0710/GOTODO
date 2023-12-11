import { firestore } from "../config/firebase";
import { Event } from "../models/events";

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
export async function getEvents(StartDay: Date, EndDay: Date) {
    const start = new Date(StartDay)
    start.setHours(0, 0, 0)
  
    const end = new Date(EndDay)
    end.setHours(23, 59, 59)
  
    const data = await firestore
      .collection("Events")
      .where("ended_at", "<=", end)
      .where("started_at", ">=", start)
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }

// update event
export async function updateTask(
    docId: string | undefined,
    event: Event,
  ) {
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