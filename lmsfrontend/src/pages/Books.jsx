import React, { useEffect, useState } from "react";
import booksData from "../books.json";
import BookCard from "../components/BooksCard";

export default function Books({ searchQuery }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData.books);
  }, []);

  // Highlight function
  const highlight = (text) => {
    if (!searchQuery) return text;
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

  // Filter + Inject highlighted JSX
  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((book) => ({
      ...book,
      title: highlight(book.title),
      author: highlight(book.author),
      category: highlight(book.category),
    }));

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Explore Our Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </section>
  );
}
