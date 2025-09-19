import React from "react";
import Image from "next/image";
import star from "@front/assets/icons/star.png";
import ArrowUpRight from "@front/assets/icons/Frame 23.png";
import Link from "next/link";

const ComboItem = ({ start }: { start: OurComboProp }) => {
  return (
    <Link
      href={`combo-courses/${start.id}`}
      className={
        "bg-white border-[1px] border-solid border-[#E7E8E3] p-[16px] rounded-[16px] h-full grid content-between"
      }>
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${start.image}`}
        alt="combo image"
        width={280}
        height={207}
        className={"w-full"}
        unoptimized={true}
      />
      <div>
        <p className={"font-medium text-[20px] text-[var(--dark)] mt-[16px]"}>
          {start.comboName}
        </p>
        <div className={"flex gap-[8px] mt-[16px] justify-start items-center"}>
          <Image
            src={star}
            alt="star"
            className={"w-[20px] h-[20px]"}
          />
          <Image
            src={star}
            alt="star"
            className={"w-[20px] h-[20px]"}
          />
          <Image
            src={star}
            alt="star"
            className={"w-[20px] h-[20px]"}
          />
          <Image
            src={star}
            alt="star"
            className={"w-[20px] h-[20px]"}
          />
          <Image
            src={star}
            alt="star"
            className={"w-[20px] h-[20px]"}
          />
          <p className={"text-[20px] font-normal text-[#52565C]"}>(15)</p>
        </div>
        <div className={"mt-[16px] flex justify-between items-center"}>
          <p className={"text-[16px] text-[#1B1D1F] font-semibold"}>
            {start.price} ԴՐԱՄ
          </p>
          <Image
            src={ArrowUpRight}
            alt="ArrowUpRight"
            className={" h-[44px]"}
          />
        </div>
      </div>
    </Link>
  );
};

export default ComboItem;
