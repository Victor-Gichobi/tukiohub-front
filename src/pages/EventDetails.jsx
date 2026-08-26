import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import gateFor from "../utils/gateFor";

function EventDetails({ user }) {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((r) => {
        setEvent(r.data);
      })
      .catch((e) => {
        console.error("Event details error:", e);

        setMessage(
          e.response?.data?.message ||
            "Event not found"
        );
      });
  }, [id]);

  async function register() {
  if (!user) {
    setMessage("Please log in before registering.");
    return;
  }

  try {
    const { data } = await api.post("/registrations", {
      event: id,
    });

    console.log("REGISTRATION RESPONSE:", data);

    setMessage(
      `Registration successful! Your code is ${data.registration.registrationCode}`
    );
  } catch (e) {
    console.error("REGISTRATION ERROR:", e);

    setMessage(
      e.response?.data?.message ||
        "Registration failed"
    );
  }
}

  if (!event) {
    return (
      <section className="container">
        <div className="empty">
          {message || "Loading..."}
        </div>
      </section>
    );
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="container details">

      <div
        className="detail-image"
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

      <div className="detail-content">

        <span className="tag">
          {event.category}
        </span>

        <h1>{event.title}</h1>

        <p>{event.description}</p>

        <div className="facts">

          <div>
            <b>DATE</b>

            <span className="mono-time">
              {new Date(
                event.date
              ).toLocaleDateString()}
            </span>
          </div>

          <div>
            <b>TIME</b>

            <span className="mono-time">
              {event.time}
            </span>
          </div>

          <div>
            <b>LOCATION</b>

            <span>
              {event.location}
            </span>
          </div>

        </div>

        <button
          className="primary"
          onClick={register}
        >
          Register for Event
        </button>

        {message && (
          <p className="notice">
            {message}
          </p>
        )}

      </div>

    </section>
  );
}

export default EventDetails;