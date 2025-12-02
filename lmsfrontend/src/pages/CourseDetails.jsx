import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../courses.json";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = data.courses.find((c) => String(c._id) === id);

  const handleEnroll = () => {
    let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const exists = enrolled.find((c) => c._id === course._id);
    if (!exists) {
      enrolled.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
      navigate("/dashboard");
    } else {
      alert("Already enrolled.");
    }
  };

  if (!course) {
    return (
      <div className="text-center py-20 text-gray-500">Course not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        ← Back
      </button>

      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-64 object-cover bg-gray-50 mb-6 rounded-md shadow"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-1">
        By <span className="font-medium">{course.instructor}</span>
      </p>
      <p className="text-sm text-blue-600 font-medium mb-2">
        {course.category}
      </p>
      <p className="text-xl text-green-600 font-semibold mb-4">
        ₹{course.price}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Enroll Now
      </button>

      {/* Lessons Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lessons ({course.lessons.length})
        </h2>
        <ul className="space-y-2">
          {course.lessons.map((lesson, index) => (
            <li
              key={index}
              className="text-gray-700"
            >
              {index + 1}. {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
