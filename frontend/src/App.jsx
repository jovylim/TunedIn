import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const url = "http://localhost:8000/";
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const getAllUsers = () => {
    try {
      axios.get(`${url}routes/get-all-users/`).then((response) => {
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
  }, [users]);

  return (
    <div>
      <h1>TunedIn</h1>
      <div>user:{url}</div>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        We invest in the world's potential
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
