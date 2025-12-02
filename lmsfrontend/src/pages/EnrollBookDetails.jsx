import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EnrollBookDetails({ searchQuery }) {
  const { enrollBookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const enrolledBooks =
      JSON.parse(localStorage.getItem("enrolledBooks")) || [];
    const found = enrolledBooks.find((b) => String(b._id) === enrollBookId);
    setBook(found);
  }, [enrollBookId]);

  const highlight = (text) => {
    if (!searchQuery || !text) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-black rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!book) {
    return (
      <div className="p-8 text-center text-gray-500 text-lg">
        📦 Book not found or not enrolled.
      </div>
    );
  }

  const filteredChapters = book.chapters.filter((chapter) =>
    chapter.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-xl rounded-3xl mt-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-6 inline-flex items-center"
      >
        ← Back to Dashboard
      </button>

      {/* Book Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{book.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <span>
            <strong className="text-gray-800">Author:</strong> {book.author}
          </span>
          <span>
            <strong className="text-gray-800">Category:</strong> {book.category}
          </span>
          <span>
            <strong className="text-gray-800">Price:</strong>{" "}
            {isNaN(book.price) ? (
              <span className="text-blue-600">{book.price}</span>
            ) : (
              <span className="text-green-600 font-semibold">
                ₹{book.price}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Chapters */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {searchQuery
            ? `Search Results (${filteredChapters.length})`
            : `Total Chapters (${book.chapters.length})`}
        </h2>

        {filteredChapters.length === 0 ? (
          <div className="bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 border-purple-300 text-purple-800 px-6 py-5 rounded shadow-inner text-center animate-fade-in fixed top-20 left-0 w-full h-1/3 flex flex-col items-center justify-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="font-semibold text-lg mb-1">
              Oops! No results found for:
            </p>

            <p className="text-sm text-gray-700 mt-3">
              Try different keywords or check your spelling.
            </p>
            <p className="text-purple-900 text-base font-semibold bg-yellow-100 px-3 py-1 mt-4 rounded">
              "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredChapters.map((chapter, i) => (
              <div
                key={i}
                className="border border-gray-200 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {i + 1}. {highlight(chapter.title)}
                </h3>
                <p className="text-gray-600 mb-2">{chapter.description}</p>

                {chapter.link && (
                  <Link
                    to={chapter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 underline font-medium text-sm"
                  >
                    {chapter.link}
                  </Link>
                )}

                {chapter.code && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-1">
                      Code Example:
                    </h4>
                    <pre className="bg-gray-900 text-white rounded-xl p-4 overflow-x-auto text-sm leading-relaxed">
                      <code>{chapter.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
