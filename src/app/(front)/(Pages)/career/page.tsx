import OurLessons from "@front/(Pages)/(Home)/OurLessons/OurLessons";
import ComboPackages from "@front/(Pages)/(Home)/ComboPackages/ComboPackages";
import OurCareer from "@/app/(front)/(Pages)/career/OurCareer";
import Wrapper from "@front/components/Wrapper";

const SingleCareer = () => {
  return (
    <Wrapper>
      <OurCareer />
      <ComboPackages />
      <div className={"lg:mt-[90px] mt-[56px]"}>
        <h2
          className={
            "lg:text-[24px] text-[16px] font-semibold text-center lg:text-left"
          }>
          Ծանոթացիր մեր դասընթացներին
        </h2>
        <p
          className={
            "font-medium lg:text-[18px] text-[16px] lg:mt-[24px] mt-[4px] text-[#FFC502] text-center lg:text-left"
          }>
          Դու էլ կարող ես լինել այս միջավայրի մի մասը
        </p>
      </div>
      <OurLessons />
    </Wrapper>
  );
};

export default SingleCareer;
