"use client";
import React from "react";
import Wrapper from "@front/components/Wrapper";
import Title from "@front/components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import inform from "@front/assets/images/inform.png";
import katitas from "@front/assets/images/katitas.png";
import { Autoplay, FreeMode } from "swiper/modules";
const logos = [katitas, inform];
import "swiper/css";

const OurPartners = () => {
  return (
    <Wrapper className={"pt-[90px]"}>
      <Title text={"Մեր գործընկերները"} className={"text-center lg:text-left"} textClassName={"left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"} />
      <p className={"text-[var(--dark)] mt-[14px] lg:text-[16px] text-center lg:text-left text-[14px] lg:font-normal font-medium"}>
        Մեզ վստահում են ոլորտի առաջատար ընկերություններն ու
        կազմակերպությունները։
      </p>

      <Swiper
        modules={[Autoplay, FreeMode]}
        loop={false}
        freeMode={true}
        speed={8000}
        grabCursor={true}
        spaceBetween={30}
        slidesPerView="auto"
        className={"mt-[64px]"}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}>
        {[...Array(17)].flatMap(() =>
          logos.map((logo, i) => (
            <SwiperSlide
              key={`${logo.src}-${i}-${Math.random()}`}
              className="!w-[154px]">
              <Image
                src={logo}
                alt="partner logo"
                width={154}
                height={50}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Wrapper>
  );
};

export default OurPartners;
