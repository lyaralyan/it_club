"use client";
import React from "react";
import Wrapper from "@front/components/Wrapper";
import Title from "@front/components/Title";
import TrainerCart from "./TrainerCart";
import "swiper/css";
import { useQuery } from "@apollo/client";
import { GET_TEACHERS } from "@/app/requests/query";

const OurTrainers = () => {
  const { data, error, loading } = useQuery(GET_TEACHERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Data loading error</p>;

  const trainers: OurTrainersProp[] = data.Teachers;

  return (
    <Wrapper className={"pt-[90px]"}>
      <Title
        text={"Մեր թրեյներները"}
        className={"text-center lg:text-left"}
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <p
        className={
          "text-[var(--dark)] mt-[14px] lg:text-[16px] text-[14px] text-center lg:text-left lg:font-normal font-medium tracking-[0.04px]"
        }>
        Ձեր կողքին են ոլորտի պրոֆեսիոնալները՝ գիտելիքը գործի վերածելու համար
      </p>
      <div className="mt-10 sm:mt-12 md:mt-[56px] grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-6 sm:gap-8 lg:gap-12">
        {trainers.map((item, index) => (
          <TrainerCart
            key={index}
            item={item}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default OurTrainers;
