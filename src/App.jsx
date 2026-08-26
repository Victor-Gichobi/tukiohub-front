import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Registrations from "./pages/Registrations";
import Admin from "./pages/Admin";

function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(
      localStorage.getItem("user") || "null"
    )
  );

  return (
    <Layout
      user={user}
      setUser={setUser}
    >
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={
            <EventDetails user={user} />
          }
        />

        <Route
          path="/login"
          element={
            <Login setUser={setUser} />
          }
        />

        <Route
          path="/register"
          element={
            <Register setUser={setUser} />
          }
        />

        <Route
          path="/registrations"
          element={<Registrations />}
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <Admin />
              : <Home />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;


