import Title from "@front/components/Title";
import CustomButton from "@front/ui/CustomButton";
import Image from "next/image";

const CreateWebsite = ({
  params,
}: {
  params: {
    id: string;
    title: string;
    description: string;
    banner: string;
    image: string;
  };
}) => {
  console.log("📢 [CreateWebsite.tsx:16]", params);
  return (
    <div className={"mt-[90px]"}>
      <Title
        text="Մեր ծառայությունները"
        className={
          "mt-[32px] text-center lg:text-left text-[18px] lg:text-[32px]"
        }
        textClassName={
          "left-1/2 lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%] text-[18px] lg:text-[32px]"
        }
      />

      <div
        className={
          "mt-[56px] flex justify-between lg:flex-row flex-col items-center"
        }>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${params.image}`}
          alt="Image Service"
          width={386}
          height={340}
          className={"w-[386px] h-[340px]"}
        />
        <div className={"lg:w-[719px] w-full flex items-end flex-col"}>
          <h2
            className={
              "font-semibold lg:text-[32px] text-[18px] lg:mt-0 mt-[36px] text-[var(--dark)] self-center lg:self-end"
            }>
            {params.title}
          </h2>
          <div
            className={
              "w-full h-[3px] border-b border-[var(--dark)] opacity-20 lg:mt-[52px] mt-[24px]"
            }></div>
          <p
            className={
              "font-normal lg:text-[18px] text-[14px] lg:text-right text-center lg:mt-[14px] mt-[24px] leading-[32px]"
            }>
            {params.description}
          </p>
          <CustomButton
            href={""}
            text="Դիմել ծառայությանը"
            withIcon={true}
            className={
              "lg:w-[310px] lg:h-[48px] w-[208px] h-[36px] self-center lg:self-end  mt-[56px] font-semibold text-[16px]"
            }
            background="var(--dark)"
            iconColor="#fff"
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

export default CreateWebsite;
