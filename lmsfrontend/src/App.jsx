import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import UserDashboard from "./pages/UserDashboard";
import Lesson from "./pages/Lesson";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import EnrollBookDetails from "./pages/EnrollBookDetails";
import LessonVideo from "./pages/LessonVideo";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/courses"
          element={<Courses searchQuery={searchQuery} />}
        />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/books" element={<Books searchQuery={searchQuery} />} />
        <Route
          path="/lesson/:courseId"
          element={<Lesson searchQuery={searchQuery} />}
        />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route
          path="/lesson/:courseId/video/:lessonIndex"
          element={<LessonVideo />}
        />
        <Route
          path="/enrollBookDetail/:enrollBookId"
          element={<EnrollBookDetails searchQuery={searchQuery} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
