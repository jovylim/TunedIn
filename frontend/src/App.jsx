import React, { useEffect, useState } from "react";
import UserContext from "./context/user";
import axios from "axios";
import User from "./context/user";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  const [url, setUrl] = useState("http://localhost:8000/");
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState([]);

  // const getAllUsers = () => {
  //   try {
  //     axios.get(`${url}routes/get-all-users/`).then((response) => {
  //       setUsers(response.data);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  // useEffect(() => {
  //   setUser(users[0]);
  // }, [users]);

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          url,
          currentPage,
          setCurrentPage,
        }}
      >
        {accessToken.length > 0 && <Home />}
        {accessToken.length === 0 && showLogin && (
          <Login setShowLogin={setShowLogin} />
        )}
        {accessToken.length === 0 && !showLogin && (
          <Registration setShowLogin={setShowLogin} />
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
