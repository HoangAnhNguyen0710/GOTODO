import React from "react";

const Sidebar = () => {
  return (
    <React.Fragment>
      <nav
        x-show="currentSidebarTab == 'linksTab'"
        aria-label="Main"
        className="flex flex-col h-full"
      >
        {/* <!-- Logo --> */}
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10691/10691802.png"
              className="mr-3 h-12 sm:h-12"
              alt="Gotodo Logo"
            />
            <span className="self-center text-4xl font-bold whitespace-nowrap text-black">
              Go<span className="text-rose-700">todo</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center flex-shrink-0 py-4">
          <a href="#">
            <img
              className="w-24"
              src="https://static.vecteezy.com/system/resources/previews/028/597/534/original/young-cartoon-female-avatar-student-character-wearing-eyeglasses-file-no-background-ai-generated-png.png"
              alt="K-UI"
            />
          </a>
        </div>

        {/* <!-- Links --> */}
        <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
          <a
            href="#"
            className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
          >
            <span aria-hidden="true" className="p-2 bg-indigo-700 rounded-lg">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </span>
            <span>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
          >
            <span
              aria-hidden="true"
              className="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span>Pages</span>
          </a>
        </div>

        <div className="flex-shrink-0 p-4 mt-10">
          <div className="hidden p-2 space-y-6 bg-gray-100 rounded-lg md:block">
            <img
              aria-hidden="true"
              className="-mt-10"
              src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/52b4b4abb92ef251f6610be416038b48209d7a81/public/assets/images/undraw_web_developer_p3e5.svg"
            />
            <p className="text-sm text-indigo-600">
              Use our{" "}
              <span className="text-base text-indigo-700er">Premium</span>{" "}
              features now! <br />
            </p>
            <button className="w-full px-4 py-2 text-center text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-100">
              Upgrade to pro
            </button>
          </div>

          <button className="w-full px-4 py-2 text-center text-white transition-colors bg-indigo-600 rounded-lg md:hidden hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-100">
            Upgrade to pro
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
