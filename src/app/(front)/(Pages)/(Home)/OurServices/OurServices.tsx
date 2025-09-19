"use client";
import React from "react";
import Wrapper from "@front/components/Wrapper";
import Title from "@front/components/Title";
import Image from "next/image";
import ourServices from "@front/assets/images/ourServices.png";
import SubTitle from "@front/components/SubTitle";
import CustomButton from "@front/ui/CustomButton";
import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "@/app/requests/query";

const OurServices = () => {
  const { data, loading, error } = useQuery(GET_SERVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;

  const service = data.Services;
  return (
    <Wrapper className={"pt-[90px]"}>
      <Title
        text={"Մեր ծառայությունները"}
        className={"text-center lg:text-left"}
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <p
        className={
          "text-[var(--dark)] mt-[14px]  mb-[56px] text-center lg:text-left lg:text-[16px] text-[14px]"
        }>
        IT Club-ը անցկացնում է IT դասընթացներ և իրականացնում նախագծեր A to Z։
      </p>
      <div className={"flex justify-between items-start lg:flex-row flex-col"}>
        <Image
          src={ourServices}
          alt={"Our Services"}
          style={{ alignSelf: "center" }}
        />
        <div className={"flex flex-col items-end lg:max-w-[576px]"}>
          <SubTitle
            text={"IT Club-ի մասին"}
            className={"text-center lg:text-right"}
          />
          <p
            className={
              "text-[var(--dark)]  font-semibold mt-[14px] text-center lg:text-right lg:text-[16px] text-[14px]"
            }>
            Ինչո՞վ ենք մենք զբաղվում
          </p>
          <p
            className={
              "text-[var(--dark)] font-normal mt-[28px] text-center lg:text-right lg:text-[16px] text-[12px]"
            }>
            {service?.description}
          </p>
          <CustomButton
            text={"Իմանալ ավելին"}
            href={"services"}
            background={"none"}
            className={
              "text-[#FFC502]! mt-[29px] p-0! self-center lg:self-end lg:text-[16px] text-[14px]"
            }
            iconColor={"#FFC502"}
            withIcon={true}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default OurServices;
