import { GET_TEACHERS } from "@/app/requests/query";

import { useQuery } from "@apollo/client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";

interface TeachersListProps {
  getTeacher: (args: { variables: { id: string } }) => void;
  deleteTeacher?: (args: { variables: { id: string } }) => void;
  onEdit?: (args: { variables: { id: string } }) => void;
}

const TeachersList: React.FC<TeachersListProps> = ({
  deleteTeacher,
  onEdit,
}) => {
  const { data: allData } = useQuery(GET_TEACHERS);

  return (
    <div
      className={
        "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-[56px] justify-between"
      }>
      {allData?.Courses?.map(
        (lesson: OurLessonsProp, index: number) => (
          <div
            key={index}
            className={
              "min-h-[276px] rounded-[20px] bg-white shadow-[0_0_10px_#00000014] transition transform hover:scale-105 cursor-pointer"
            }>
            <div
              className={`h-[calc(100%_-_54px)] flex flex-col justify-center items-center relative bg-contain bg-no-repeat bg-center`}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_STORAGE_URL}${lesson.image})`,
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
            </div>
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
              <div className="flex gap-2 items-center">
                <IconEdit
                  onClick={() => onEdit?.({ variables: { id: lesson.id } })}
                />

                {deleteTeacher && (
                  <IconTrash
                    onClick={() =>
                      deleteTeacher({ variables: { id: lesson.id } })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TeachersList;
