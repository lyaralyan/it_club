"use client";
import React from "react";
import Title from "@front/components/Title";
import Wrapper from "@front/components/Wrapper";
import { GET_COURSE } from "@/app/requests/query";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import CoursesVideo from "@front/components/CoursesVideo/CoursesVideo";
import OurCourses from "@front/components/OurCourses/OurCourses";

const CourseSingle = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: { id },
    skip: !id,
  });

  const course = data?.Course;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course</p>;

  return (
    <Wrapper className={"mt-[102px]"}>
      <Title text={course?.title} />
      <p className={"mt-4 text-[16px] font-normal text-[#4D4D4D]"}>
        {course?.description}
      </p>
      <div className={"mt-[68px]"}>
        <p className={"font-semibold text-2xl text-[#4D4D4D]"}>
          Դասապրոցեսի ընթացքը
        </p>
        <p className={"mt-6 text-[var(--yellow-color)] text-lg"}>
          {course?.lessonProcessDescription}
        </p>

        <div className={"relative w-full h-[800px] mt-6"}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${course?.photos}`}
            alt={"photos"}
            width={500}
            height={500}
            priority={true}
            style={{ width: "100%", height: "100%" }}
            unoptimized
          />
        </div>
      </div>
      <div className={"mt-[90px]"}>
        <h3 className={"font-semibold text-[32px] text-[var(--dark)]"}>
          Դասընթացի ծրագիրը
        </h3>
        <ul
          className={
            "list-inside list-disc text-[#4D4D4D] pl-4 text-[20px] font-extralight"
          }>
          {course?.courseProgram?.map((cItem: string, index: number) => (
            <li key={index}>{cItem}</li>
          ))}
        </ul>
      </div>
      <CoursesVideo
        video={`${process.env.NEXT_PUBLIC_STORAGE_URL}${course?.video}`}
      />
      <OurCourses currentID={id} />
    </Wrapper>
  );
};

export default CourseSingle;
