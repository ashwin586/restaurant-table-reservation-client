import React from "react";

const NotificationToast = ({ message, actionLabel }) => (
  <div>
    <p>{message}</p>
    {actionLabel && (
      <button
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {actionLabel || "Click Here"}
      </button>
    )}
  </div>
);

export default NotificationToast;
