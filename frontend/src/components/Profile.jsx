import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";
import Home from "./Home";

const Profile = (props) => {
  const userCtx = useContext(UserContext);
  const [profilePic, setProfilePic] = useState();
  const profilePicRef = useRef();
  const nameRef = useRef();
  const aboutMeRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const instagramRef = useRef();
  const tiktokRef = useRef();
  const youtubeRef = useRef();
  const [hasPhone, setHasPhone] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasInstagram, setHasInstagram] = useState(false);
  const [hasTiktok, setHasTiktok] = useState(false);
  const [hasYoutube, setHasYoutube] = useState(false);
  const expTypeRef = useRef();
  const expContentRef = useRef();
  const expStartDateRef = useRef();
  const expEndDateRef = useRef();
  const postTypeRef = useRef();
  const postContentRef = useRef();
  const postLinkRef = useRef();
  const [expUpdatingID, setExpUpdatingID] = useState();
  const [postSelectedID, setPostSelectedID] = useState();
  const [followersData, setFollowersData] = useState([]);
  const [followngData, setFollowingData] = useState([]);

  // console.log(props.followingTarget);
  // console.log(props.userData);
  // console.log(props.userExperiences);
  // console.log(props.userContacts);
  // console.log(props.userFollowers);
  // console.log(props.userFollowing);
  // console.log(props.userPosts);

  const setProfileRefs = () => {
    profilePicRef.current.value = props.userData.profile_picture;
    nameRef.current.value = props.userData.name;
    aboutMeRef.current.value = props.userData.about_me;
    props.userContacts.map((item) => {
      if (item.type === "PHONE") {
        phoneRef.current.value = item.value;
        setHasPhone(true);
      } else if (item.type === "EMAIL") {
        emailRef.current.value = item.value;
        setHasEmail(true);
      } else if (item.type === "INSTAGRAM") {
        instagramRef.current.value = item.value;
        setHasInstagram(true);
      } else if (item.type === "TIKTOK") {
        tiktokRef.current.value = item.value;
        setHasTiktok(true);
      } else if (item.type === "YOUTUBE") {
        youtubeRef.current.value = item.value;
        setHasYoutube(true);
      }
    });
  };

  const setExpRefs = (expID) => {
    setExpUpdatingID(expID);
    props.userExperiences.map((item) => {
      if (item.id === expID) {
        expTypeRef.current.value = item.type;
        expContentRef.current.value = item.content;
        expStartDateRef.current.value = item.start_date.slice(0, 10);
        if (item.end_date) {
          expEndDateRef.current.value = item.end_date.slice(0, 10);
        }
      }
    });
  };

  const updateInfo = async () => {
    const { ok, data } = await fetchData(
      "/routes/update-user/" + userCtx.userUUID,
      userCtx.accessToken,
      "PATCH",
      {
        name: nameRef.current.value,
        about_me: aboutMeRef.current.value,
        profile_picture: profilePicRef.current.value,
      }
    );

    if (ok) {
      props.getUserData();
    } else {
      console.log(data);
    }
  };

  const updateContacts = () => {
    props.userContacts.map((item) => {
      if (item.type === "PHONE") {
        if (phoneRef.current.value !== item.value) {
          if (phoneRef.current.value === "") {
            deleteThisContact(item.id);
            setHasPhone(false);
          } else {
            updateThisContact(item.id, phoneRef.current.value);
          }
        }
      } else if (item.type === "EMAIL") {
        if (emailRef.current.value !== item.value) {
          if (emailRef.current.value === "") {
            deleteThisContact(item.id);
            setHasEmail(false);
          } else {
            updateThisContact(item.id, emailRef.current.value);
          }
        }
      } else if (item.type === "INSTAGRAM") {
        if (instagramRef.current.value !== item.value) {
          if (phoneRef.current.value === "") {
            deleteThisContact(item.id);
            setHasInstagram(false);
          } else {
            updateThisContact(item.id, instagramRef.current.value);
          }
        }
      } else if (item.type === "TIKTOK") {
        if (tiktokRef.current.value !== item.value) {
          if (phoneRef.current.value === "") {
            deleteThisContact(item.id);
            setHasTiktok(false);
          } else {
            updateThisContact(item.id, tiktokRef.current.value);
          }
        }
      } else if (item.type === "YOUTUBE") {
        if (youtubeRef.current.value !== item.value) {
          if (phoneRef.current.value === "") {
            deleteThisContact(item.id);
            setHasYoutube(false);
          } else {
            updateThisContact(item.id, youtubeRef.current.value);
          }
        }
      }
    });
    if (phoneRef.current.value !== "" && !hasPhone) {
      addThisContact("PHONE", phoneRef.current.value);
    }
    if (emailRef.current.value !== "" && !hasEmail) {
      addThisContact("EMAIL", emailRef.current.value);
    }
    if (instagramRef.current.value !== "" && !hasInstagram) {
      addThisContact("INSTAGRAM", instagramRef.current.value);
    }
    if (tiktokRef.current.value !== "" && !hasTiktok) {
      addThisContact("TIKTOK", tiktokRef.current.value);
    }
    if (youtubeRef.current.value !== "" && !hasYoutube) {
      addThisContact("YOUTUBE", youtubeRef.current.value);
    }
  };

  const updateThisContact = async (contactID, contactValue) => {
    const { ok, data } = await fetchData(
      "/routes/update-contact/" + contactID,
      userCtx.accessToken,
      "PATCH",
      {
        value: contactValue,
      }
    );

    if (ok) {
      props.getUserContacts();
    } else {
      console.log(data);
    }
  };

  const addThisContact = async (contactType, contactValue) => {
    const { ok, data } = await fetchData(
      "/routes/add-contact/",
      userCtx.accessToken,
      "PUT",
      {
        user: userCtx.userUUID,
        type: contactType,
        value: contactValue,
      }
    );

    if (ok) {
      props.getUserContacts();
    } else {
      console.log(data);
    }
  };

  const deleteThisContact = async (contactID) => {
    const { ok, data } = await fetchData(
      "/routes/delete-contact/" + contactID,
      userCtx.accessToken,
      "DELETE"
    );

    if (ok) {
      props.getUserContacts();
    } else {
      console.log(data);
    }
  };

  const updateExperience = async () => {
    let patchBody = {
      type: expTypeRef.current.value,
      content: expContentRef.current.value,
      start_date: expStartDateRef.current.value,
      end_date: null,
    };
    console.log("patch");
    console.log(patchBody);
    if (expEndDateRef.current.value !== "") {
      patchBody["end_date"] = expEndDateRef.current.value;
    }
    const { ok, data } = await fetchData(
      "/routes/update-experience/" + expUpdatingID,
      userCtx.accessToken,
      "PATCH",
      patchBody
    );

    if (ok) {
      props.getUserExperiences();
    } else {
      console.log(data);
    }
  };

  const deleteExperience = async () => {
    const { ok, data } = await fetchData(
      "/routes/delete-experience/" + expUpdatingID,
      userCtx.accessToken,
      "DELETE"
    );

    if (ok) {
      props.getUserExperiences();
    } else {
      console.log(data);
    }
  };

  const addExperience = async () => {
    let addBody = {
      user: userCtx.userUUID,
      type: expTypeRef.current.value,
      content: expContentRef.current.value,
      start_date: expStartDateRef.current.value,
    };
    if (expEndDateRef.current.value !== "") {
      addBody["end_date"] = expEndDateRef.current.value;
    }
    const { ok, data } = await fetchData(
      "/routes/add-experience/",
      userCtx.accessToken,
      "PUT",
      addBody
    );

    if (ok) {
      props.getUserExperiences();
    } else {
      console.log(data);
    }
  };

  const getThisUserFollowersData = async () => {
    setFollowersData([]);
    props.userFollowers.map(async (item) => {
      const { ok, data } = await fetchData(
        "/routes/get-one-user/" + item.user,
        userCtx.accessToken,
        "POST"
      );

      if (ok) {
        setFollowersData((followersData) => [...followersData, data]);
      } else {
        console.log(data);
      }
    });
  };

  const getThisUserFollowingData = async () => {
    setFollowingData([]);
    props.userFollowing.map(async (item) => {
      const { ok, data } = await fetchData(
        "/routes/get-one-user/" + item.target_user,
        userCtx.accessToken,
        "POST"
      );

      if (ok) {
        setFollowingData((followngData) => [...followngData, data]);
      } else {
        console.log(data);
      }
    });
  };

  const addPost = async () => {
    let addBody = {
      user: userCtx.userUUID,
      type: postTypeRef.current.value,
      content: postContentRef.current.value,
      link: postLinkRef.current.value,
    };
    const { ok, data } = await fetchData(
      "/routes/add-post/",
      userCtx.accessToken,
      "PUT",
      addBody
    );

    if (ok) {
      props.getUserPosts();
    } else {
      console.log(data);
    }
  };

  const deletePost = async () => {
    const { ok, data } = await fetchData(
      "/routes/delete-post/" + postSelectedID,
      userCtx.accessToken,
      "DELETE"
    );

    if (ok) {
      props.getUserPosts();
    } else {
      console.log(data);
    }
  };

  const checkFollower = () => {
    // setFollowingTarget(false);
    props.setConnectionID(null);
    console.log(props.userFollowers);
    const temp = props.userFollowers.find((e) => e.user === userCtx.userUUID);
    if (temp) {
      console.log("hello");
      // setFollowingTarget(true);
      props.setConnectionID(temp.id);
    }
  };

  const followUser = async () => {
    const { ok, data } = await fetchData(
      "/routes/add-connection/",
      userCtx.accessToken,
      "PUT",
      {
        user: userCtx.userUUID,
        target_user: userCtx.targetUserUUID,
        type: "FOLLOWING",
      }
    );

    if (ok) {
      props.getUserFollowers();
      // checkFollower();
      // props.setFollowingTarget(true);
    } else {
      console.log(data);
    }
  };

  const unfollowUser = async () => {
    const { ok, data } = await fetchData(
      "/routes/delete-connection/" + props.connectionID,
      userCtx.accessToken,
      "DELETE"
    );

    if (ok) {
      props.getUserFollowers();
      props.setConnectionID(null);
      // props.setFollowingTarget(false);
    } else {
      console.log(data);
    }
  };

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long", //short gives 05/06/2023
    // timeStyle: "short",
    timeZone: "Singapore",
  });

  // const updateProfilePic = async () => {
  //   const clientID = "21c617ed7f8d55e",
  //     auth = "Client-ID" + clientID;

  //   const formData = new FormData();
  //   formData.append("file", profilePic);

  //   await fetch("https://api.imgur.com/3/", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       Authorization: auth,
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    checkFollower();
  }, [props.userFollowers]);

  return (
    <>
      <div className="flex h-full w-full ">
        <div className="flex h-200 w-3/12 bg-accent">
          <div className="grid p-10 h-fit flex-auto card rounded-none">
            {userCtx.userUUID !== userCtx.targetUserUUID &&
              // props.followingTarget
              props.connectionID && (
                <button className="btn" onClick={() => unfollowUser()}>
                  Following
                </button>
              )}
            {userCtx.userUUID !== userCtx.targetUserUUID &&
              // !props.followingTarget
              !props.connectionID && (
                <button
                  className="btn btn-outline"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              )}
            <div className="grid card p-3">
              <div className="avatar flex align-middle">
                <div className="w-auto rounded-full">
                  <img src={props.userData.profile_picture} />
                </div>
              </div>
              <br />
              <div className="font-bold text-5xl text-center">
                {props.userData.name}
              </div>
            </div>
            <br />
            <div className="grid h-fit card text-xl font-medium">
              {props.userData.about_me}
            </div>
            <br />
            <div className="grid h-fit card">
              <div className="stats bg-info cursor-pointer">
                <div
                  className="stat place-items-center"
                  onClick={() => {
                    getThisUserFollowersData();
                    window.followers_modal.showModal();
                  }}
                >
                  <div className="stat-title">Followers</div>
                  <div className="stat-value ">
                    {props.userFollowers.length}
                  </div>
                </div>
                <div
                  className="stat place-items-center"
                  onClick={() => {
                    getThisUserFollowingData();
                    window.following_modal.showModal();
                  }}
                >
                  <div className="stat-title">Following</div>
                  <div className="stat-value">{props.userFollowing.length}</div>
                </div>
              </div>
            </div>
            <br />
            {props.userContacts.map((item, idx) => {
              return (
                <div className="text font-bold" key={idx}>
                  {item.type}: {item.value}
                </div>
              );
            })}
            <br />
            {userCtx.userUUID === userCtx.targetUserUUID && (
              <button
                className="btn btn-wide bg-gray-300 border-none"
                onClick={() => {
                  setProfileRefs();
                  window.edit_profile_modal.showModal();
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 h-fit w-9/12">
          {/* {!props.userData.is_business && ( */}
          <div className="card bg-success h-fit py-2 rounded-none">
            <div className="flex flex-row p-2">
              <div className="font-bold text-4xl w-fit">Experiences</div>
              {userCtx.userUUID === userCtx.targetUserUUID && (
                <button
                  className="btn btn-outline btn-accent mx-4"
                  onClick={() => window.add_experience_modal.showModal()}
                >
                  Add New Experience
                </button>
              )}
            </div>
            <div className="carousel">
              {props.userExperiences
                .slice(0)
                .reverse()
                .map((item, idx) => {
                  return (
                    <div
                      id={"slide" + idx}
                      key={idx}
                      className="carousel-item p-3 h-fit w-1/3"
                    >
                      <div className="card w-full bg-base-300">
                        <div className="card-body">
                          <div className="font-medium text-3xl text-center">
                            {item.type}
                          </div>
                          <div className="font-medium text-2xl text-center">
                            {item.content}
                          </div>
                          {item.type === "ACHIEVEMENT" && (
                            <div className="text-xl text-center">
                              {timeFormatter.format(new Date(item.start_date))}
                            </div>
                          )}
                          {item.type !== "ACHIEVEMENT" && (
                            <div className="text-xl text-center">
                              Start Date:{" "}
                              {timeFormatter.format(new Date(item.start_date))}
                            </div>
                          )}
                          {item.end_date && (
                            <div className="text-xl text-center">
                              End Date:{" "}
                              {timeFormatter.format(new Date(item.end_date))}
                            </div>
                          )}
                          {userCtx.userUUID === userCtx.targetUserUUID && (
                            <button
                              className="btn btn-outline btn-accent"
                              onClick={() => {
                                setExpRefs(item.id);
                                window.edit_experience_modal.showModal();
                              }}
                            >
                              edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* )} */}
          <div className="card bg-warning h-fit py-2 rounded-none">
            <div className="flex flex-row p-2">
              <div className="font-bold text-4xl w-fit">Posts</div>
              {userCtx.userUUID === userCtx.targetUserUUID && (
                <button
                  className="btn btn-outline btn-accent mx-4"
                  onClick={() => window.new_post_modal.showModal()}
                >
                  New Post
                </button>
              )}
            </div>
            <div className="carousel">
              {props.userPosts
                .slice(0)
                .reverse()
                .map((item, idx) => {
                  return (
                    <div
                      id={"slide" + idx}
                      key={idx}
                      className="carousel-item p-3 h-fit w-1/3"
                    >
                      <div className="card w-full bg-base-300">
                        <div className="card-body">
                          {item.type === "PHOTO" && <img src={item.link}></img>}
                          {item.type === "VIDEO" && (
                            <a className="link">{item.link}</a>
                          )}
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
                          {userCtx.userUUID === userCtx.targetUserUUID && (
                            <button
                              className="btn btn-outline btn-accent"
                              onClick={() => {
                                setPostSelectedID(item.uuid);
                                window.delete_post_modal.showModal();
                              }}
                            >
                              delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <dialog id="edit_profile_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-2xl py-4">Edit My Info</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Picture</span>
            </label>
            <input
              type="text"
              ref={profilePicRef}
              placeholder="profile pic link"
              className="input input-bordered"
            />
            {/* <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                setProfilePic({ file: e.target.files[0] });
              }}
            /> */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">About Me</span>
            </label>
            <input
              type="text"
              ref={aboutMeRef}
              placeholder="about me"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact No</span>
            </label>
            <input
              type="text"
              ref={phoneRef}
              placeholder="your phone number"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              ref={emailRef}
              placeholder="your email address"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instagram</span>
            </label>
            <input
              type="text"
              ref={instagramRef}
              placeholder="@your_instagram_username"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">TikTok</span>
            </label>
            <input
              type="text"
              ref={tiktokRef}
              placeholder="@your_tiktok_username"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">YouTube</span>
            </label>
            <input
              type="text"
              ref={youtubeRef}
              placeholder="your youtube channel link"
              className="input input-bordered"
            />
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
            <button
              className="btn"
              onClick={() => {
                updateInfo();
                updateContacts();
                updateProfilePic();
              }}
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
      <dialog id="edit_experience_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-2xl py-4">Edit My Experience</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              ref={expTypeRef}
            >
              <option disabled selected>
                Experience Type
              </option>
              <option>ACHIEVEMENT</option>
              <option>WORK</option>
              <option>EDUCATION</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input
              type="text"
              ref={expContentRef}
              placeholder="what happened?"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date / Date Achieved</span>
            </label>
            <input
              type="date"
              ref={expStartDateRef}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                End Date (leave blank if not applicable)
              </span>
            </label>
            <input
              type="date"
              ref={expEndDateRef}
              className="input input-bordered"
            />
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
            <button
              className="btn"
              onClick={() => {
                window.delete_experience_modal.showModal();
              }}
            >
              Delete
            </button>
            <button
              className="btn"
              onClick={() => {
                updateExperience();
              }}
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
      <dialog id="delete_experience_modal" className="modal">
        <form method="dialog" className="modal-box">
          <div className="font-bold text-xl">
            Warning! Are you sure you want to delete this experience?
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                deleteExperience();
              }}
            >
              Yes, DELETE
            </button>
            <button className="btn">CANCEL</button>
          </div>
        </form>
      </dialog>
      <dialog id="add_experience_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-2xl py-4">Edit My Experience</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              ref={expTypeRef}
            >
              <option disabled selected>
                Experience Type
              </option>
              <option>ACHIEVEMENT</option>
              <option>WORK</option>
              <option>EDUCATION</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input
              type="text"
              ref={expContentRef}
              placeholder="what happened?"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date / Date Achieved</span>
            </label>
            <input
              type="date"
              ref={expStartDateRef}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                End Date (leave blank if not applicable)
              </span>
            </label>
            <input
              type="date"
              ref={expEndDateRef}
              className="input input-bordered"
            />
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
            <button
              className="btn"
              onClick={() => {
                addExperience();
              }}
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
      <dialog id="followers_modal" className="modal">
        <form method="dialog" className="modal-box">
          <div className="overflow-x-auto">
            <div className="font-bold text-2xl">My Followers</div>
            {followersData.map((item, idx) => {
              return (
                <div className="flex items-center space-x-3 py-2" key={idx}>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.profile_picture} />
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-bold hover:underline hover:cursor-pointer"
                      onClick={() => {
                        userCtx.setTargetUserUUID(item.uuid);
                        userCtx.setCurrentPage("profile");
                        window.followers_modal.close();
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="modal-action">
              <button className="btn">Close</button>
            </div>
          </div>
        </form>
      </dialog>
      <dialog id="following_modal" className="modal">
        <form method="dialog" className="modal-box">
          <div className="overflow-x-auto">
            <div className="font-bold text-2xl">Following</div>
            {followngData.map((item, idx) => {
              return (
                <div className="flex items-center space-x-3 py-2" key={idx}>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.profile_picture} />
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-bold hover:underline hover:cursor-pointer"
                      onClick={() => {
                        userCtx.setTargetUserUUID(item.uuid);
                        userCtx.setCurrentPage("profile");
                        window.following_modal.close();
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="modal-action">
              <button className="btn">Close</button>
            </div>
          </div>
        </form>
      </dialog>
      <dialog id="new_post_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-2xl py-4">New Post</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              ref={postTypeRef}
            >
              <option disabled selected>
                Post Type
              </option>
              <option>TEXT</option>
              <option>PHOTO</option>
              <option>VIDEO</option>
              {props.userData.is_business && <option>JOB</option>}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input
              type="text"
              ref={postContentRef}
              placeholder="what happened?"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Link</span>
            </label>
            <input
              type="text"
              ref={postLinkRef}
              placeholder="link to image/video. please choose correct post type."
              className="input input-bordered"
            />
          </div>
          <div className="modal-action">
            <button className="btn">Cancel</button>
            <button
              className="btn"
              onClick={() => {
                addPost();
              }}
            >
              Post!
            </button>
          </div>
        </form>
      </dialog>
      <dialog id="delete_post_modal" className="modal">
        <form method="dialog" className="modal-box">
          <div className="font-bold text-xl">
            Warning! Are you sure you want to delete this post?
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                deletePost();
              }}
            >
              Yes, DELETE
            </button>
            <button className="btn">CANCEL</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Profile;
