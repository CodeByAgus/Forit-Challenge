import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    company: "",
    username: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(term) ||
        user.name.toLowerCase().includes(term) ||
        user.address.city.toLowerCase().includes(term)
    );

    setFilteredUsers(filtered);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    const userToAdd = {
      id: users.length + 1, // ID único
      name: newUser.name,
      email: newUser.email,
      address: {
        city: newUser.city,
      },
      phone: newUser.phone,
      company: {
        name: newUser.company,
      },
      username: newUser.username.toLowerCase().replace(" ", ""), // Generar un nombre de usuario
    };

    setUsers([...users, userToAdd]); // Agregar a la lista
    setFilteredUsers([...filteredUsers, userToAdd]); // Actualizar la lista filtrada
    setNewUser({
      name: "",
      email: "",
      city: "",
      phone: "",
      company: "",
      username: "",
    }); // Limpiar formulario
  };

  return (
    <div className="container">
      <h1 className="title">Lista de Usuarios</h1>

      <div className="user-search">
        <input
          type="text"
          placeholder="Buscar por correo, nombre o ciudad"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="user-form">
        <h2>Agregar Nuevo Usuario</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={newUser.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={newUser.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Empresa"
          value={newUser.company}
          onChange={handleInputChange}
        />
        <button onClick={handleAddUser}>Agregar Usuario</button>
      </div>

      <div className="user-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-box">
            <div className="user-header">
              <h2 className="name">{user.name}</h2>
              <span className="username">{user.username}</span>
            </div>
            <div className="user-info">
              <p>
                <strong>📧 Email:</strong> {user.email}
              </p>
              <p>
                <strong>📍 Ciudad:</strong> {user.address.city}
              </p>
              <p>
                <strong>📱 Teléfono:</strong> {user.phone}
              </p>
              <p>
                <strong>🏢 Empresa:</strong> {user.company.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;