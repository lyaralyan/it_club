import FrameImage from "@front/assets/images/Group 34970.png"
import Image from "next/image";

const CoursesTime = () => {
  return (
    <div className={"mt-[90px]"}>
      <p className={"font-semibold text-[24px] tracking-[0.04px]"}>
        Դասապրոցեսի ընթացքը
      </p>
      <p
        className={
          "font-medium text-[18px] tracking-[0.04px] text-[var(--yellow-color)] mt-[16px]"
        }
      >
        Մթնոլորտը, որտեղ դիզայնը կյանք է ստանում
      </p>
      <div className={"mt-[16px] w-full min-h-[855px]"}>
        <Image
          src={FrameImage}
          alt="Frame"
          className={"object-cover object-center w-full"}
          unoptimized
        />
      </div>
    </div>
  );
};

export default CoursesTime;
