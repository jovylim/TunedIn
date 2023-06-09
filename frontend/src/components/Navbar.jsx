import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";

const Navbar = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <div className="navbar bg-secondary">
        <div className="flex-1">
          <a
            className="btn btn-ghost normal-case text-3xl"
            onClick={() => userCtx.setCurrentPage("home")}
          >
            TunedIn
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-xl font-semibold">
            <li>
              <a onClick={() => userCtx.setCurrentPage("home")}>Home</a>
            </li>
            <li>
              <a onClick={() => userCtx.setCurrentPage("jobs")}>Jobs</a>
            </li>
            {/* <li>
              <a onClick={() => userCtx.setCurrentPage("messaging")}>
                Messaging
              </a>
            </li> */}
            <li>
              <a
                onClick={() => {
                  userCtx.setTargetUserUUID(userCtx.userUUID);
                  userCtx.setCurrentPage("profile");
                }}
              >
                My Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
