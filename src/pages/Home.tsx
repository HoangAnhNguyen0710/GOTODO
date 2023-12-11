import { useEffect } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";
import { Task } from "../models/tasks";
import { createTask, getDailyTasks, getMontlyTasks, getPassDueTasks, getWeeklyTasks } from "../services/Task";

function Home() {
  useEffect(() => {
    // async function createT(task: Task) {
    //   return await createTask(task)
    // }

    async function getDaily(Day: Date) {
      const data = await getWeeklyTasks(Day)
      console.log(data)
      const passDue = await getPassDueTasks(Day)
      console.log(passDue)
      return data
    }

    // async function getMonthly(Day: Date) {
    //   const data = await getMontlyTasks(Day)
    //   console.log(data)
    //   return data
    // }
    
    // const task1 = {
    //   id: '',
    //   due_at: new Date(Date.now()),
    //   name: "task 1",
    //   priority: 1,
    //   description: "task 1",
    //   is_done: false,
    // }

    // const task2 = {
    //   id: '',
    //   due_at: new Date(Date.now()),
    //   name: "task 2",
    //   priority: 1,
    //   description: "task 2",
    //   is_done: false,
    // }

    // const task3 = {
    //   id: '',
    //   due_at: new Date(Date.now()),
    //   name: "task 3",
    //   priority: 3,
    //   description: "task 3",
    //   is_done: false,
    // }
    // createT(task1)
    // createT(task2)
    // createT(task3)

    getDaily(new Date(Date.now()))
    // getMonthly(new Date(Date.now()))
  }, [])
  return (
    <>
      <div>
         day la home
      </div>
    </>
  );
}

export default Home;
