import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const Application = () => {
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState({});

  const openModal = (user) => {
    setModalUser(user);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className="title">Brukere</h1>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        user={modalUser}
      />
      <Filter setFilter={setFilter} filter={filter} />
      <UserList filter={filter} openModal={openModal} />
    </div>
  );
};

const Modal = ({ user, showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={showModal ? "modal-container" : "modal-container-hidden"}>
      <div className="modal">
        <div className="modal-header">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <button onClick={closeModal}>Close modal</button>
        </div>
        <div className="modal-body">
          <p>Phone: {user.phone}</p>
          <p>
            Address: {user.address}, {user.postal_code} {user.city}
          </p>
        </div>
      </div>
    </div>
  );
};

const Filter = ({ setFilter, filter }) => {
  const handleClick = (e) => {
    //remove active class from all buttons
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach((button) => {
      button.classList.remove("active-btn");
      button.classList.remove("active-btn-desc");
    });
    //add active class to clicked button
    e.target.classList.add("active-btn");

    if (e.target.value === filter) {
      e.target.classList.add("active-btn-desc");
      setFilter(`${filter} desc`);
    } else {
      e.target.classList.remove("active-btn-desc");
      setFilter(e.target.value);
    }
  };

  return (
    <div className="filters">
      <button onClick={(e) => handleClick(e)} value="first_name">
        Fornavn
      </button>
      <button onClick={(e) => handleClick(e)} value="last_name">
        Etternavn
      </button>
      <button onClick={(e) => handleClick(e)} value="address">
        Adresse
      </button>
      <button onClick={(e) => handleClick(e)} value="postal_code">
        Postnummer
      </button>
    </div>
  );
};

const UserList = ({ filter, openModal }) => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (phone) => {
    const newUsers = users.filter((user) => user.phone !== phone);
    setUsers(newUsers);
  };

  const sortFunction = (a, b) => {
    if (filter === "first_name") {
      return a.first_name.localeCompare(b.first_name);
    } else if (filter === "last_name") {
      return a.last_name.localeCompare(b.last_name);
    } else if (filter === "address") {
      return a.address.localeCompare(b.address);
    } else if (filter === "postal_code") {
      return a.postal_code.localeCompare(b.postal_code);
    } else if (filter === "first_name desc") {
      return b.first_name.localeCompare(a.first_name);
    } else if (filter === "last_name desc") {
      return b.last_name.localeCompare(a.last_name);
    } else if (filter === "address desc") {
      return b.address.localeCompare(a.address);
    } else if (filter === "postal_code desc") {
      return b.postal_code.localeCompare(a.postal_code);
    }
    return 0;
  };

  return (
    <div className="user-list">
      {users
        .sort((a, b) => sortFunction(a, b))
        .map((user) => (
          <UserCard
            user={user}
            key={user.phone}
            openModal={openModal}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

const UserCard = ({ user, openModal, handleDelete }) => {
  return (
    <div className="card">
      <button
        onClick={() => handleDelete(user.phone)}
        className="delete-btn fa"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      <div
        className="card-body"
        key={user.phone}
        onClick={() => {
          openModal(user);
          console.log("clicked" + user.first_name);
        }}
      >
        <img src={user.profile_pic} alt="" />
        <div className="name">
          {user.first_name} {user.last_name}
        </div>
        <div className="phone">{user.phone}</div>
        <div className="address">
          {user.address}, {user.postal_code} {user.city}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementById("root"));
