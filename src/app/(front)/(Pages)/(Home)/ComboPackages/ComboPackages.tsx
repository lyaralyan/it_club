"use client";
import Title from "@front/components/Title";
import Wrapper from "@front/components/Wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/app/globals.css";
import ComboItem from "@front/(Pages)/(Home)/ComboPackages/ComboItem";
import { useQuery } from "@apollo/client";
import { GET_COMBOS } from "@/app/requests/query";

const ComboPackages = () => {
  const { data: comboData, loading, error } = useQuery(GET_COMBOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading data...</p>;

  const data: Array<OurComboProp> = comboData.Combos;

  return (
    <Wrapper className={"lg:mt-[90px] mt-[56px]"}>
      <Title
        text="Մեր կոմբո փաթեթները"
        className={"text-center lg:text-left"}
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <p
        className={
          "lg:text-[16px] lg:font-normal text-[var(--dark)] lg:mt-[12px] text-center lg:text-left mt-[16px] text-[14px] font-medium"
        }>
        Սովորիր մի քանի մասնագիությունը ընդամենը մի քանի ամսում
      </p>
      <div className={"relative lg:mt-[56px] mt-[16px]"}>
        <Swiper
          spaceBetween={64}
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
          wrapperClass={"items-stretch"}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}>
          {data?.map((start, index) => (
            <SwiperSlide
              key={index}
              className={"h-auto!"}>
              <ComboItem start={start} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="custom-pagination mt-4 flex justify-center gap-2"></div>
    </Wrapper>
  );
};

export default ComboPackages;
