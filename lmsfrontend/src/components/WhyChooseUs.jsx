import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const benefits = [
  "Expert Instructors",
  "Flexible Learning",
  "Industry-relevant Curriculum",
  "Community Support",
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 font-inter relative overflow-hidden">
      {/* Blurred background circles */}
      <div className="absolute top-[-10%] right-[10%] w-[300px] h-[300px] bg-purple-200 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-[-5%] left-[5%] w-[200px] h-[200px] bg-yellow-100 rounded-full blur-2xl opacity-40 -z-10" />

      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🎯 Why Choose Our LMS?
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          We provide top-quality content, interactive learning, and support that
          helps you succeed faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <CheckCircleIcon className="text-green-600 mr-3" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
