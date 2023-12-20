import Radio from "antd/es/radio";
import { Link } from "react-router-dom";
import { CaretDownOutlined, CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { getDailyTasks, getPassDueTasks, updateTask } from "../services/Task";
import moment from "moment";
import "moment/locale/vi";
import { Task } from '../models/tasks';
import { EventDialog } from "../components";
import { CalendarEvent } from "./Home";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Todo = () => {
  const [todayTasks, setTodayTasks] = useState<Array<Task>>([])
  const [pastdueTasks, setPastdueTasks] = useState<Array<Task>>([])
  const [openModal, setOpenModal] = useState(false);
  const [pastdueDropDown, setPastdueDropDown] = useState<boolean>(true)
  const [todayDropDown, setTodayDropDown] = useState<boolean>(true)
  const [event, setEvent] = useState<CalendarEvent>();
  const taskFilter = useSelector((state: RootState) => state.taskFilter.value )
  useEffect(() => {
    async function getTodayTasks() {
      const today = new Date();
      const data = await getDailyTasks(today, taskFilter)
      console.log(data)
      setTodayTasks(data as Array<Task>)
    }
    getTodayTasks()
    async function getPassdueTasks() {
      const today = new Date();
      const data = await getPassDueTasks(today, taskFilter)
      console.log(data)
      setPastdueTasks(data as Array<Task>)
    }
    getPassdueTasks()
  }, [taskFilter])
  const changePastdueDropDown = () => {    
    setPastdueDropDown(!pastdueDropDown);
  };
  const changeTodayDropDown = () => {    
    setTodayDropDown(!todayDropDown);
  };

  const onClose = () => setOpenModal(false);

  const convertToCalendarEvent = (task: Task) => {
    const convertedData: CalendarEvent = {
      id: task.id,
      calendarId: task.project_id ? task.project_id : '',
      title: task.title,
      category: 'task',
      end: '',
      due_at: task.due_at,
      body: task.description,
      raw: {
        priority: task.priority
      },
      is_done: task.is_done,
    }
    return convertedData;
  };

  const handleClickTask = (event) => {
    const calendarEvent = convertToCalendarEvent(event)
    console.log(calendarEvent);
    setEvent(calendarEvent);
    setOpenModal(true);
  }

  const updateTodayTaskStatement = async (task: Task, index: number) => {
    if(task.is_done) {
      task.is_done = false
    }
    else task.is_done = true
    const statement: boolean| void = await updateTask(task.id, task)
    if(statement) {
      todayTasks[index].is_done = task.is_done
      setTodayTasks([...todayTasks])
    }
  }
  const updatePastdueTaskStatement = async (task: Task, index: number) => {
    if(task.is_done) {
      task.is_done = false
    }
    else task.is_done = true
    const statement: boolean| void = await updateTask(task.id, task)
    if(statement) {
      pastdueTasks[index].is_done = task.is_done
      setPastdueTasks([...pastdueTasks])
    }
  }
  return (
    <React.Fragment>
      {event && (
        <EventDialog open={openModal} onClose={onClose} event={event}/>
      )}
      <div className=" max-w-7xl px-2 mx-16 mt-16 font-montserrat bg-white drop-shadow-md rounded-lg">
        <div className="header p-2 mb-2 flex">
          <h2 className="today p-2 mr-4 font-black text-xl">Hôm nay</h2>
          <h4 className="date p-3 text-sm font-normal">{moment(new Date()).locale('vi').format("dddd, MMMM Do")}</h4>
          <button className="filter-icon absolute right-8 p-3">
            <EyeOutlined />
          </button>
        </div>
        <div className="pastdue-tasks p-1 my-4">
          <div className="flex">
            <CaretDownOutlined className="p-2" onClick={changePastdueDropDown}/>
            <h3 className="p-2 font-bold text-lg text-red-500">Quá hạn</h3>
          </div>
          {pastdueDropDown ? (
            pastdueTasks.map((pastdueTask: Task, index: number) => (
              <div
                className="passdue-task border-solid border-t-2 border-zinc-200 p-1 mx-7 flex"
                key={pastdueTask.id}
              >
                 {pastdueTask.is_done == true ? 
                    <button className="p-2 m-2 bg-red-600 border-red-600 border-2 border-solid rounded-full absolute" onClick={()=>updatePastdueTaskStatement(pastdueTask, index)}></button>
                    : 
                    <button className="p-2 m-2 border-red-600 border-2 border-solid rounded-full absolute" onClick={()=>updatePastdueTaskStatement(pastdueTask, index)}></button>
                  }
                <div className="detail-task mx-10 w-full cursor-pointer"
                  onClick={() => handleClickTask(pastdueTask)}
                >
                  <h2 className="p-1 font-semibold text-base">
                    {pastdueTask.title}
                  </h2>
                  <div className="description">
                    <p className="font-extralight text-xs mb-1">
                      {pastdueTask.description}
                    </p>
                  </div>
                  <div className="date font-extralight text-xs text-red-500">
                    <CalendarOutlined className="mr-1" />
                    {moment(pastdueTask.due_at).format("DD/MM")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="today-tasks p-1 my-4">
          <div className="flex">
            <CaretDownOutlined className="p-2" onClick={changeTodayDropDown} />
            <h3 className="p-2 font-bold text-lg text-black-500">
              Việc hiện tại
            </h3>
          </div>
          {todayDropDown ? (
            todayTasks.map((todayTask: Task, index: number) => (
              <div
                className="passdue-task border-solid border-t-2 border-zinc-200 p-1 mx-7 flex"
                key={todayTask.id}
              >
                  {todayTask.is_done == true ? 
                    <button className="p-2 m-2 bg-red-600 border-red-600 border-2 border-solid rounded-full absolute" onClick={()=>updateTodayTaskStatement(todayTask, index)}></button>
                    : 
                    <button className="p-2 m-2 border-red-600 border-2 border-solid rounded-full absolute" onClick={()=>updateTodayTaskStatement(todayTask, index)}></button>
                  }
                <div className="detail-task mx-10 w-full cursor-pointer"
                  onClick={() => handleClickTask(todayTask)}
                >
                  <h2 className="p-1 font-semibold text-base">
                    {todayTask.title}
                  </h2>
                  <div className="description">
                    <p className="font-extralight text-xs mb-1">
                      {todayTask.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
