import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

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
  const [expUpdatingID, setExpUpdatingID] = useState();

  console.log(props.userData);
  console.log(props.userExperiences);
  console.log(props.userContacts);
  console.log(props.userFollowers);
  console.log(props.userFollowing);

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
        expStartDateRef.current.value = item.start_date;
        if (item.end_date) {
          expEndDateRef.current.value = item.end_date;
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

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-3/12 h-screen bg-accent">
          <div className="grid h-fit p-10 flex-auto card rounded-none">
            <div className="grid h-fit card">
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
              <div className="stats bg-info">
                <div
                  className="stat place-items-center"
                  onClick={() => {
                    console.log("clicked followers");
                  }}
                >
                  <div className="stat-title">Followers</div>
                  <div className="stat-value">{props.userFollowers.length}</div>
                </div>
                <div
                  className="stat place-items-center"
                  onClick={() => {
                    console.log("clicked folliwing");
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
          <div className="card bg-success h-fit py-20 rounded-none ">
            <div className="font-bold text-4xl p-2">Experiences</div>
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
                            <div>End Date: {item.end_date}</div>
                          )}
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() => {
                              setExpRefs(item.id);
                              window.edit_experience_modal.showModal();
                            }}
                          >
                            edit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="grid flex-grow card bg-warning rounded-none">
            <div className="font-bold text-4xl p-2">Posts</div>
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
              type="text"
              ref={expStartDateRef}
              placeholder="date in YYYY-MM-DD format"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input
              type="text"
              ref={expEndDateRef}
              placeholder="end date in YYYY-MM-DD format, leave blank if none"
              className="input input-bordered"
            />
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
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
    </>
  );
};

export default Profile;
