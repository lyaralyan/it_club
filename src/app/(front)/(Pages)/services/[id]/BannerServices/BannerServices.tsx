"use client";
import PosterServices from "@front/assets/images/poster.jpg";
import CustomButton from "@front/ui/CustomButton";

const BannerServices = ({
  params,
}: {
  params: {
    id: string;
    title: string;
    bannerDescription: string;
    banner: string;
  };
}) => {
  console.log(
    "📢 [BannerServices.tsx:9]",
    `${process.env.NEXT_PUBLIC_STORAGE_URL}${params?.banner}`
  );

  return (
    <div
      className={
        "w-full min-h-[794px] bg-no-repeat bg-cover bg-center relative"
      }
      style={{
        backgroundImage: `url(${
          params?.banner
            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${params?.banner}`
            : PosterServices.src
        })`,
      }}>
      <div className={"w-full min-h-[794px] bg-[#FFFFFF99] flex items-center"}>
        <div
          className={
            "max-w-[758px] min-h-[246px] lg:ml-[20%] ml-0 flex flex-col"
          }>
          <h2
            className={
              "lg:font-semibold lg:text-[52px] font-extrabold text-[24px]  text-[var(--dark)] text-center lg:text-left"
            }>
            {params?.title}
          </h2>
          <p
            className={
              "font-normal lg:text-[18px] text-[14px] lg:leading-[35px] leading-[23px] text-[#000] text-center lg:text-left lg:mt-[18px] mt-[22px]"
            }>
            {params?.bannerDescription}
          </p>
          <CustomButton
            href={""}
            text={"Պատվիրել հիմա"}
            withIcon={true}
            color={true}
            className={
              "lg:w-[310px] lg:h-[48px] w-[240px] h-[36px] lg:text-[16px] lg:font-semibold font-medium text-[14px] lg:self-start self-center mt-[20px]"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BannerServices;
