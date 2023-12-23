import {
  Button,
  Dialog,
  DialogContent,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Task } from "../../models/tasks";
import { createTask } from "../../services/Task";
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { ToastContainer, toast } from "react-toast";

export interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

interface FieldValidator {
  error: boolean,
  message: string
}

const initialTaskData: Task = {
  id: "",
  title: "",
  description: "",
  due_at: "",
  priority: 0,
  project_id: "1",
  is_done: false,
};

export default function CreateTaskDialog({
  open,
  handleClose,
}: CreateEventFormProps) {
  const [task, setTask] = useState<Task>(initialTaskData);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs(0));

  const priorityColors = ["#44f2e1", "#f0f72f", "#f7902f", "#eb4034"]

  const handleChangeTask = (ev: FormEvent<HTMLInputElement> | any) => {
    setTask({ ...task, [ev.currentTarget.name]: ev.currentTarget.value });
    setTitleErr({error: false, message: ''})
  };

  // state validate
  const [titleErr, setTitleErr] = useState<FieldValidator>({
    error: false,
    message: ''
  })

  const validateTask = (task: Task) => {
    const currentTime = new Date().toISOString();
    if (task.title === "") {
      setTitleErr({error: true, message: 'chua nhap ten task'})
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
    if (endDate) {
      endT = new Date(endDate.toISOString());
      endT.setHours(endTime?.hour(), endTime?.minute(), endTime?.second());
      task.due_at = endT.toISOString();
    }
    if (validateTask(task)) {
      await createTask(task).then(() => {
        toast.success("Create task success");
        setTask(initialTaskData);
        handleClose();
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
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
                <div className="col-span-1 grid justify-items-end">
                  <NotificationsIcon className="text-xl" />
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
                      <MenuItem value={0} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Thấp <CircleRoundedIcon sx={{color: priorityColors[0]}}/></MenuItem>
                      <MenuItem value={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Trung bình <CircleRoundedIcon sx={{color: priorityColors[1]}}/></MenuItem>
                      <MenuItem value={2} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Cao <CircleRoundedIcon sx={{color: priorityColors[2]}}/></MenuItem>
                      <MenuItem value={3} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Rất cao <CircleRoundedIcon sx={{color: priorityColors[3]}}/></MenuItem>
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
