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
import dayjs, { Dayjs } from 'dayjs';
import { FormEvent, useEffect, useState } from "react";
import Event from "../../models/events";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreateIcon from "@mui/icons-material/Create";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { createEvent } from "../../services/Event";

export interface CreateEventFormProps {
  open: boolean;
  handleClose?: () => void;
}

export default function CreateEventDialog({
  open,
  handleClose,
}: CreateEventFormProps) {

  const [event, setEvent] = useState<Event>({
    id: "",
    title: "",
    description: "",
    started_at: "",
    ended_at: "",
    priority: 1,
    location: "",
  });
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()))
  const [startTime, setStartTime] = useState<Dayjs>(dayjs(0))
  const [endTime, setEndTime] = useState<Dayjs>(dayjs(0))

  const handleChangeEvent = (ev: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement> | any) => {
    setEvent({...event, [ev.currentTarget.name]: ev.currentTarget.value})
  }
  useEffect(() => {
    console.log(event)
  }, [event])

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

    await createEvent(event).then(() => console.log("create event success"))
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <FormGroup onSubmit={handleSubmitForm}>
          <div className="min-w-[420px] min-h-[480px] h-fit w-fit">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-between w-full">
                <TextField
                  variant="outlined"
                  label="Ten event"
                  name="title"
                  value={event.title}
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
                    value={event.priority}
                    onChange={(ev: any) =>  setEvent({...event, "priority": ev.target.value})}
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
              <div className="py-3 w-full">
                <TextField
                  variant="outlined"
                  label="Dia diem"
                  name="location"
                  value={event.location}
                  onChange={(ev: any) => handleChangeEvent(ev)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="py-3 w-full flex ">
                <DatePicker
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  label="Start Date"
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
                  value={startTime}
                  onChange={(value) => setStartTime(value ? value : dayjs(0))}
                  label="Start time"
                  sx={{ width: "fit-content", ml: 2 }}
                />
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
                  value={event.description}
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
                <Button type="submit" variant="contained" onClick={handleSubmitForm}>
                  Create Event
                </Button>
              </div>
            </div>
          </div>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
}
