import React from "react";
import TitleYellow from "@front/assets/icons/TitleYellow.svg";
import type { CSSProperties } from "react";

type TitleProps = {
  text: string;
  titleYellowStyle?: CSSProperties;
  className?: string;
  textClassName?: string;
};

const Title = ({
  text,
  titleYellowStyle,
  className,
  textClassName,
}: TitleProps) => {
  return (
    <div className={"relative"}>
      <h2
        className={`text-[var(--dark)] font-semibold lg:text-[32px] ${className}`}>
        {text}
      </h2>
      <TitleYellow
        className={`w-[265px] h-[19px] absolute bottom-[-5px] z-[-1] ${textClassName}`}
        style={titleYellowStyle}
        preserveAspectRatio="xMidYMid"
      />
    </div>
  );
};

export default Title;
