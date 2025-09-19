import React, { Fragment, memo } from "react";
import Banner from "@front/(Pages)/(Home)/Banner";
import OurLessons from "@front/(Pages)/(Home)/OurLessons/OurLessons";
import OurStarts from "@front/(Pages)/(Home)/OurStarts/OurStarts";
import OurServices from "@front/(Pages)/(Home)/OurServices/OurServices";
import AboutUs from "@front/(Pages)/(Home)/AboutUs/AboutUs";
import OurPartners from "@front/(Pages)/(Home)/OurPartners/OurPartners";
import OurTrainers from "@front/(Pages)/(Home)/OurTrainers/OurTrainers";
import ComboPackages from "@front/(Pages)/(Home)/ComboPackages/ComboPackages";
import OurCareer from "@/app/(front)/(Pages)/career/OurCareer";

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <OurLessons />
      <ComboPackages />
      <OurCareer />
      <OurStarts />
      <OurServices />
      <AboutUs />
      <OurPartners />
      <OurTrainers />
    </Fragment>
  );
};

export default memo(Home);
