import Poster from "@front/assets/images/poster.jpg";

const CoursesVideo = ({ video }: { video: string }) => {
  return (
    <div className={"mt-[90px]"}>
      <p className={"font-semibold text-[24px] tracking-[0.04px]"}>
        Ծանոթացիր դասընթացի գործընթացին
      </p>
      <p
        className={
          "font-medium text-[18px] tracking-[0.04px] text-[var(--yellow-color)] mt-[16px]"
        }>
        Դու էլ կարող ես լինել այս միջավայրի մի մասը
      </p>
      <div className={"w-full h-fit relative"}>
        <video
          className={"w-full mt-[16px] rounded-[20px]"}
          controls={true}
          preload="none"
          poster={Poster.src}
          src={video}
        />
      </div>
    </div>
  );
};

export default CoursesVideo;
