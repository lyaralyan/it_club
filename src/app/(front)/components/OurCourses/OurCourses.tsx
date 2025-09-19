"use client";
import Title from "@front/components/Title";
import PenNib from "@front/assets/icons/PenNib.svg";
import { useState } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_COURSES_TITLE } from "@/app/requests/query";
import Link from "next/link";
import { ParamValue } from "next/dist/server/request/params";

type OurCourse = {
  id: string; // Assuming 'id' is a string
  title: string;
};

const OurCourses = ({ currentID }: { currentID: ParamValue }) => {
  const [borderColor, setBorderColor] = useState<ParamValue>(currentID);
  const { data, loading, error } = useQuery(GET_COURSES_TITLE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course</p>;
  const Courses = data?.Courses;

  return (
    <div className={"my-[90px] pb-[58px] h-fit"}>
      <Title text="Մեր դասընթացները" />
      <p
        className={
          "font-medium text-[18px] leading-[28px] tracking-[0.04px] text-[var(--yellow-color)] mt-[14px]"
        }>
        Բացահայտիր պահանջված ՏՏ մասնագիտություններն ու սկսիր սովորել այսօր
      </p>
      <div className={"w-full mt-[62px]"}>
        <div
          className={
            // "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]"
            "w-full grid [grid-template-columns:repeat(auto-fill,minmax(280px,300px))] gap-[30px]"
          }>
          {Courses.map((course: OurCourse, index: number) => (
            <Link
              key={index}
              href={`/course/${course.id}`}>
              <div
                key={index}
                className={`h-[76px] border-[2px] rounded-[22px] flex justify-between items-center cursor-pointer ${
                  borderColor === course?.id
                    ? "shadow-[0_12px_48px_#FFC27A42]"
                    : "shadow-[0_4px_4px_#00000040]"
                } ${
                  borderColor === course?.id
                    ? "border-[var(--yellow-color)]"
                    : ""
                }
            `}
                onClick={() => setBorderColor(course?.id)}>
                <div
                  className={"flex h-full items-center ml-[24px] gap-[16px]"}>
                  {/* {button.icon} */}
                  <PenNib className={"w-[38px] h-[38px]"} />
                  <p className={"font-medium text-[16px]"}>{course.title}</p>
                </div>
                <div
                  className={`w-[44px] h-[44px] bg-[${
                    borderColor === course?.id ? "var(--yellow-color)" : "none"
                  }] rounded-[50%] flex items-center justify-center mr-[24px]`}>
                  <ArrowUpRightIcon
                    color={borderColor === course?.id ? "#fff" : "#FFC27A"}
                    size={24}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCourses;
