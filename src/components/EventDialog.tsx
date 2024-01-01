import { Dialog, DialogProps } from "@mui/material";
import * as React from "react";
import { CalendarEvent } from "../pages/Home";
import moment from "moment";
import { BACKGROUND_COLOR, BORDER_COLOR} from "../const/color";

interface IEventDialogProps extends DialogProps {
  event: CalendarEvent;
  updateTaskStatement?: () => void;
}

const PRIORITIES = ["Thấp", "Trung bình", "Cao", "Rất cao"];
const items = [
  "Công việc trên trường",
  "Việc tại công ty",
  "Vui chơi giải trí",
  "Tự học",
];

const EventDialog: React.FunctionComponent<IEventDialogProps> = ({
  open,
  onClose,
  event,
  updateTaskStatement,
  ...others
}) => {
  const { start, end, body, location, category, raw, due_at } = event;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: 8, width: 560 },
      }}
    >
      <div className="event-detail-popup h-full p-5 grid grid-cols-5">
        <div className="main-info col-span-3 border-r border-slate-500 px-2">
          <div className="title flex">
            {typeof event.is_done == "boolean" ? (
              event.is_done == true ? (
                <>
                  <button
                    className="p-3 m-1 bg-red-600 border-red-600 border-4 border-solid rounded-full absolute"
                    style={{borderColor: BORDER_COLOR[raw.priority], backgroundColor: BORDER_COLOR[raw.priority]}}
                    onClick={updateTaskStatement}
                  ></button>
                  <div className="font-bold text-2xl w-full ml-12" style={{}}>
                    {event.title}
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="p-3 m-1 border-red-600 border-4 border-solid rounded-full absolute"
                    style={{borderColor: BORDER_COLOR[raw.priority]}}
                    onClick={updateTaskStatement}
                  ></button>
                  <div className="font-bold text-2xl w-full ml-12">
                    {event.title}
                  </div>
                </>
              )
            ) : (
              <div className="font-extrabold text-xl w-full">{event.title}</div>
            )}
          </div>
          <div className="project flex mt-3">
            <div className="project-span w-10 h-5.5 rounded-md mr-2" style={{backgroundColor: BORDER_COLOR[Number(raw.priority)]}}></div>
            <h4 className="font-bold text-sm" style={{color: BORDER_COLOR[Number(raw.priority)]}}>
              {items[Number(event.calendarId) - 1]}
            </h4>
          </div>
          <div className="description py-2 mr-2 mt-4">
            <p className="font-bold">Mô tả</p>
            <p className="text-sm">{body}</p>
          </div>
        </div>
        <div className="sub-info p-2 ml-9 col-span-2">
          {event.category === "time" && (
            <div className="start_time">
              <div className="deadline-label font-bold text-slate-600 text-base">
                Bắt đầu:
              </div>
              <p className="font-semibold text-sm mb-2" style={{color: BORDER_COLOR[Number(raw.priority)]}}>
                {start &&
                  start != "" &&
                  moment(start.d.d).format("HH:mm | DD/MM/YYYY")}
              </p>
            </div>
          )}
          <div className="deadline">
            <div className="deadline-label font-bold text-slate-600 text-base">
              {event.category === "time" ? "Kết thúc:" : "Hạn:"}
            </div>
            <p className="font-semibold text-sm" style={{color: BORDER_COLOR[Number(raw.priority)]}}>
              {end != "" && moment(end.d.d).format("HH:mm | DD/MM/YYYY")}
              {due_at && moment(event.due_at).format("HH:mm | DD/MM/YYYY")}
            </p>
          </div>
          <div className="priority mt-10">
            <div className="priority-label font-bold text-slate-600 text-base">
              Độ ưu tiên
            </div>
            <p className="font-semibold text-sm" style={{color: BORDER_COLOR[Number(raw.priority)]}}>
              {raw && PRIORITIES[Number(raw.priority)]}
            </p>
          </div>
          {location && (
            <div className="location mt-10">
              <div className="location-label font-bold text-slate-600 text-sm">
                Địa điểm:
              </div>
              <p className="">{location}</p>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default EventDialog;
