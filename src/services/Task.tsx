import { firestore } from "../config/firebase";
import { Task } from "../models/tasks";
import { CalendarEvent } from "../pages/Home";

// create task
export async function createTask(task: Task) {
    const newData = await firestore.collection("Tasks").add(task);
    return await firestore
      .collection("Tasks")
      .doc(newData.id)
      .update({ ...task, id: newData.id }); // update id thanh docId de truy van cho de, create cai gi minh cung nen ntn
  }

// get tasks by name
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

// get tasks theo ngay
export async function getDailyTasks(Day: Date, Filter: Array<string>) {
    if( Filter.length == 0){
      Filter = ["-1"]
    }
    const start = new Date(Day)
    start.setHours(0, 0, 0)

    const end = new Date(Day)
    end.setHours(23, 59, 59)

    const data = await firestore
      .collection("Tasks")
      .where("due_at", "<=", end.toISOString())
      .where("due_at", ">=", start.toISOString())
      .where("project_id", "in", Filter)
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }

  export async function getDailyTasksNum(Day: Date) {
    const start = new Date(Day)
    start.setHours(0, 0, 0)

    const end = new Date(Day)
    end.setHours(23, 59, 59)

    const data = await firestore
      .collection("Tasks")
      .where("due_at", "<=", end.toISOString())
      .where("due_at", ">=", start.toISOString())
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }

// get task theo tuan
export async function getWeeklyTasks(Day: Date) {
    
  const weekDay = Day.getDay()
  const monthDay = Day.getDate()
  const month = Day.getMonth()

  // ngay dau tuan
  const start = new Date(Day)
  start.setMonth(month, monthDay - weekDay + 1)
  start.setHours(0, 0, 0)

  // ngay cuoi tuan
  const end = new Date(Day)
  end.setMonth(month, monthDay - weekDay + 7)
  end.setHours(23, 59, 59)
  
  const data = await firestore
    .collection("Tasks")
    .where("due_at", "<=", end.toISOString())
    .where("due_at", ">=", start.toISOString())
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

// get task theo 1 khoang thoi gian nao do bat ki
export async function getTasks(StartDay: Date, EndDay: Date) {
  const start = new Date(StartDay)
  start.setHours(0, 0, 0)

  const end = new Date(EndDay)
  end.setHours(23, 59, 59)

  const data = await firestore
    .collection("Tasks")
    .where("due_at", "<=", end.toISOString())
    .where("due_at", ">=", start.toISOString())
    .get();
  return data.docs.map((item) => ({
    ...item.data(),
    // docId: item.id,
  }));
}

// get task theo thang
export async function getMontlyTasks(Day: Date) {
    
    const month = Day.getMonth()
    // ngay dau thang
    const start = new Date(Day)
    start.setMonth(month, 1)
    start.setHours(0, 0, 0)

    // ngay cuoi thang
    const end = new Date(Day)
    end.setMonth(month + 1, 0)
    end.setHours(23, 59, 59)

    const data = await firestore
      .collection("Tasks")
      .where("due_at", "<=", end.toISOString())
      .where("due_at", ">=", start.toISOString())
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }

// get task qua han
export async function getPassDueTasks(Day: Date, Filter: Array<string>) {
    if( Filter.length == 0){
      Filter = ["-1"]
    }
    const start = new Date(Day)
    start.setHours(0, 0, 0)

    const f = false
    const data = await firestore
      .collection("Tasks")
      .where("due_at", "<=", start.toISOString())
      .where("is_done", "==", f)
      .where("project_id", "in", Filter)
      .get();
    return data.docs.map((item) => ({
      ...item.data(),
      // docId: item.id,
    }));
  }

// update task
export async function updateTask(
  docId: string | undefined,
  task: Task,
): Promise<boolean | void>{

    return await firestore.collection("Tasks").doc(docId)
    .update(task)
    .then(() => {
      console.log("Update task successfully!");
      return true
    })
    .catch((error) => {
      console.error("Update task failed!", error);
      return false
    });
  }
  
export async function getAllTasks(taskFilter: Array<string>) {
  if( taskFilter.length == 0){
    taskFilter = ["-1"]
  }
  const data = await firestore
    .collection("Tasks")
    .where("project_id", "in", taskFilter)
    .get();
  const dataList = data.docs.map((item) => ({
    ...item.data(),
  }));

  const convertedList = convertToCalendarEvents(dataList as Array<Task>)
  return convertedList
}

const color = ["#44f2e1", "#f0f72f", "#f7902f", "#eb4034"]

export function convertToCalendarEvents(tasks: Array<Task>) {

  const convertedList: Array<CalendarEvent> = []

  tasks.map((value) => {
    const convertedData: CalendarEvent = {
      id: value.id,
      calendarId: value.project_id ? value.project_id : '',
      title: value.title,
      category: 'task',
      end: value.due_at,
      body: value.description,
      raw: {
        priority: value.priority
      },
      backgroundColor: color[value.priority],
      state: 'state here'
    }

    convertedList.push(convertedData)
  })

  return convertedList
}