"use client";
import Link from "next/link";
import Logo from "@front/assets/icons/logo.svg";
import CustomButton from "@front/ui/CustomButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { IconMenu2 } from "@tabler/icons-react";
import "../../globals.css";
import { useState } from "react";
const nav = [
  { href: "/", text: "Դասընթացներ" },
  { href: "/services", text: "Ծառայություներ" },
  { href: "/about", text: "Մեր մասին" },
  { href: "/blog", text: "Բլոգ" },
];

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "text-[14px] text-gray-700 hover:text-blue-600",
        isActive ? "text-blue-600 font-semibold" : "text-gray-700"
      )}>
      {children}
    </Link>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50 h-[70px]">
      <div className="grid h-full justify-between items-center lg:grid-cols-[180px_auto_180px] grid-cols-[100px_100px] px-[30px] lg:px-[86px] gap-[16px] relative">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600">
          <Logo className={"w-[112px] h-[41px]"} />
        </Link>
        <div className="hidden lg:flex lg:gap-[36px] md:gap-[18px]">
          {nav.map((item, index) => (
            <NavLink
              key={index}
              href={item.href}>
              {item.text}
            </NavLink>
          ))}
        </div>
        {/* burger menu */}
        <div
          className={`openmenu lg:gap-[36px] md:gap-[18px] absolute right-0 top-[100%] bg-white flex lg:hidden flex-col pt-0 pr-[33px] pb-[48px] pl-[27px] items-end gap-[24px] ${
            !isOpen
              ? "[clip-path:polygon(0_0,_100%_0,_100%_0,_0_0)]"
              : "[clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]"
          }`}>
          {nav.map((item, index) => (
            <NavLink
              key={index}
              href={item.href}
              onClick={() => setIsOpen(!isOpen)}>
              {item.text}
            </NavLink>
          ))}
          <Link
            href="tel:+37496110201"
            className={"text-[var(--yellow-color)] font-normal text-[14px]"}>
            հեռ․՝ +374 96 11 02 01
          </Link>
        </div>

        <div className={"lg:hidden flex justify-end"}>
          <IconMenu2
            className={`burger ${isOpen ? "active" : ""} cursor-pointer`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {/*  */}
        <CustomButton
          text={"+374 96 11 02 01"}
          href={"tel:+374 96 11 02 01"}
          withBorder={true}
          color={true}
          className={"hidden lg:flex"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
