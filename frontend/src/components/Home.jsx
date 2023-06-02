import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import Navbar from "./Navbar";
import Jobs from "./Jobs";
import Messaging from "./Messaging";
import Profile from "./Profile";
import Feed from "./Feed";

const Home = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <Navbar />
      {userCtx.currentPage === "home" && <Feed />}
      {userCtx.currentPage === "jobs" && <Jobs />}
      {userCtx.currentPage === "messaging" && <Messaging />}
      {userCtx.currentPage === "profile" && <Profile />}
    </>
  );
};

export default Home;
