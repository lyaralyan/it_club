import Wrapper from "@front/components/Wrapper";
import React from "react";
import Logo from "@front/assets/icons/logo.svg";

const Footer = () => {
  return (
    <div className={"bg-[#FBFBFB] mt-[16px] py-[38px]"}>
      <Wrapper className={"flex flex-col"}>
        <Logo className={"w-[112px] h-[41px] self-center lg:self-start"} />
        <div
          className={"lg:pt-[90px] mt-[36px] flex justify-center lg:items-stretch items-center lg:gap-[220px] gap-[36px] lg:flex-row flex-col"}>
          <div  className={"flex justify-center lg:justify-start lg:items-start items-center flex-col"}>
            <p
              className={
                "lg:text-[22px] text-[20px] text-[var(--dark)] font-normal mb-[20px]"
              }>
              IT Club
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Մեր մասին
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Մեր թիմ
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Մեր բլոգը
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Կարիերա
            </p>
          </div>
          <div className={"flex justify-center lg:justify-start lg:items-start items-center flex-col"}>
            <p
              className={
                "lg:text-[22px] text-[20px] text-[var(--dark)] font-normal mb-[20px]"
              }>
              Contact
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Օգնություն
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Մեր գործընկերները
            </p>
          </div>
          <div className={"flex justify-center lg:justify-start lg:items-start items-center flex-col"}>
            <p
              className={
                "lg:text-[22px] text-[20px] text-[var(--dark)] font-normal mb-[20px]"
              }>
              Legal
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Terms & Conditions
            </p>
            <p
              className={
                "lg:text-[18px] text-[16px] font-extralight text-[var(--dark)]"
              }>
              Privacy Policy
            </p>
          </div>
        </div>
        <div className={"pb-[64px] flex justify-center gap-6 mt-[32px]"}>
          <p className={"text-[18px] font-bold text-[var(--dark)]"}>
            Follow Us
          </p>
          <div className={"flex justify-center items-center gap-4"}>
            icon petqa avelacvi
          </div>
        </div>
        <div
          className={
            "border-t border-solid border-[#4242421F] flex items-center justify-end pt-[16px] pb-[18px] lg:flex-row flex-col gap-[10px]"
          }>
          <p className={"font-normal text-[15px] text-[var(--dark)]"}>
            Բոլոր իրավունքները պաշտպանված են
          </p>
          <p className={"font-bold text-[15px] text-[var(--dark)]"}>
            IT Club © 2025
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
