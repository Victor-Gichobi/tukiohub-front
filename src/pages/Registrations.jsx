import React, { useEffect, useState } from "react";
import api from "../api";
import RegistrationTicket from "../components/RegistrationTicket";

function Registrations() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/api/registrations/my")
      .then((r) => {
        setItems(r.data);
      })
      .catch((e) => {
        setMessage(
          e.response?.data?.message ||
            "Please log in."
        );
      });
  }, []);

  async function cancel(id) {
    try {
      await api.patch(
        `/api/registrations/${id}/cancel`
      );

      setItems(
        items.map((x) =>
          x._id === id
            ? { ...x, status: "cancelled" }
            : x
        )
      );
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          "Failed to cancel registration."
      );
    }
  }

  return (
    <section className="container">
      <div className="section-head">
        <div>
          <span className="eyebrow">
            YOUR ACCOUNT
          </span>

          <h2>My Registrations</h2>
        </div>
      </div>

      {message && (
        <div className="notice">
          {message}
        </div>
      )}

      <div className="list">
        {items.map((r) => (
          <div
            className="registration"
            key={r._id}
          >
           
           <div>
  <h3>{r.event?.title}</h3>

  <p className="muted">
    {r.event?.location} ·{" "}
    {r.event &&
      new Date(r.event.date).toLocaleDateString()}
  </p>

  <p className="muted">
    Registration Code:{" "}
    <strong>
      {r.registrationCode || "NO CODE"}
    </strong>
  </p>
</div>

            <div>
              <span
                className={`status ${r.status}`}
              >
                {r.status}
              </span>

              {r.status === "registered" && (
                <button
                  className="danger"
                  onClick={() =>
                    cancel(r._id)
                  }
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!items.length && !message && (
        <div className="empty">
          You have no registrations yet.
        </div>
      )}
    </section>
  );
}

export default Registrations;