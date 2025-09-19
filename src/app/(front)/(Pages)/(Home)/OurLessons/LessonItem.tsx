import React from "react";
import CustomButton from "@front/ui/CustomButton";
import BackgroundCart from "@front/assets/images/BackgroundCart.png";
import Link from "next/link";
import UniversalModal from "@/components/UniversalModal";
import { useModalStore } from "@/store/modalStore";

const LessonItem = ({ lesson }: { lesson: OurLessonsProp }) => {
  const { isOpen, closeModal, openModal } = useModalStore();

  return (
    <div
      className={
        "min-h-[276px] rounded-[20px] bg-white shadow-[0_0_10px_#00000014] transition transform hover:scale-105 cursor-pointer"
      }>
      <Link
        href={`/course/${lesson?.id}`}
        className={`h-[calc(100%_-_54px)] flex flex-col justify-center items-center relative bg-contain bg-no-repeat bg-center`}
        style={{
          backgroundImage: `url(${
            lesson.image
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${lesson.image}`
              : BackgroundCart.src
          })`,
        }}>
        <p className={"text-[#FFC502] text-xl font-normal text-center"}>
          {lesson.title}
        </p>
        <p
          className={
            "text-[var(--dark)] text-[16px] font-light uppercase mt-[12px]"
          }>
          Դասընթաց
        </p>
        <p className="text-[var(--dark)] text-[12px] font-extralight uppercase mt-[12px] text-center">
          {lesson.course?.map((item, index) =>
            index !== lesson.course.length - 1 ? item + ", " : item
          )}
        </p>
      </Link>
      <div
        className={
          "h-[54px] flex justify-between items-center border-t border-t-[#FBFBFB] px-6"
        }>
        <div className={"flex gap-2"}>
          <p className={"text-[12px] text-[#404040] font-extralight"}>
            {lesson.month} ամիս
          </p>
          <p className={"text-[12px] text-[#404040] font-extralight"}>
            {lesson.price} ֏
          </p>
        </div>
        <CustomButton
          onClick={openModal}
          text={"Գրանցվել"}
          href={""}
          withBorder={true}
        />
      </div>
      <UniversalModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default LessonItem;
