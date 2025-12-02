import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import data from "../courses.json";

// Highlighting function
const highlightMatch = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-black">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const Lesson = ({ searchQuery }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = data.courses.find((c) => String(c._id) === courseId);

  if (!course) {
    return (
      <div className="p-8 text-center text-gray-500 text-lg">
        🚫 Course not found.
      </div>
    );
  }

  // Filter lessons based on search query
  const filteredLessons = course.lessons.filter((lesson) =>
    (lesson.title + lesson.description)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-10 px-6 sm:px-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      {/* Course Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-gray-600 mt-2 text-sm max-w-2xl mx-auto">
          Start learning by choosing a lesson below. Click any card to begin
          watching!
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No lessons match your search.
          </p>
        ) : (
          filteredLessons.map((lesson, index) => (
            <Link
              key={index}
              to={`/lesson/${course._id}/video/${course.lessons.indexOf(
                lesson
              )}`}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition hover:bg-gray-100"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {course.lessons.indexOf(lesson) + 1}.{" "}
                    {highlightMatch(lesson.title, searchQuery)}
                  </h3>
                  {lesson.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {highlightMatch(lesson.description, searchQuery)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Lesson;
