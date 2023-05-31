import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const url = "http://localhost:8000/";
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const getAllUsers = () => {
    try {
      axios.get(`${url}routes/get-all-users/`).then((response) => {
        console.log(response.data);
        setUsers(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setUser(users[0]);
    console.log(user.name);
  }, [users]);

  return (
    <div>
      <h1>TunedIn</h1>
      <div>user:{url}</div>
    </div>
  );
}

export default App;
