import { Dialog, DialogProps } from "@mui/material";
import * as React from "react";
import { CalendarEvent } from "../pages/Home";
import moment from "moment";

interface IEventDialogProps extends DialogProps {
  event: CalendarEvent;
}

const PRIORITIES = ["Thấp", "Trung bình", "Cao"];

const EventDialog: React.FunctionComponent<IEventDialogProps> = ({
  open,
  onClose,
  event,
  ...others
}) => {
  const { start, end, body, location, category, raw } = event;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: 8, width: 560, height: 320 },
      }}
    >
      <div className="event-detail-popup h-full p-5 grid grid-cols-5">
        <div className="main-info col-span-3 border-r border-slate-500 px-2">
          <div className="title">
            <h2 className="font-bold text-2xl">{event.title}</h2>
          </div>
          <div className="project flex mt-2">
            <div className="project-span w-10 h-5.5 bg-orange-600 rounded-md mr-2"></div>
            <h4 className="font-semibold  text-orange-600 text-sm">
              Loại công việc 3
            </h4>
          </div>
          <div className="description py-2 mr-2 mt-8">
            <p className="text-sm">{body}</p>
          </div>
        </div>
        <div className="sub-info p-2 ml-9 col-span-2 grid grid-rows-3 gap-2">
          <div className="deadline">
            <div className="deadline-label font-bold text-slate-600 text-base">
              Hạn:
            </div>
            <p className="text-orange-600 font-semibold">
              {/* {moment(end.d.d).format("HH:mm | DD/MM/YYYY")} */}
            </p>
          </div>
          <div className="priority">
            <div className="priority-label font-bold text-slate-600 text-base">
              Độ ưu tiên
            </div>
            <p className="text-orange-600 font-semibold">
              {raw?.priority && PRIORITIES[raw.priority]}
            </p>
          </div>
          <div className="location">
            <div className="location-label font-bold text-slate-600 text-base">
              Địa điểm:
            </div>
            <p className="">{location}</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EventDialog;
