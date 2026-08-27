import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function AuthForm({ type, setUser }) {
  const navigate = useNavigate();

  const login = type === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post(
        `/auth/${login ? "login" : "register"}`,
        form
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      navigate("/");
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Something went wrong"
      );
    }
  }

  return (
    <section className="auth">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">
          {login ? " BACK" : "GET STARTED"}
        </span>

        <h2>
          {login ? "Sign in" : "Create account"}
        </h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!login && (
          <input
            type="text"
            placeholder="Full name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          required
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="primary full"
        >
          {login ? "Login" : "Register"}
        </button>

        <p className="muted">
          {login
            ? "No account? "
            : "Already have an account? "}

          <Link
            to={login ? "/register" : "/login"}
          >
            {login ? "Register" : "Login"}
          </Link>
        </p>
      </form>
    </section>
  );
}

export default AuthForm;