import { Outlet } from "react-router-dom";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { Radio, RadioChangeEvent, Tabs } from "antd";
import { useRef, useState } from "react";
import React from "react";
import moment from "moment";
import { Dialog } from "@mui/material";

const initialEvents = [
  {
    id: "1",
    calendarId: "cal1",
    title: "Lunch",
    category: "time",
    start: "2023-12-11T12:00:00",
    end: "2023-12-11T13:30:00",
    backgroundColor: "#166af0",
  },
  {
    id: "2",
    calendarId: "cal1",
    title: "Coffee Break",
    category: "time",
    start: "2023-12-11T10:00:00",
    end: "2023-12-14T13:30:00",
    backgroundColor: "#f759a3",
  },
  {
    id: "3",
    calendarId: "cal1",
    title: "Homework ITSS",
    category: "task",
    // start: '2023-12-11T14:40:00',
    end: "2023-12-11T13:00:00",
    backgroundColor: "#f5d56e",
  },
  {
    id: "4",
    calendarId: "cal1",
    title: "Homework Machine Learning",
    category: "task",
    // start: '2023-12-11T:40:00',
    end: "2023-12-11T23:59:00",
    backgroundColor: "#6ef575",
  },
  {
    id: "5",
    calendarId: "cal1",
    title: "Homework ITSS",
    category: "task",
    // start: '2023-12-11T14:40:00',
    end: "2023-12-19T13:00:00",
    backgroundColor: "#f5d56e",
  },
];

function Home() {
  const [type, setType] = useState<string>("week");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [event, setEvent] = useState();
  const calendarRef = React.useRef();

  const template = {
    allday(event) {
      return `${event.title}<i class="fa fa-refresh"></i>`;
    },
    popupDetailTitle(event) {
      console.log("Haloz");
      return <div>Haloz</div>;
    },
    alldayTitle() {
      return "All Day";
    },
  };

  const onClose = () => setOpenModal(false);

  const handleClickEvent = (event) => {
    setEvent(event);
    setOpenModal(true);
  };
  const onAfterRenderEvent = () => {
    const calendarInstance = calendarRef.current.getInstance();

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
    const calendarInstance = calendarRef.current.getInstance();
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
    const calendarInstance = calendarRef.current.getInstance();

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

  const calendarOptions = {
    // height:"700px",
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
    events: initialEvents,
    gridSelection: false,
    template: template,
  };

  const onChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  return (
    <>
      <Dialog open={openModal} onClose={onClose} fullWidth={true} maxWidth="lg">
        Custom ở phần dialog cho thành event detail popup
      </Dialog>
      <div className=" max-w-7xl px-2 mx-auto font-montserrat bg-white drop-shadow-md rounded-lg">
        <div className="p-4">
          <nav className="navbar py-2 mx-8 flex flex-row items-center justify-between">
            <div className="">
              <button
                type="button"
                className="inline-block rounded bg-slate-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
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
                    strokeOpacity="0.4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
          {/* <Calendar
          height="700px"
          view={type}
          week={{
            startDayOfWeek: 1,
            dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
            narrowWeekend: false,
            workweek: false,
            showNowIndicator: true,
            showTimezoneCollapseButton: false,
            timezonesCollapsed: false,
            hourStart: 0,
            hourEnd: 24,
            eventView: true,
            taskView: true,
            collapseDuplicateEvents: false,
            
          }}
          useDetailPopup={true}
          events={initialEvents}
          task={initialEvents}
          // onAfterRenderEvent={onAfterRenderEvent}
        /> */}
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Home;
