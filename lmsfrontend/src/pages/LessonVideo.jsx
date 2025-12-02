import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../courses.json";

const LessonVideo = () => {
  const { courseId, lessonIndex } = useParams();
  const navigate = useNavigate();

  const course = data.courses.find((c) => String(c._id) === courseId);
  const lesson = course?.lessons?.[lessonIndex];

  if (!course || !lesson) {
    return (
      <div className="text-center py-20 text-gray-500">
        {course ? "Lesson not found." : "Course not found."}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-inter">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-6 text-sm"
      >
        ← Back to Lessons
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{lesson.title}</h1>
      {/* Video Player */}
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Lesson Info Panel */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
        <p className="mt-2 text-gray-600 text-sm">
          {lesson.description || "No description available."}
        </p>

        {/* Additional Note Section (like a YouTube overview) */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Overview / Notes
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {lesson.notes ||
              `This lesson covers the topic of "${lesson.title}". You can add custom notes here later if needed.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonVideo;
