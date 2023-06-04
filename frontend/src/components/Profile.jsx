import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

const Profile = (props) => {
  const userCtx = useContext(UserContext);
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

  console.log(props.userData);
  console.log(props.userExperiences);
  console.log(props.userContacts);
  console.log(props.userFollowers);
  console.log(props.userFollowing);

  const setRefs = () => {
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

  const updateInfo = async () => {
    const { ok, data } = await fetchData(
      "/routes/update-user/" + userCtx.userUUID,
      userCtx.accessToken,
      "PATCH",
      {
        name: nameRef.current.value,
        about_me: aboutMeRef.current.value,
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
                  setRefs();
                  window.edit_profile_modal.showModal();
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="flex w-9/12">
          <div className="grid h-screen flex-grow card bg-base-300 rounded-none place-items-center">
            content
          </div>
        </div>
      </div>
      <dialog id="edit_profile_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-2xl py-4">Edit My Info</h3>
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
