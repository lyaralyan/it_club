import Image from "next/image";
import React from "react";
import CustomButton from "@front/ui/CustomButton";
import { useModalStore } from "@/store/modalStore";
import UniversalModal from "@/components/UniversalModal";

const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp));

  const monthsHy = [
    "Հունվար",
    "Փետրվար",
    "Մարտ",
    "Ապրիլ",
    "Մայիս",
    "Հունիս",
    "Հուլիս",
    "Օգոստոս",
    "Սեպտեմբեր",
    "Հոկտեմբեր",
    "Նոյեմբեր",
    "Դեկտեմբեր",
  ];

  const day = date.getDate(); // <--- տեղական օր
  const month = monthsHy[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const StartsItem = ({ start }: { start: OurStartsProp }) => {
  const { isOpen, closeModal, openModal } = useModalStore();

  return (
    <div
      className={
        "h-[529px] bg-white border-[1px] border-solid border-[#E7E8E3] pl-[25px] pr-[25px] pt-[26px] rounded-[16px]"
      }>
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${start?.image}`}
        alt={"lesson image"}
        className={"h-[232px] rounded-[12px]"}
        width={350}
        height={232}
      />
      <div
        className={
          "pt-[32px] pb-[18px] flex flex-col justify-between items-stretch h-[calc(100%-232px)]"
        }>
        <div className={"flex-1"}>
          <p className={"font-semibold"}>{formatDate(start.startDate.date)}</p>
          <p
            className={
              "font-normal text-[var(--yellow-color)] text-[24px] border-b border-[#EEEEEEEE]"
            }>
            {start.title}
          </p>
          <p
            className={
              "mt-[6px] text-[16px] font-light text-[#65665C] overflow-clip h-[72px]"
            }>
            {start.description}
          </p>
        </div>
        <div className={"mt-auto flex justify-between items-center"}>
          <p className={"text-[16px] font-semibold text-[var(--dark)]"}>
            {start.price} դրամ/ամիս
          </p>

          <CustomButton
            onClick={openModal}
            href={""}
            text={"Գրանցվել"}
            withIcon={true}
            iconColor={"#fff"}
          />
        </div>
      </div>
      <UniversalModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default StartsItem;
