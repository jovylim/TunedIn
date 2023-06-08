import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

const Comment = (props) => {
  const userCtx = useContext(UserContext);
  const [commenterData, setCommenterData] = useState();

  const getCommenterData = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-user/" + props.comment.user,
      userCtx.accessToken,
      "POST"
    );

    if (ok) {
      setCommenterData(data);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getCommenterData();
  }, []);

  return (
    <div className="flex items-center space-x-3 p-2" key={props.idx}>
      {commenterData && (
        <>
          <div className="avatar">
            <div className="mask mask-squircle w-8 h-8">
              <img src={commenterData.profile_picture} />
            </div>
          </div>
          <div>
            <div
              className="font-bold hover:underline hover:cursor-pointer"
              onClick={() => {
                userCtx.setTargetUserUUID(commenterData.uuid);
                userCtx.setCurrentPage("profile");
              }}
            >
              {commenterData.name}:
            </div>
          </div>
        </>
      )}
      <div>{props.comment.comment}</div>
    </div>
  );
};

export default Comment;
