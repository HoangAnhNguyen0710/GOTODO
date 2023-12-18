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

  const handleChangeEvent = (ev: FormEvent<HTMLInputElement> | any) => {
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
        setErrorMessage('')
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
          <div className="min-w-[420px] min-h-[480px] h-fit w-fit">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-between w-full">
                <TextField
                  variant="outlined"
                  label="Ten task"
                  name="title"
                  value={task.title}
                  onChange={(ev: any) => handleChangeEvent(ev)}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                  <InputLabel id="demo-select-small-label">
                    Do uu tien
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Do uu tien"
                    name="priority"
                    value={task.priority}
                    onChange={(ev: any) =>
                      setTask({ ...task, priority: ev.target.value })
                    }
                  >
                    <MenuItem value={1}>
                      <CircleIcon color="error" />
                    </MenuItem>
                    <MenuItem value={2}>
                      <CircleIcon color="warning" />
                    </MenuItem>
                    <MenuItem value={3}>
                      <CircleIcon color="success" />
                    </MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ py: 2 }}
                >
                  <NotificationsIcon />
                </Button>
              </div>
              <div className="py-3 w-full flex ">
                <DatePicker
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                  label="End Date"
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
                <TimePicker
                  value={endTime}
                  onChange={(value) => setEndTime(value ? value : dayjs(0))}
                  label="End time"
                  sx={{ width: "fit-content", ml: 2 }}
                />
              </div>
              <div className="py-3 w-full">
                <TextField
                  variant="outlined"
                  label="Mo ta"
                  name="description"
                  value={task.description}
                  onChange={(ev: any) => handleChangeEvent(ev)}
                  multiline
                  fullWidth
                  rows={4}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ position: "relative" }}
                      >
                        <CreateIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmitForm}
                >
                  Create Task
                </Button>
              </div>
            </div>
          </div>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
}
