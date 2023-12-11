import { firestore } from "../config/firebase";
import { Task } from "../models/tasks";

//demo api
export async function createTask(task: Task) {
    const newData = await firestore.collection("Tasks").add(task);
    return await firestore
      .collection("Tasks")
      .doc(newData.id)
      .update({ ...task, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
  }
  
  export async function getTasksByName(name: string) {
    const data = await firestore
      .collection("Tasks")
      .where("name", ">=", name)
      .where("name", "<=", name + "\uf8ff")
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }
  
    export async function getTasksByProjectId(id: string) {
      const data = await firestore
        .collection("Tasks")
        .where("project_id", "==", id)
        .get();
      return data.docs.map((item) => ({
        ...item.data(),
        // docId: item.id,
      }));
    }
    
  //get by doc id cho no unique
  export async function getTaskByDocId(docId: string) {
    const data = await firestore.collection("Tasks").doc(docId).get();
    return data.data();
  }