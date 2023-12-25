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
import Event from "../../models/events";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { createEvent } from "../../services/Event";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toast";

export interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

const initialEventData: Event = {
  id: "",
  title: "",
  description: "",
  started_at: "",
  ended_at: "",
  priority: 0,
  project_id: "1",
  location: "",
};

interface FieldValidator {
  error: boolean;
  message: string;
}

export default function CreateEventDialog({
  open,
  handleClose,
}: CreateEventFormProps) {
  const [event, setEvent] = useState<Event>(initialEventData);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [startTime, setStartTime] = useState<Dayjs>(dayjs(Date.now()));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs(Date.now()));

  const handleChangeEvent = (
    ev: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement> | any
  ) => {
    setEvent({ ...event, [ev.currentTarget.name]: ev.currentTarget.value });
    setTitleErr({ error: false, message: "" });
  };

  const priorityColors = ["#44f2e1", "#f0f72f", "#f7902f", "#eb4034"];

  // state validate
  const [titleErr, setTitleErr] = useState<FieldValidator>({
    error: false,
    message: "",
  });
  const validateEvent = (event: Event) => {
    const currentTime = new Date().toISOString();
    if (event.title === "") {
      setTitleErr({ error: true, message: "chua nhap ten event" });
      return false;
    }
    if (event.started_at <= currentTime) {
      toast.error("thoi gian bat dau event chua hop le");
      return false;
    }
    if (event.ended_at <= currentTime || event.ended_at <= event.started_at) {
      toast.error("thoi gian ket thuc event chua hop le");
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    let startT: Date;
    let endT: Date;
    if (startDate) {
      startT = new Date(startDate.toISOString());
      startT.setHours(
        startTime?.hour(),
        startTime?.minute(),
        startTime?.second()
      );
      event.started_at = startT.toISOString();
    }
    if (endDate) {
      endT = new Date(endDate.toISOString());
      endT.setHours(endTime?.hour(), endTime?.minute(), endTime?.second());
      event.ended_at = endT.toISOString();
    }
    if (validateEvent(event)) {
      await createEvent(event).then(() => {
        toast.success("Create task success");
        setEvent(initialEventData);
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
              <div className="grid grid-cols-4 justify-between w-full">
                <div className="col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  >
                    Tên sự kiện *
                  </label>
                  <div className="mt-2">
                    <TextField
                      error={titleErr.error}
                      helperText={titleErr.message}
                      size="small"
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      onChange={(ev: any) => handleChangeEvent(ev)}
                      value={event.title}
                      required
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="col-span-1 grid justify-items-end text-2xl">
                  <span className="cursor-pointer">
                    <IoMdNotificationsOutline />
                  </span>
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
                      sx={{ width: 230 }}
                      size="small"
                      name="project-id"
                      value={event.project_id}
                      onChange={(ev: any) =>
                        setEvent({ ...event, project_id: ev.target.value })
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
                      value={event.priority}
                      onChange={(ev: any) =>
                        setEvent({ ...event, priority: ev.target.value })
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
              <div className="pb-3 w-full">
                <label
                  htmlFor="first-name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Địa điểm *
                </label>
                <div className="mt-2">
                  <TextField
                    size="small"
                    type="text"
                    name="location"
                    id="location"
                    autoComplete="given-name"
                    onChange={(ev: any) => handleChangeEvent(ev)}
                    value={event.location}
                    required
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="py-3 w-full flex gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Ngày bắt đầu
                  </label>
                  <DatePicker
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
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
                    Thời gian bắt đầu
                  </label>
                  <TimePicker
                    value={startTime}
                    onChange={(value) => setStartTime(value ? value : dayjs(0))}
                    sx={{ width: "fit-content" }}
                  />
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
                  id="description"
                  name="description"
                  multiline
                  rows={4}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={event.description}
                  onChange={(ev: any) => handleChangeEvent(ev)}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmitForm}
                >
                  Tạo sự kiện mới
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
