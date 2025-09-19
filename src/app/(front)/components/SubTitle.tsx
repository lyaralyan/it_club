"use client";

import React from "react";
import type { CSSProperties } from "react";
import TitleYellow from "@front/assets/icons/TitleYellow.svg";

type SubTitleProps = {
  text: string;
  titleYellowStyle?: CSSProperties;
  className?: string
};

const SubTitle = ({ text, titleYellowStyle,className }: SubTitleProps) => {
  return (
    <div className={"relative"}>
      <h2 className={`text-[var(--dark)] font-semibold text-[24px] ${className}`}>
        {text}
      </h2>

      <TitleYellow
        className={"w-[141px] absolute bottom-[-5px] z-[-1]"}
        style={titleYellowStyle}
      />
    </div>
  );
};

export default SubTitle;
