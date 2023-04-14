import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import HeroSection from "../../Page Components/HeroSection/HeroSection/HeroSection";

const Home = () => {
  return (
    <>
      <HomeLayout children={<HeroSection />} />
    </>
  );
};

export default Home;
