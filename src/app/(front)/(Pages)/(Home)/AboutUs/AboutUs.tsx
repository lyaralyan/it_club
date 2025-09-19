"use client";
import React from "react";
import Wrapper from "@front/components/Wrapper";
import Title from "@front/components/Title";
import Image from "next/image";
import about_us from "@front/assets/images/about_us.png";
import CustomButton from "@front/ui/CustomButton";
import { useQuery } from "@apollo/client";
import { GET_ABOUT_US } from "@/app/requests/query";

const AboutUs = () => {
  const { data, loading, error } = useQuery(GET_ABOUT_US);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;

  const about = data.getAboutUs?.first;

  return (
    <Wrapper
      className={
        "lg:mt-[90px] mt-[56px] flex justify-between items-start lg:flex-row flex-col"
      }>
      <div className={"flex flex-col items-start lg:max-w-[646px]"}>
        <Title
          text={"Մեր մասին"}
          titleYellowStyle={{ width: "144px" }}
        />
        <p
          className={
            "text-[var(--dark)] mt-[14px] lg:text-[16px] lg:font-semibold text-[14px] font-medium self-center lg:self-start"
          }>
          {about?.subTitle}
        </p>
        <p
          className={
            "text-[var(--dark)] lg:text-[16px] text-[12px] font-normal lg:mt-[28px] mt-[16px] text-center lg:text-left"
          }>
          {about?.description}
        </p>
        <CustomButton
          text={"Իմանալ ավելին"}
          href={"/about"}
          className={"mt-[29px] hidden lg:flex"}
          withIcon={true}
          color={true}
        />
      </div>
      <Image
        src={about_us}
        alt={"Our Services"}
        className={"lg:max-w-[572px] w-full max-h-[452px] mt-[16px]"}
      />
      <CustomButton
        text={"Իմանալ ավելին"}
        href={"/about"}
        className={"mt-[16px] self-center block lg:hidden text-[14px]"}
        withIcon={true}
        color={true}
      />
    </Wrapper>
  );
};

export default AboutUs;
