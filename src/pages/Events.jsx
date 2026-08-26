import React, { useEffect, useState } from "react";
import api from "../api";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api
      .get("/events")
      .then((r) => {
        setEvents(r.data);
      })
      .catch((error) => {
        console.error("Failed to load events:", error);
      });
  }, []);

  const filtered = events.filter((e) =>
    `${e.title} ${e.location} ${e.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <section className="container">
      <div className="section-head">
        <div>
          <span className="eyebrow">DISCOVER</span>
          <h2>Upcoming Events</h2>
        </div>

        <input
          className="search"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
      </div>

      {!filtered.length && (
        <div className="empty">
          No events found.
        </div>
      )}
    </section>
  );
}

export default Events;