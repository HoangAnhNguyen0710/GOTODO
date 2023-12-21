import {
  Button,
  Dialog,
  DialogContent,
  FormGroup,
} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { FormEvent, useState } from "react";
import Event from "../../models/events";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { createEvent } from "../../services/Event";

export interface CreateEventFormProps {
  open: boolean;
  handleClose: () => void;
}

const initialEventData:Event = {
  id: "",
  title: "",
  description: "",
  started_at: "",
  ended_at: "",
  priority: 0,
  project_id: "1",
  location: "",
}

export default function CreateEventDialog({
  open,
  handleClose,
}: CreateEventFormProps) {

  const [event, setEvent] = useState<Event>(initialEventData);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()))
  const [startTime, setStartTime] = useState<Dayjs>(dayjs(0))
  const [endTime, setEndTime] = useState<Dayjs>(dayjs(0))

  const [errorMessage, setErrorMessage] = useState<string>('')
  const handleChangeEvent = (ev: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement> | any) => {
    setEvent({...event, [ev.currentTarget.name]: ev.currentTarget.value})
  }

  const validateEvent = (event: Event) => {
    console.log(errorMessage)
    const currentTime = new Date().toISOString()
    if (event.title === "") {
      setErrorMessage("Chua nhap ten event")
      return false
    }
    if (event.started_at <= currentTime) {
      setErrorMessage("thoi gian bat dau event chua hop le")
      return false
    }
    if (event.ended_at <= currentTime || event.ended_at <= event.started_at) {
      setErrorMessage("thoi gian ket thuc event chua hop le")
      return false
    }
    return true
  }

  const handleSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault()
    let startT: Date
    let endT: Date
    if(startDate) {
      startT = new Date(startDate.toISOString())
      startT.setHours(startTime?.hour(), startTime?.minute(), startTime?.second())
      event.started_at = startT.toISOString()
    }
    if(endDate) {
      endT = new Date(endDate.toISOString())
      endT.setHours(endTime?.hour(), endTime?.minute(), endTime?.second())
      event.ended_at = endT.toISOString()
    }
    if(validateEvent(event)){
    await createEvent(event).then(() => {
      setErrorMessage('')
      alert("Create event success")
      setEvent(initialEventData)
      handleClose()
    }
    )
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <div>
          <span className="text-red-500 font-medium">{errorMessage}<br/></span>
        </div>
        <FormGroup onSubmit={handleSubmitForm}>
          <div className="min-w-[420px] min-h-[480px] h-fit w-fit mx-5 my-3">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center grid grid-cols-4 justify-between w-full">
                <div className="col-span-3">
                  <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                    Tên sự kiện *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      onChange={(ev: any) => handleChangeEvent(ev)}
                      value={event.title}
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="col-span-1 grid justify-items-end">
                  <NotificationsIcon className="text-xl"/>
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <div>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="projectid">
                    Loại công việc
                  </label>
                  <div className="relative">
                    <select 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      name="project-id"
                      value={event.project_id}
                      onChange={(ev: any) =>
                        setEvent({ ...event, project_id: ev.target.value })
                      }>
                      <option value={"1"}>Công việc trên trường</option>
                      <option value={"2"}>Việc tại công ty</option>
                      <option value={"3"}>Vui chơi giải trí</option>
                      <option value={"4"}>Tự học</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="priority">
                    Độ ưu tiên
                  </label>
                  <div className="relative">
                    <select 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="priority"
                      value={event.priority}
                      onChange={(ev: any) =>  setEvent({...event, "priority": ev.target.value})}
                      >
                      <option value={0}>Thấp</option>
                      <option value={1}>Trung bình</option>
                      <option value={2}>Cao</option>
                      <option value={3}>Rất cao</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3 w-full">
                <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Địa điểm *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    autoComplete="given-name"
                    onChange={(ev: any) => handleChangeEvent(ev)}
                    value={event.location}
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="py-3 w-full flex gap-4">
                <div>
                  <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
                </div><div>
                  <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Thời gian bắt đầu
                  </label>
                <TimePicker
                  value={startTime}
                  onChange={(value) => setStartTime(value ? value : dayjs(0))}
                  sx={{ width: "fit-content"}}
                />
                </div>
              </div>
              <div className="py-3 w-full flex gap-4">
                <div>
                  <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
                  <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Thời gian kết thúc
                  </label>
                  <TimePicker
                    value={endTime}
                    onChange={(value) => setEndTime(value ? value : dayjs(0))}
                    sx={{ width: "fit-content",}}
                  />
                </div>
              </div>
              <div className="py-3 w-full">
                <label htmlFor="first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Mô tả sự kiện
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  defaultValue={''}
                  onChange={(ev: any) => handleChangeEvent(ev)}
                />
              </div>
              <div>
                <Button type="submit" variant="contained" onClick={handleSubmitForm}>
                    Tạo sự kiện mới
                </Button>
              </div>
            </div>
          </div>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
}
