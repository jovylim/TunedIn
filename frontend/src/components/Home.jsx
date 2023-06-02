import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import Navbar from "./Navbar";
import Jobs from "./Jobs";
import Messaging from "./Messaging";
import Profile from "./Profile";
import Feed from "./Feed";
import { fetchData } from "../helpers/common";

const Home = () => {
  const userCtx = useContext(UserContext);
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user/" + userCtx.userUUID,
      userCtx.accessToken,
      "POST"
    );

    if (ok) {
      setUserData(data);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Navbar />
      {userCtx.currentPage === "home" && <Feed userData={userData} />}
      {userCtx.currentPage === "jobs" && <Jobs userData={userData} />}
      {userCtx.currentPage === "messaging" && <Messaging userData={userData} />}
      {userCtx.currentPage === "profile" && <Profile userData={userData} />}
    </>
  );
};

export default Home;
