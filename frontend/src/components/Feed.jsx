import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";
import FeedPost from "./FeedPost";

const Feed = (props) => {
  const userCtx = useContext(UserContext);

  const feed = props.userFeed.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const profiles = props.userFeedProfiles;

  return (
    <div className="card bg-success h-screen py-2 rounded-none">
      <div className="flex flex-row p-2">
        <div className="font-bold text-3xl w-fit">Your Feed</div>
      </div>
      <div className="carousel">
        {feed.map((item, idx) => {
          return (
            <>
              {profiles.find((e) => e.uuid === item.user) && (
                <FeedPost
                  key={item.uuid}
                  idx={idx}
                  postID={item.uuid}
                  profile={profiles.find((e) => e.uuid === item.user)}
                  post={item}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
