import React from "react";

const Profile = (props) => {
  console.log(props.userData);
  return (
    <>
      <div className="flex w-full">
        <div className="flex w-fit">
          <div className="grid h-fit p-10 flex-auto card bg-accent rounded-none">
            <div className="grid h-fit card bg-accent rounded-none">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={props.userData.profile_picture} />
                </div>
              </div>
            </div>
            <div className="grid h-fit card bg-accent rounded-none">
              aboutme
            </div>
            <div className="grid h-fit card bg-accent rounded-none">follow</div>
            <div className="grid h-fit card bg-accent rounded-none">
              settings
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex w-fit">
          <div className="grid h-screen flex-grow card bg-base-300 rounded-box place-items-center">
            content
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
