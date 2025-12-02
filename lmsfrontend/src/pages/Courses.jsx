import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import data from "../courses.json";

export default function Courses({ searchQuery }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(data.courses || data); // support both file shapes
  }, []);

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

  const filteredCourses = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((course) => ({
      ...course,
      title: highlight(course.title),
      category: highlight(course.category),
      instructor: highlight(course.instructor),
    }));

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Explore Our Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses?.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </section>
  );
}
