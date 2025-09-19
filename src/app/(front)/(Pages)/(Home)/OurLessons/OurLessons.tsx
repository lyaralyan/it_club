"use client";
import React from "react";
import Title from "@front/components/Title";
import Wrapper from "@front/components/Wrapper";
import LessonItem from "./LessonItem";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "@/app/requests/query";

const OurLessons = () => {
  const { data } = useQuery(GET_COURSES);

  return (
    <Wrapper className={"pt-[122px]"}>
      <Title
        text={"Մեր դասընթացները"}
        className={"text-center lg:text-left"}
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <p
        className={
          "text-[var(--dark)] mt-3.5 text-center lg:text-left lg:text-[16px] text-[14px]"
        }>
        Բացահայտիր պահանջված ՏՏ մասնագիտություններն ու սկսիր սովորել այսօր
      </p>
      <div
        className={
          "lg:mt-[56px] mt-[16px] grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-6 sm:gap-8 lg:gap-[56px]"
        }>
        {data?.Courses?.map((lesson: OurLessonsProp, index: number) => (
          <LessonItem
            lesson={lesson}
            key={index}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default OurLessons;
