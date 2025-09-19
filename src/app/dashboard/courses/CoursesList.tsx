import { CREATE_START_COURSE } from "@/app/requests/mutation";
import { GET_COURSES } from "@/app/requests/query";
import { useMutation, useQuery } from "@apollo/client";
import { IconCalendarClock, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CoursesListProps {
  getCourse: (args: { variables: { id: string } }) => void;
  deleteCourse?: (args: { variables: { id: string } }) => void;
  onEdit?: (args: { variables: { id: string } }) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ deleteCourse, onEdit }) => {
  const { data: allData } = useQuery(GET_COURSES);
  const [addStartDateToCourse] = useMutation(CREATE_START_COURSE, {
    onCompleted: () => {},
  });

  const [openLessonId, setOpenLessonId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div
      className={
        "lg:mt-[56px] mt-[16px] grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-6 sm:gap-8 lg:gap-[56px]"
      }>
      {allData?.Courses?.map((lesson: OurLessonsProp, index: number) => (
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
            <Dialog
              open={openLessonId === lesson.id}
              onOpenChange={(open) => {
                if (!open) setOpenLessonId(null);
              }}>
              <DialogTrigger asChild>
                <IconCalendarClock
                  className={"top-2 right-2 absolute "}
                  onClick={() => setOpenLessonId(lesson.id)}
                />
              </DialogTrigger>
              <DialogContent className="w-full max-w-sm p-4 bg-white rounded shadow-lg">
                <DialogTitle>Ընտրեք սկսելու օրը</DialogTitle>
                <Calendar
                  mode="single"
                  selected={selectedDate ?? undefined}
                  onSelect={(date) => setSelectedDate(date ?? null)}
                />
                <Select
                  value={selectedTime ?? ""}
                  onValueChange={setSelectedTime}>
                  <SelectTrigger className="mt-4 w-full">
                    <SelectValue placeholder="Ընտրել ժամը" />
                  </SelectTrigger>
                  <SelectContent>
                    {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map(
                      (time) => (
                        <SelectItem
                          key={time}
                          value={time}>
                          {time}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Button
                  className="mt-4"
                  onClick={() => {
                    if (selectedDate) {
                      const year = selectedDate.getFullYear();
                      const month = (selectedDate.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const day = selectedDate
                        .getDate()
                        .toString()
                        .padStart(2, "0");

                      const date = `${year}-${month}-${day}`;
                      const time = selectedTime ?? "00:00";
                      addStartDateToCourse({
                        variables: {
                          courseId: lesson.id,
                          startDate: { date, time },
                        },
                      });
                      setOpenLessonId(null);
                    }
                  }}>
                  Հաստատել
                </Button>
              </DialogContent>
            </Dialog>

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

              {deleteCourse && (
                <IconTrash
                  onClick={() => deleteCourse({ variables: { id: lesson.id } })}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
