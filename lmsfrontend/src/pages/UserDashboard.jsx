import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const UserDashboard = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const name = userData?.fullName || "User";

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledBooks, setEnrolledBooks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("courses");

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const books = JSON.parse(localStorage.getItem("enrolledBooks")) || [];
    setEnrolledCourses(courses);
    setEnrolledBooks(books);
    if (books.length > courses.length) setSelectedTab("books");
    else setSelectedTab("courses");
  }, []);

  const handleRemoveCourse = (id) => {
    if (!window.confirm("Remove this course?")) return;
    const updated = enrolledCourses.filter((c) => c._id !== id);
    setEnrolledCourses(updated);
    localStorage.setItem("enrolledCourses", JSON.stringify(updated));
  };

  const handleRemoveBook = (id) => {
    if (!window.confirm("Remove this book?")) return;
    const updated = enrolledBooks.filter((b) => b._id !== id);
    setEnrolledBooks(updated);
    localStorage.setItem("enrolledBooks", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
          Welcome, {name}
        </h1>
        <p className="text-gray-600 text-sm">
          Manage your enrolled content below.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div
          onClick={() => setSelectedTab("courses")}
          className={`cursor-pointer bg-white shadow-md rounded-xl p-5 border-l-4 transition-all duration-200 hover:shadow-lg ${
            selectedTab === "courses" ? "border-blue-600" : "border-transparent"
          }`}
        >
          <h2 className="text-md font-semibold text-gray-700">Courses</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {enrolledCourses.length}
          </p>
        </div>
        <div
          onClick={() => setSelectedTab("books")}
          className={`cursor-pointer bg-white shadow-md rounded-xl p-5 border-l-4 transition-all duration-200 hover:shadow-lg ${
            selectedTab === "books" ? "border-green-600" : "border-transparent"
          }`}
        >
          <h2 className="text-md font-semibold text-gray-700">Books</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {enrolledBooks.length}
          </p>
        </div>
      </div>

      {selectedTab === "courses" ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Enrolled Courses
          </h2>
          {enrolledCourses.length === 0 ? (
            <p className="text-gray-600 text-center mb-12">
              You have not enrolled in any courses yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {enrolledCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-36 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveCourse(course._id)}
                      className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 rounded-full p-2 h-10 w-10 flex justify-center items-center shadow-sm transition-all duration-200"
                      title="Remove Book"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Instructor:{" "}
                      <span className="font-medium">{course.instructor}</span>
                    </p>
                    <Link
                      to={`/lesson/${course._id}`}
                      className="block w-full text-center bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition mt-3"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Books
          </h2>
          {enrolledBooks.length === 0 ? (
            <p className="text-gray-600 text-center mb-12">
              You have not enrolled in any books yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-full h-36 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveBook(book._id)}
                      className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 rounded-full p-2 h-10 w-10 flex justify-center items-center shadow-sm transition-all duration-200"
                      title="Remove Book"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">By {book.author}</p>
                    <p className="text-xs text-blue-600">
                      {book.category} • {book.chapters.length} Chapters
                    </p>
                    <Link
                      to={`/enrollBookDetail/${book._id}`}
                      className="block w-full text-center bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition mt-3"
                    >
                      View Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
