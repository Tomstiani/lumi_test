import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Application = () => {
  return (
    <div>
      <h1>Brukere</h1>
      <UserList />
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("/api/users")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.phone}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementById("root"));
