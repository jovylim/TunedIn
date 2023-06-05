import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";

const Feed = (props) => {
  const userCtx = useContext(UserContext);
  const [userFeed, setUserFeed] = useState([]);

  const getUserFeed = () => {
    props.userFollowing.map((item) => {
      getUserPosts(item.target_user);
    });
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
