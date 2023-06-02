import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";

const Feed = () => {
  const userCtx = useContext(UserContext);
  console.log(userCtx.userUUID);
  return <div>Feed</div>;
};

export default Feed;
