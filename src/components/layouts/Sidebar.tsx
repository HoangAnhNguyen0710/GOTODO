
import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaTasks } from "react-icons/fa";
import { Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import CreateEventDialog from "../popup/CreateEventDialog";
import CreateTaskDialog from "../popup/CreateTaskDialog";
import { getDailyTasksNum } from "../../services/Task";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setTaskFilter } from "../../redux/task.reducer";
import { RootState } from "../../redux/store";

export interface Items {
  id: string,
  text: string
}

const items: Items[] = [{id: '1', text:'Công việc trên trường'}, {id: '2', text:'Việc tại công ty'}, {id: '3', text:'Vui chơi giải trí'}, {id: '4', text:'Tự học'}]

const Sidebar = () => {
  const pathMatch = useMatch('todo')
  const dispatch = useDispatch()
  const [state, setState] = useState<number>(pathMatch ? 0 : 1);
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [numtodayTasks, setNumTodayTasks] = useState<number>()
  const [today, setToday] = useState<string>('')
  const [isOpenEventDialog, setOpenEventDialog] = useState<boolean>(false)
  const [isOpenTaskDialog, setOpenTaskDialog] = useState<boolean>(false)
  const taskFilter = useSelector((state: RootState) => state.taskFilter.value)

  const handleSelectTaskType = (typeNum: string) => {
    if(taskFilter.includes(typeNum)) {
      const updateTaskType = taskFilter.filter((value) => value != typeNum)
      dispatch(setTaskFilter(updateTaskType))
    }
    else {
      dispatch(setTaskFilter([...taskFilter, typeNum]))
    }
  }
  useEffect(() => {
    async function getTodayTasksNum() {
      const today = new Date();
      (await getDailyTasksNum(today)).onSnapshot((data) => {
        setNumTodayTasks(data.docs.length)
      })
      setToday(moment(today).format("YYYY/MM/DD"))
    }
    getTodayTasksNum()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const padWithLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
  }

  const handleOpenTaskDialog = () => {
    setOpenTaskDialog(true)
  }
  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false)
  }

  const handleOpenEventDialog = () => {
    setOpenEventDialog(true)
  }
  const handleCloseEventDialog = () => {
    setOpenEventDialog(false)
  }

  const changeState = (newState: number) => {
    setState(newState);
  };

  const changeDropDown = () => {    
    setDropDown(!dropDown);
  };
  return (
      <React.Fragment>
        <nav x-show="currentSidebarTab == 'linksTab'" aria-label="Main" className="flex flex-col h-full">
          {/* <!-- Logo --> */}
          <div className="  flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <div className=" flex items-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/10691/10691802.png" className="mr-3 h-10 sm:h-10" alt="Gotodo Logo" />
                  <span className="self-center text-3xl font-bold whitespace-nowrap text-black">Go<span className="text-rose-700">todo</span></span>
              </div>
          </div>
          <div className=" flex flex-col items-center justify-center flex-shrink-0 py-2 my-2">
            <a href="#">
              <img
                className="border-solid border-5 border-indigo-600 rounded-full h-24 w-22 mb-2"
                src="https://static.vecteezy.com/system/resources/previews/028/597/534/original/young-cartoon-female-avatar-student-character-wearing-eyeglasses-file-no-background-ai-generated-png.png"
                alt="K-UI"
              />
            </a>
            <span> 
              Xin chào, <a className="text-red-600">Nguyễn Hảo</a>
            </span>
          </div>
          <div className="bg-white rounded-md p-2 mx-1 drop-shadow-md">
            <div className="text-center text-zinc-400 pt-1 text-md">
              Bạn có
            </div>
            <table className="mt-0">
              <tbody>
                <tr>
                  <td className="w-28 h-24 text-center text-6xl font-bold text-rose-600">
                    {padWithLeadingZeros(numtodayTasks, 2)}
                  </td>
                  <td className="text-base font-semibold">
                    <tr>
                      Công việc trong ngày hôm nay
                    </tr>
                    <tr className="text-red-600 font-semibold">
                        {today}   
                    </tr>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap justify-between items-center mx-auto mt-6 my-4 max-w-screen-xl">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
              onClick={handleOpenTaskDialog}
            >
              + Thêm task
            </button>

            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
             onClick={handleOpenEventDialog}
            >
              + Thêm event
            </button>
          </div>

          <div className="px-8 text-center flex flex-row items-center justify-center">
            <Link to="/Todo" className="" onClick={() => changeState(0)}>
            <Button  className={state === 0 ? "bg-white w-44 h-44 uppercase font-bold border-none border-white shadow-md text-blue-600 flex flex-col items-center" : "bg-slate-100 w-40 h-40 uppercase font-bold border-none shadow border-slate-700 text-slate-500 flex flex-col items-center"}> 
                <FaTasks className="text-4xl mt-12 mb-2"/>
                <span> Todo </span>
              </Button>
            </Link>
            <Link to="/" className="ml-2" onClick={() => changeState(1)}>
              <Button className={state === 1 ? "bg-white w-44 h-44 uppercase font-bold border-none border-white shadow-md text-blue-600 flex flex-col items-center" : "bg-slate-100 w-40 h-40 uppercase font-bold border-none shadow border-slate-700 text-slate-500 flex flex-col items-center"}> 
                <SlCalender className="text-4xl mt-12 mb-2"/>
                <span> Calendar </span>
              </Button>
            </Link>
          </div>
          <div className="px-6">
            <div className="font-bold text-base mt-8">
              Công việc của tôi
              <CaretDownOutlined className="ml-10" onClick={changeDropDown}/>
            </div>
              { dropDown? items.map(item =>
                <div className="text-zinc-400 my-2" key={item.id}>
                  <Checkbox  defaultChecked value={item.id} onChange={() => handleSelectTaskType(item.id)}/>
                  {item.text}
                </div>
                ) : <></>
              }
          </div>
            
          </nav>
          <CreateEventDialog open={isOpenEventDialog} handleClose={handleCloseEventDialog}/>
          <CreateTaskDialog open={isOpenTaskDialog} handleClose={handleCloseTaskDialog}/>
      </React.Fragment>
  )
}

export default Sidebar;
