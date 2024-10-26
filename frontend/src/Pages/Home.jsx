import React from "react";
import HomeSlide from "../Components/HomeSlide/HomeSlide";
import HomeNew from "../Components/HomeNew/HomeNew";
import HomeCategory from "../Components/HomeCategory/HomeCategory";
import HomeNews from "../Components/HomeNews/HomeNews";
import HomeIntroduce from "../Components/HomeIntroduce/HomeIntroduce";

const Home = () => {
  return (
    <div>
      <HomeSlide/>
      <HomeNew/>
      <HomeCategory/>
      <HomeNews/>
      <HomeIntroduce/>
    </div>
  )
}

export default Home
