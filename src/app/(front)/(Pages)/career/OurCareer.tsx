import Title from "@front/components/Title";
import Wrapper from "@front/components/Wrapper";
import ImageCareer from "@front/assets/images/career.png";
import Image from "next/image";
import IconCareer from "@front/assets/icons/Frame 67.png";
import CustomButton from "@front/ui/CustomButton";

const OurCareer = () => {
  const ItemsCareer = [
    {
      id: Math.random(),
      icon: IconCareer,
      current: "20+",
      description: "Խմբակային և անհատական դասընթացներ",
    },
    {
      id: Math.random(),
      icon: IconCareer,
      current: "100+",
      description: "Ուսանող",
    },
    {
      id: Math.random(),
      icon: IconCareer,
      current: "10+",
      description: "Դասընթացավար",
    },
    {
      id: Math.random(),
      icon: IconCareer,
      current: "4+",
      description: "Գործընկեր",
    },
  ];

  return (
    <Wrapper className={"mt-[90px]"}>
      <Title
        text="Մեր ձեռքբերումները"
        className={"text-center lg:text-left"}
        textClassName={
          "left-1/2  lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
        }
      />
      <p
        className={
          "lg:font-normal font-medium lg:text-[16px] text-[14px] text-[var(--dark)] lg:mt-[12px] mt-[16px] tracking-[0.04px] text-center lg:text-left"
        }>
        Բացահայտիր պահանջված ՏՏ մասնագիտություններն ու սկսիր սովորել այսօր
      </p>
      <div
        className={
          "w-full lg:mt-[56px] mt-[16px] flex items-center lg:flex-row flex-col-reverse"
        }>
        <div
          className={
            "w-[100%] lg:w-[48%] grid lg:grid-cols-[374px_230px] gap-x-[76px] gap-y-[22px] lg:mt-0 mt-[16px]"
          }>
          {ItemsCareer.map((item) => {
            return (
              <div
                key={item.id}
                className={"flex justify-start items-center gap-[24px]"}>
                <Image
                  src={item.icon}
                  alt="Icon"
                />
                <div className={"flex flex-col gap-[8px]"}>
                  <p
                    className={
                      "font-semibold lg:text-[32px] text-[20px] text-[#000]"
                    }>
                    {item.current}
                  </p>
                  <p
                    className={
                      "font-normal lg:text-[20px] text-[14px] text-[#6D737A]"
                    }>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
          <CustomButton
            text={"Իմանալ ավելին"}
            href={""}
            background={"none"}
            className={
              "text-[#FFC502]! mt-[29px] p-0! self-center lg:self-end lg:text-[16px] text-[14px] lg:w-[152px] lg:h-[48px] h-[36px]"
            }
            iconColor={"#FFC502"}
            withIcon={true}
          />
        </div>
        {/*  className={"rotate-[1deg] h-[425px] w-full object-cover object-center absolute top-[-7%] left-[4%]"} */}

        <div
          className={
            "w-[312px] lg:ml-[182px] bg-[#FFC502] rounded-[80px] relative lg:mt-0 mt-[16px]"
          }>
          <Image
            src={ImageCareer}
            alt="Image Career"
            className={'w-[312px] h-[413px]'}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default OurCareer;
