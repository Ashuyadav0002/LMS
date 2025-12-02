// components/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-99 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
      {message}
    </div>
  );
}
