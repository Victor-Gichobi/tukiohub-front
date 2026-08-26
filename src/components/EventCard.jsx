import React from "react";
import { Link } from "react-router-dom";
import gateFor from "../utils/gateFor";

function EventCard({ event }) {
  const defaultImage =
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80";

  return (
    <article className="card">
      <div
        className="event-image"
        style={{
          backgroundImage: `url(${
            event.image || defaultImage
          })`,
        }}
      >
        <span className="gate">
          GATE {gateFor(event._id)}
        </span>
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="tag">
            {event.category}
          </span>

          <span className="mono-time">
            {new Date(event.date).toLocaleDateString(
              undefined,
              {
                month: "short",
                day: "2-digit",
              }
            )}{" "}
            · {event.time}
          </span>
        </div>

        <h3>{event.title}</h3>

        <p className="muted">
          {event.location}
        </p>

        <Link
          className="outline"
          to={`/events/${event._id}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default EventCard;