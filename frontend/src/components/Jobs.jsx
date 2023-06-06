import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

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
    <div className="card bg-warning h-screen py-2 rounded-none">
      <div className="flex flex-row p-2">
        <div className="font-bold text-3xl w-fit">
          Job Posts from Businesses You Follow
        </div>
      </div>
      <div className="carousel">
        {feed.map((item, idx) => {
          return (
            <div
              id={"slide" + idx}
              key={idx}
              className="carousel-item p-3 h-fit w-1/3"
            >
              <div className="card w-full bg-base-300">
                <div className="card-body">
                  {profiles.find((e) => e.uuid === item.user) && (
                    <div className="flex items-center space-x-3 py-2">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              profiles.find((e) => e.uuid === item.user)
                                .profile_picture
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div
                          className="font-bold hover:underline hover:cursor-pointer"
                          onClick={() => {
                            userCtx.setTargetUserUUID(item.user);
                            userCtx.setCurrentPage("profile");
                          }}
                        >
                          {profiles.find((e) => e.uuid === item.user).name}
                        </div>
                      </div>
                    </div>
                  )}
                  {item.type === "PHOTO" && <img src={item.link}></img>}
                  {item.type === "VIDEO" && <a className="link">{item.link}</a>}
                  {item.type === "JOB" && (
                    <div className="font-medium text-3xl text-center">
                      JOB POST
                    </div>
                  )}
                  <div className="font-medium text-2xl text-center">
                    {item.content}
                  </div>
                  <div className="text-xl text-center">
                    {timeFormatter.format(new Date(item.timestamp))}
                  </div>
                  <div className="flex flex-row justify-center space-x-2">
                    <button
                      className="btn btn-outline btn-accent"
                      onClick={() => {}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {item.like_count}
                    </button>
                    <button
                      className="btn btn-outline btn-accent"
                      onClick={() => {}}
                    >
                      comments {item.comment_count}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
