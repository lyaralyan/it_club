import Title from "@front/components/Title";
import Image from "next/image";

const AboutItem = ({ item, index }: { item: AboutItemProp; index: number }) => {
  console.log("📢 [AboutItem.tsx:5]", item.image);
  return (
    <div>
      <div
        className={
          "w-full gap-[30px] md:gap-[60px] lg:gap-[110px] grid grid-cols-[repeat(1,minmax(320px,1fr))] lg:grid-cols-[repeat(2,minmax(320px,_612px))] justify-between mt-[90px]"
        }>
        <div className={"h-full lg:col-span-1"}>
          <Title
            text={item?.title}
            // titleYellowStyle={{ right: index % 2 !== 0 ? "0" : "" }}
            className={`text-center ${
              index % 2 !== 0 ? "md:text-right" : "md:text-left"
            }`}
            textClassName={`${
              index % 2 !== 0 ? "md:right-0" : ""
            } right-1/2 translate-x-1/2  md:translate-x-0`}
          />
          <p
            className={`font-semibold text-[16px] text-[var(--dark)] mt-[14px] text-center ${
              index % 2 !== 0 ? "md:text-right" : "md:text-left"
            }`}>
            {item?.subTitle}
          </p>
          <p
            className={`font-normal text-[16px] tracking-[0.04px] text-[var(--dark)]  leading-[28px] mt-[28px] text-center ${
              index % 2 !== 0 ? "md:text-right" : "md:text-left"
            }`}>
            {item?.description}
          </p>
        </div>
        <div
          className={`max-h-[400px] lg:col-span-1 ${
            index % 2 !== 0 ? "lg:order-[-1]" : "lg:order-[1]"
          }`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.image}`}
            alt="Image Blogs"
            width={572}
            height={452}
            className={
              "w-full h-full object-contain object-top rounded-[20px] "
            }
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
