import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-white font-inter overflow-hidden">
      {/* Decorative pastel background circles */}
      <div className="absolute top-[10%] left-[5%] w-10 h-10 bg-blue-100 rounded-full opacity-60 z-10"></div>
      <div className="absolute top-[40%] left-[10%] w-10 h-10 bg-pink-100 rounded-full opacity-60 z-10"></div>
      <div className="absolute top-[70%] left-[20%] w-10 h-10 bg-yellow-100 rounded-full opacity-60 z-10"></div>

      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-100 rounded-full opacity-30 z-10" />
      <div className="absolute bottom-[-120px] left-[-100px] w-[350px] h-[350px] bg-green-100 rounded-full opacity-30 z-10" />

      {/* Background image for small screens */}
      <div className="lg:hidden absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <img
          src="https://png.pngtree.com/png-clipart/20231018/original/pngtree-man-reading-book-cartoon-style-illustration-png-image_13354977.png"
          alt="Cartoon man reading books"
          className="w-3/4 opacity-30"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Achieve More Through{" "}
            <span className="inline-block text-blue-600">Better Learning</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Our platform makes complex topics simple, fun, and engaging—perfect
            for learners of all levels.
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex justify-end">
          <img
            src="https://png.pngtree.com/png-clipart/20231018/original/pngtree-man-reading-book-cartoon-style-illustration-png-image_13354977.png"
            alt="Cartoon man reading books"
            className="w-full max-w-md object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
