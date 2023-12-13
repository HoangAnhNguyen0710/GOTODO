import { Outlet } from "react-router-dom";
import  Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { Radio, RadioChangeEvent, Tabs } from 'antd';
import { useRef, useState } from "react";
import React from "react";
import moment from "moment";

const initialEvents = [
  {
    id: '1',
    calendarId: '1',
    title: 'Lunch',
    category: 'time',
    start: '2023-12-11T12:00:00',
    end: '2023-12-11T13:30:00',
  },
  {
    id: '2',
    calendarId: '2',
    title: 'Coffee Break',
    category: 'time',
    start: '2023-12-11T10:00:00',
    end: '2023-12-14T13:30:00',
    
  },
  {
    id: '3',
    calendarId: '1',
    title: 'Homework ITSS',
    category: 'task',
    // start: '2023-12-11T14:40:00',
    end: '2023-12-11T13:00:00',
  },
  {
    id: '4',
    calendarId: '2',
    title: 'Homework Machine Learning',
    category: 'task',
    // start: '2023-12-11T:40:00',
    end: '2023-12-11T23:59:00',
  },
  {
    id: '5',
    calendarId: '1',
    title: 'Homework ITSS',
    category: 'task',
    // start: '2023-12-11T14:40:00',
    end: '2023-12-19T13:00:00',
  },
];

const calendars = [
  {
    id: '1',
    name: 'Project 1',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '2',
    name: 'Project 2',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

function Home() {
  const [type, setType] = useState<string>('week');
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const calendarRef = React.useRef();
  
  const template = {
    allday(event: any) {
      return `${event.title}<i class="fa fa-refresh"></i>`;
    },
    alldayTitle() {
      return 'All Day';
    },
  };
  
  const theme = {
    week: {
      nowIndicatorLabel: {
        color: 'red',
      },
      nowIndicatorPast: {
        border: '1px dashed red',
      },
      nowIndicatorBullet: {
        backgroundColor: 'red',
      },
      nowIndicatorToday: {
        border: '1px solid red',
      },
      nowIndicatorFuture: {
        border: '1px solid red',
      },
    },
  }

  const onAfterRenderEvent = () => {
    const calendarInstance = calendarRef.current.getInstance();

    const dateStart = moment(calendarInstance.getDateRangeStart().toDate()).format('YYYY/MM/DD')
    const dateEnd = moment(calendarInstance.getDateRangeEnd().toDate()).format('YYYY/MM/DD')

    setStartDate(dateStart)
    setEndDate(dateEnd)
    
  };

  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.next();
    const dateStart = moment(calendarInstance.getDateRangeStart().toDate()).format('YYYY/MM/DD')
    const dateEnd = moment(calendarInstance.getDateRangeEnd().toDate()).format('YYYY/MM/DD')

    setStartDate(dateStart)
    setEndDate(dateEnd)
    
  };

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.prev();
    const dateStart = moment(calendarInstance.getDateRangeStart().toDate()).format('YYYY/MM/DD')
    const dateEnd = moment(calendarInstance.getDateRangeEnd().toDate()).format('YYYY/MM/DD')

    setStartDate(dateStart)
    setEndDate(dateEnd)
  };

  const handleClickNowButton = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.today();
  };

  const calendarOptions = {
    // height:"700px",
    view: type,
    week:{
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
      taskView: ['task'],
      collapseDuplicateEvents: false,
    },
    month:{
      dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
      visibleWeeksCount: 0,
      workweek: false,
      narrowWeekend: false,
      startDayOfWeek: 1,
      isAlways6Weeks: false,
      visibleEventCount: 6,
    },
    useDetailPopup:true,
    useFormPopup: true,
    events:initialEvents,
    gridSelection:false,
    template: template,
    calendars:calendars,
    theme:theme
  };

  
  const onChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  return (
    <>
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
              <div className="-rotate-90 cursor-pointer" onClick={handleClickPrevButton}>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.001 6L6.00098 1L1.00098 6" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="uppercase text-sm font-semibold text-gray-600 my-8">
              </div>
              <div className="uppercase text-sm font-semibold text-gray-600 my-8">{startDate} - {endDate}</div>
              <div className="rotate-90 cursor-pointer" onClick={handleClickNextButton}>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.001 6L6.00098 1L1.00098 6" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
          <Calendar ref={calendarRef} {...calendarOptions} 
            onAfterRenderEvent={onAfterRenderEvent}
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
