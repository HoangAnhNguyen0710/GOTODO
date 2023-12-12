
import { Checkbox } from "@mui/material";
import Radio from "antd/es/radio";
import React from "react";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaTasks } from "react-icons/fa";
const Sidebar = () => {
  
    return (
        <React.Fragment>
          <nav x-show="currentSidebarTab == 'linksTab'" aria-label="Main" className="flex flex-col h-full">
            {/* <!-- Logo --> */}
            <div className="  flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className=" flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/10691/10691802.png" className="mr-3 h-12 sm:h-12" alt="Gotodo Logo" />
                    <span className="self-center text-4xl font-bold whitespace-nowrap text-black">Go<span className="text-rose-700">todo</span></span>
                </div>
            </div>
            <div className=" flex items-center justify-center flex-shrink-0 py-4 mt-10 mb-10">
              <a href="#">
                <img
                  className="border-double border-8 border-indigo-600 rounded-full w-36 h-36"
                  src="https://static.vecteezy.com/system/resources/previews/028/597/534/original/young-cartoon-female-avatar-student-character-wearing-eyeglasses-file-no-background-ai-generated-png.png"
                  alt="K-UI"
                />
                Xin chao, <a className="text-red-600/100">Nam duong</a>
              </a>
            </div>
            <div className="bg-white rounded-md">
              <div className="text-center text-zinc-400 pt-1">
                Ban co
              </div>
              <table className="">
                <tbody>
                  <tr>
                    <td className="w-24 h-16 text-center text-6xl ">
                      01
                    </td>
                    <td className="text-base">
                      <tr>
                        Cong viec trong ngay hom nay
                      </tr>
                      <tr className="text-red-600/100">
                         12/12/2023   
                      </tr>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div>
              <Radio.Button className=" text-white ml-20 mt-10 mb-10 w-40 h-10 basis-1/4  flex flex-col items-center justify-center bg-sky-500">
                + Them cong viec
              </Radio.Button>
            </div>

            <div className="m-1 text-center">
              <Link to="/Todo" className="border-double  ">
                <Radio.Button className=" w-40 h-40 uppercase font-semibold  border-2 border-double border-black  text-black" >
                <FaTasks className="text-7xl mt-5 ml-6"/>
                Todo
                </Radio.Button>
              </Link>
              <Link to="/" className="border-double ">
                <Radio.Button className="bg-sky-500 w-40 h-40 uppercase font-semibold  border-2 border-double border-black  text-black"> 
                <SlCalender className="text-7xl mt-5 ml-6"/>
                Calender
                </Radio.Button>
              </Link>
            </div>
            <div className="">
               Cong viec cua toi
              <div className="text-zinc-400">
              <Checkbox  defaultChecked />
              Cong viec 1
              </div>
              <div className="text-zinc-400">
              <Checkbox  defaultChecked />
              Cong viec 2
              </div>
              <div className="text-zinc-400">
              <Checkbox  defaultChecked />
              Cong viec 3
              </div>
              <div className="text-zinc-400">
              <Checkbox  defaultChecked />
              Cong viec 4
              </div>
            </div>
              
            </nav>
        </React.Fragment>
    )
}

export default Sidebar;