import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";
import FeedPost from "./FeedPost";

const Jobs = (props) => {
  const userCtx = useContext(UserContext);

  const feed = props.userFeed
    .filter((e) => e.type === "JOB")
    .sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const profiles = props.userFeedProfiles;

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long", //short gives 05/06/2023
    // timeStyle: "short",
    timeZone: "Singapore",
  });

  return (
    <div className="card bg-success h-screen py-2 rounded-none">
      <div className="flex flex-row p-2">
        <div className="font-bold text-3xl w-fit">
          Job Posts from Businesses You Follow
        </div>
      </div>
      <div className="carousel">
        {feed.map((item, idx) => {
          return (
            <>
              {profiles.find((e) => e.uuid === item.user) && (
                <FeedPost
                  key={idx}
                  idx={idx}
                  postID={item.uuid}
                  profiles={profiles}
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

export default Jobs;
