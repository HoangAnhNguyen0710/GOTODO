import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Calendar from "@toast-ui/react-calendar";
import { Radio, RadioChangeEvent } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { EventDialog } from "../components";
import { getAllEvents } from "../services/Event";
import { getAllTasks } from "../services/Task";

export interface CalendarEvent {
  id: string;
  calendarId: string;
  title: string;
  category: "time" | "milestone" | "task";
  location?: string,
  dueDateClass?: string;
  start?: string;
  end?: string;
  due_at?: string;
  is_done?: boolean;
  backgroundColor?: string;
  color?: string;
  body?: string;
  raw?: {
    class?: string;
    memo?: string;
    priority: number;
  };
  state?: string;
}

const calendars = [
  {
    id: "1",
    name: "Project 1",
    backgroundColor: "#9e5fff",
    borderColor: "#9e5fff",
  },
  {
    id: "2",
    name: "Project 2",
    backgroundColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
];

function Home() {
  const [type, setType] = useState<string>("week");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [event, setEvent] = useState<CalendarEvent>();
  const calendarRef = React.useRef<any>();
  const [initialEvents, setInitialEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    async function getAllEv() {
      const events = await getAllEvents()
      const tasks = await getAllTasks()
      const data = events.concat(tasks);
      setInitialEvents(data)
      return
    }
    getAllEv()
  }, [])
  const theme = {
    week: {
      nowIndicatorLabel: {
        color: "red",
      },
      nowIndicatorPast: {
        border: "1px dashed red",
      },
      nowIndicatorBullet: {
        backgroundColor: "red",
      },
      nowIndicatorToday: {
        border: "1px solid red",
      },
      nowIndicatorFuture: {
        border: "1px solid red",
      },
    },
  };

  const onClose = () => setOpenModal(false);

  const handleClickEvent = (eventObj) => {
    const { event } = eventObj;

    setEvent(event);
    setOpenModal(true);
    console.log(event);
  };
  const onAfterRenderEvent = () => {
    const calendarInstance = calendarRef.current?.getInstance();

    const dateStart = moment(
      calendarInstance.getDateRangeStart().toDate()
    ).format("YYYY/MM/DD");
    const dateEnd = moment(calendarInstance.getDateRangeEnd().toDate()).format(
      "YYYY/MM/DD"
    );

    setStartDate(dateStart);
    setEndDate(dateEnd);
  };

  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current?.getInstance();
    // calendarInstance
    calendarInstance.next();
    const dateStart = moment(
      calendarInstance.getDateRangeStart().toDate()
    ).format("YYYY/MM/DD");
    const dateEnd = moment(calendarInstance.getDateRangeEnd().toDate()).format(
      "YYYY/MM/DD"
    );

    setStartDate(dateStart);
    setEndDate(dateEnd);
  };

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current?.getInstance();

    calendarInstance.prev();
    const dateStart = moment(
      calendarInstance.getDateRangeStart().toDate()
    ).format("YYYY/MM/DD");
    const dateEnd = moment(calendarInstance.getDateRangeEnd().toDate()).format(
      "YYYY/MM/DD"
    );

    setStartDate(dateStart);
    setEndDate(dateEnd);
  };

  const handleClickNowButton = () => {
    const calendarInstance = calendarRef.current?.getInstance();
    calendarInstance.today();
  };

  const calendarOptions = {
    height:"700px",
    view: type,
    week: {
      startDayOfWeek: 1,
      dayNames: [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ],
      narrowWeekend: false,
      workweek: false,
      showNowIndicator: true,
      showTimezoneCollapseButton: false,
      timezonesCollapsed: false,
      hourStart: 0,
      hourEnd: 24,
      eventView: true,
      taskView: ["task"],
      collapseDuplicateEvents: false,
    },
    month: {
      dayNames: [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ],
      visibleWeeksCount: 0,
      workweek: false,
      narrowWeekend: false,
      startDayOfWeek: 1,
      isAlways6Weeks: false,
      visibleEventCount: 6,
    },
    useDetailPopup: false,
    useFormPopup: false,
    events: initialEvents,
    gridSelection: false,
    calendars: calendars,
    theme: theme,
  };

  const onChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  return (
    <>
      {event && (
        <EventDialog open={openModal} onClose={onClose} event={event} />
      )}

      <div className=" max-w-7xl px-2 mx-auto font-montserrat bg-white drop-shadow-md rounded-lg">
        <div className="p-4">
          <nav className="navbar py-2 mx-8 flex flex-row items-center justify-between">
            <div className="">
              <button
                type="button"
                className="inline-block rounded bg-slate-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
                onClick={handleClickNowButton}
              >
                Hôm nay
              </button>
            </div>
            <div className="flex flew-row">
              <div
                className="-rotate-90 cursor-pointer"
                onClick={handleClickPrevButton}
              >
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.001 6L6.00098 1L1.00098 6"
                    stroke="black"
                    strokeOpacity="0.4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="uppercase text-sm font-semibold text-gray-600 my-8">
                {startDate} - {endDate}
              </div>
              <div
                className="rotate-90 cursor-pointer"
                onClick={handleClickNextButton}
              >
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.001 6L6.00098 1L1.00098 6"
                    stroke="black"
                    stroke-opacity="0.4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="">
              <Radio.Group value={type} onChange={onChange}>
                <Radio.Button value="month">Tháng</Radio.Button>
                <Radio.Button value="week">Tuần</Radio.Button>
                <Radio.Button value="day">Ngày</Radio.Button>
              </Radio.Group>
            </div>
          </nav>
          <Calendar
            ref={calendarRef}
            {...calendarOptions}
            onAfterRenderEvent={onAfterRenderEvent}
            onClickEvent={(event) => handleClickEvent(event)}
          />
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Home;
