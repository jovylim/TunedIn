import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";
import Comment from "./Comment";

const FeedPost = (props) => {
  const userCtx = useContext(UserContext);
  const [postReactions, setPostReactions] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState();
  const [commentCount, setCommentCount] = useState([]);
  const [likeID, setLikeID] = useState();
  const commentRef = useRef();

  const initialiseReactions = () => {
    setLikes(postReactions.filter((e) => e.type === "LIKE"));
    setComments(postReactions.filter((e) => e.type === "COMMENT"));
    setLikeCount(postReactions.filter((e) => e.type === "LIKE").length);
    setCommentCount(postReactions.filter((e) => e.type === "COMMENT").length);
    if (
      postReactions
        .filter((e) => e.type === "LIKE")
        .find((e) => e.user === userCtx.userUUID)
    ) {
      setLikeID(
        postReactions
          .filter((e) => e.type === "LIKE")
          .find((e) => e.user === userCtx.userUUID).id
      );
    }
  };

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long", //short gives 05/06/2023
    // timeStyle: "short",
    timeZone: "Singapore",
  });

  const getPostReactions = async () => {
    const { ok, data } = await fetchData(
      "/routes/get-one-post-post-reactions/" + props.postID,
      userCtx.accessToken
    );
    if (ok) {
      setPostReactions(data);
    } else {
      console.log(data);
    }
  };

  const likePost = async () => {
    const { ok, data } = await fetchData(
      "/routes/add-post-reaction/",
      userCtx.accessToken,
      "PUT",
      {
        user: userCtx.userUUID,
        post: props.postID,
        type: "LIKE",
      }
    );

    if (ok) {
      getPostReactions();
    } else {
      console.log(data);
    }
  };

  const unlikePost = async () => {
    console.log("unlike the post ");
    const { ok, data } = await fetchData(
      "/routes/delete-post-reaction/" + likeID,
      userCtx.accessToken,
      "DELETE"
    );

    if (ok) {
      getPostReactions();
    } else {
      console.log(data);
    }
  };

  const addComment = async () => {
    const { ok, data } = await fetchData(
      "/routes/add-post-reaction/",
      userCtx.accessToken,
      "PUT",
      {
        user: userCtx.userUUID,
        post: props.postID,
        type: "COMMENT",
        comment: commentRef.current.value,
      }
    );

    if (ok) {
      getPostReactions();
      commentRef.current.value = "";
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getPostReactions();
  }, []);

  useEffect(() => {
    initialiseReactions();
  }, [postReactions]);

  return (
    <div
      id={"slide" + props.idx}
      key={props.idx}
      className="carousel-item p-3 h-fit w-1/3"
    >
      <div className="card w-full bg-base-300">
        <div className="card-body">
          {userCtx.currentPage !== "profile" && (
            <div className="flex items-center space-x-3 py-2">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={props.profile.profile_picture} />
                </div>
              </div>
              <div>
                <div
                  className="font-bold hover:underline hover:cursor-pointer"
                  onClick={() => {
                    userCtx.setTargetUserUUID(props.post.user);
                    userCtx.setCurrentPage("profile");
                  }}
                >
                  {props.profile.name}
                </div>
              </div>
            </div>
          )}
          {props.post.type === "PHOTO" && <img src={props.post.link}></img>}
          {props.post.type === "VIDEO" && (
            <a className="link">{props.post.link}</a>
          )}
          {props.post.type === "JOB" && (
            <div className="font-medium text-3xl text-center">JOB POST</div>
          )}
          <div className="font-medium text-2xl text-center">
            {props.post.content}
          </div>
          <div className="text-xl text-center">
            {timeFormatter.format(new Date(props.post.timestamp))}
          </div>
          <div className="flex flex-row justify-center space-x-2">
            {likes.find((e) => e.user === userCtx.userUUID) && (
              <button
                className="btn btn-outline btn-accent"
                onClick={() => unlikePost()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
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

                {likeCount}
              </button>
            )}
            {!likes.find((e) => e.user === userCtx.userUUID) && (
              <button
                className="btn btn-outline btn-accent"
                onClick={() => likePost()}
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
                {likeCount}
              </button>
            )}
            <button className="btn btn-outline btn-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
              </svg>
              comments {commentCount}
            </button>
          </div>
          <br />
          <div className="p-2 rounded-lg border-2 border-accent ">
            <div className="text-accent">COMMENTS:</div>
            {commentCount > 0 && (
              <>
                {comments.map((item, idx) => {
                  return (
                    <Comment
                      key={idx}
                      idx={idx}
                      commentID={item.id}
                      comment={item}
                    />
                  );
                })}
              </>
            )}
            <div className="flex flex-row justify-center space-x-2">
              <div className="form-control">
                <input
                  type="text"
                  ref={commentRef}
                  placeholder="NEW COMMENT"
                  className="input input-xs input-accent bg-base-300 input-bordered"
                />
              </div>
              <button
                className="btn btn-outline btn-accent mx-4 btn-xs"
                onClick={() => addComment()}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
