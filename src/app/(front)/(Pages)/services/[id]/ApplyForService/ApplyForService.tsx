import Image from "next/image";
import ImageUx from "@front/assets/images/image.png";
import CustomButton from "@front/ui/CustomButton";

const ApplyForService = ({
  params,
}: {
  params: {
    id: string;
    planningTitle: string;
    planning: { label: string }[];
    banner: string;
  };
}) => {
  return (
    <div>
      <div
        className={
          "w-full mt-[90px] flex justify-between flex-col-reverse lg:flex-row lg:gap-[114px]"
        }>
        <div>
          <p
            className={
              "font-semibold text-[18px] lg:text-[32px] tracking-[0.04px] text-[var(--dark)]  hidden lg:block"
            }>
            {params?.planningTitle}
          </p>
          <div
            className={
              "w-full h-[3px] border-b border-[var(--dark)] opacity-20 lg:mt-[20px] mt-[24px]"
            }></div>
          <ul
            className={
              "mt-[30px] list-disc text-[14px] lg:text-[18px] font-normal leading-[160%] text-[#4D4D4D] ml-[30px]"
            }>
            {params.planning.map((program, index) => {
              return <li key={index}>{program?.label}</li>;
            })}
          </ul>
          <div className={"flex justify-center lg:justify-start"}>
            <CustomButton
              href={""}
              withIcon={true}
              text="Դիմել ծառայությանը"
              className={"max-w-[310px] mt-[36px] h-[48px]"}
              color={true}
            />
          </div>
        </div>
        <div className={"flex flex-col-reverse"}>
          <p
            className={
              "font-semibold text-[18px] lg:text-[32px] tracking-[0.04px] text-[var(--dark)]  block lg:hidden text-center mt-[36px]"
            }>
            {params?.planningTitle}
          </p>
          <Image
            src={ImageUx}
            alt="Program Group"
            className={"w-full h-full mt-[18px] lg:mt-0"}
          />
        </div>
      </div>
      <div
        className={
          "w-full h-[3px] border-b border-[var(--dark)] opacity-20 lg:mt-[90px] mt-[60px]"
        }></div>
    </div>
  );
};

export default ApplyForService;
