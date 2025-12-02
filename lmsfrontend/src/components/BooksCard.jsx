import React from "react";
import { useNavigate } from "react-router-dom";

const BooksCard = ({ book }) => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLoggedIn");

  const handleViewBooks = (id) => {
    if (isLogin === "true") {
      navigate(`/books/${id}`);
    } else {
      alert("Login First");
    }
  };

  const isFree = book?.price === 0 || book?.price === "Free";

  return (
    <div className="relative bg-white rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition duration-300 overflow-hidden group hover:bg-gradient-to-br from-white to-blue-50 transform-gpu hover:-translate-y-1">
      {isFree ? (
        <div className="absolute top-3 right-3 z-9 px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full shadow">
          Free Preview
        </div>
      ) : (
        <div
          className="absolute top-3 z-9 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow 
        text-white bg-yellow-400"
        >
          Premium
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        <img
          src={book?.thumbnail}
          alt={book?.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 font-inter">
        <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2">
          {book?.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium">
          Writer : <span className="text-gray-700">{book?.author}</span>
        </p>

        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
          {book?.category}
        </p>

        {/* Price and Chapters */}
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="font-semibold text-green-600">
            {isFree ? "Free" : `₹${book?.price}`}
          </span>
          <span className="text-gray-400">
            {book?.chapters?.length || 0} Chapters
          </span>
        </div>

        {/* View Button */}
        <button
          onClick={() => handleViewBooks(book?._id)}
          className="w-full mt-1 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Book
        </button>
      </div>
    </div>
  );
};

export default BooksCard;
