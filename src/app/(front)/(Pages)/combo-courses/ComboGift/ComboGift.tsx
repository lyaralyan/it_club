import Image from "next/image";

import Title from "@front/components/Title";

interface ComboGiftProps {
  combo: {
    image: string;
    photos: string;
    receiveAComputerAsAGift: string;
  };
}

const ComboGift = ({ combo }: ComboGiftProps) => {
  return (
    <div
      className={
        "mt-[90px] flex justify-between items-center flex-col-reverse lg:flex-row"
      }>
      <div className={"lg:w-[40%] w-[100%]"}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${combo.photos}`}
          alt="Image Gift"
          className={"w-full"}
          width={615}
          height={429}
          unoptimized={true}
        />
      </div>
      <div className={"lg:max-w-[646px]"}>
        <Title
          text="Ստացիր նվեր համակարգիչ"
          className={"text-center lg:text-right"}
          textClassName={"right-0"}
        />
        <p
          className={
            "font-semibold text-[16px] tracking-[0.04px] text-[var(--dark)] text-center lg:text-right mt-[14px]"
          }>
          Ինչով ենք մենք տարբերվում.
        </p>
        <p
          className={
            "font-normal text-[16px] leading-[28px] tracking-[0.04px] text-[var(--dark)] text-center lg:text-right mt-[28px]"
          }>
          {combo.receiveAComputerAsAGift}
        </p>
      </div>
    </div>
  );
};

export default ComboGift;
