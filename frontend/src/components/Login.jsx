import React, { useContext, useState, useEffect } from "react";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";
import jwt_decode from "jwt-decode";

const Login = (props) => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("johnpassword");

  const handleLogin = async () => {
    const { ok, data } = await fetchData("/routes/token/", undefined, "POST", {
      email,
      password,
    });

    if (ok) {
      userCtx.setAccessToken(data.access);
      const decoded = jwt_decode(data.access);
      console.log(decoded);
      userCtx.setUserUUID(decoded.user_id);
      userCtx.setTargetUserUUID(decoded.user_id);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login to TunedIn!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
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
                    onClick={() => props.setShowLogin(false)}
                  >
                    No account yet? Click here to register!
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
