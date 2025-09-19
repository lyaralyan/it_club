import CustomButton from "@front/ui/CustomButton";
import Image from "next/image";

const BlogItems = ({ item, index }: { item: BlogItemProp; index: number }) => {
  return (
    <div>
      <div
        className={
          "w-full gap-[30px] md:gap-[60px] lg:gap-[110px] mt-[40px] grid grid-cols-[repeat(1,minmax(320px,1fr))] lg:grid-cols-[repeat(2,minmax(320px,_612px))] justify-between"
        }
        style={{ flexDirection: index % 2 !== 0 ? "row-reverse" : "row" }}>
        <div className={"h-full max-h-[347px] overflow-clip lg:col-span-1"}>
          <p
            className={
              "font-semibold text-[24px] tracking-[0.04px] leading-[28px] text-[var(--dark)]"
            }>
            {item?.title}
          </p>
          <p
            className={
              "font-normal text-[16px] tracking-[0.04px] text-[#4D4D4D] mt-[16px] leading-[28px]"
            }>
            {item.description}
          </p>
        </div>
        <div
          className={`h-full lg:col-span-1 ${
            index % 2 !== 0 ? "lg:order-[-1]" : "lg:order-[1]"
          }`}>
          {item.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image}`}
              alt="Image Blogs"
              className={
                "w-full h-full object-cover object-top rounded-[20px] "
              }
              width={615}
              height={347}
            />
          )}
        </div>
      </div>
      <div
        className={`flex justify-center ${
          index % 2 !== 0 ? "lg:justify-end" : "lg:justify-start"
        }`}>
        <CustomButton
          href={`blog/${item?.id}`}
          text="Իմանալ ավելին"
          withIcon={true}
          color={index % 2 !== 0 ? false : true}
          iconColor={index % 2 !== 0 ? "#fff" : "var(--dark)"}
          background={index % 2 !== 0 ? "var(--dark)" : "var(--yellow-color)"}
          className={"max-w-fit h-[48px] mt-[24px] font-semibold text-[16px]"}
        />
      </div>
    </div>
  );
};

export default BlogItems;
