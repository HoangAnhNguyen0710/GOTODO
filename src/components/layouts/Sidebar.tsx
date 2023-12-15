
import { Checkbox } from "@mui/material";
import Radio from "antd/es/radio";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaTasks } from "react-icons/fa";
import { Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

export interface Items {
  id:number,
  text: String
}

const items: Items[] = [{id: 1, text:'Công việc 1'}, {id: 2, text:'Công việc 2'}]

const Sidebar = () => {
  const [state, setState] = useState<number>(1);
  const [dropDown, setDropDown] = useState<boolean>(false);

  const changeState = (newState: number) => {
    setState(newState);
  };

  const changeDropDown = () => {    
    setDropDown(!dropDown);
  };
  return (
      <React.Fragment>
        <nav x-show="currentSidebarTab == 'linksTab'" aria-label="Main" className="flex flex-col h-full">
          {/* <!-- Logo --> */}
          <div className="  flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <div className=" flex items-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/10691/10691802.png" className="mr-3 h-10 sm:h-10" alt="Gotodo Logo" />
                  <span className="self-center text-2xl font-bold whitespace-nowrap text-black">Go<span className="text-rose-700">todo</span></span>
              </div>
          </div>
          <div className=" flex flex-col items-center justify-center flex-shrink-0 py-2 my-2">
            <a href="#">
              <img
                className="border-solid border-5 border-indigo-600 rounded-full h-28 w-24 mb-2"
                src="https://static.vecteezy.com/system/resources/previews/028/597/534/original/young-cartoon-female-avatar-student-character-wearing-eyeglasses-file-no-background-ai-generated-png.png"
                alt="K-UI"
              />
            </a>
            <span> 
              Xin chào, <a className="text-red-600">Nguyễn Hảo</a>
            </span>
          </div>
          <div className="bg-white rounded-md p-2 mx-1 drop-shadow-md">
            <div className="text-center text-zinc-400 pt-1 text-md">
              Bạn có
            </div>
            <table className="mt-0">
              <tbody>
                <tr>
                  <td className="w-28 h-24 text-center text-6xl font-bold text-rose-600">
                    01
                  </td>
                  <td className="text-base font-semibold">
                    <tr>
                      Công việc trong ngày hôm nay
                    </tr>
                    <tr className="text-red-600 font-semibold">
                        12/12/2023   
                    </tr>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap justify-between items-center mx-auto mt-6 my-4 max-w-screen-xl">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
            >
              + Thêm công việc
            </button>
          </div>

          <div className="px-8 text-center flex flex-row items-center">
            <Link to="/Todo" className="" onClick={() => changeState(0)}>
            <Button  className={state === 0 ? "bg-white w-36 h-36 uppercase font-bold border-none border-white shadow-md text-blue-600 flex flex-col items-center" : "bg-slate-100 w-32 h-32 uppercase font-bold border-none shadow border-slate-700 text-slate-500 flex flex-col items-center"}> 
                <FaTasks className="text-3xl mt-8 mb-2"/>
                <span> Todo </span>
              </Button>
            </Link>
            <Link to="/" className="ml-2" onClick={() => changeState(1)}>
              <Button className={state === 1 ? "bg-white w-36 h-36 uppercase font-bold border-none border-white shadow-md text-blue-600 flex flex-col items-center" : "bg-slate-100 w-32 h-32 uppercase font-bold border-none shadow border-slate-700 text-slate-500 flex flex-col items-center"}> 
                <SlCalender className="text-3xl mt-8 mb-2"/>
                <span> Calender </span>
              </Button>
            </Link>
          </div>
          <div className="px-6">
            <div className="font-bold text-base mt-8">
              Công việc của tôi
              <CaretDownOutlined className="ml-10" onClick={changeDropDown}/>
            </div>
              { dropDown? items.map(item =>
                <div className="text-zinc-400 my-2" key={item.id}>
                  <Checkbox  defaultChecked />
                  {item.text}
                </div>
                ) : <></>
              }
          </div>
            
          </nav>
      </React.Fragment>
  )
}

export default Sidebar;
