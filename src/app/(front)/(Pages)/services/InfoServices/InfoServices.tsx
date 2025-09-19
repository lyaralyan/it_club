import Title from "@front/components/Title";
import Image from "next/image";
import CustomButton from "@front/ui/CustomButton";

interface Props {
  params: {
    ServicesList: {
      description: string;
      image: string;
      title: string;
      id: string;
      banner: string;
      bannerDescription: string;
      planningTitle: string;
      planning: { label: string }[];
    }[];
  };
}

const InfoServices = ({ params }: Props) => {
  const { ServicesList } = params;
  console.log("📢 [InfoServices.tsx:18]", ServicesList);
  return (
    <div className={"mt-[56px] lg:mt-[90px]"}>
      <Title
        text="Մեր ծառայությունները"
        className={"text-center lg:text-left text-[18px] lg:text-[32px]"}
        textClassName={
          "left-1/2 lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%] text-[18px] lg:text-[32px]"
        }
      />
      <div>
        {ServicesList.map((item, index) => (
          <div
            key={index}
            className={
              "lg:shadow-[0_4px_6px_rgba(51,51,51,0.3),_0_-1px_2px_rgba(0,0,0,0.2)] rounded-[45px] shadow-none mt-[24px] lg:mt-[90px]"
            }>
            <div
              className={
                "w-full gap-[30px] md:gap-[60px] lg:gap-[110px] grid grid-cols-[repeat(1,minmax(320px,1fr))] lg:grid-cols-[repeat(2,minmax(320px,_612px))] justify-between lg:p-[40px_60px] p-0"
              }>
              <div
                className={
                  "h-full lg:col-span-1 flex justify-between flex-col"
                }>
                <div>
                  <div
                    className={`flex  gap-[25px] items-center justify-center ${
                      index % 2 !== 0 ? "flex-row-reverse" : "flex-row"
                    }`}>
                    <p
                      className={`font-semibold text-[18px] lg:text-[30px] text-[var(--dark)]  ${
                        index % 2 !== 0
                          ? "text-[var(--yellow-color)]"
                          : "text-[var(--dark)]"
                      }`}>
                      {item?.title}
                    </p>
                    <span
                      className={`font-medium text-[36px] lg:text-[60px] ${
                        index % 2 !== 0
                          ? "text-[var(--yellow-color)]"
                          : "text-[var(--dark)]"
                      }`}>
                      0{index + 1}
                    </span>
                  </div>
                  <div
                    className={
                      "w-full h-[3px] border-b border-[var(--dark)] opacity-20"
                    }></div>
                  <p
                    className={
                      "font-normal text-[14px] lg:text-[18px] tracking-[0.04px] text-[#4D4D4D] mt-[16px] leading-[28px]  text-center lg:text-left"
                    }>
                    {item?.description}
                  </p>
                </div>
                <div
                  className={`flex justify-center ${
                    index % 2 == 0 ? "lg:justify-end" : "lg:justify-start"
                  }`}>
                  <CustomButton
                    href={`services/${item.id}`}
                    text="Իմանալ ավելին"
                    withIcon={true}
                    color={index % 2 !== 0 ? false : true}
                    iconColor={index % 2 !== 0 ? "#fff" : "var(--dark)"}
                    background={
                      index % 2 !== 0 ? "var(--dark)" : "var(--yellow-color)"
                    }
                    className={
                      "max-w-fit h-[48px] mt-[24px] font-semibold text-[14px] lg:text-[16px]"
                    }
                  />
                </div>
              </div>
              <div
                className={`lg:col-span-1 max-h-[340px]  ${
                  index % 2 !== 0 ? "lg:order-[1]" : "lg:order-[-1]"
                }
                ${index % 2 !== 0 ? "order-[-1]" : "order-[-1]"}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.image}`}
                  alt="Image Blogs"
                  className={
                    "w-full h-full object-contain object-center rounded-[20px] lg:mt-0 mt-[30px]"
                  }
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoServices;
