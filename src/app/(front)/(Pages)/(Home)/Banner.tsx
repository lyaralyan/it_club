"use client";
import React from "react";
import banner from "@front/assets/images/Banner.png";
import CustomButton from "@front/ui/CustomButton";
import { useQuery } from "@apollo/client";
import { GET_BANNER } from "@/app/requests/query";
import { useModalStore } from "@/store/modalStore";
import UniversalModal from "@/components/UniversalModal";

const Banner = () => {
  const { data } = useQuery(GET_BANNER);
  const { isOpen, closeModal, openModal } = useModalStore();

  return (
    <div
      className="bg-no-repeat bg-contain min-h-[928px] relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${
          data?.Banner?.image
            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${data.Banner.image}`
            : banner.src
        })`,
      }}>
      <div className="max-w-[1042px] relative z-1 text-center lg:text-left">
        <h2 className="lg:text-[56px] text-[20px] font-[500] text-[var(--dark)] ">
          {data?.Banner?.title}
        </h2>
        <p className="lg:text-[22px] text-[12px] lg:mt-[24px] mt-[12px] font-[400] text-[var(--dark)]">
          {data?.Banner?.description}
        </p>
        <div className="max-w-[1042px] flex lg:items-start items-center lg:flex-row flex-col lg:gap-[32px] gap-[8px] lg:mt-[48px] mt-[24px]">
          <CustomButton
            onClick={openModal}
            href={""}
            text={"Գրանցվել դասընթացին"}
            withIcon={true}
            color={true}
          />
          <CustomButton
            href={""}
            text={"Իմանալ ավելին"}
            background={"var(--dark)"}
            withIcon={true}
            iconColor={"#fff"}
          />
        </div>
      </div>
      <div className="bg-[#FFFFFF99] w-full h-full absolute left-0 top-0"></div>

      <UniversalModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Banner;
