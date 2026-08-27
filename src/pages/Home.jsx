import React from "react";
import { Link } from "react-router-dom";

import heroImage from "../public/tukio-hub.png";
import loggedInImage from "../public/tukio-hub-icon.svg";

function Home({ user }) {

  
  const rows = [
    { code: "TC", label: "General" },
    { code: "BZ", label: "Fitness" },
    { code: "MU", label: "Entertainment" },
    { code: "ED", label: "Education" },
  ];

  // Change image depending on login status
  const currentImage = user ? loggedInImage : heroImage;

  return (
    <section className="hero">

      <div className="hero-image">
        <img
          src={currentImage}
          alt="Tukio Hub"
        />
      </div>

      <div>
        <span className="eyebrow">
          BRINGING EVENTS AND PEOPLE TOGETHER
        </span>

        <h1>
          {user
            ? `Welcome back, ${user.name || "to Tukio Hub"}.Ona NANI!`
            : "From planning and registration to managing attendees, everything you need is in one place."}
        </h1>

        <Link className="primary" to="/events">
          Explore Events
        </Link>
      </div>

            {user && (
      <div className="hero-card">
        <div className="board-head">
          <span>CATEGORY</span>
          <span>STATUS</span>
        </div>

        {rows.map((r) => (
          <div className="board-row" key={r.code}>
            <span className="board-code">
              {r.code}
            </span>

            <span className="board-label">
              {r.label}
            </span>

            <span className="board-status">
              OPEN
            </span>
          </div>
        ))}
      </div>

      )}
    </section>
  );
}

export default Home;