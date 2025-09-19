import Link from "next/link";
import React from "react";
import { ArrowRight } from "@front/components/SVG";

const CustomButton = ({
  text,
  href,
  background,
  withBorder = false,
  withIcon = false,
  color = false,
  iconColor,
  className,
  onClick,
}: {
  text: string;
  href: string;
  background?: string;
  className?: string;
  withBorder?: boolean;
  withIcon?: boolean;
  color?: boolean;
  iconColor?: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      className={`bg-[var(--yellow-color)] px-[21px] h-[34px] rounded-[30px] flex items-center justify-center whitespace-pre gap-[10px] ${className}`}
      href={href}
      onClick={onClick}
      style={{
        background,
        border: withBorder ? "1px solid #00000033" : "",
        color: color ? "var(--dark)" : "#fff",
      }}>
      {text}
      {withIcon ? <ArrowRight color={iconColor} /> : null}
    </Link>
  );
};

export default CustomButton;
