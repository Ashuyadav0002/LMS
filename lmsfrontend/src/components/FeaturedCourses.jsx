import React, { useEffect, useState } from "react";
import data from "../courses.json";
import CourseCard from "./CourseCard";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(data.courses); // If imported directly as a file
  }, []);

  return (
    <section className="relative py-16 font-inter">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
