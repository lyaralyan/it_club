import Title from "@front/components/Title";
import Poster from "@front/assets/images/poster.jpg";
import CustomButton from "@front/ui/CustomButton";

interface Props {
  params: {
    description: string;
    video: string;
    title: string;
  };
}

const ServicesBusiness = ({ params }: Props) => {
  const { description, video, title } = params;
  return (
    <div>
      <Title
        text={title}
        className={"text-center lg:text-left"}
      />
      <div
        className={
          "w-full gap-[40px] md:gap-[60px] lg:gap-[110px] grid grid-cols-[repeat(1,minmax(320px,1fr))] lg:grid-cols-[repeat(2,minmax(320px,_612px))] justify-between"
        }>
        <div>
          <p
            className={
              "font-extralight text-[14px] leading-[160%] mt-[30px] text-[#4D4D4D] lg:text-left text-center lg:text-[20px]"
            }>
            {description}
          </p>
        </div>
        <div className={"h-fit relative order-[-1] lg:order-[1]"}>
          <video
            className={"w-full mt-[16px] rounded-[20px]"}
            controls={true}
            preload="none"
            poster={Poster.src}
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${video}`}
          />
        </div>
      </div>

      <div className={"flex justify-center lg:justify-start"}>
        <CustomButton
          href={""}
          text="Կապ հաստատել մեզ հետ"
          withIcon={true}
          iconColor="#fff"
          background={"var(--dark)"}
          className={"max-w-fit h-[48px] mt-[24px] font-semibold text-[16px]"}
        />
      </div>
    </div>
  );
};

export default ServicesBusiness;
