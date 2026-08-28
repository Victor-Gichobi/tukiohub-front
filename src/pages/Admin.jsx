import React, { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const blank = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "General",
    image: "",
  };

  const [form, setForm] = useState(blank);
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  // Load all events
  async function load() {
    try {
      const { data } = await api.get("/api/events");
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to load events."
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Create or update event
  async function save(e) {
    e.preventDefault();
    setMessage("");

    try {
      if (editing) {
        await api.put(`/api/events/${editing}`, form);
        setMessage("Event updated successfully.");
      } else {
        await api.post("/api/events", form);
        setMessage("Event created successfully.");
      }

      setForm(blank);
      setEditing(null);

      await load();
    } catch (error) {
      console.error("Save event error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to save event."
      );
    }
  }

  // Delete event
  async function remove(id) {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {
      await api.delete(`/api/events/${id}`);

      setMessage("Event deleted successfully.");

      await load();
    } catch (error) {
      console.error("Delete event error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to delete event."
      );
    }
  }

  // Edit event
  function edit(event) {
    setEditing(event._id);

    setForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date
        ? event.date.slice(0, 10)
        : "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "General",
      image: event.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Cancel editing
  function cancelEdit() {
    setEditing(null);
    setForm(blank);
    setMessage("");
  }

  return (
    <section className="container admin">

      <div className="section-head">
        <div>
          <span className="eyebrow">
            ADMIN
          </span>

          <h2>
            {editing
              ? "Edit Event"
              : "Create Event"}
          </h2>
        </div>
      </div>

      {message && (
        <div className="notice">
          {message}
        </div>
      )}

      <form
        className="event-form"
        onSubmit={save}
      >

        <input
          type="text"
          placeholder="Event title"
          required
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          type="date"
          required
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <input
          type="time"
          required
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Location"
          required
          value={form.location}
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <div>
          <button
            type="submit"
            className="primary"
          >
            {editing
              ? "Update Event"
              : "Create Event"}
          </button>

          {editing && (
            <button
              type="button"
              className="outline cancel-edit"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      <h2 className="subheading">
        Manage Events
      </h2>

      <div className="admin-list">

        {events.map((event) => (
          <div
            className="registration"
            key={event._id}
          >

            <div>
              <h3>{event.title}</h3>

              <p className="muted">
                {event.location}
                {" · "}
                {event.date &&
                  new Date(
                    event.date
                  ).toLocaleDateString()}
              </p>
            </div>

            <div>

              <button
                className="outline"
                onClick={() => edit(event)}
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={() =>
                  remove(event._id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {!events.length && (
        <div className="empty">
          No events available.
        </div>
      )}

    </section>
  );
}

export default Admin;