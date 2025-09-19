"use client";
import Title from "@front/components/Title";
import PortfolioPicture from "@front/assets/images/service1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/globals.css";
import PortfolioItem from "@front/(Pages)/services/[id]/OurPortfolio/PortfolioItem";

const PortfolioList: Array<OurPortfolioProp> = [
  {
    title: " Landing Page",
    description: "1 էջանոց կայքեր գովազդային արշավների համար",
    image: PortfolioPicture,
  },
  {
    title: " Landing Page",
    description: "1 էջանոց կայքեր գովազդային արշավների համար",
    image: PortfolioPicture,
  },
  {
    title: " Landing Page",
    description: "1 էջանոց կայքեր գովազդային արշավների համար",
    image: PortfolioPicture,
  },
  {
    title: " Landing Page",
    description: "1 էջանոց կայքեր գովազդային արշավների համար",
    image: PortfolioPicture,
  },
  {
    title: " Landing Page",
    description: "1 էջանոց կայքեր գովազդային արշավների համար",
    image: PortfolioPicture,
  },
  {
    title: " Landing Page",
    description: "1 էջանոց կայքեր գովազդային արշավների համար",
    image: PortfolioPicture,
  },
];

const OurPortfolio = () => {
  return (
    <div className={"lg:mt-[90px] mt-[60px]"}>
      <Title
        text="Մեր պորտֆոլիոն"
        className={
          "font-semibold lg:text-[32px] text-[18px] text-center lg:text-left"
        }
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <div className={"relative lg:mt-[42px] mt-[24px]"}>
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, Autoplay, Pagination]}
          loop={true}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
        >
          {PortfolioList.map((start, index) => (
            <SwiperSlide key={index}>
              <PortfolioItem start={start} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurPortfolio;
