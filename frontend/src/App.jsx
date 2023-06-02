import React, { useEffect, useState } from "react";
import UserContext from "./context/user";
import User from "./context/user";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { fetchData } from "./helpers/common";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  // const [users, setUsers] = useState([]);
  const [userUUID, setUserUUID] = useState([]);

  // const getAllUsers = async () => {
  //   const { ok, data } = await fetchData("/routes/get-all-users/", undefined);

  //   if (ok) {
  //     setUsers(data);
  //     console.log(data);
  //   } else {
  //     console.log(data);
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
          currentPage,
          setCurrentPage,
          userUUID,
          setUserUUID,
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
