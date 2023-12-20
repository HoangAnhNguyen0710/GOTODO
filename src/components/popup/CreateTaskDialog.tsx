import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateIcon from "@mui/icons-material/Create";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Task } from "../../models/tasks";
import { createTask } from "../../services/Task";

export interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

const initialTaskData = {
  id: "",
  title: "",
  description: "",
  due_at: "",
  priority: 1,
  is_done: false,
};

export default function CreateTaskDialog({
  open,
  handleClose,
}: CreateEventFormProps) {
  const [task, setTask] = useState<Task>(initialTaskData);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs(0));
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChangeTask = (ev: FormEvent<HTMLInputElement> | any) => {
    setTask({ ...task, [ev.currentTarget.name]: ev.currentTarget.value });
  };

  const validateTask = (task: Task) => {
    console.log(errorMessage);
    const currentTime = new Date().toISOString();
    if (task.title === "") {
      setErrorMessage("Chua nhap ten task");
      return false;
    }
    if (task.due_at <= currentTime) {
      setErrorMessage("deadline task chua hop le");
      return false;
    }
    return true;
  };
  const handleSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    let endT: Date;
    if (endDate) {
      endT = new Date(endDate.toISOString());
      endT.setHours(endTime?.hour(), endTime?.minute(), endTime?.second());
      task.due_at = endT.toISOString();
    }

    if (validateTask(task)) {
      await createTask(task).then(() => {
        setErrorMessage("");
        alert("Create task success");
        setTask(initialTaskData);
        handleClose();
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <div>
          <span className="text-red-500 font-medium">
            {errorMessage}
            <br />
          </span>
        </div>
        <FormGroup onSubmit={handleSubmitForm}>
          <div className="min-w-[420px] min-h-[480px] h-fit w-fit mx-5 my-3">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center grid grid-cols-4 justify-between w-full">
                <div className="col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  >
                    Tên nhiệm vụ *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      onChange={(ev: any) => handleChangeTask(ev)}
                      value={task.title}
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="col-span-1 grid justify-items-end">
                  <NotificationsIcon className="text-xl" />
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="projectid"
                  >
                    Loại công việc
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="project-id"
                      value={task.project_id}
                      onChange={(ev: any) =>
                        setTask({ ...task, project_id: ev.target.value })
                      }
                    >
                      <option value={1}>Công việc trên trường</option>
                      <option value={2}>Việc tại công ty</option>
                      <option value={3}>Vui chơi giải trí</option>
                      <option value={4}>Tự học</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="priority"
                  >
                    Độ ưu tiên
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="priority"
                      value={task.priority}
                      onChange={(ev: any) =>
                        setTask({ ...task, priority: ev.target.value })
                      }
                    >
                      <option value={0}>Thấp</option>
                      <option value={1}>Trung bình</option>
                      <option value={2}>Cao</option>
                      <option value={3}>Rất cao</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3 w-full flex gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Ngày kết thúc
                  </label>
                  <DatePicker
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    slotProps={{
                      // Targets the `IconButton` component.
                      openPickerButton: {
                        color: "primary",
                      },
                      openPickerIcon: CalendarMonthIcon,
                      // Targets the `InputAdornment` component.
                      inputAdornment: {
                        position: "start",
                      },
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Thời gian kết thúc
                  </label>
                  <TimePicker
                    value={endTime}
                    onChange={(value) => setEndTime(value ? value : dayjs(0))}
                    sx={{ width: "fit-content" }}
                  />
                </div>
              </div>
              <div className="py-3 w-full">
                <label
                  htmlFor="first-name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Mô tả sự kiện
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  defaultValue={""}
                  onChange={(ev: any) => handleChangeTask(ev)}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmitForm}
                >
                  Tạo nhiệm vụ mới
                </Button>
              </div>
            </div>
          </div>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
}
