import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/common";

const Registration = (props) => {
  const [name, setName] = useState("tom");
  const [email, setEmail] = useState("tom@gmail.com");
  const [password, setPassword] = useState("tompassword");

  const registerUser = async () => {
    const { ok, data } = await fetchData(
      "/routes/add-user/",
      undefined,
      "PUT",
      {
        name,
        email,
        password,
      }
    );

    if (ok) {
      setEmail("");
      setPassword("");
      setName("");
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up for TunedIn account</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <a
                    className="label-text-alt link link-hover"
                    onClick={() => props.setShowLogin(true)}
                  >
                    Have an account? Click here to log in!
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={registerUser}>
                  Register now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
