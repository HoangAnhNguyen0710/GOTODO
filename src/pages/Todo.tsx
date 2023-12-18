import Radio from "antd/es/radio";
import { Link } from "react-router-dom";
import { CaretDownOutlined, CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { getDailyTasks, getPassDueTasks } from "../services/Task";
import moment from "moment";
import "moment/locale/vi";
import { EventDialog } from "../components";
import { Task } from "../models/tasks";


const Todo = () => {
  const [todayTasks, setTodayTasks] = useState<Array<Task>>([])
  const [pastdueTasks, setPastdueTasks] = useState<Array<Task>>([])
  const [openModal, setOpenModal] = useState(false);
  const [pastdueDropDown, setPastdueDropDown] = useState<boolean>(true)
  const [todayDropDown, setTodayDropDown] = useState<boolean>(true)

  useEffect(() => {
    async function getTodayTasks() {
      const today = new Date();
      const data = await getDailyTasks(today)
      console.log(data)
      setTodayTasks(data as Array<Task>)
    }
    getTodayTasks()
    async function getPassdueTasks() {
      const today = new Date();
      const data = await getPassDueTasks(today)
      console.log(data)
      setPastdueTasks(data as Array<Task>)
    }
    getPassdueTasks()
  }, [])
  
  const changePastdueDropDown = () => {    
    setPastdueDropDown(!pastdueDropDown);
  };
  const changeTodayDropDown = () => {    
    setTodayDropDown(!todayDropDown);
  };

  const onClose = () => setOpenModal(false);

  const handleClickTask = (task) => {
      console.log(task);
      // setEvent(task);
      setOpenModal(true);
  }

  return (
    <React.Fragment>
      {/* {task && (
        <EventDialog open={openModal} onClose={onClose} />
      )} */}
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
            pastdueTasks.map((pastdueTask: Task) => (
              <div
                className="passdue-task border-solid border-t-2 border-zinc-200 p-1 mx-7 flex"
                key={pastdueTask.id}
              >
                <button className="p-2 m-2 border-red-600 border-2 border-solid rounded-full absolute"></button>
                <div className="detail-task mx-10 w-full"
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
                    09/10
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
            todayTasks.map((todayTask: Task) => (
              <div
                className="passdue-task border-solid border-t-2 border-zinc-200 p-1 mx-7 flex"
                key={todayTask.id}
              >
                  {todayTask.is_done == true ? 
                    <button className="p-2 m-2 bg-red-600 border-red-600 border-2 border-solid rounded-full absolute"></button>
                    : 
                    <button className="p-2 m-2 border-red-600 border-2 border-solid rounded-full absolute"></button>
                  }
                <div className="detail-task mx-10 w-full"
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
