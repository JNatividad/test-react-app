import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Usuarios() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  const loadUsers = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  function handleLogout() {
    if (confirm("are you sure logout session?")) {
      localStorage.removeItem("token");
      navigate("/");
     
    }
  }

  return (
    <div className="container-fluid">
      <button className="btn-logout" onClick={handleLogout}>
        logout
      </button>
      <div className="grid">
        {users.length &&
          users.map((user) => {
            return (
              <article className="" key={user.id}>
                <header>
                  <strong>{user.first_name}</strong>
                  <p>{user.email}</p>
                </header>

                <img key={user.avatar} src={user.avatar} />
                <footer>
                  <Link to={`/posts/${user.id}`}>
                    <button>My posts</button>
                  </Link>

                  <Link to={`/albums/${user.id}`}>
                    <button>My Albums</button>
                  </Link>
                </footer>
              </article>
            );
          })}
      </div>
    </div>
  );
}
