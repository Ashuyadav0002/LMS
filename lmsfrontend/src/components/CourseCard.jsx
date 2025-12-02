import React from "react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLoggedIn");

  const handleViewCourse = (id) => {
    if (isLogin === "true") {
      navigate(`/courses/${id}`);
    } else {
      alert("Please login to view course details.");
    }
  };
  const isFree = course?.price === 0 || course?.price === "Free";

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
      <img
        src={course?.thumbnail}
        alt={course?.title}
        className="w-full h-52 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {course?.title}
        </h3>
        <p className="text-sm text-gray-600">By {course?.instructor}</p>
        <p className="text-sm text-blue-600 font-medium">{course?.category}</p>

        {/* Price and Lessons */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-semibold text-green-600">
            {typeof course?.price === "number" ? "₹" : ""}
            {course?.price}
          </span>
          <span className="text-xs text-gray-500">
            {course?.lessons?.length || 0} Lessons
          </span>
        </div>

        {/* View Course Button */}
        <div
          onClick={() => {
            handleViewCourse(course?._id);
          }}
          className="block w-full mt-1 cursor-pointer bg-blue-600 text-white text-sm text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Course
        </div>
      </div>
    </div>
  );
}
