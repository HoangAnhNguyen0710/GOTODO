import {
  CaretRightOutlined,
  CaretDownOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { getListDayHaveTasks, getPassDueTasks, updateTask } from "../services/Task";

import moment from "moment";
import { Task } from "../models/tasks";
import { EventDialog } from "../components";
import { CalendarEvent } from "./Home";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import { BORDER_COLOR } from "../const/color";

const Todo = () => {
  const [listDay, setListDay] = useState<Array<string>>([]);
  const [todayTasks, setTodayTasks] = useState<Array<Task>>([]);
  const [pastdueTasks, setPastdueTasks] = useState<Array<Task>>([]);
  const [openModal, setOpenModal] = useState(false);
  const [pastdueDropDown, setPastdueDropDown] = useState<boolean>(true);
  const [todayDropDown, setTodayDropDown] = useState<boolean>(true);
  const [event, setEvent] = useState<CalendarEvent>();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const taskFilter = useSelector((state: RootState) => state.taskFilter.value);
  const [sortBy, setSortBy] = useState<string>("due_at");
  const [sortType, setSortType] = useState<string>("desc");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  )
  const currentTime = moment(new Date()).format("YYYY/MM/DD")

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined
  useEffect(() => {
    async function getListDay() {
      const today = new Date();
      await (
        await getListDayHaveTasks(today, taskFilter, sortType)
      ).onSnapshot((data) => {
        const uniqueDates = [...new Set(data.docs.map(item => 
            moment(item.data().due_at).format("YYYY/MM/DD")
          ))];

        uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        console.log(uniqueDates);
        let dataList = data.docs.map((item) => ({
          ...item.data(),
        }));

        console.log(dataList)

        if (sortBy === "priority") {
          if (sortType === "asc") {
            dataList = dataList.sort(
              (a, b) => Number(a.priority) - Number(b.priority)
            );
          } else
            dataList = dataList.sort(
              (a, b) => Number(b.priority) - Number(a.priority)
            );
        }

        setTodayTasks(dataList as Array<Task>);
        
        setListDay(uniqueDates);
      });
    }
    getListDay();
    async function getPassdueTasks() {
      const today = new Date();
      await (
        await getPassDueTasks(today, taskFilter, sortType)
      ).onSnapshot((data) => {
        let dataList = data.docs.map((item) => ({
          ...item.data(),
        }));
        if (sortBy === "priority") {
          if (sortType === "asc") {
            dataList = dataList.sort(
              (a, b) => Number(a.priority) - Number(b.priority)
            );
          } else
            dataList = dataList.sort(
              (a, b) => Number(b.priority) - Number(a.priority)
            );
        }
        console.log(dataList)
        setPastdueTasks(dataList as Array<Task>)
      });
    }
    getPassdueTasks();
  }, [taskFilter, sortBy, sortType]);

  const changePastdueDropDown = () => {
    setPastdueDropDown(!pastdueDropDown);
  };

  const changeTodayDropDown = () => {
    setTodayDropDown(!todayDropDown);
  };

  const onClose = () => setOpenModal(false);

  const handleOpenSortPopover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSortPopover = () => {
    setAnchorEl(null);
  };

  const convertToCalendarEvent = (task: Task) => {
    const convertedData: CalendarEvent = {
      id: task.id,
      calendarId: task.project_id ? task.project_id : "",
      title: task.title,
      category: "task",
      end: "",
      due_at: task.due_at,
      body: task.description,
      raw: {
        priority: task.priority,
        reminders: task.reminders,
      },
      is_done: task.is_done,
    };
    return convertedData;
  };

  const handleClickTask = (event: Task) => {
    const calendarEvent = convertToCalendarEvent(event);
    // console.log(calendarEvent);
    setEvent(calendarEvent);
    setSelectedTask(event);
    setOpenModal(true);
  };

  useEffect(() => {
    // console.log(selectedTask);
  }, [selectedTask]);
  const updateSelectedTaskStatement = async () => {
    if (selectedTask && event) {
      selectedTask.is_done = !selectedTask.is_done;

      const statement: boolean | void = await updateTask(
        selectedTask.id,
        selectedTask
      );
      if (statement) {
        setEvent({ ...event, is_done: !event.is_done });
        setSelectedTask({ ...selectedTask, is_done: !event.is_done });
      }
    }
  };

  const updateTodayTaskStatement = async (task: Task) => {
    if (task.is_done) {
      task.is_done = false;
    } else task.is_done = true;
    await updateTask(task.id, task);
  };
  const updatePastdueTaskStatement = async (task: Task) => {
    if (task.is_done) {
      task.is_done = false;
    } else task.is_done = true;
    await updateTask(task.id, task);
  };
  
  return (
    <React.Fragment>
      {event && (
        <EventDialog
          open={openModal}
          onClose={onClose}
          event={event}
          updateTaskStatement={updateSelectedTaskStatement}
        />
      )}
      <div className="max-w-7xl px-2 font-montserrat bg-white drop-shadow-md rounded-lg">
        <div className="header p-2 mb-2 flex justify-between">
          <div className="flex">
          <h2 className="today p-2 mr-4 font-black text-xl">Hôm nay</h2>
          <h4 className="date p-3 text-sm font-normal">
            {currentTime}
          </h4>
          </div>
          <Button
            id={popoverId}
            className="filter-icon p-3"
            onClick={handleOpenSortPopover}
          >
            <EyeOutlined />
          </Button>
          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseSortPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ p: 2, fontSize: 14 }} width={300}>
              <div className="flex flex-col font-semibold text-slate-600">
                <div className="flex justify-between items-center mb-4 mt-2">
                  <SortRoundedIcon />
                  <span className="pl-2">Danh sách Công việc</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <ImportExportRoundedIcon />
                    <span className="px-2">Sắp xếp theo</span>
                  </div>
                  <Select
                    sx={{ width: 110, padding: 0 }}
                    size="small"
                    name="project-id"
                    value={sortBy}
                    onChange={(ev: any) => setSortBy(ev.target.value)}
                    variant="standard"
                  >
                    <MenuItem sx={{ px: 2 }} value={"priority"}>
                      Độ ưu tiên
                    </MenuItem>
                    <MenuItem sx={{ px: 2 }} value={"due_at"}>
                      Deadline
                    </MenuItem>
                  </Select>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <ImportExportRoundedIcon />
                    <span className="px-2">Thứ tự sắp xếp</span>
                  </div>
                  <Select
                    sx={{ width: 80, padding: 0 }}
                    size="small"
                    name="project-id"
                    value={sortType}
                    onChange={(ev: any) => setSortType(ev.target.value)}
                    variant="standard"
                  >
                    <MenuItem sx={{ px: 2 }} value={"desc"}>
                      Giảm
                    </MenuItem>
                    <MenuItem sx={{ px: 2 }} value={"asc"}>
                      Tăng
                    </MenuItem>
                  </Select>
                </div>
              </div>
            </Box>
          </Popover>
        </div>
        <div className="pastdue-tasks p-1 my-4">
          <div className="flex">
            <div
              className="p-2"
              onClick={changePastdueDropDown}
            >
              { pastdueDropDown ? <CaretDownOutlined></CaretDownOutlined> :  <CaretRightOutlined/>}</div>
            <h3 className="p-2 font-bold text-lg text-red-500">Quá hạn</h3>
          </div>
          {pastdueDropDown ? (
            pastdueTasks.map((pastdueTask: Task) => (
              <div
                className="passdue-task border-solid border-t-2 border-zinc-200 p-1 mx-7 flex"
                key={pastdueTask.id}
              >
                {pastdueTask.is_done == true ? (
                  <button
                    className="p-2 m-2 border-4 border-solid rounded-full absolute"
                    style={{borderColor: BORDER_COLOR[pastdueTask.priority], backgroundColor: BORDER_COLOR[pastdueTask.priority]}}
                    onClick={() =>
                      updatePastdueTaskStatement(pastdueTask)
                    }
                  ></button>
                ) : (
                  <button
                    className="p-2 m-2  border-4 border-solid rounded-full absolute"
                    style={{borderColor: BORDER_COLOR[pastdueTask.priority]}}
                    onClick={() =>
                      updatePastdueTaskStatement(pastdueTask)
                    }
                  ></button>
                )}
                <div
                  className="detail-task mx-10 w-full cursor-pointer"
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
                    {moment(pastdueTask.due_at).format("YYYY/MM/DD  HH:mm")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        {/* <div className="today-tasks p-1 my-4">
          <div className="flex">
            <div className="p-2" onClick={ changeTodayDropDown } >
              { todayDropDown ? <CaretDownOutlined /> : <CaretRightOutlined/>}
            </div>
            <h3 className="p-2 font-bold text-lg text-black-500">
              Việc hiện tại
            </h3>
          </div>
        </div> */}
        {listDay.length>0 ? (
          listDay.map((date:string) => (
            <div className="today-tasks p-1 my-4">
              <div className="flex">
                <div className="p-2" onClick={ changeTodayDropDown } >
                  { todayDropDown ? <CaretDownOutlined /> : <CaretRightOutlined/>}
                </div>
                <h3 className="p-2 font-bold text-lg text-black-500">
                  {moment(date).format("YYYY/MM/DD")}
                </h3>
              </div>
              {todayDropDown ? (
              todayTasks.map((todayTask: Task) => (
                moment(todayTask.due_at).format("YYYY/MM/DD") === date  && (
                <div
                  className="passdue-task border-solid border-t-2 border-zinc-200 p-1 mx-7 flex"
                  key={todayTask.id}
                >
                  {todayTask.is_done == true ? (
                    <button
                      className="p-2 m-2 border-4 border-solid rounded-full absolute"
                      style={{borderColor: BORDER_COLOR[todayTask.priority], backgroundColor: BORDER_COLOR[todayTask.priority]}}
                      onClick={() => updateTodayTaskStatement(todayTask)}
                    ></button>
                  ) : (
                    <button
                      className="p-2 m-2  border-4 border-solid rounded-full absolute"
                      style={{borderColor: BORDER_COLOR[todayTask.priority]}}
                      onClick={() => updateTodayTaskStatement(todayTask)}
                    ></button>
                  )}
                  <div
                    className="detail-task mx-10 w-full cursor-pointer"
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
                    <div className="date font-extralight text-xs text-red-500">
                      <CalendarOutlined className="mr-1" />
                      {moment(todayTask.due_at).format("YYYY/MM/DD  HH:mm")}
                    </div>
                  </div>
                </div>)
              ))
            ) : (
              <></>
            )}
            </div>
          ))
        ) : (
          <></>
        )}
        
      </div>
    </React.Fragment>
  );
};

export default Todo;
