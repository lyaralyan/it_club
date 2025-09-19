import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`max-w-[1350px] px-[20px] 2xl:px-0 m-auto ${className}`}>{children}</div>;
};

export default Wrapper;
