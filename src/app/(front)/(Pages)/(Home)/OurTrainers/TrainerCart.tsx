import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrainerItem = ({ item }: TrainerItemProps) => {
  return (
    <Link
      href={`teacher/${item.id}`}
      className={
        "min-h-[300px] border border-solid border-[#EEEEEE] rounded-[20px] px-[45px] py-[20.5px] transition transform hover:scale-105 cursor-pointer"
      }>
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image}`}
        alt={"teacher photo"}
        className={"w-full"}
        width={140}
        height={156}
        unoptimized
      />
      <p
        className={
          "mt-[10px] text-[#FFC502] text-center text-[17px] font-normal"
        }>
        {item.name}
      </p>
      <p
        className={
          "mt-[10px] text-[#000000] text-center text-[16px] font-light"
        }>
        {item.experience}
      </p>
      <p
        className={
          "mt-[10px] text-[#000000] text-center text-[12px] font-extralight"
        }>
        {item.name}
      </p>
    </Link>
  );
};

export default TrainerItem;
