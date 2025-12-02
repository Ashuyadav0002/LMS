// src/pages/BookDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import booksData from "../books.json";

export default function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const book = booksData.books.find((b) => String(b._id) === bookId);

  if (!book) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        📦 Book not found.
      </div>
    );
  }

  const handleEnroll = () => {
    const enrolledBooks =
      JSON.parse(localStorage.getItem("enrolledBooks")) || [];

    const exists = enrolledBooks.find((b) => b._id === book._id);
    if (!exists) {
      enrolledBooks.push(book);
      localStorage.setItem("enrolledBooks", JSON.stringify(enrolledBooks));
      navigate("/dashboard");
    } else {
      alert("✅ You are already enrolled in this book.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {book.title} (By {book.author})
      </h1>
      <p className="text-gray-600 mb-4">{book.description}</p>

      {/* Enroll Now Button */}
      <button
        onClick={handleEnroll}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
      >
        Enroll Now
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Chapters ({book.chapters?.length || 0})
        </h2>
        <ul className="">
          {book.chapters?.map((chapter, index) => (
            <li
              key={index}
              className="px-3 py-1 text-gray-800"
            >
              {index + 1}. {chapter.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
