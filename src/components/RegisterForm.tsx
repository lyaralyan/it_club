"use client";

import Image from "next/image";
import { useState } from "react";
import illustration from "@front/assets/images/person2 1.png";
import CustomButton from "@/app/(front)/ui/CustomButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useMutation, useQuery } from "@apollo/client";
import { GET_START_COURSES } from "@/app/requests/query";
import { Label } from "./ui/label";
import Location from "@front/assets/icons/Location.svg";
import Gmail from "@front/assets/icons/Gmail.svg";
import Tel from "@front/assets/icons/Tel.svg";
import Facebook from "@front/assets/icons/Facebook.svg";
import Instagram from "@front/assets/icons/Instagram.svg";
import Linkedin from "@front/assets/icons/Linkedin.svg";
import Telegram from "@front/assets/icons/Telegram.svg";
import { REGISTER_TO_COURSE } from "@/app/requests/mutation";

export default function RegisterForm({ onClose }: { onClose: () => void }) {
  const [course, setCourse] = useState("");
  const [filteredCourse, setFilteredCourse] = useState<{
    title: string;
    startDate: { date: string; time: string };
  } | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { data, loading, error } = useQuery(GET_START_COURSES);
  const [registerToCourse, { loading: submitting }] =
    useMutation(REGISTER_TO_COURSE);

  const handleSubmit = async () => {
    if (!name || !email || !phone || !course || !date || !time) {
      alert("Խնդրում ենք լրացնել բոլոր դաշտերը։");
      return;
    }

    try {
      await registerToCourse({
        variables: {
          input: {
            name,
            email,
            phone,
            course,
            date,
            time,
          },
        },
      });
      alert("Դուք հաջողությամբ գրանցվեցիք։");
      onClose();
    } catch (error) {
      console.error("❌ Error while registering:", error);
      alert("Սխալ տեղի ունեցավ գրանցման ընթացքում։");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 bg-white overflow-y-auto">
      {/* Left Section */}
      <div className="flex-1/2 lg:max-w-[644px] text-sm px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-8 bg-[#EEEEEE6B]">
        <h2 className="text-[20px] font-bold">Գրանցվել դասընթացին</h2>
        <div className="mt-6 w-full">
          <div className={"grid grid-cols-[130px_1fr] items-center"}>
            <p className="flex gap-2 items-center font-bold">
              <Location className={"w-[27px] h-[27px]"} /> Հասցե
            </p>
            <a
              href={"https://yandex.com/maps/-/CHfr6GZv"}
              target={"_blank"}
              className={"font-bold"}>
              Վարդանանց Անցում 20/1
            </a>
          </div>
          <div className={"grid grid-cols-[130px_1fr] items-center"}>
            <p className="flex gap-2 items-center font-bold">
              <Gmail className={"w-[27px] h-[27px]"} /> Էլ․ հասցե
            </p>
            <a href={"mailto:itclub2025@gmail.com"}>itclub2025@gmail.com</a>
          </div>
          <div className={"grid grid-cols-[130px_1fr] items-center"}>
            <p className="flex gap-2 items-center font-bold">
              <Tel className={"w-[27px] h-[27px]"} /> Հեռ․
            </p>
            <a href={"tel:+374 96 11 02 01"}>+374 96 11 02 01</a>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-[18px] font-bold">Հետևեք մեզ</p>
          <div className="flex gap-4 text-2xl">
            <a href="#">
              <Facebook className={"w-[36px] h-[36px]"} />
            </a>
            <a href="#">
              <Instagram className={"w-[36px] h-[36px]"} />
            </a>
            <a href="#">
              <Linkedin className={"w-[36px] h-[36px]"} />
            </a>
            <a href="#">
              <Telegram className={"w-[36px] h-[36px]"} />
            </a>
          </div>
        </div>

        <div className="mt-6">
          <Image
            src={illustration}
            alt="illustration"
            className="max-w-[500px] w-full mx-auto"
            width={500}
            height={343}
          />
        </div>
      </div>

      {/* Right Section */}

      <div className="w-full flex flex-col md:flex-row flex-wrap gap-6 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-20">
        <div className="w-full md:w-[calc(50%-0.75rem)] flex flex-col gap-3">
          <Label
            htmlFor="name"
            className={"text-[16px] font-normal"}>
            Ձեր անունը
          </Label>
          <Input
            type="text"
            id="name"
            className="border rounded-full px-4 py-2 bg-gray-100 outline-none h-[37px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label
            htmlFor="email"
            className={"text-[16px] font-normal"}>
            Էլ․ հասցե
          </Label>
          <Input
            type="email"
            id="email"
            className="border rounded-full px-4 py-2 bg-gray-100 outline-none h-[37px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label
            htmlFor="phone"
            className={"text-[16px] font-normal"}>
            Հեռախոսահամար
          </Label>
          <Input
            type="number"
            id="phone"
            className="border rounded-full px-4 py-2 bg-gray-100 outline-none h-[37px]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Course Selection */}
        <div className="w-full md:w-[calc(50%-0.75rem)]">
          <Select
            value={course}
            onValueChange={(value) => {
              setCourse(value);
              const selected = data.StartCourses.find(
                (c: OurStartsProp) => c.title === value
              );
              setFilteredCourse(selected || null);
              setDate("");
              setTime("");
            }}>
            <SelectTrigger className="w-full text-[14px] font-extrabold h-[48px] text-[var(--yellow-color)]">
              <SelectValue placeholder="Ընտրել Դասընթացը" />
            </SelectTrigger>
            <SelectContent>
              {data.StartCourses.map(
                ({ title }: { title: string }, index: number) => (
                  <SelectItem
                    className={`text-[14px] h-[56px] px-6 ${
                      index !== data.StartCourses.length - 1 ? "border-b" : ""
                    } border-[#8B8B8B] rounded-none text-[#3C3C3C80] font-medium data-[state=checked]:text-[#454545] data-[state=checked]:font-semibold`}
                    value={title}
                    key={title + index}>
                    {title}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="w-full md:w-[calc(50%-0.75rem)]">
          <Select
            value={date}
            onValueChange={setDate}
            disabled={!filteredCourse}>
            <SelectTrigger className="w-full text-[14px] font-extrabold h-[48px] text-[var(--yellow-color)]">
              <SelectValue placeholder="Ընտրել Օրը" />
            </SelectTrigger>
            <SelectContent>
              {filteredCourse && (
                <SelectItem
                  className="text-[14px] h-[56px] px-6 border-[#8B8B8B] rounded-none text-[#3C3C3C80] font-medium data-[state=checked]:text-[#454545] data-[state=checked]:font-semibold"
                  value={filteredCourse.startDate.date}>
                  {(() => {
                    const d = new Date(Number(filteredCourse.startDate.date));
                    return isNaN(d.getTime())
                      ? "Անվավեր ամսաթիվ"
                      : d.toISOString().split("T")[0].replace(/-/g, " ");
                  })()}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Time */}
        <div className="w-full md:w-[calc(50%-0.75rem)]">
          <Select
            value={time}
            onValueChange={setTime}
            disabled={!filteredCourse}>
            <SelectTrigger className="w-full text-[14px] font-extrabold h-[48px] text-[var(--yellow-color)]">
              <SelectValue placeholder="Ընտրել Ժամը" />
            </SelectTrigger>
            <SelectContent>
              {filteredCourse && (
                <SelectItem
                  className="text-[14px] h-[56px] px-6 border-[#8B8B8B] rounded-none text-[#3C3C3C80] font-medium data-[state=checked]:text-[#454545] data-[state=checked]:font-semibold"
                  value={filteredCourse.startDate.time}>
                  {(() => {
                    const d = new Date(
                      "1970-01-01T" + filteredCourse.startDate.time
                    );
                    const hours = d.getHours().toString().padStart(2, "0");
                    const minutes = d.getMinutes().toString().padStart(2, "0");
                    return (
                      <div className="flex justify-between w-full pr-2">
                        <span className="w-1/3 text-start">{hours}</span>
                        <span className="w-1/3 text-center">{minutes}</span>
                        <span className="w-1/3 text-end">
                          {+hours >= 12 ? "PM" : "AM"}
                        </span>
                      </div>
                    );
                  })()}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <CustomButton
          withIcon={true}
          href={""}
          text={submitting ? "Ուղարկվում է..." : "Գրանցվել դասընթացին"}
          color={true}
          onClick={handleSubmit}
          className="mt-[64px] h-[48px] md:ml-auto"
        />
      </div>
    </div>
  );
}
