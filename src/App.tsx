import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound, Auth, Login, Signup } from "./pages";
import Layout from "./components/layouts/Layout";
import Todo from "./pages/Todo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getDailyTasksAndEvents } from "./services/Task";
import { Dialog } from "@mui/material";
import { CalendarEvent } from "./pages/Home";
import { FaRegClock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const items = [
  "Công việc trên trường",
  "Việc tại công ty",
  "Vui chơi giải trí",
  "Tự học",
];

function App() {
  // Set up reminder for the whole app
  const [remindersTimeouts, setRemindersTimeouts] = useState<NodeJS.Timeout[]>(
    []
  );
  const [openReminder, setOpenReminder] = useState(false);
  const [reminderWork, setReminderWork] = useState<CalendarEvent>();
  const counter = useSelector(
    (state: RootState) => state.newObjectCounter.value
  );
  console.log(counter);
  useEffect(() => {
    remindersTimeouts.forEach((timeout) => clearTimeout(timeout));
    getDailyTasksAndEvents().then((data) => {
      const unexpiredWorks = data.filter((work) => {
        const currentTime = new Date();
        const endDay = new Date();
        endDay.setHours(23, 59, 59);
        if (work.category === "task") {
          return new Date(work.end) > currentTime;
        } else if (work.start) {
          const startTime = new Date(work.start);
          const notStarted = startTime > currentTime;
          const withinDay = startTime < endDay;
          return notStarted && withinDay;
        } else return false;
      });

      const remindersTimeoutsClone: NodeJS.Timeout[] = [];
      const currentTime = new Date();
      unexpiredWorks.forEach((work) => {
        work.raw?.reminders.forEach((reminder) => {
          let reminderTime = 0;
          if (work.category === "task") {
            const deadline = new Date(work.end).getTime();
            reminderTime = deadline - reminder * 1000; // Reminder in secs to millisecs
          } else if (work.start) {
            const startEvent = new Date(work.start).getTime();
            reminderTime = startEvent - reminder * 1000; // Reminder in secs to millisecs
          }
          if (reminderTime > currentTime.getTime()) {
            const timeoutId = setTimeout(
              () => showReminder(work),
              reminderTime - currentTime.getTime()
            );
            remindersTimeoutsClone.push(timeoutId);
          }
        });
      });
      setRemindersTimeouts(remindersTimeoutsClone);
    });

    return () => remindersTimeouts.forEach((timeout) => clearTimeout(timeout));
  }, [counter]);

  const handleCloseReminder = () => setOpenReminder(false);

  const showReminder = (work: CalendarEvent) => {
    console.log(work);
    setOpenReminder(true);
    setReminderWork(work);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={openReminder} onClose={handleCloseReminder}>
        {/* <div>{reminderName}</div> */}
        <div>
          <p className="p-4 text-lg font-bold text-red-500 border-b border-gray text-center">
            Công việc sắp tới hạn
          </p>
          <div className="flex gap-4 items-center p-4">
            <span className="text-3xl">
              <FaRegClock />
            </span>
            <p>
              <span className="font-bold">{reminderWork?.title}</span> trong{" "}
              <span className="font-bold text-red-700">
                {items[Number(reminderWork?.calendarId) - 1]}
              </span>{" "}
              sẽ {reminderWork?.category === "task" ? "tới hạn" : "bắt đầu"} vào
              lúc{" "}
              <span className="font-bold text-red-700">
                {reminderWork?.category === "task"
                  ? ` ${new Date(reminderWork.end).getHours()}:${new Date(
                      reminderWork.end
                    ).getMinutes()}`
                  : `${new Date(
                      reminderWork?.start ? reminderWork.start : 0
                    ).getHours()}:${new Date(
                      reminderWork?.start ? reminderWork.start : 0
                    ).getMinutes()}`}{" "}
              </span>
              ngày hôm nay
            </p>
          </div>
          <div className="w-full flex justify-center pb-4">
            <button
              className="px-8 py-2 text-white font-bold bg-blue-400 rounded"
              onClick={handleCloseReminder}
            >
              OK
            </button>
          </div>
        </div>
      </Dialog>
      <Routes>
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}>
            {/* <Route path="food/:id" element={<FoodDetail></FoodDetail>}></Route> */}
          </Route>
          <Route path="/Todo" element={<Todo />}>
            {/* <Route path="food/:id" element={<FoodDetail></FoodDetail>}></Route> */}
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
