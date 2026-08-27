import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../public/tukio-hub.png";


function Home() {
  const rows = [
    { code: "TC", label: "Technology" },
    { code: "BZ", label: "Business" },
    { code: "MU", label: "Music" },
    { code: "ED", label: "Education" },
  ];

  return (
    <section className="hero">
<div className="hero-image">
  <img src={heroImage} alt="Tukio Hub" />
</div>




      <div>
        <span className="eyebrow">
          BRINGING EVENTS AND PEOPLE TOGETHER
        </span>

        <h1>
          From planning and registration to managing
          attendees, everything you need is in one place.
        </h1>

        <Link className="primary" to="/events">
          Explore Events
        </Link>
      </div>

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
    </section>
  );
}

export default Home;