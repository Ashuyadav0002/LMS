import React from "react";
import Hero from "../components/Hero";
import FeaturedCourses from "../components/FeaturedCourses";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import FeaturedBooks from "../components/FeaturedBooks";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCourses />
      <FeaturedBooks />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Home;
