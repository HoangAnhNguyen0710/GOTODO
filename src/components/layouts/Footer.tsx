import React from "react";
import { AiFillFacebook, AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
    return (
        <section className="mobile:px-4 bg-slate-200 px-[8%] py-16">
          <div className="mobile:flex-col border-white-200 flex justify-between border-b border-solid pb-8 pt-16">
          </div>
    
          <div className="mobile:flex-col mobile:items-start flex items-center justify-between pt-8">
            <div className="grid grid-cols-4 items-center gap-x-3">
              <a href="https://www.facebook.com" className="text-gray-300">
                <AiFillFacebook size="2rem" />
              </a>
              <a href="https://www.instagram.com" className="text-gray-300">
                <AiOutlineInstagram size="2rem" />
              </a>
              <a href="https://www.youtube.com" className="text-gray-300">
                <AiFillYoutube size="2rem" />
              </a>
            </div>
    
            <div className="mobile:flex-col mobile:items-start mobile:mt-8 flex items-center">
              <p className="text-gray-300"> Design ©2023 Created by Team Susanoo</p>
            </div>
          </div>
        </section>
      );
}

export default Footer;