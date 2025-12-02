import React, { useEffect, useState } from "react";
import data from "../books.json";
import BooksCard from "./BooksCard";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(data.books); // If imported directly as a file
  }, []);

  return (
    <section className="relative py-16 font-inter">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Featured Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.slice(0, 3).map((course, i) => (
            <BooksCard key={i} book={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
