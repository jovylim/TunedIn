import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

const Feed = (props) => {
  const userCtx = useContext(UserContext);
  const [userFeed, setUserFeed] = useState([]);

  const getUserFeed = () => {
    console.log(props.userFollowing);
    props.userFollowing.map((item) => {
      getUserPosts(item.target_user);
    });
    // userFeed.sort((a, b) => b.timestamp - a.timestamp);
    console.log(userFeed);
  };

  const getUserPosts = async (targetID) => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user-posts/" + targetID,
      userCtx.accessToken
    );

    if (ok) {
      setUserFeed((userFeed) => [...userFeed, data]);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return <div>Feed</div>;
};

export default Feed;
