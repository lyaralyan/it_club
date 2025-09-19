import CustomButton from "@front/ui/CustomButton";
import Title from "@front/components/Title";
import Image from "next/image";
import { Key } from "react";
import UniversalModal from "@/components/UniversalModal";
import { useModalStore } from "@/store/modalStore";

interface ComboProgram {
  label: string;
}

interface ComboNameProps {
  combo: {
    courseProgramList: ComboProgram[];
    comboName: string;
    description: string;
    image: string;
  };
}

const ComboName = ({ combo }: ComboNameProps) => {
  const { isOpen, closeModal, openModal } = useModalStore();

  return (
    <div>
      <div>
        <Title
          text={combo.comboName}
          className={"lg:text-[32px] text-[18px] text-center lg:text-left"}
          textClassName={
            "left-1/2 lg:left-0 transform translate-x-[-50%] lg:translate-x-[0%]"
          }
        />
        <p
          className={
            "font-light lg:font-normal mt-[16px] text-[16px] leading-28px tracking-[0.04px] text-[#4D4D4D] text-center lg:text-left"
          }>
          {combo?.description}
        </p>
      </div>
      <div
        className={
          "w-full mt-[90px] flex justify-between flex-col-reverse lg:flex-row"
        }>
        <div>
          <p
            className={
              "font-semibold text-[18px] lg:text-[32px] tracking-[0.04px] text-[var(--dark)]  hidden lg:block"
            }>
            Դասընթացի ծրագիրը
          </p>
          <ul
            className={
              "mt-[30px] list-disc text-[16px] lg:text-[20px] font-extralight leading-[160%] text-[#4D4D4D] ml-[30px]"
            }>
            {combo?.courseProgramList.map(
              (
                program: {
                  label: string;
                },
                index: Key | null | undefined
              ) => {
                return <li key={index}>{program.label}</li>;
              }
            )}
          </ul>
          <div className={"flex justify-center lg:justify-start"}>
            <CustomButton
              onClick={openModal}
              href={""}
              withIcon={true}
              text="Գրանցվել դասընթացներին"
              className={"max-w-[310px] mt-[36px] h-[48px]"}
              color={true}
            />
          </div>
        </div>
        <div>
          <p
            className={
              "font-semibold text-[18px] lg:text-[32px] tracking-[0.04px] text-[var(--dark)]  block lg:hidden"
            }>
            Դասընթացի ծրագիրը
          </p>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${combo.image}`}
            alt="Program Group"
            className={"w-full h-full mt-[18px] lg:mt-0"}
            width={512}
            height={429}
            unoptimized={true}
          />
        </div>
      </div>
      <UniversalModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ComboName;
