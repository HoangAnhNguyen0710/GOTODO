import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonSecondary,
  Notification,
} from "../components/common";
import { useState } from "react";
import { AlertColor } from "@mui/material";

export interface OutletContextProps {
  setOpenNoti: (open: boolean) => void;
  setMessageType: (messageType: AlertColor) => void;
  setMessage: (message: string) => void;
}

const Auth = (): JSX.Element => {
  const [openNoti, setOpenNoti] = useState(false);
  const [messageType, setMessageType] = useState<AlertColor>("error");
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <Notification
        message={message}
        open={openNoti}
        setOpen={setOpenNoti}
        messageType={messageType}
      />
      <div className="flex justify-between items-center pr-4 mb-16 text-lg">
        <div className="flex items-center gap-2">
          <Link to="/auth/sign-up">
            <ButtonPrimary title="登録する" />
          </Link>
          <Link to="/auth/login">
            <ButtonSecondary title="ログイン" />
          </Link>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto flex justify-between items-start">
        <div className="w-1/2">
          <img src="/img/lemon.png" className="w-full" />
        </div>
        <Outlet context={{ setOpenNoti, setMessageType, setMessage }} />
      </div>
    </>
  );
};

export default Auth;
