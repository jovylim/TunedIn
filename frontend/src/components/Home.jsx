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
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userExperiences, setUserExperiences] = useState([]);
  const [userContacts, setUserContacts] = useState([]);

  const getUserData = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user/" + userCtx.targetUserUUID,
      userCtx.accessToken,
      "POST"
    );

    if (ok) {
      setUserData(data);
    } else {
      console.log(data);
    }
  };

  const getUserFollowers = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-followers/" + userCtx.targetUserUUID,
      userCtx.accessToken
    );

    if (ok) {
      setUserFollowers(data);
    } else {
      console.log(data);
    }
  };

  const getUserFollowing = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-following/" + userCtx.targetUserUUID,
      userCtx.accessToken
    );

    if (ok) {
      setUserFollowing(data);
    } else {
      console.log(data);
    }
  };

  const getUserExperiences = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-experiences/" + userCtx.targetUserUUID,
      userCtx.accessToken
    );

    if (ok) {
      setUserExperiences(data);
    } else {
      console.log(data);
    }
  };

  const getUserContacts = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-contacts/" + userCtx.targetUserUUID,
      userCtx.accessToken
    );

    if (ok) {
      setUserContacts(data);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getUserData();
    getUserFollowers();
    getUserFollowing();
    getUserExperiences();
    getUserContacts();
  }, []);

  useEffect(() => {
    getUserData();
    getUserFollowers();
    getUserFollowing();
    getUserExperiences();
    getUserContacts();
  }, [userCtx.targetUserUUID]);

  return (
    <>
      <Navbar />
      {userCtx.currentPage === "home" && <Feed userData={userData} />}
      {userCtx.currentPage === "jobs" && <Jobs userData={userData} />}
      {userCtx.currentPage === "messaging" && <Messaging userData={userData} />}
      {userCtx.currentPage === "profile" && (
        <Profile
          userData={userData}
          userFollowers={userFollowers}
          userFollowing={userFollowing}
          userExperiences={userExperiences}
          userContacts={userContacts}
          getUserData={getUserData}
          getUserContacts={getUserContacts}
          getUserExperiences={getUserExperiences}
        />
      )}
    </>
  );
};

export default Home;
