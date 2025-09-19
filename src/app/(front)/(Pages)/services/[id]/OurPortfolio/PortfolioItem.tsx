import React from "react";
import Image from "next/image";



const PortfolioItem = ({start} : {start : OurPortfolioProp}) => {
  return(
    <div className={"min-h-[403px] bg-white pl-[25px] pr-[25px] pt-[26px] rounded-[16px]"}>
      <Image src={start.image} alt="Portfolio Picture" />
      <h2 className={"text-center mt-[16px] font-semibold text-[24px] text-[var(--dark)]"}>{start.title}</h2>
      <p className={"text-center mt-[8px] text-[16px] font-medium"}>{start.description}</p>
    </div>
  )
}

export default PortfolioItem;