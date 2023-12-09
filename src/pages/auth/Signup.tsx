import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { User, validateUser } from "../../models";
import { createUser } from "../../services/auth/Auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user.reducer";
import { OutletContextProps } from "../../pages/Auth";
import { Loading } from "../../components/common";

const initialUser: Omit<User, "id"> = {
  email: "",
  fullname: "",
  nationality: "",
  phone: "",
  username: "",
  point: 0,
  image: "/img/default-avt.png",
};

const Signup = (): JSX.Element => {
  const [newUserData, setNewUserData] = useState<
    User | Omit<User, "id">
  >(initialUser);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { setOpenNoti, setMessage, setMessageType } =
    useOutletContext<OutletContextProps>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    try {
      if (validateUser(newUserData, password, passwordConfirm)) {
        setLoading(true);
        createUser(newUserData, password)
          .then((newUser) => {
            dispatch(setCurrentUser(newUser));
            setMessage("アカウント作成できました");
            setMessageType("success");
            setOpenNoti(true);
            setTimeout(() => navigate("/", { replace: true }), 2000);
          })
          .catch((err) => {
            setMessage(err.message);
            setMessageType("error");
            setOpenNoti(true);
          })
          .finally(() => setLoading(false));
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
        setOpenNoti(true);
        setMessageType("error");
      }
    }
  };

  return (
    <>
      <div className="w-1/2 flex justify-center items-center flex-col relative h-full gap-10 border-white border-dashed border-2 p-8 rounded-md">
        <p className="text-3xl font-bold relative w-full text-center">
          <Link
            to="/auth/login"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-main cursor-pointer transition-none p-4"
          >
            <AiOutlineArrowLeft />
          </Link>
          登録
        </p>
        <form
          className="flex flex-col items-center gap-8 w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="username"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <AiOutlineUser />
              </label>
              <input
                type="text"
                id="username"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="ユーザー名"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, username: e.target.value })
                }
                minLength={4}
              />
            </div>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="fullname"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <AiOutlineUser />
              </label>
              <input
                type="text"
                id="fullname"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="フルネーム"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, fullname: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="phone"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <AiOutlinePhone />
              </label>
              <input
                type="text"
                id="phone"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="電話番号"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="address"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <LuMapPin />
              </label>
              <input
                type="text"
                id="address"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="国籍"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    nationality: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="email"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <AiOutlineMail />
              </label>
              <input
                type="text"
                id="email"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="メールアドレス"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, email: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="password"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <AiOutlineLock />
              </label>
              <input
                type="password"
                id="password"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="パスワード"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="password-confirm"
                className="text-2xl rounded-full absolute left-4 z-10 text-main"
              >
                <AiOutlineLock />
              </label>
              <input
                type="password"
                id="password-confirm"
                className="focus:outline-none rounded-full w-full py-2 px-12 shadow-lg focus:shadow-xl"
                placeholder="パスワードの確認"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-main text-white py-2 px-10 rounded hover:bg-mainShade transition-all w-28 h-10"
            onClick={handleSubmit}
          >
            {loading ? <Loading /> : "登録"}
          </button>
          <p>
            もうアカウントがある?{" "}
            <Link to="/auth/login" className="font-bold text-main">
              ログイン
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
