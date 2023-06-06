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
  const [userPosts, setUserPosts] = useState([]);
  const [userPostsReactions, setUserPostsReactions] = useState([]);
  const [connectionID, setConnectionID] = useState(null);
  const [userFeed, setUserFeed] = useState([]);
  const [userFeedProfiles, setUserFeedProfiles] = useState([]);
  const [getFeedFlag, setGetFeedFlag] = useState(false);

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
      setGetFeedFlag(true);
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

  const getUserPosts = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-posts/" + userCtx.targetUserUUID,
      userCtx.accessToken
    );

    if (ok) {
      setUserPosts(data);
    } else {
      console.log(data);
    }
  };

  const checkFollowing = () => {
    // setFollowingTarget(false);
    // setConnectionID(null);
    const temp = userFollowing.find(
      (e) => e.target_user === userCtx.targetUserUUID
    );
    if (temp) {
      // setFollowingTarget(true);
      setConnectionID(temp.id);
    }
  };

  const getUserFeed = () => {
    setUserFeed([]);
    setUserFeedProfiles([]);
    userFollowing.map((item) => {
      getFollowingUserPosts(item.target_user);
      getFollowingUserProfile(item.target_user);
    });
  };

  const getFollowingUserPosts = async (targetID) => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-posts/" + targetID,
      userCtx.accessToken
    );

    if (ok) {
      setUserFeed((userFeed) => [...userFeed, ...data]);
    } else {
      console.log(data);
    }
  };

  const getFollowingUserProfile = async (targetID) => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user/" + targetID,
      userCtx.accessToken,
      "POST"
    );

    if (ok) {
      setUserFeedProfiles((userFeedProfiles) => [...userFeedProfiles, data]);
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
    getUserPosts();
    checkFollowing();
  }, []);

  useEffect(() => {
    getUserData();
    getUserFollowers();
    getUserFollowing();
    getUserExperiences();
    getUserContacts();
    getUserPosts();
    checkFollowing();
  }, [userCtx.targetUserUUID]);

  useEffect(() => {
    getUserFeed();
  }, [getFeedFlag]);

  return (
    <>
      <Navbar />
      {userCtx.currentPage === "home" && (
        <Feed
          userData={userData}
          userFeed={userFeed}
          userFeedProfiles={userFeedProfiles}
        />
      )}
      {userCtx.currentPage === "jobs" && (
        <Jobs
          userData={userData}
          userFeed={userFeed}
          userFeedProfiles={userFeedProfiles}
        />
      )}
      {userCtx.currentPage === "messaging" && <Messaging userData={userData} />}
      {userCtx.currentPage === "profile" && (
        <Profile
          userData={userData}
          userFollowers={userFollowers}
          userFollowing={userFollowing}
          userExperiences={userExperiences}
          userContacts={userContacts}
          userPosts={userPosts}
          getUserData={getUserData}
          getUserContacts={getUserContacts}
          getUserExperiences={getUserExperiences}
          getUserPosts={getUserPosts}
          getUserFollowers={getUserFollowers}
          connectionID={connectionID}
          setConnectionID={setConnectionID}
          checkFollowing={checkFollowing}
        />
      )}
    </>
  );
};

export default Home;
