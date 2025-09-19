import { GET_COMBOS } from "@/app/requests/query";

import { useQuery } from "@apollo/client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

interface CombosListProps {
  getCombo: (args: { variables: { id: string } }) => void;
  deleteCombo?: (args: { variables: { id: string } }) => void;
  onEdit?: (args: { variables: { id: string } }) => void;
}

const CombosList: React.FC<CombosListProps> = ({ deleteCombo, onEdit }) => {
  const { data: allData } = useQuery(GET_COMBOS);

  return (
    <div
      className={
        "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-[56px] justify-between"
      }>
      {allData?.Combos?.map((lesson: OurComboProp, index: number) => (
        <div
          key={index}
          className={
            "bg-white border-[1px] border-solid border-[#E7E8E3] p-[16px] rounded-[16px]"
          }>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${lesson.image}`}
            alt="combo image"
            width={280}
            height={207}
            className={"w-full"}
            unoptimized={true}
          />
          <p className={"font-medium text-[20px] text-[var(--dark)] mt-[16px]"}>
            {lesson.comboName}
          </p>
          {/* <div
            className={"flex gap-[8px] mt-[16px] justify-start items-center"}>
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
          </div> */}
          <div className={"mt-[16px] flex justify-between items-center"}>
            <p className={"text-[16px] text-[#1B1D1F] font-semibold"}>
              {lesson.price} ԴՐԱՄ
            </p>
            <div
              className={
                "h-[54px] flex justify-between items-center border-t border-t-[#FBFBFB]"
              }>
              <div className="flex gap-2 items-center">
                <IconEdit
                  onClick={() => onEdit?.({ variables: { id: lesson.id } })}
                />
                {deleteCombo && (
                  <IconTrash
                    onClick={() =>
                      deleteCombo({ variables: { id: lesson.id } })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CombosList;
