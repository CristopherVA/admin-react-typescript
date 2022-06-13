import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data: any = localStorage.getItem("user");
  const user = JSON.parse(data);
  const { email, name} = user || ""; 

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center ">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              AdminApp
            </span>
          </a>
        
          <img
            id="avatar"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-10 h-10 rounded-full cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
            alt="User dropdown"
            onClick={() => setIsOpen(!isOpen)}
          />

          <div
            id="userDropdown"
            className={`${
              isOpen ? "" : "hidden"
            } w-56 z-10 absolute right-2 top-14 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top-start"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{name}</div>
              <div className="font-medium">{email}</div>
            </div>

            <div className="py-1">
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token")
                }}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
