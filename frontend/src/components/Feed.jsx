import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

const Feed = (props) => {
  const userCtx = useContext(UserContext);
  console.log("in feed now");
  console.log(props.userFeed);

  return (
    <div>
      {props.userFeed.map((item, idx) => {
        return <div key={idx}>{item.content}</div>;
      })}
    </div>
  );
};

export default Feed;
