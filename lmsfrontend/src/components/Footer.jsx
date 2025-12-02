import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-1 pb-6 px-6 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="">
          <Link
            to="/"
            className="text-5xl font-extrabold text-blue-600 tracking-wide w-15"
          >
            <img
              src="https://d1vwxdpzbgdqj.cloudfront.net/images/data-science/scikit_learn.png"
              alt=""
            />
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            Empowering learners worldwide with quality online education.
          </p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex items-center space-x-4 text-gray-400 text-xl mt-3">
            <Link
              to={
                "https://www.instagram.com/ashu__nkt?igsh=MWVkc3NzYXBhcHpocg=="
              }
              target="_blank"
              className="hover:text-white transition"
            >
              <InstagramIcon fontSize="medium" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} LMS Platform. All rights reserved.
      </div>
    </footer>
  );
}
