import React, { useState } from "react";
import UserContext from "./context/user";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [userUUID, setUserUUID] = useState([]);

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
