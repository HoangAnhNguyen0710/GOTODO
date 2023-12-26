import {
  Button,
  Dialog,
  DialogContent,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Checkbox,
} from "@mui/material";
import { DEFAULT_REMINDER, ReminderOption } from "./CreateEventDialog";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Task } from "../../models/tasks";
import { createTask } from "../../services/Task";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { ToastContainer, toast } from "react-toast";

export interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

interface FieldValidator {
  error: boolean;
  message: string;
}

const initialTaskData: Task = {
  id: "",
  title: "",
  description: "",
  due_at: "",
  priority: 0,
  project_id: "1",
  is_done: false,
  reminders: [5],
};

const items: ReminderOption[] = [
  { text: "12 giờ", value: 43200 },
  { text: "3 giờ", value: 10800 },
  { text: "1 giờ", value: 3600 },
  { text: "30 phút", value: 1800 },
];

export default function CreateTaskDialog({
  open,
  handleClose,
}: CreateEventFormProps) {
  const [task, setTask] = useState<Task>(initialTaskData);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [reminders, setReminders] = useState<number[]>([DEFAULT_REMINDER]);
  const [openReminder, setOpenReminder] = useState(false);
  const [endTime, setEndTime] = useState<Dayjs>(dayjs(Date.now()));

  const priorityColors = ["#44f2e1", "#f0f72f", "#f7902f", "#eb4034"];

  const handleChangeTask = (ev: FormEvent<HTMLInputElement> | any) => {
    setTask({ ...task, [ev.currentTarget.name]: ev.currentTarget.value });
    setTitleErr({ error: false, message: "" });
  };

  const handleReminderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    const remindersCopy = [...reminders];
    if (e.target.checked) {
      remindersCopy.push(value);
    } else {
      const index = remindersCopy.indexOf(value);
      if (index !== -1) remindersCopy.splice(index, 1);
    }
    setReminders(remindersCopy);
  };

  const handleToggleReminder = () => {
    setOpenReminder(!openReminder);
  };

  // state validate
  const [titleErr, setTitleErr] = useState<FieldValidator>({
    error: false,
    message: "",
  });

  const validateTask = (task: Task) => {
    const currentTime = new Date().toISOString();
    if (task.title === "") {
      setTitleErr({ error: true, message: "chua nhap ten task" });
      return false;
    }
    if (task.due_at <= currentTime) {
      toast.error("deadline task chua hop le");
      return false;
    }
    return true;
  };
  const handleSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    let endT: Date;
    const taskCopy = { ...task };
    if (endDate) {
      endT = new Date(endDate.toISOString());
      endT.setHours(endTime?.hour(), endTime?.minute(), endTime?.second());
      taskCopy.due_at = endT.toISOString();
    }
    taskCopy.reminders = [...reminders];
    if (validateTask(taskCopy)) {
      console.log(taskCopy);
      await createTask(taskCopy)
        .then(() => {
          toast.success(
            reminders.length !== 1
              ? "Tạo todo thành công"
              : "Đã tạo todo. Bạn sẽ được mặc định nhắc nhở trước deadline 5 phút"
          );
        })
        .finally(() => {
          setTask(initialTaskData);
          closeDialog();
        });
    }
  };

  const closeDialog = () => {
    handleClose();
    setReminders([DEFAULT_REMINDER]);
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <FormGroup onSubmit={handleSubmitForm}>
          <div className="min-w-[420px] min-h-[480px] h-fit w-fit mx-5 my-3">
            <div className="flex items-center justify-center flex-col">
              <div className="items-center grid grid-cols-4 justify-between w-full">
                <div className="col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  >
                    Tên nhiệm vụ *
                  </label>
                  <div className="mt-2">
                    <TextField
                      size="small"
                      type="text"
                      name="title"
                      id="title"
                      error={titleErr.error}
                      helperText={titleErr.message}
                      autoComplete="given-name"
                      onChange={(ev: any) => handleChangeTask(ev)}
                      value={task.title}
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="col-span-1 grid justify-items-end text-2xl relative">
                  <span
                    className="cursor-pointer"
                    onClick={handleToggleReminder}
                  >
                    <IoMdNotificationsOutline />
                  </span>
                  {openReminder ? (
                    <div className="absolute bg-white z-50 w-56 shadow-md top-8 border-2 border-gray p-2 rounded-lg text-sm font-bold">
                      {items.map((item) => (
                        <div className="text-zinc-400 my-2" key={item.text}>
                          <Checkbox
                            value={item.value}
                            onChange={(e) =>
                              handleReminderChange(e, item.value)
                            }
                          />
                          Báo lại sau {item.text}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between w-full my-4">
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="projectid"
                  >
                    Loại công việc
                  </label>
                  <div className="relative">
                    <Select
                      size="small"
                      sx={{ width: 230 }}
                      name="project-id"
                      value={task.project_id}
                      onChange={(ev: any) =>
                        setTask({ ...task, project_id: ev.target.value })
                      }
                    >
                      <MenuItem value={"1"}>Công việc trên trường</MenuItem>
                      <MenuItem value={"2"}>Việc tại công ty</MenuItem>
                      <MenuItem value={"3"}>Vui chơi giải trí</MenuItem>
                      <MenuItem value={"4"}>Tự học</MenuItem>
                    </Select>
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
                    <Select
                      size="small"
                      sx={{ width: 180 }}
                      id="priority"
                      value={task.priority}
                      onChange={(ev: any) =>
                        setTask({ ...task, priority: ev.target.value })
                      }
                    >
                      <MenuItem
                        value={0}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        Thấp{" "}
                        <CircleRoundedIcon sx={{ color: priorityColors[0] }} />
                      </MenuItem>
                      <MenuItem
                        value={1}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        Trung bình{" "}
                        <CircleRoundedIcon sx={{ color: priorityColors[1] }} />
                      </MenuItem>
                      <MenuItem
                        value={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        Cao{" "}
                        <CircleRoundedIcon sx={{ color: priorityColors[2] }} />
                      </MenuItem>
                      <MenuItem
                        value={3}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        Rất cao{" "}
                        <CircleRoundedIcon sx={{ color: priorityColors[3] }} />
                      </MenuItem>
                    </Select>
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
                <TextField
                  size="small"
                  multiline
                  id="description"
                  name="description"
                  rows={4}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
      <ToastContainer delay={2000} />
    </Dialog>
  );
}
