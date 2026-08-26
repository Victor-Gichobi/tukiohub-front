import React from "react";

function RegistrationTicket({ registration }) {
  if (!registration) return null;

  return (
    <div className="registration-ticket">
      <div className="ticket-header">
        <span>TUKIOHUB</span>
        <span>EVENT PASS</span>
      </div>

      <div className="ticket-body">
        <span className="eyebrow">REGISTRATION CONFIRMED</span>

        <h2>{registration.event?.title}</h2>

        <p className="muted">
          {registration.event?.location}
        </p>

        {registration.event?.date && (
          <p className="muted">
            {new Date(
              registration.event.date
            ).toLocaleDateString()}
            {" · "}
            {registration.event?.time}
          </p>
        )}

        <div className="ticket-code">
          <span>REGISTRATION CODE</span>

          <strong>
            {registration.registrationCode || "PENDING"}
          </strong>
        </div>

        <span className={`status ${registration.status}`}>
          {registration.status}
        </span>
      </div>
    </div>
  );
}

export default RegistrationTicket;