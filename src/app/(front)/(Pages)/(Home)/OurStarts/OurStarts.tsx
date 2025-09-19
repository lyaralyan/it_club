"use client";
import React from "react";
import Title from "@front/components/Title";
import Wrapper from "@front/components/Wrapper";
import StartsItem from "./StartsItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/globals.css";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_START_COURSES } from "@/app/requests/query";

// const starts: Array<OurStartsProp> = [
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
//   {
//     title: "WEB ծրագրավորում",
//     start: "Դասընթաց",
//     info: "HTML, cSS, javascript, React JS",
//     date: "25 Մայիս 2024",
//     price: "60,000 ֏",
//     image: startImage,
//     description:
//       "Սկսում ենք վեբ ծրագրավորման նոր դասընթացներ՝ ստացիր հմտություններ և սկսիր կարիերադ IT ոլորտում։",
//   },
// ];

const OurStarts = () => {
  const { data, loading, error } = useQuery(GET_START_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Loading...</p>;
  const starts: Array<OurStartsProp> = data.StartCourses;

  return (
    <Wrapper className={"pt-[90px]"}>
      <Title
        text={"Մեր մեկնարկները"}
        className={"text-center lg:text-left"}
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <p
        className={
          "text-[var(--dark)] mt-[14px] mb-[56px] text-center lg:text-left lg:text-[16px] text-[14px] lg:font-normal font-medium"
        }>
        Սկսում ենք նոր դասընթացներ՝ հմտացիր այսօր, աշխատիր վաղը։
      </p>
      <div className={"relative"}>
        <Swiper
          spaceBetween={64}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, Autoplay, Pagination]}
          loop={true}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}>
          {starts?.map((start, index) => (
            <SwiperSlide key={index}>
              <StartsItem start={start} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}

        <ArrowLeftCircle
          className={
            "custom-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          }
          width={40}
          height={40}
          strokeWidth={1}
          stroke={"#777777"}
        />
        <ArrowRightCircle
          className={
            "custom-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          }
          width={40}
          height={40}
          strokeWidth={1}
          stroke={"#777777"}
        />
      </div>

      {/* Custom Pagination */}
      <div className="custom-pagination mt-4 flex justify-center gap-2"></div>
    </Wrapper>
  );
};

export default OurStarts;
