import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaTasks } from "react-icons/fa";
import { Button } from "antd";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import CreateEventDialog from "../popup/CreateEventDialog";
import CreateTaskDialog from "../popup/CreateTaskDialog";
import { getDailyTasksNum } from "../../services/Task";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setTaskFilter } from "../../redux/task.reducer";
import { RootState } from "../../redux/store";

export interface Items {
  id: string;
  text: string;
}

const items: Items[] = [
  { id: "1", text: "Công việc trên trường" },
  { id: "2", text: "Việc tại công ty" },
  { id: "3", text: "Vui chơi giải trí" },
  { id: "4", text: "Tự học" },
];

const Sidebar = () => {
  const pathMatch = useMatch("todo");
  const dispatch = useDispatch();
  const [state, setState] = useState<number>(pathMatch ? 0 : 1);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [numtodayTasks, setNumTodayTasks] = useState<number>();
  const [today, setToday] = useState<string>("");
  const [isOpenEventDialog, setOpenEventDialog] = useState<boolean>(false);
  const [isOpenTaskDialog, setOpenTaskDialog] = useState<boolean>(false);
  const taskFilter = useSelector((state: RootState) => state.taskFilter.value);

  const handleSelectTaskType = (typeNum: string) => {
    if (taskFilter.includes(typeNum)) {
      const updateTaskType = taskFilter.filter((value) => value != typeNum);
      dispatch(setTaskFilter(updateTaskType));
    } else {
      dispatch(setTaskFilter([...taskFilter, typeNum]));
    }
  };
  useEffect(() => {
    async function getTodayTasksNum() {
      const today = new Date();
      (await getDailyTasksNum(today)).onSnapshot((data) => {
        setNumTodayTasks(data.docs.length);
      });
      setToday(moment(today).format("YYYY/MM/DD"));
    }
    getTodayTasksNum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const padWithLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, "0");
  };

  const handleOpenTaskDialog = () => {
    setOpenTaskDialog(true);
  };
  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
  };

  const handleOpenEventDialog = () => {
    setOpenEventDialog(true);
  };
  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
  };

  const changeState = (newState: number) => {
    setState(newState);
  };

  const changeDropDown = () => {
    setDropDown(!dropDown);
  };
  return (
    <React.Fragment>
      <nav
        x-show="currentSidebarTab == 'linksTab'"
        aria-label="Main"
        className="flex flex-col h-full"
      >
        {/* <!-- Logo --> */}
        <div className="  flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className=" flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10691/10691802.png"
              className="mr-3 h-10 sm:h-10"
              alt="Gotodo Logo"
            />
            <span className="self-center text-3xl font-bold whitespace-nowrap text-black">
              Go<span className="text-rose-700">todo</span>
            </span>
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
        <div className="bg-white rounded-md p-3 drop-shadow-md">
          <div className="pl-2 text-zinc-400 pt-2 text-md">Bạn có</div>
          <div className="flex flex-wrap">
            <div className="w-28 p-2 text-center text-6xl font-bold text-rose-600">
              {padWithLeadingZeros(numtodayTasks || 0, 2)}
            </div>
            <div className="text-base font-semibold w-40">
              <div className="flex flex-wrap">Công việc trong ngày hôm nay</div>
              <div className="text-red-600 font-semibold">{today}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-center pt-6 py-4 max-w-screen-xl">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br w-[144px] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-3 text-center mb-2"
            onClick={handleOpenTaskDialog}
          >
            + Thêm công việc
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br w-[144px] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-3 text-center mb-2"
            onClick={handleOpenEventDialog}
          >
            + Thêm sự kiện
          </button>
        </div>

        <div className="text-center flex flex-row items-center justify-center gap-4 w-[350] flex-wrap">
          <Link to="/Todo" className="" onClick={() => changeState(0)}>
            <Button
              className={
                state === 0
                  ? "bg-white w-36 h-36 uppercase font-bold border-none border-white shadow-md text-blue-600 flex flex-col items-center"
                  : "bg-slate-100 w-36 h-36 uppercase font-bold border-none shadow border-slate-700 text-slate-500 flex flex-col items-center"
              }
            >
              <FaTasks className="text-4xl mt-8 mb-2" />
              <span> Việc cần làm </span>
            </Button>
          </Link>
          <Link to="/" className="ml-2" onClick={() => changeState(1)}>
            <Button
              className={
                state === 1
                  ? "bg-white w-36 h-36 uppercase font-bold border-none border-white shadow-md text-blue-600 flex flex-col items-center"
                  : "bg-slate-100 w-36 h-36 uppercase font-bold border-none shadow border-slate-700 text-slate-500 flex flex-col items-center"
              }
            >
              <SlCalender className="text-4xl mt-8 mb-2" />
              <span> Thời gian biểu </span>
            </Button>
          </Link>
        </div>
        <div className="p-2 bg-white rounded-md mt-4 shadow-md">
          <div className="font-bold text-base flex justify-between p-2 items-center">
            <p className="p-1">Công việc của tôi</p>
            <div onClick={changeDropDown}>
              {dropDown ? <CaretDownOutlined /> : <CaretLeftOutlined />}
            </div>
          </div>
          {dropDown ? (
            items.map((item) => (
              <div className="text-zinc-400 my-2" key={item.id}>
                <Checkbox
                  defaultChecked
                  value={item.id}
                  onChange={() => handleSelectTaskType(item.id)}
                />
                {item.text}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </nav>
      <CreateEventDialog
        open={isOpenEventDialog}
        handleClose={handleCloseEventDialog}
      />
      <CreateTaskDialog
        open={isOpenTaskDialog}
        handleClose={handleCloseTaskDialog}
      />
    </React.Fragment>
  );
};

export default Sidebar;
