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
      maxWidth="sm"
      {...others}
    >
      <div className="p-6 grid grid-cols-5 w-full">
        <div className="col-span-3 border-r-2 border-r-gray">
          <h2 className="text-3xl font-semibold mb-2">{event.title}</h2>
          <div className="flex flex-row gap-2 items-center">
            <div className="h-4 w-3 bg-red-500 rounded" />
            <span>Loại công việc 3</span>
          </div>

          <p className="mt-4">{body}</p>
        </div>
        <div className="col-span-2 p-3">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-sm font-semibold">Hạn</div>
              <div className="text-red-500 font-semibold">
                {moment(end.d.d).format("HH:mm | DD/MM/YYYY")}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Độ ưu tiên</div>
              <div className="text-red-500">
                {raw?.priority && PRIORITIES[raw.priority]}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Địa điểm</div>
              <div className="text-grey-500">{location}</div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EventDialog;
